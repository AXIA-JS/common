// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { u8aConcat } from '@axia-js/util';
import { hmacSha256, hmacSha512 } from "../../hmac/index.js";
import { mnemonicToSeedSync } from "../../mnemonic/bip39.js";
const ED25519_CRYPTO = 'ed25519 seed'; // gets an xprv from a mnemonic

export function ledgerMaster(mnemonic, password) {
  const seed = mnemonicToSeedSync(mnemonic, password);
  const chainCode = hmacSha256(ED25519_CRYPTO, new Uint8Array([1, ...seed]));
  let priv;

  while (!priv || priv[31] & 0b00100000) {
    priv = hmacSha512(ED25519_CRYPTO, priv || seed);
  }

  priv[0] &= 0b11111000;
  priv[31] &= 0b01111111;
  priv[31] |= 0b01000000;
  return u8aConcat(priv, chainCode);
}