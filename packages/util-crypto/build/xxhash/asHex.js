// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { u8aToHex } from '@axia-js/util';
import { xxhashAsU8a } from "./asU8a.js";
/**
 * @name xxhashAsHex
 * @summary Creates a xxhash64 hex from the input.
 * @description
 * From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with the specified `bitLength`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { xxhashAsHex } from '@axia-js/util-crypto';
 *
 * xxhashAsHex('abc'); // => 0x44bc2cf5ad770999
 * ```
 */

export function xxhashAsHex(data, bitLength = 64) {
  return u8aToHex(xxhashAsU8a(data, bitLength));
}