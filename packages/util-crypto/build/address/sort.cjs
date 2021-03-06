"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortAddresses = sortAddresses;

var _util = require("@axia-js/util");

var _decode = require("./decode.cjs");

var _encode = require("./encode.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
function sortAddresses(addresses, ss58Format) {
  return (0, _util.u8aSorted)(addresses.map(who => (0, _decode.decodeAddress)(who))).map(u8a => (0, _encode.encodeAddress)(u8a, ss58Format));
}