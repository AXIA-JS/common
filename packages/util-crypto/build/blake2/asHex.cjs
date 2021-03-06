"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blake2AsHex = blake2AsHex;

var _util = require("@axia-js/util");

var _asU8a = require("./asU8a.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name blake2AsHex
 * @summary Creates a blake2b hex from the input.
 * @description
 * From a `Uint8Array` input, create the blake2b and return the result as a hex string with the specified `bitLength`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { blake2AsHex } from '@axia-js/util-crypto';
 *
 * blake2AsHex('abc'); // => 0xba80a53f981c4d0d
 * ```
 */
function blake2AsHex(data, bitLength = 256, key, onlyJs = false) {
  return (0, _util.u8aToHex)((0, _asU8a.blake2AsU8a)(data, bitLength, key, onlyJs));
}