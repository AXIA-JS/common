// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types';

import { u8aToHex } from '@axia-js/util';
import { waitReady } from '@axia-js/wasm-crypto';

import { schnorrkelAgreement, schnorrkelKeypairFromSeed } from '.';

describe('agreement', (): void => {
  let pairA: Keypair;
  let pairB: Keypair;

  beforeEach(async (): Promise<void> => {
    await waitReady();

    pairA = schnorrkelKeypairFromSeed('0x98b3d305d5a5eace562387e47e59badd4d77e3f72cabfb10a60f8a197059f0a8');
    pairB = schnorrkelKeypairFromSeed('0x9732eea001851ff862d949a1699c9971f3a26edbede2ad7922cbbe9a0701f366');
  });

  it('matches a known agreement (both ways)', (): void => {
    const TEST = '0xb03a0b198c34c16f35cae933d88b16341b4cef3e84e851f20e664c6a30527f4e';

    expect(
      u8aToHex(schnorrkelAgreement(pairA.secretKey, pairB.publicKey))
    ).toEqual(TEST);
    expect(
      u8aToHex(schnorrkelAgreement(pairB.secretKey, pairA.publicKey))
    ).toEqual(TEST);
  });
});
