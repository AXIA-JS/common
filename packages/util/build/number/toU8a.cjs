"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberToU8a = numberToU8a;

var _toU8a = require("../hex/toU8a.cjs");

var _null = require("../is/null.cjs");

var _undefined = require("../is/undefined.cjs");

var _toHex = require("./toHex.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name numberToU8a
 * @summary Creates a Uint8Array object from a number.
 * @description
 * `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `number` input values return the actual bytes value converted to a `Uint8Array`. With `bitLength`, it converts the value to the equivalent size.
 * @example
 * <BR>
 *
 * ```javascript
 * import { numberToU8a } from '@axia-js/util';
 *
 * numberToU8a(0x1234); // => [0x12, 0x34]
 * ```
 */
function numberToU8a(value, bitLength = -1) {
  if ((0, _undefined.isUndefined)(value) || (0, _null.isNull)(value) || isNaN(value)) {
    return new Uint8Array();
  }

  return (0, _toU8a.hexToU8a)((0, _toHex.numberToHex)(value, bitLength));
}