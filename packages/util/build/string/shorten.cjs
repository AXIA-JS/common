"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringShorten = stringShorten;

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name stringShorten
 * @summary Returns a string with maximum length
 * @description
 * Checks the string against the `prefixLength`, if longer than double this, shortens it by placing `..` in the middle of it
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringShorten } from '@axia-js/util';
 *
 * stringShorten('1234567890', 2); // => 12..90
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function stringShorten(value, prefixLength = 6) {
  if (value.length <= 2 + 2 * prefixLength) {
    return value.toString();
  }

  return `${value.substr(0, prefixLength)}…${value.slice(-prefixLength)}`;
}