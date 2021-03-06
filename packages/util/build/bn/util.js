// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { assert } from "../assert.js";
import { BN } from "./bn.js";
export function checkMaxMin(type, items) {
  assert(items.length >= 1, 'Must provide one or more BN arguments');
  return items.reduce((a, v) => BN[type](a, v), items[0]);
}