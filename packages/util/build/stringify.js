// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { isBigInt } from "./is/bigInt.js";
export function stringify(args, space) {
  return JSON.stringify(args, (_, value) => isBigInt(value) ? value.toString() : value, space);
}