// Copyright 2017-2021 @axia-js/x-fetch authors & contributors
// SPDX-License-Identifier: Apache-2.0

import nodeFetch from 'node-fetch';

import { xglobal } from '@axia-js/x-global';

export { packageInfo } from './packageInfo';

export const fetch = (
  typeof xglobal.fetch === 'undefined'
    ? nodeFetch as unknown as typeof global.fetch
    : xglobal.fetch
);
