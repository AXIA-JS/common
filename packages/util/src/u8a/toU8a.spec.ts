// Copyright 2017-2021 @axia-js/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToU8a } from '.';

describe('u8aToU8a', (): void => {
  it('returns an empty Uint8Array when null provided', (): void => {
    expect(
      u8aToU8a(null)
    ).toHaveLength(0);
  });

  it('returns a Uint8Array (hex input)', (): void => {
    expect(
      u8aToU8a('0x80000a')
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });

  it('returns Uint8Array (string input)', (): void => {
    expect(
      u8aToU8a('abcde fghij')
    ).toEqual(new Uint8Array([97, 98, 99, 100, 101, 32, 102, 103, 104, 105, 106]));
  });

  it('returns a Uint8Array (buffer input)', (): void => {
    expect(
      u8aToU8a(Buffer.from('80000a', 'hex'))
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });

  it('creates from Array', (): void => {
    expect(
      u8aToU8a([128, 0, 10, 11, 12])
    ).toEqual(
      new Uint8Array([128, 0, 10, 11, 12])
    );
  });

  it('creates from a Buffer', (): void => {
    expect(
      u8aToU8a(Buffer.from([1, 2, 3, 128, 0, 10, 11, 12]))
    ).toEqual(
      new Uint8Array([1, 2, 3, 128, 0, 10, 11, 12])
    );
  });

  it('returns a Uint8Array as-is (u8a input)', (): void => {
    expect(
      u8aToU8a(new Uint8Array([128, 0, 10]))
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });

  it('fails to create from unknown typed values', (): void => {
    expect(
      // this is where completely invalid data is being passed
      () => u8aToU8a(123 as unknown as Uint8Array)
    ).toThrow('Unable to convert 123 (typeof number) to a Uint8Array');
  });
});
