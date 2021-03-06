"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBuffer = isBuffer;

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name isBuffer
 * @summary Tests for a `Buffer` object instance.
 * @description
 * Checks to see if the input object is an instance of `Buffer`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isBuffer } from '@axia-js/util';
 *
 * console.log('isBuffer', isBuffer(Buffer.from([]))); // => true
 * ```
 */
function isBuffer(value) {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
}