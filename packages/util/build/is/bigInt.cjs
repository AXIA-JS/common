"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBigInt = isBigInt;

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name isBigInt
 * @summary Tests for a `BigInt` object instance.
 * @description
 * Checks to see if the input object is an instance of `BigInt`
 * @example
 * <BR>
 *
 * ```javascript
 * import { isBigInt } from '@axia-js/util';
 *
 * console.log('isBigInt', isBigInt(123_456n)); // => true
 * ```
 */
function isBigInt(value) {
  return typeof value === 'bigint';
}