// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import scryptsy from 'scryptsy';
import { bufferToU8a, u8aToBuffer, u8aToU8a } from '@axia-js/util';
import { isReady, scrypt } from '@axia-js/wasm-crypto';
import { randomAsU8a } from "../random/asU8a.js";
import { DEFAULT_PARAMS } from "./defaults.js";
export function scryptEncode(passphrase, salt = randomAsU8a(), params = DEFAULT_PARAMS) {
  const password = isReady() ? scrypt(u8aToU8a(passphrase), salt, Math.log2(params.N), params.r, params.p) : bufferToU8a(scryptsy(u8aToBuffer(u8aToU8a(passphrase)), u8aToBuffer(salt), params.N, params.r, params.p, 64));
  return {
    params,
    password,
    salt
  };
}