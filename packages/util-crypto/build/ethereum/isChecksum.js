// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { u8aToHex } from '@axia-js/util';
import { keccakAsU8a } from "../keccak/index.js";

function isInvalidChar(char, byte) {
  return char !== (byte > 7 ? char.toUpperCase() : char.toLowerCase());
}

export function isEthereumChecksum(_address) {
  const address = _address.replace('0x', '');

  const hash = u8aToHex(keccakAsU8a(address.toLowerCase()), -1, false);

  for (let index = 0; index < 40; index++) {
    if (isInvalidChar(address[index], parseInt(hash[index], 16))) {
      return false;
    }
  }

  return true;
}