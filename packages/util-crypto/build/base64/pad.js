// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
export function base64Pad(value) {
  return value.padEnd(value.length + value.length % 4, '=');
}