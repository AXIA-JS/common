"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hdLedger = hdLedger;

var _util = require("@axia-js/util");

var _index = require("../../mnemonic/index.cjs");

var _index2 = require("../../nacl/index.cjs");

var _validatePath = require("../validatePath.cjs");

var _derivePrivate = require("./derivePrivate.cjs");

var _master = require("./master.cjs");

// Copyright 2017-2021 @axia-js/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
function hdLedger(_mnemonic, path) {
  const parts = _mnemonic.split(' ').map(s => s.trim()).filter(s => s);

  (0, _util.assert)([12, 24, 25].includes(parts.length), 'Expected a mnemonic with 24 words (or 25 including a password)');
  const [mnemonic, password] = parts.length === 25 ? [parts.slice(0, 24).join(' '), parts[24]] : [parts.join(' '), ''];
  (0, _util.assert)((0, _index.mnemonicValidate)(mnemonic), 'Invalid mnemonic passed to ledger derivation');
  (0, _util.assert)((0, _validatePath.hdValidatePath)(path), 'Invalid derivation path');
  return (0, _index2.naclKeypairFromSeed)(path.split('/').slice(1).map(n => parseInt(n.replace(/'$/, ''), 10)).map(n => n < _validatePath.HARDENED ? n + _validatePath.HARDENED : n).reduce((x, n) => (0, _derivePrivate.ledgerDerivePrivate)(x, n), (0, _master.ledgerMaster)(mnemonic, password)).slice(0, 32));
}