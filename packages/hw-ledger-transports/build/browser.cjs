"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "packageInfo", {
  enumerable: true,
  get: function () {
    return _packageInfo.packageInfo;
  }
});
exports.transports = void 0;

var _hwTransportWebhid = _interopRequireDefault(require("@ledgerhq/hw-transport-webhid"));

var _hwTransportWebusb = _interopRequireDefault(require("@ledgerhq/hw-transport-webusb"));

var _packageInfo = require("./packageInfo.cjs");

// Copyright 2017-2021 @axia-js/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transports = [// deprecated
// import LedgerU2F from '@ledgerhq/hw-transport-u2f';
// {
//   create: (): Promise<Transport> =>
//     LedgerU2F.create(),
//   type: 'u2f'
// },
{
  create: () => _hwTransportWebusb.default.create(),
  type: 'webusb'
}, {
  create: () => _hwTransportWebhid.default.create(),
  type: 'hid'
}];
exports.transports = transports;