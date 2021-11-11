// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@axia-js/util/types';

import { u8aToHex } from '@axia-js/util';

import { keccakAsU8a } from './asU8a';

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
export function keccakAsHex (value: HexString | Buffer | Uint8Array | string, bitLength?: 256 | 512): HexString {
  return u8aToHex(
    keccakAsU8a(value, bitLength)
  );
}
