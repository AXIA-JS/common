"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatNumber = formatNumber;

var _toBn = require("../bn/toBn.cjs");

var _formatDecimal = require("./formatDecimal.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
function formatNumber(value) {
  return (0, _formatDecimal.formatDecimal)((0, _toBn.bnToBn)(value).toString());
}