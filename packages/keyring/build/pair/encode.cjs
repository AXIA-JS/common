"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodePair = encodePair;

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _defaults = require("./defaults.cjs");

// Copyright 2017-2021 @axia-js/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
function encodePair({
  publicKey,
  secretKey
}, passphrase) {
  (0, _util.assert)(secretKey, 'Expected a valid secretKey to be passed to encode');
  const encoded = (0, _util.u8aConcat)(_defaults.PKCS8_HEADER, secretKey, _defaults.PKCS8_DIVIDER, publicKey);

  if (!passphrase) {
    return encoded;
  }

  const {
    params,
    password,
    salt
  } = (0, _utilCrypto.scryptEncode)(passphrase);
  const {
    encrypted,
    nonce
  } = (0, _utilCrypto.naclEncrypt)(encoded, password.subarray(0, 32));
  return (0, _util.u8aConcat)((0, _utilCrypto.scryptToU8a)(salt, params), nonce, encrypted);
}