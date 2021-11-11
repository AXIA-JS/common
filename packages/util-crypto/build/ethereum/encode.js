// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { assert, u8aToHex, u8aToU8a } from '@axia-js/util';
import { keccakAsU8a } from "../keccak/index.js";
import { secp256k1Expand } from "../secp256k1/index.js";

function getH160(u8a) {
  if ([33, 65].includes(u8a.length)) {
    u8a = keccakAsU8a(secp256k1Expand(u8a));
  }

  return u8a.slice(-20);
}

export function ethereumEncode(addressOrPublic) {
  if (!addressOrPublic) {
    return '0x';
  }

  const u8aAddress = u8aToU8a(addressOrPublic);
  assert([20, 32, 33, 65].includes(u8aAddress.length), 'Invalid address or publicKey passed');
  const address = u8aToHex(getH160(u8aAddress), -1, false);
  const hash = u8aToHex(keccakAsU8a(address), -1, false);
  let result = '';

  for (let index = 0; index < 40; index++) {
    result = `${result}${parseInt(hash[index], 16) > 7 ? address[index].toUpperCase() : address[index]}`;
  }

  return `0x${result}`;
}