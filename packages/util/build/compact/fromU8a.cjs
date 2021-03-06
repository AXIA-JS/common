"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compactFromU8a = compactFromU8a;

var _index = require("../bn/index.cjs");

var _index2 = require("../u8a/index.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name compactFromU8a
 * @description Retrievs the offset and encoded length from a compact-prefixed value
 * @example
 * <BR>
 *
 * ```javascript
 * import { compactFromU8a } from '@axia-js/util';
 *
 * const [offset, length] = compactFromU8a(new Uint8Array([254, 255, 3, 0]));
 *
 * console.log('value offset=', offset, 'length=', length); // 4, 0xffff
 * ```
 */
function compactFromU8a(_input) {
  const input = (0, _index2.u8aToU8a)(_input);
  const flag = input[0] & 0b11;

  if (flag === 0b00) {
    return [1, new _index.BN(input[0]).ishrn(2)];
  } else if (flag === 0b01) {
    return [2, (0, _index2.u8aToBn)(input.slice(0, 2), true).ishrn(2)];
  } else if (flag === 0b10) {
    return [4, (0, _index2.u8aToBn)(input.slice(0, 4), true).ishrn(2)];
  }

  const offset = 1 + new _index.BN(input[0]).ishrn(2) // clear flag
  .iadd(_index.BN_FOUR) // add 4 for base length
  .toNumber();
  return [offset, (0, _index2.u8aToBn)(input.subarray(1, offset), true)];
}