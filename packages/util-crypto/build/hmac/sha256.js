// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { hmacSha } from "./sha.js";
export function hmacSha256(key, data) {
  return hmacSha(key, data, false);
}