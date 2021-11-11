// Copyright 2017-2021 @axia-js/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type Transport from '@ledgerhq/hw-transport';
import type { SubstrateApp } from '@zondax/ledger-substrate';

import { newCentrifugeApp, newDockApp, newEdgewareApp, newEquilibriumApp, newAXIALunarApp, newNodleApp, newAXIAApp, newPolymeshApp, newStatemineApp } from '@zondax/ledger-substrate';

// These match up with the keys of the knownLedger object in the @axia-js/networks/defaults.ts
export const ledgerApps: Record<string, (transport: Transport) => SubstrateApp> = {
  centrifuge: newCentrifugeApp,
  'dock-mainnet': newDockApp,
  edgeware: newEdgewareApp,
  equilibrium: newEquilibriumApp,
  axialunar: newAXIALunarApp,
  'nodle-chain': newNodleApp,
  axia: newAXIAApp,
  polymesh: newPolymeshApp,
  statemine: newStatemineApp
};
