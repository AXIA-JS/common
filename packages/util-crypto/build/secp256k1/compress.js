// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { assert } from '@axia-js/util';
import { secp256k1 } from "./secp256k1.js";
export function secp256k1Compress(publicKey) {
  assert([33, 65].includes(publicKey.length), 'Invalid publicKey provided');
  return new Uint8Array(secp256k1.keyFromPublic(publicKey).getPublic().encodeCompressed());
}