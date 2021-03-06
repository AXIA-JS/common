"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertSecretKeyToCurve25519 = convertSecretKeyToCurve25519;
exports.convertPublicKeyToCurve25519 = convertPublicKeyToCurve25519;

var _ed2curve = _interopRequireDefault(require("ed2curve"));

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
function convertSecretKeyToCurve25519(secretKey) {
  return _ed2curve.default.convertSecretKey(secretKey);
}

function convertPublicKeyToCurve25519(publicKey) {
  return _ed2curve.default.convertPublicKey(publicKey);
}