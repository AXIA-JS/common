// Copyright 2017-2021 @axia-js/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0
import crypto from 'crypto';
export { packageInfo } from "./packageInfo.js";
export function getRandomValues(arr) {
  return crypto.randomBytes(arr.length).reduce((arr, value, index) => {
    arr[index] = value;
    return arr;
  }, arr);
}