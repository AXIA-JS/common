// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { bufferToU8a } from '@axia-js/util';
import { bs58 } from "./bs58.js";
import { base58Validate } from "./validate.js";
/**
 * @name base58Decode
 * @summary Decodes a base58 value.
 * @description
 * From the provided input, decode the base58 and return the result as an `Uint8Array`.
 */

export function base58Decode(value, ipfsCompat) {
  base58Validate(value, ipfsCompat);
  return bufferToU8a(bs58.decode(value.substr(ipfsCompat ? 1 : 0)));
}