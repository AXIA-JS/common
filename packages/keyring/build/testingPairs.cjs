"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTestPairs = createTestPairs;

var _nobody = require("./pair/nobody.cjs");

var _testing = require("./testing.cjs");

// Copyright 2017-2021 @axia-js/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createTestPairs(options, isDerived = true) {
  const keyring = (0, _testing.createTestKeyring)(options, isDerived);
  const pairs = keyring.getPairs();
  const map = {
    nobody: (0, _nobody.nobody)()
  };
  return pairs.reduce((result, pair) => {
    const {
      name
    } = pair.meta;
    result[name] = pair;
    return result;
  }, map);
}