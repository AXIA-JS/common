"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCompact = isCompact;

var _function = require("./function.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name isCompact
 * @summary Tests for SCALE-Compact-like object instance.
 */
function isCompact(value) {
  return (0, _function.isFunction)(value.toBigInt) && (0, _function.isFunction)(value.toBn) && (0, _function.isFunction)(value.toNumber) && (0, _function.isFunction)(value.unwrap);
}