"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hexToString = hexToString;

var _toString = require("../u8a/toString.cjs");

var _toU8a = require("./toU8a.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name hexToU8a
 * @summary Creates a Uint8Array object from a hex string.
 * @description
 * Hex input values return the actual bytes value converted to a string. Anything that is not a hex string (including the `0x` prefix) throws an error.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexToString } from '@axia-js/util';
 *
 * hexToU8a('0x68656c6c6f'); // hello
 * ```
 */
function hexToString(_value) {
  return (0, _toString.u8aToString)((0, _toU8a.hexToU8a)(_value));
}