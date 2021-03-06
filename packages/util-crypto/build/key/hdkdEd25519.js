// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { assert } from '@axia-js/util';
import { naclDeriveHard } from "../nacl/deriveHard.js";
import { naclKeypairFromSeed } from "../nacl/keypair/fromSeed.js";
export function keyHdkdEd25519(keypair, {
  chainCode,
  isHard
}) {
  assert(isHard, 'A soft key was found in the path (and is unsupported)');
  return naclKeypairFromSeed(naclDeriveHard(keypair.secretKey.subarray(0, 32), chainCode));
}