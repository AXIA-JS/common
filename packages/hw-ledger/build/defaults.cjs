"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ledgerApps = void 0;

var _ledgerSubstrate = require("@zondax/ledger-substrate");

// Copyright 2017-2021 @axia-js/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0
// These match up with the keys of the knownLedger object in the @axia-js/networks/defaults.ts
const ledgerApps = {
  centrifuge: _ledgerSubstrate.newCentrifugeApp,
  'dock-mainnet': _ledgerSubstrate.newDockApp,
  edgeware: _ledgerSubstrate.newEdgewareApp,
  equilibrium: _ledgerSubstrate.newEquilibriumApp,
  axialunar: _ledgerSubstrate.newAXIALunarApp,
  'nodle-chain': _ledgerSubstrate.newNodleApp,
  axia: _ledgerSubstrate.newAXIAApp,
  polymesh: _ledgerSubstrate.newPolymeshApp,
  statemine: _ledgerSubstrate.newStatemineApp
};
exports.ledgerApps = ledgerApps;