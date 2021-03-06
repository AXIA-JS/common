"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.u8aSorted = u8aSorted;

var _cmp = require("./cmp.cjs");

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name u8aSorted
 * @summary Sorts an array of Uint8Arrays
 * @description
 * For input `UInt8Array[]` return the sorted result
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aSorted} from '@axia-js/util';
 *
 * u8aSorted([new Uint8Array([0x69]), new Uint8Array([0x68])]); // [0x68, 0x69]
 * ```
 */
function u8aSorted(u8as) {
  return u8as.sort(_cmp.u8aCmp);
}