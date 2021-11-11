"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.naclOpen = naclOpen;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name naclOpen
 * @summary Opens a message using the receiver's secretKey and nonce
 * @description
 * Returns a message sealed by the sender, using the receiver's `secret` and `nonce`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclOpen } from '@axia-js/util-crypto';
 *
 * naclOpen([...], [...], [...]); // => [...]
 * ```
 */
function naclOpen(sealed, nonce, senderBoxPublic, receiverBoxSecret) {
  return _tweetnacl.default.box.open(sealed, nonce, senderBoxPublic, receiverBoxSecret) || null;
}