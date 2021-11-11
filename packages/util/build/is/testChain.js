// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
const re = /(Development|Local Testnet)$/;
export function isTestChain(chain) {
  if (!chain) {
    return false;
  }

  return !!re.test(chain.toString());
}