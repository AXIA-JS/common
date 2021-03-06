"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeAddress = encodeAddress;

var _util = require("@axia-js/util");

var _encode = require("../base58/encode.cjs");

var _decode = require("./decode.cjs");

var _defaults = require("./defaults.cjs");

var _sshash = require("./sshash.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/axia.js#L34
function encodeAddress(key, ss58Format = _defaults.defaults.prefix) {
  // decode it, this means we can re-encode an address
  const u8a = (0, _decode.decodeAddress)(key);
  (0, _util.assert)(ss58Format >= 0 && ss58Format <= 16383 && ![46, 47].includes(ss58Format), 'Out of range ss58Format specified');
  (0, _util.assert)(_defaults.defaults.allowedDecodedLengths.includes(u8a.length), () => `Expected a valid key to convert, with length ${_defaults.defaults.allowedDecodedLengths.join(', ')}`);
  const input = (0, _util.u8aConcat)(ss58Format < 64 ? [ss58Format] : [(ss58Format & 0b0000000011111100) >> 2 | 0b01000000, ss58Format >> 8 | (ss58Format & 0b0000000000000011) << 6], u8a);
  return (0, _encode.base58Encode)((0, _util.u8aConcat)(input, (0, _sshash.sshash)(input).subarray(0, [32, 33].includes(u8a.length) ? 2 : 1)));
}