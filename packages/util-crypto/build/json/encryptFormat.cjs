"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonEncryptFormat = jsonEncryptFormat;

var _index = require("../base64/index.cjs");

var _constants = require("./constants.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
function jsonEncryptFormat(encoded, contentType, isEncrypted) {
  return {
    encoded: (0, _index.base64Encode)(encoded),
    encoding: {
      content: contentType,
      type: isEncrypted ? _constants.ENCODING : _constants.ENCODING_NONE,
      version: _constants.ENCODING_VERSION
    }
  };
}