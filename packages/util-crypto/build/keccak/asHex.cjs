"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keccakAsHex = keccakAsHex;

var _util = require("@axia-js/util");

var _asU8a = require("./asU8a.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name keccakAsHex
 * @summary Creates a keccak hex string from the input.
 * @description
 * From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { keccakAsHex } from '@axia-js/util-crypto';
 *
 * keccakAsHex('123'); // => 0x...
 * ```
 */
function keccakAsHex(value, bitLength) {
  return (0, _util.u8aToHex)((0, _asU8a.keccakAsU8a)(value, bitLength));
}