// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { detectPackage } from './versionDetect';

describe('detectPackage', (): void => {
  const PKG = '@axia-js/util';
  const VER1 = '9.8.0-beta.45';
  const VER2 = '9.7.1';
  const VER3 = '9.6.1';
  const PATH = '/Users/jaco/Projects/axia-js/api/node_modules/@axia-js/util';

  const MISMATCH = `@axia-js/util has multiple versions, ensure that there is only one installed.
Either remove and explicitly install matching versions or dedupe using your package manager.
The following conflicting packages were found:
\t${VER1}\t${PATH}/01
\t${VER2}        \t${PATH}/02`;

  it('should not log the first time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, version: VER1 }, `${PATH}/01`);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log the second time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, version: VER2 }, `${PATH}/02`);
    expect(spy).toHaveBeenCalledWith(MISMATCH);
    spy.mockRestore();
  });

  it('should allow for function use', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, version: VER3 }, () => `${PATH}/03`);
    expect(spy).toHaveBeenCalledWith(`${MISMATCH}
\t${VER3}        \t${PATH}/03`);
    spy.mockRestore();
  });
});

describe('detectPackageDeps', (): void => {
  const DEP0 = { name: '@axia-js/keyring', version: '1.1.1' };
  const DEP1 = { name: '@axia-js/util', version: '1.1.2' };
  const DEP2 = { name: '@axia-js/util-crypto', version: '1.1.3' };
  const DEP3 = { name: '@axia-js/networks', version: '1.1.1' };

  it('should not log when no mismatches are found', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: '@axia-js/one', version: '1.1.1' }, false, [DEP0, DEP3]);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log when mismatches are found', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: '@axia-js/two', version: '1.1.1' }, false, [DEP0, DEP1, DEP2, DEP3]);
    expect(spy).toHaveBeenCalledWith(`@axia-js/two requires direct dependencies exactly matching version 1.1.1.
Either remove and explicitly install matching versions or dedupe using your package manager.
The following conflicting packages were found:
\t1.1.2\t@axia-js/util
\t1.1.3\t@axia-js/util-crypto`);
    spy.mockRestore();
  });
});
