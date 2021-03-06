"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deriveAddress = deriveAddress;

var _util = require("@axia-js/util");

var _index = require("../key/index.cjs");

var _index2 = require("../schnorrkel/index.cjs");

var _decode = require("./decode.cjs");

var _encode = require("./encode.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name deriveAddress
 * @summary Creates a sr25519 derived address from the supplied and path.
 * @description
 * Creates a sr25519 derived address based on the input address/publicKey and the uri supplied.
 */
function deriveAddress(who, suri, ss58Format) {
  const {
    path
  } = (0, _index.keyExtractPath)(suri);
  (0, _util.assert)(path.length && !path.some(path => path.isHard), 'Expected suri to contain a combination of non-hard paths');
  return (0, _encode.encodeAddress)(path.reduce((publicKey, path) => {
    return (0, _index2.schnorrkelDerivePublic)(publicKey, path.chainCode);
  }, (0, _decode.decodeAddress)(who)), ss58Format);
}