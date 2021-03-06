"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compactToU8a = compactToU8a;

var _assert = require("../assert.cjs");

var _index = require("../bn/index.cjs");

var _index2 = require("../u8a/index.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_U8 = new _index.BN(2).pow(new _index.BN(8 - 2)).subn(1);
const MAX_U16 = new _index.BN(2).pow(new _index.BN(16 - 2)).subn(1);
const MAX_U32 = new _index.BN(2).pow(new _index.BN(32 - 2)).subn(1);
/**
 * @name compactToU8a
 * @description Encodes a number into a compact representation
 * @example
 * <BR>
 *
 * ```javascript
 * import { compactToU8a } from '@axia-js/util';
 *
 * console.log(compactToU8a(511, 32)); // Uint8Array([0b11111101, 0b00000111])
 * ```
 */

function compactToU8a(_value) {
  const value = (0, _index.bnToBn)(_value);

  if (value.lte(MAX_U8)) {
    return new Uint8Array([value.toNumber() << 2]);
  } else if (value.lte(MAX_U16)) {
    return (0, _index.bnToU8a)(value.shln(2).iadd(_index.BN_ONE), 16, true);
  } else if (value.lte(MAX_U32)) {
    return (0, _index.bnToU8a)(value.shln(2).iadd(_index.BN_TWO), 32, true);
  }

  const u8a = (0, _index.bnToU8a)(value);
  let length = u8a.length; // adjust to the minimum number of bytes

  while (u8a[length - 1] === 0) {
    length--;
  }

  (0, _assert.assert)(length >= 4, 'Invalid length, previous checks match anything less than 2^30');
  return (0, _index2.u8aConcat)( // subtract 4 as minimum (also catered for in decoding)
  [(length - 4 << 2) + 0b11], u8a.subarray(0, length));
}