// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { assert } from '@axia-js/util';
import { keyExtractPath } from "../key/index.js";
import { schnorrkelDerivePublic } from "../schnorrkel/index.js";
import { decodeAddress } from "./decode.js";
import { encodeAddress } from "./encode.js";
/**
 * @name deriveAddress
 * @summary Creates a sr25519 derived address from the supplied and path.
 * @description
 * Creates a sr25519 derived address based on the input address/publicKey and the uri supplied.
 */

export function deriveAddress(who, suri, ss58Format) {
  const {
    path
  } = keyExtractPath(suri);
  assert(path.length && !path.some(path => path.isHard), 'Expected suri to contain a combination of non-hard paths');
  return encodeAddress(path.reduce((publicKey, path) => {
    return schnorrkelDerivePublic(publicKey, path.chainCode);
  }, decodeAddress(who)), ss58Format);
}