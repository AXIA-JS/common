// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Adapted from the bitcoinjs/bip39 source
// https://github.com/bitcoinjs/bip39/blob/1d063b6a6aee4145b34d701037cd3e67f5446ff9/ts_src/index.ts
// Copyright (c) 2014, Wei Lu <luwei.here@gmail.com> and Daniel Cousens <email@dcousens.com>
// ISC Licence
//
// Change made in this version -
//   - Adjust formatting (just eslint differences)
//   - Only English wordlist (this aligns with the wasm-crypto implementation)
//   - Use util-crypto randomAsU8a (instead of randombytes)
//   - Remove setting of wordlist passing of wordlist in functions
//   - Remove mnemonicToSeed (we only use the sync variant)
import hash from 'hash.js';
import { assert, stringToU8a, u8aToU8a } from '@axia-js/util';
import { pbkdf2Encode } from "../pbkdf2/index.js";
import { randomAsU8a } from "../random/asU8a.js";
import DEFAULT_WORDLIST from "./bip39-en.js";
const INVALID_MNEMONIC = 'Invalid mnemonic';
const INVALID_ENTROPY = 'Invalid entropy';
const INVALID_CHECKSUM = 'Invalid mnemonic checksum';

function normalize(str) {
  return (str || '').normalize('NFKD');
}

function binaryToByte(bin) {
  return parseInt(bin, 2);
}

function bytesToBinary(bytes) {
  return bytes.map(x => x.toString(2).padStart(8, '0')).join('');
}

function deriveChecksumBits(entropyBuffer) {
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;
  const result = hash.sha256().update(entropyBuffer).digest();
  return bytesToBinary(Array.from(result)).slice(0, CS);
}

export function mnemonicToSeedSync(mnemonic, password) {
  const mnemonicBuffer = stringToU8a(normalize(mnemonic));
  const saltBuffer = stringToU8a(`mnemonic${normalize(password)}`);
  return pbkdf2Encode(mnemonicBuffer, saltBuffer).password;
}
export function mnemonicToEntropy(mnemonic) {
  var _entropyBits$match;

  const words = normalize(mnemonic).split(' ');
  assert(words.length % 3 === 0, INVALID_MNEMONIC); // convert word indices to 11 bit binary strings

  const bits = words.map(word => {
    const index = DEFAULT_WORDLIST.indexOf(word);
    assert(index !== -1, INVALID_MNEMONIC);
    return index.toString(2).padStart(11, '0');
  }).join(''); // split the binary string into ENT/CS

  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropyBits = bits.slice(0, dividerIndex);
  const checksumBits = bits.slice(dividerIndex); // calculate the checksum and compare

  const entropyBytes = (_entropyBits$match = entropyBits.match(/(.{1,8})/g)) === null || _entropyBits$match === void 0 ? void 0 : _entropyBits$match.map(binaryToByte);
  assert(entropyBytes && entropyBytes.length % 4 === 0 && entropyBytes.length >= 16 && entropyBytes.length <= 32, INVALID_ENTROPY);
  const entropy = u8aToU8a(entropyBytes);
  const newChecksum = deriveChecksumBits(entropy);
  assert(newChecksum === checksumBits, INVALID_CHECKSUM);
  return entropy;
}
export function entropyToMnemonic(entropy) {
  // 128 <= ENT <= 256
  assert(entropy.length % 4 === 0 && entropy.length >= 16 && entropy.length <= 32, INVALID_ENTROPY);
  const entropyBits = bytesToBinary(Array.from(entropy));
  const checksumBits = deriveChecksumBits(entropy); // we just set it prior, so this is a safe check
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  return (entropyBits + checksumBits).match(/(.{1,11})/g).map(binary => DEFAULT_WORDLIST[binaryToByte(binary)]).join(' ');
}
export function generateMnemonic(strength) {
  strength = strength || 128;
  assert(strength % 32 === 0, INVALID_ENTROPY);
  return entropyToMnemonic(randomAsU8a(strength / 8));
}
export function validateMnemonic(mnemonic) {
  try {
    mnemonicToEntropy(mnemonic);
  } catch (e) {
    return false;
  }

  return true;
}