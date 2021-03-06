"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hmacSha256 = hmacSha256;

var _sha = require("./sha.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
function hmacSha256(key, data) {
  return (0, _sha.hmacSha)(key, data, false);
}