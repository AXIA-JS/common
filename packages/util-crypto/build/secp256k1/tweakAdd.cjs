"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secp256k1PrivateKeyTweakAdd = secp256k1PrivateKeyTweakAdd;

var _util = require("@axia-js/util");

var _secp256k = require("./secp256k1.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ecparams = _secp256k.secp256k1.curve;

function secp256k1PrivateKeyTweakAdd(seckey, tweak) {
  (0, _util.assert)((0, _util.isU8a)(seckey) && seckey.length === 32, 'Expected seckey to be an Uint8Array with length 32');
  (0, _util.assert)((0, _util.isU8a)(tweak) && tweak.length === 32, 'Expected tweak to be an Uint8Array with length 32');
  const bn = new _util.BN(tweak);
  (0, _util.assert)(bn.cmp(ecparams.n) < 0, 'Tweak parameter is out of range');
  bn.iadd(new _util.BN(seckey));

  if (bn.cmp(ecparams.n) >= 0) {
    bn.isub(ecparams.n);
  }

  (0, _util.assert)(!bn.isZero(), 'Invalid resulting private key');
  return (0, _util.bnToU8a)(bn, {
    bitLength: 256,
    isLe: false
  });
}