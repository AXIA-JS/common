// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { hexFixLength } from '../hex/fixLength';
import { isNull } from '../is/null';
import { isUndefined } from '../is/undefined';

/**
 * @name numberToHex
 * @summary Creates a hex value from a number.
 * @description
 * `null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`. With `bitLength` set, it converts the number to the equivalent size.
 * @example
 * <BR>
 *
 * ```javascript
 * import { numberToHex } from '@axia-js/util';
 *
 * numberToHex(0x1234); // => '0x1234'
 * numberToHex(0x1234, 32); // => 0x00001234
 * ```
 */
export function numberToHex (value?: number | null, bitLength = -1): HexString {
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    return '0x';
  }

  return hexFixLength(value.toString(16), bitLength, true);
}
