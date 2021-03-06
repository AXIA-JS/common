"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonDecrypt = jsonDecrypt;

var _util = require("@axia-js/util");

var _index = require("../base64/index.cjs");

var _decryptData = require("./decryptData.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
function jsonDecrypt({
  encoded,
  encoding
}, passphrase) {
  (0, _util.assert)(encoded, 'No encrypted data available to decode');
  return (0, _decryptData.jsonDecryptData)((0, _util.isHex)(encoded) ? (0, _util.hexToU8a)(encoded) : (0, _index.base64Decode)(encoded), passphrase, Array.isArray(encoding.type) ? encoding.type : [encoding.type]);
}