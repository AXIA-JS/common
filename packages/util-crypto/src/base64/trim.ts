// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function base64Trim (value: string): string {
  while (value.length && value[value.length - 1] === '=') {
    value = value.slice(0, -1);
  }

  return value;
}
