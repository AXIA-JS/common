// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types';

import { assert } from '@axia-js/util';

import { secp256k1DeriveHard } from '../secp256k1/deriveHard';
import { secp256k1KeypairFromSeed } from '../secp256k1/keypair/fromSeed';
import { DeriveJunction } from './DeriveJunction';

export function keyHdkdEcdsa (keypair: Keypair, { chainCode, isHard }: DeriveJunction): Keypair {
  assert(isHard, 'A soft key was found in the path (and is unsupported)');

  return secp256k1KeypairFromSeed(
    secp256k1DeriveHard(keypair.secretKey.subarray(0, 32), chainCode)
  );
}
