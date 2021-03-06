import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { BN } from "../bn/bn.js";
import { isBoolean } from "../is/boolean.js";
import { hexStripPrefix } from "./stripPrefix.js";

function reverse(value) {
  return (value.match(/.{1,2}/g) || []).reverse().join('');
}
/**
 * @name hexToBn
 * @summary Creates a BN.js object from a hex string.
 * @description
 * `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.
 * @param _value The value to convert
 * @param _options Options to pass while converting
 * @param _options.isLe Convert using Little Endian
 * @param _options.isNegative Convert using two's complement
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexToBn } from '@axia-js/util';
 *
 * hexToBn('0x123480001f'); // => BN(0x123480001f)
 * ```
 */


export function hexToBn(value, options = {
  isLe: false,
  isNegative: false
}) {
  if (!value) {
    return new BN(0);
  }

  const _options = _objectSpread({
    isLe: false,
    isNegative: false
  }, isBoolean(options) ? {
    isLe: options
  } : options);

  const _value = hexStripPrefix(value); // FIXME: Use BN's 3rd argument `isLe` once this issue is fixed
  // https://github.com/indutny/bn.js/issues/208


  const bn = new BN((_options.isLe ? reverse(_value) : _value) || '00', 16); // fromTwos takes as parameter the number of bits, which is the hex length
  // multiplied by 4.

  return _options.isNegative ? bn.fromTwos(_value.length * 4) : bn;
}