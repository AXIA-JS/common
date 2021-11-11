"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWasm = isWasm;

var _eq = require("../u8a/eq.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
const WASM_MAGIC = new Uint8Array([0, 97, 115, 109]); // \0asm

/**
 * @name isWasm
 * @summary Tests if the input has a WASM header
 * @description
 * Checks to see if the input Uint8Array contains a valid WASM header
 */

function isWasm(value) {
  return !!value && (0, _eq.u8aEq)(value.subarray(0, 4), WASM_MAGIC);
}