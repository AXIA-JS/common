// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { keyHdkdEcdsa } from "./hdkdEcdsa.js";
import { keyHdkdEd25519 } from "./hdkdEd25519.js";
import { keyHdkdSr25519 } from "./hdkdSr25519.js";
const generators = {
  ecdsa: keyHdkdEcdsa,
  ed25519: keyHdkdEd25519,
  // FIXME This is Substrate-compatible, not Ethereum-compatible
  ethereum: keyHdkdEcdsa,
  sr25519: keyHdkdSr25519
};
export function keyFromPath(pair, path, type) {
  const keyHdkd = generators[type];
  return path.reduce((pair, junction) => {
    return keyHdkd(pair, junction);
  }, pair);
}