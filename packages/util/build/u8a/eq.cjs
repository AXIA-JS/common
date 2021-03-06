"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.u8aEq = u8aEq;

var _cmp = require("./cmp.cjs");

var _toU8a = require("./toU8a.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
function equals(a, b) {
  return a.length === b.length && (0, _cmp.u8aCmp)(a, b) === 0;
}
/**
 * @name u8aEq
 * @summary Compares two Uint8Arrays for equality.
 * @description
 * For `UInt8Array` (or hex string) input values true if there is a match.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aEq } from '@axia-js/util';
 *
 * u8aEq(new Uint8Array([0x68, 0x65]), new Uint8Array([0x68, 0x65])); // true
 * ```
 */


function u8aEq(a, b) {
  return equals((0, _toU8a.u8aToU8a)(a), (0, _toU8a.u8aToU8a)(b));
}