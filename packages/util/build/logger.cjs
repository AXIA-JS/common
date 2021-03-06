"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loggerFormat = loggerFormat;
exports.logger = logger;

var _formatDate = require("./format/formatDate.cjs");

var _bn = require("./is/bn.cjs");

var _buffer = require("./is/buffer.cjs");

var _function = require("./is/function.cjs");

var _object = require("./is/object.cjs");

var _u8a = require("./is/u8a.cjs");

var _toHex = require("./u8a/toHex.cjs");

var _toU8a = require("./u8a/toU8a.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
const logTo = {
  debug: 'log',
  error: 'error',
  log: 'log',
  warn: 'warn'
};

function formatOther(value) {
  if (value && (0, _object.isObject)(value) && value.constructor === Object) {
    return Object.keys(value).reduce((result, key) => {
      result[key] = loggerFormat(value[key]);
      return result;
    }, {});
  }

  return value;
}

function loggerFormat(value) {
  if (Array.isArray(value)) {
    return value.map(loggerFormat);
  } else if ((0, _bn.isBn)(value)) {
    return value.toString();
  } else if ((0, _u8a.isU8a)(value) || (0, _buffer.isBuffer)(value)) {
    return (0, _toHex.u8aToHex)((0, _toU8a.u8aToU8a)(value));
  }

  return formatOther(value);
}

function apply(log, type, values, maxSize = -1) {
  if (values.length === 1 && (0, _function.isFunction)(values[0])) {
    const fnResult = values[0]();
    return apply(log, type, Array.isArray(fnResult) ? fnResult : [fnResult], maxSize);
  }

  console[logTo[log]]((0, _formatDate.formatDate)(new Date()), type, ...values.map(loggerFormat).map(v => {
    if (maxSize <= 0) {
      return v;
    }

    const r = `${v}`;
    return r.length < maxSize ? v : `${r.substr(0, maxSize)} ...`;
  }));
}

function noop() {// noop
}

function parseEnv(type) {
  const env = (typeof process === 'object' ? process : {}).env || {};
  const maxSize = parseInt(env.DEBUG_MAX || '-1', 10);
  let isDebugOn = false;
  (env.DEBUG || '').toLowerCase().split(',').forEach(e => {
    if (!!e && (e === '*' || type === e || e.endsWith('*') && type.startsWith(e.slice(0, -1)))) {
      isDebugOn = true;
    }

    if (!!e && e.startsWith('-') && (type === e.slice(1) || e.endsWith('*') && type.startsWith(e.slice(1, -1)))) {
      isDebugOn = false;
    }
  });
  return [isDebugOn, isNaN(maxSize) ? -1 : maxSize];
}
/**
 * @name Logger
 * @summary Creates a consistent log interface for messages
 * @description
 * Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (controlled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.
 * @example
 * <BR>
 *
 * ```javascript
 * import { logger } from '@axia';
 *
 * const l = logger('test');
 * ```
 */


function logger(_type) {
  const type = `${_type.toUpperCase()}:`.padStart(16);
  const [isDebug, maxSize] = parseEnv(_type.toLowerCase());
  return {
    debug: isDebug ? (...values) => apply('debug', type, values, maxSize) : noop,
    error: (...values) => apply('error', type, values),
    log: (...values) => apply('log', type, values),
    noop,
    warn: (...values) => apply('warn', type, values)
  };
}