import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";
// Copyright 2017-2021 @axia-js/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0
import util from 'util';
import { xglobal } from '@axia-js/x-global';
export { packageInfo } from "./packageInfo.js";

var _encoder = /*#__PURE__*/_classPrivateFieldLooseKey("encoder");

class NodeFallback {
  constructor() {
    Object.defineProperty(this, _encoder, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _encoder)[_encoder] = new util.TextEncoder();
  } // For a Jest 26.0.1 environment, Buffer !== Uint8Array


  encode(value) {
    const encoded = _classPrivateFieldLooseBase(this, _encoder)[_encoder].encode(value);

    return Uint8Array.from(encoded);
  }

}

export const TextEncoder = typeof xglobal.TextEncoder === 'undefined' ? NodeFallback : xglobal.TextEncoder;