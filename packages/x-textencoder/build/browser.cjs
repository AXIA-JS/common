"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "packageInfo", {
  enumerable: true,
  get: function () {
    return _packageInfo.packageInfo;
  }
});
exports.TextEncoder = void 0;

var _xGlobal = require("@axia-js/x-global");

var _fallback = require("./fallback.cjs");

var _packageInfo = require("./packageInfo.cjs");

// Copyright 2017-2021 @axia-js/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0
const TextEncoder = typeof _xGlobal.xglobal.TextEncoder === 'undefined' ? _fallback.TextEncoder : _xGlobal.xglobal.TextEncoder;
exports.TextEncoder = TextEncoder;