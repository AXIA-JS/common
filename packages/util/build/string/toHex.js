// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { u8aToHex } from "../u8a/toHex.js";
import { stringToU8a } from "./toU8a.js";
/**
 * @name stringToHex
 * @summary Creates a hex string from a utf-8 string
 * @description
 * String input values return the actual encoded hex value.
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringToHex } from '@axia-js/util';
 *
 * stringToU8a('hello'); // 0x68656c6c6f
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types

export function stringToHex(value) {
  return u8aToHex(stringToU8a(value));
}