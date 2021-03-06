"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pbkdf2Encode = pbkdf2Encode;

var _util = require("@axia-js/util");

var _wasmCrypto = require("@axia-js/wasm-crypto");

var _asU8a = require("../random/asU8a.cjs");

var _pbkdf = require("./pbkdf2.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
function pbkdf2Encode(passphrase, salt = (0, _asU8a.randomAsU8a)(), rounds = 2048, onlyJs = false) {
  const u8aPass = (0, _util.u8aToU8a)(passphrase);
  const u8aSalt = (0, _util.u8aToU8a)(salt);
  const password = (0, _wasmCrypto.isReady)() && !onlyJs ? (0, _wasmCrypto.pbkdf2)(u8aPass, u8aSalt, rounds) : (0, _pbkdf.pbkdf2Sync)(u8aPass, u8aSalt, rounds);
  return {
    password,
    rounds,
    salt
  };
}