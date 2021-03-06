// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name u8aEmpty
 * @summary Tests for a `Uint8Array` for emptyness
 * @description
 * Checks to see if the input `Uint8Array` has zero length or contains all 0 values.
 */
export function u8aEmpty(value) {
  return value.length === 0 || value.every(v => !v);
}