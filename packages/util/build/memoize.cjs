"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoize = memoize;

var _undefined = require("./is/undefined.cjs");

var _stringify = require("./stringify.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
function defaultGetId() {
  return 'none';
} // eslint-disable-next-line @typescript-eslint/no-explicit-any


function memoize(fn, {
  getInstanceId = defaultGetId
} = {}) {
  const cache = {};

  const memoized = (...args) => {
    const stringParams = (0, _stringify.stringify)(args);
    const instanceId = getInstanceId();

    if (!cache[instanceId]) {
      cache[instanceId] = {};
    }

    if ((0, _undefined.isUndefined)(cache[instanceId][stringParams])) {
      cache[instanceId][stringParams] = fn(...args);
    }

    return cache[instanceId][stringParams];
  };

  memoized.unmemoize = (...args) => {
    const stringParams = (0, _stringify.stringify)(args);
    const instanceId = getInstanceId();

    if (cache[instanceId] && !(0, _undefined.isUndefined)(cache[instanceId][stringParams])) {
      delete cache[instanceId][stringParams];
    }
  };

  return memoized;
}