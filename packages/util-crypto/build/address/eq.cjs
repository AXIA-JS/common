"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressEq = addressEq;

var _util = require("@axia-js/util");

var _decode = require("./decode.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name addressEq
 * @summary Compares two addresses, either in ss58, Uint8Array or hex format.
 * @description
 * For the input values, return true is the underlying public keys do match.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aEq } from '@axia-js/util';
 *
 * u8aEq(new Uint8Array([0x68, 0x65]), new Uint8Array([0x68, 0x65])); // true
 * ```
 */
function addressEq(a, b) {
  return (0, _util.u8aEq)((0, _decode.decodeAddress)(a), (0, _decode.decodeAddress)(b));
}