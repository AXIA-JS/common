"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.naclSeal = naclSeal;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _asU8a = require("../random/asU8a.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name naclSeal
 * @summary Seals a message using the sender's encrypting secretKey, receiver's public key, and nonce
 * @description
 * Returns an encrypted message which can be open only by receiver's secretKey. If the `nonce` was not supplied, a random value is generated.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclSeal } from '@axia-js/util-crypto';
 *
 * naclSeal([...], [...], [...], [...]); // => [...]
 * ```
 */
function naclSeal(message, senderBoxSecret, receiverBoxPublic, nonce = (0, _asU8a.randomAsU8a)(24)) {
  return {
    nonce,
    sealed: _tweetnacl.default.box(message, nonce, receiverBoxPublic, senderBoxSecret)
  };
}