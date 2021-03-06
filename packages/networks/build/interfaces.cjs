"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectableNetworks = exports.availableNetworks = exports.allNetworks = void 0;

var _defaults = require("./defaults.cjs");

var _substrate = require("./substrate.cjs");

// Copyright 2017-2021 @axia-js/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// These are known prefixes that are not sorted
const UNSORTED = [0, 2, 42];

const allNetworks = _substrate.knownSubstrate.map(o => {
  const network = o.network || '';
  const n = o;
  n.slip44 = _defaults.knownLedger[network];
  n.hasLedgerSupport = !!n.slip44;
  n.genesisHash = _defaults.knownGenesis[network] || [];
  n.icon = _defaults.knownIcon[network] || 'substrate';
  n.isIgnored = !network || !!_defaults.knownTestnet[network] || network.startsWith('reserved');
  return n;
}); // The list of available/claimed prefixes
//   - no testnets
//   - we only include those where we have a standardAccount
//   - sort by name, however we keep 0, 2, 42 first in the list


exports.allNetworks = allNetworks;
const availableNetworks = allNetworks.filter(n => !n.isIgnored && !!n.network).sort((a, b) => UNSORTED.includes(a.prefix) === UNSORTED.includes(b.prefix) ? 0 : UNSORTED.includes(a.prefix) ? -1 : UNSORTED.includes(b.prefix) ? 1 : a.displayName.localeCompare(b.displayName)); // A filtered list of those chains we have details about (genesisHashes)

exports.availableNetworks = availableNetworks;
const selectableNetworks = availableNetworks.filter(n => n.genesisHash.length || n.prefix === 42);
exports.selectableNetworks = selectableNetworks;