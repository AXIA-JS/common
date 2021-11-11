// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { arrayRange } from "../array/index.js";
const ALPHABET = arrayRange(256).map(n => n.toString(16).padStart(2, '0'));
/** @internal */

function extract(value) {
  const result = new Array(value.length);

  for (let i = 0; i < value.length; i++) {
    result[i] = ALPHABET[value[i]];
  }

  return result.join('');
}
/** @internal */


function unprefixed(value, bitLength = -1) {
  const byteLength = Math.ceil(bitLength / 8);
  return byteLength > 0 && value.length > byteLength ? trim(value, Math.ceil(byteLength / 2)) : extract(value);
}
/** @internal */


function trim(value, halfLength) {
  return `${unprefixed(value.subarray(0, halfLength))}…${unprefixed(value.subarray(value.length - halfLength))}`;
}
/**
 * @name u8aToHex
 * @summary Creates a hex string from a Uint8Array object.
 * @description
 * `UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToHex } from '@axia-js/util';
 *
 * u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
 * ```
 */


export function u8aToHex(value, bitLength = -1, isPrefixed = true) {
  return `${isPrefixed ? '0x' : ''}${!value || !value.length ? '' : unprefixed(value, bitLength)}`;
}