"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secp256k1DeriveHard = secp256k1DeriveHard;

var _util = require("@axia-js/util");

var _asU8a = require("../blake2/asU8a.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
const HDKD = (0, _util.compactAddLength)((0, _util.stringToU8a)('Secp256k1HDKD'));

function secp256k1DeriveHard(seed, chainCode) {
  // NOTE This is specific to the Substrate HDD derivation, so always use the blake2 hasher
  return (0, _asU8a.blake2AsU8a)((0, _util.u8aConcat)(HDKD, seed, chainCode), 256);
}