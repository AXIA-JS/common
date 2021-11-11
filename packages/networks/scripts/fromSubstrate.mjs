// Copyright 2017-2021 @axia-js/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import fs from 'fs';
import fetch from 'node-fetch';

const SUBSTRATE_REGISTRY = 'https://raw.githubusercontent.com/paritytech/substrate/master/ss58-registry.json';

function outputField (v) {
  if (typeof v === 'string') {
    return `'${v}'`;
  } else if (Array.isArray(v)) {
    return `[${v.map((v) => outputField(v)).join(', ')}]`;
  }

  return v;
}

async function getSubstrateRegistry () {
  const original = await fetch(SUBSTRATE_REGISTRY);
  const json = await original.json();

  return json.registry
    .map((e) =>
      `  {\n${Object
        .entries(e)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `    ${k}: ${outputField(v)}`)
        .join(',\n')}\n  }`
    )
    .join(',\n');
}

getSubstrateRegistry()
  .then((entries) => {
    fs.writeFileSync('packages/networks/src/substrate.ts', `// Copyright 2017-2021 @axia-js/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Auto-generated by yarn networks:sync (via scripts/fromSubstrate.mjs)
//
// Do not edit, rather
//   - make a PR to the upstream registry as per ${SUBSTRATE_REGISTRY}
//   - yarn networks:sync
//

import type { KnownSubstrate } from './types';

export const knownSubstrate: KnownSubstrate[] = [\n${entries}\n];
`);

    console.log('Completed.');

    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error.message);

    process.exit(-1);
  });
