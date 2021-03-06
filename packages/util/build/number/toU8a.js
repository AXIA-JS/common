// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { hexToU8a } from "../hex/toU8a.js";
import { isNull } from "../is/null.js";
import { isUndefined } from "../is/undefined.js";
import { numberToHex } from "./toHex.js";
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

export function numberToU8a(value, bitLength = -1) {
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    return new Uint8Array();
  }

  return hexToU8a(numberToHex(value, bitLength));
}