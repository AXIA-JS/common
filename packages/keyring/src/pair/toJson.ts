// Copyright 2017-2021 @axia-js/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeypairType } from '@axia-js/util-crypto/types';
import type { KeyringPair$Json, KeyringPair$Meta } from '../types';

import { jsonEncryptFormat } from '@axia-js/util-crypto';

interface PairStateJson {
  address: string;
  meta: KeyringPair$Meta;
}

export function pairToJson (type: KeypairType, { address, meta }: PairStateJson, encoded: Uint8Array, isEncrypted: boolean): KeyringPair$Json {
  return {
    ...jsonEncryptFormat(encoded, ['pkcs8', type], isEncrypted),
    address,
    meta
  };
}
