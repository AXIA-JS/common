// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name stringUpperFirst
 * @summary Lowercase the first letter of a string
 * @description
 * Lowercase the first letter of a string
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringUpperFirst } from '@axia-js/util';
 *
 * stringUpperFirst('abc'); // => 'Abc'
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function stringUpperFirst (value?: String | string | null): string {
  return value
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : '';
}
