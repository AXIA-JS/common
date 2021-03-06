// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { u8aToHex } from '@axia-js/util';
import { blake2AsU8a } from "./asU8a.js";
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

export function blake2AsHex(data, bitLength = 256, key, onlyJs = false) {
  return u8aToHex(blake2AsU8a(data, bitLength, key, onlyJs));
}