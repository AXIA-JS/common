const axiaKeyring = (function (exports, util, utilCrypto) {
  'use strict';

  const global = window;

  function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
  }

  var id = 0;
  function _classPrivateFieldKey(name) {
    return "__private_" + id++ + "_" + name;
  }

  // Copyright 2017-2021 @axia-js/keyring authors & contributors
  // SPDX-License-Identifier: Apache-2.0
  // default substrate dev phrase
  const DEV_PHRASE = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk'; // seed from the above phrase

  const DEV_SEED = '0xfac7959dbfe72f052e5a0c3c8d6530f202b02fd8f9f5ca3580ec8deb7797479e';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  // Copyright 2017-2021 @axia-js/keyring authors & contributors
  // SPDX-License-Identifier: Apache-2.0
  const PKCS8_DIVIDER = new Uint8Array([161, 35, 3, 33, 0]);
  const PKCS8_HEADER = new Uint8Array([48, 83, 2, 1, 1, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32]);
  const PUB_LENGTH = 32;
  const SEC_LENGTH = 64;
  const SEED_LENGTH = 32;

  // Copyright 2017-2021 @axia-js/keyring authors & contributors
  const SEED_OFFSET = PKCS8_HEADER.length;
  function decodePair(passphrase, encrypted, _encType) {
    const encType = Array.isArray(_encType) || util.isUndefined(_encType) ? _encType : [_encType];
    const decrypted = utilCrypto.jsonDecryptData(encrypted, passphrase, encType);
    const header = decrypted.subarray(0, PKCS8_HEADER.length);
    util.assert(util.u8aEq(header, PKCS8_HEADER), 'Invalid Pkcs8 header found in body');
    let secretKey = decrypted.subarray(SEED_OFFSET, SEED_OFFSET + SEC_LENGTH);
    let divOffset = SEED_OFFSET + SEC_LENGTH;
    let divider = decrypted.subarray(divOffset, divOffset + PKCS8_DIVIDER.length); // old-style, we have the seed here

    if (!util.u8aEq(divider, PKCS8_DIVIDER)) {
      divOffset = SEED_OFFSET + SEED_LENGTH;
      secretKey = decrypted.subarray(SEED_OFFSET, divOffset);
      divider = decrypted.subarray(divOffset, divOffset + PKCS8_DIVIDER.length);
      util.assert(util.u8aEq(divider, PKCS8_DIVIDER), 'Invalid Pkcs8 divider found in body');
    }

    const pubOffset = divOffset + PKCS8_DIVIDER.length;
    const publicKey = decrypted.subarray(pubOffset, pubOffset + PUB_LENGTH);
    return {
      publicKey,
      secretKey
    };
  }

  // Copyright 2017-2021 @axia-js/keyring authors & contributors
  function encodePair({
    publicKey,
    secretKey
  }, passphrase) {
    util.assert(secretKey, 'Expected a valid secretKey to be passed to encode');
    const encoded = util.u8aConcat(PKCS8_HEADER, secretKey, PKCS8_DIVIDER, publicKey);

    if (!passphrase) {
      return encoded;
    }

    const {
      params,
      password,
      salt
    } = utilCrypto.scryptEncode(passphrase);
    const {
      encrypted,
      nonce
    } = utilCrypto.naclEncrypt(encoded, password.subarray(0, 32));
    return util.u8aConcat(utilCrypto.scryptToU8a(salt, params), nonce, encrypted);
  }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function pairToJson(type, {
    address,
    meta
  }, encoded, isEncrypted) {
    return _objectSpread$1(_objectSpread$1({}, utilCrypto.jsonEncryptFormat(encoded, ['pkcs8', type], isEncrypted)), {}, {
      address,
      meta
    });
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  const SIG_TYPE_NONE = new Uint8Array();
  const TYPE_FROM_SEED = {
    ecdsa: utilCrypto.secp256k1KeypairFromSeed,
    ed25519: utilCrypto.naclKeypairFromSeed,
    ethereum: utilCrypto.secp256k1KeypairFromSeed,
    sr25519: utilCrypto.schnorrkelKeypairFromSeed
  };
  const TYPE_PREFIX = {
    ecdsa: new Uint8Array([2]),
    ed25519: new Uint8Array([0]),
    ethereum: new Uint8Array([2]),
    sr25519: new Uint8Array([1])
  };
  const TYPE_SIGNATURE = {
    ecdsa: (m, p) => utilCrypto.secp256k1Sign(m, p, 'blake2'),
    ed25519: utilCrypto.naclSign,
    ethereum: (m, p) => utilCrypto.secp256k1Sign(m, p, 'keccak'),
    sr25519: utilCrypto.schnorrkelSign
  };
  const TYPE_ADDRESS = {
    ecdsa: p => p.length > 32 ? utilCrypto.blake2AsU8a(p) : p,
    ed25519: p => p,
    ethereum: p => p.length === 20 ? p : utilCrypto.keccakAsU8a(utilCrypto.secp256k1Expand(p)),
    sr25519: p => p
  }; // Not 100% correct, since it can be a Uint8Array, but an invalid one - just say "undefined" is anything non-valid

  function isLocked(secretKey) {
    return !secretKey || secretKey.length === 0 || secretKey.every(b => b === 0);
  }

  function vrfHash(proof, context, extra) {
    return utilCrypto.blake2AsU8a(util.u8aConcat(context || '', extra || '', proof));
  }
  /**
   * @name createPair
   * @summary Creates a keyring pair object
   * @description Creates a keyring pair object with provided account public key, metadata, and encoded arguments.
   * The keyring pair stores the account state including the encoded address and associated metadata.
   *
   * It has properties whose values are functions that may be called to perform account actions:
   *
   * - `address` function retrieves the address associated with the account.
   * - `decodedPkcs8` function is called with the account passphrase and account encoded public key.
   * It decodes the encoded public key using the passphrase provided to obtain the decoded account public key
   * and associated secret key that are then available in memory, and changes the account address stored in the
   * state of the pair to correspond to the address of the decoded public key.
   * - `encodePkcs8` function when provided with the correct passphrase associated with the account pair
   * and when the secret key is in memory (when the account pair is not locked) it returns an encoded
   * public key of the account.
   * - `meta` is the metadata that is stored in the state of the pair, either when it was originally
   * created or set via `setMeta`.
   * - `publicKey` returns the public key stored in memory for the pair.
   * - `sign` may be used to return a signature by signing a provided message with the secret
   * key (if it is in memory) using Nacl.
   * - `toJson` calls another `toJson` function and provides the state of the pair,
   * it generates arguments to be passed to the other `toJson` function including an encoded public key of the account
   * that it generates using the secret key from memory (if it has been made available in memory)
   * and the optionally provided passphrase argument. It passes a third boolean argument to `toJson`
   * indicating whether the public key has been encoded or not (if a passphrase argument was provided then it is encoded).
   * The `toJson` function that it calls returns a JSON object with properties including the `address`
   * and `meta` that are assigned with the values stored in the corresponding state variables of the account pair,
   * an `encoded` property that is assigned with the encoded public key in hex format, and an `encoding`
   * property that indicates whether the public key value of the `encoded` property is encoded or not.
   */


  function createPair({
    toSS58,
    type
  }, {
    publicKey,
    secretKey
  }, meta = {}, encoded = null, encTypes) {
    const decodePkcs8 = (passphrase, userEncoded) => {
      const decoded = decodePair(passphrase, userEncoded || encoded, encTypes);

      if (decoded.secretKey.length === 64) {
        publicKey = decoded.publicKey;
        secretKey = decoded.secretKey;
      } else {
        const pair = TYPE_FROM_SEED[type](decoded.secretKey);
        publicKey = pair.publicKey;
        secretKey = pair.secretKey;
      }
    };

    const recode = passphrase => {
      isLocked(secretKey) && encoded && decodePkcs8(passphrase, encoded);
      encoded = encodePair({
        publicKey,
        secretKey
      }, passphrase); // re-encode, latest version

      encTypes = undefined; // swap to defaults, latest version follows

      return encoded;
    };

    const encodeAddress = () => {
      const raw = TYPE_ADDRESS[type](publicKey);
      return type === 'ethereum' ? utilCrypto.ethereumEncode(raw) : toSS58(raw);
    };

    return {
      get address() {
        return encodeAddress();
      },

      get addressRaw() {
        const raw = TYPE_ADDRESS[type](publicKey);
        return type === 'ethereum' ? raw.slice(-20) : raw;
      },

      get isLocked() {
        return isLocked(secretKey);
      },

      get meta() {
        return meta;
      },

      get publicKey() {
        return publicKey;
      },

      get type() {
        return type;
      },

      // eslint-disable-next-line sort-keys
      decodePkcs8,
      decryptMessage: (encryptedMessageWithNonce, senderPublicKey) => {
        util.assert(!isLocked(secretKey), 'Cannot encrypt with a locked key pair');
        util.assert(!['ecdsa', 'ethereum'].includes(type), 'Secp256k1 not supported yet');
        const messageU8a = util.u8aToU8a(encryptedMessageWithNonce);
        return utilCrypto.naclOpen(messageU8a.slice(24, messageU8a.length), messageU8a.slice(0, 24), utilCrypto.convertPublicKeyToCurve25519(util.u8aToU8a(senderPublicKey)), utilCrypto.convertSecretKeyToCurve25519(secretKey));
      },
      derive: (suri, meta) => {
        util.assert(type !== 'ethereum', 'Unable to derive on this keypair');
        util.assert(!isLocked(secretKey), 'Cannot derive on a locked keypair');
        const {
          path
        } = utilCrypto.keyExtractPath(suri);
        const derived = utilCrypto.keyFromPath({
          publicKey,
          secretKey
        }, path, type);
        return createPair({
          toSS58,
          type
        }, derived, meta, null);
      },
      encodePkcs8: passphrase => {
        return recode(passphrase);
      },
      encryptMessage: (message, recipientPublicKey, nonceIn) => {
        util.assert(!isLocked(secretKey), 'Cannot encrypt with a locked key pair');
        util.assert(!['ecdsa', 'ethereum'].includes(type), 'Secp256k1 not supported yet');
        const {
          nonce,
          sealed
        } = utilCrypto.naclSeal(util.u8aToU8a(message), utilCrypto.convertSecretKeyToCurve25519(secretKey), utilCrypto.convertPublicKeyToCurve25519(util.u8aToU8a(recipientPublicKey)), nonceIn);
        return util.u8aConcat(nonce, sealed);
      },
      lock: () => {
        secretKey = new Uint8Array();
      },
      setMeta: additional => {
        meta = _objectSpread(_objectSpread({}, meta), additional);
      },
      sign: (message, options = {}) => {
        util.assert(!isLocked(secretKey), 'Cannot sign with a locked key pair');
        return util.u8aConcat(options.withType ? TYPE_PREFIX[type] : SIG_TYPE_NONE, TYPE_SIGNATURE[type](util.u8aToU8a(message), {
          publicKey,
          secretKey
        }));
      },
      toJson: passphrase => {
        // NOTE: For ecdsa and ethereum, the publicKey cannot be extracted from the address. For these
        // pass the hex-encoded publicKey through to the address portion of the JSON (before decoding)
        // unless the publicKey is already an address
        const address = ['ecdsa', 'ethereum'].includes(type) ? publicKey.length === 20 ? util.u8aToHex(publicKey) : util.u8aToHex(utilCrypto.secp256k1Compress(publicKey)) : encodeAddress();
        return pairToJson(type, {
          address,
          meta
        }, recode(passphrase), !!passphrase);
      },
      unlock: passphrase => {
        return decodePkcs8(passphrase);
      },
      verify: (message, signature, signerPublic) => {
        return utilCrypto.signatureVerify(message, signature, TYPE_ADDRESS[type](util.u8aToU8a(signerPublic))).isValid;
      },
      vrfSign: (message, context, extra) => {
        util.assert(!isLocked(secretKey), 'Cannot sign with a locked key pair');

        if (type === 'sr25519') {
          return utilCrypto.schnorrkelVrfSign(message, {
            secretKey
          }, context, extra);
        }

        const proof = TYPE_SIGNATURE[type](util.u8aToU8a(message), {
          publicKey,
          secretKey
        });
        return util.u8aConcat(vrfHash(proof, context, extra), proof);
      },
      vrfVerify: (message, vrfResult, signerPublic, context, extra) => {
        if (type === 'sr25519') {
          return utilCrypto.schnorrkelVrfVerify(message, vrfResult, publicKey, context, extra);
        }

        const result = utilCrypto.signatureVerify(message, util.u8aConcat(TYPE_PREFIX[type], vrfResult.subarray(32)), TYPE_ADDRESS[type](util.u8aToU8a(signerPublic)));
        return result.isValid && util.u8aEq(vrfResult.subarray(0, 32), vrfHash(vrfResult.subarray(32), context, extra));
      }
    };
  }

  var _map = /*#__PURE__*/_classPrivateFieldKey("map");

  class Pairs {
    constructor() {
      Object.defineProperty(this, _map, {
        writable: true,
        value: {}
      });
    }

    add(pair) {
      _classPrivateFieldBase(this, _map)[_map][utilCrypto.decodeAddress(pair.address).toString()] = pair;
      return pair;
    }

    all() {
      return Object.values(_classPrivateFieldBase(this, _map)[_map]);
    }

    get(address) {
      const pair = _classPrivateFieldBase(this, _map)[_map][utilCrypto.decodeAddress(address).toString()];

      util.assert(pair, () => `Unable to retrieve keypair '${util.isU8a(address) || util.isHex(address) ? util.u8aToHex(util.u8aToU8a(address)) : address}'`);
      return pair;
    }

    remove(address) {
      delete _classPrivateFieldBase(this, _map)[_map][utilCrypto.decodeAddress(address).toString()];
    }

  }

  const keypairFromSeed = {
    ecdsa: seed => utilCrypto.secp256k1KeypairFromSeed(seed),
    ed25519: seed => utilCrypto.naclKeypairFromSeed(seed),
    ethereum: seed => utilCrypto.secp256k1KeypairFromSeed(seed),
    sr25519: seed => utilCrypto.schnorrkelKeypairFromSeed(seed)
  };
  /**
   * # @axia-js/keyring
   *
   * ## Overview
   *
   * @name Keyring
   * @summary Keyring management of user accounts
   * @description Allows generation of keyring pairs from a variety of input combinations, such as
   * json object containing account address or public key, account metadata, and account encoded using
   * `addFromJson`, or by providing those values as arguments separately to `addFromAddress`,
   * or by providing the mnemonic (seed phrase) and account metadata as arguments to `addFromMnemonic`.
   * Stores the keyring pairs in a keyring pair dictionary. Removal of the keyring pairs from the keyring pair
   * dictionary is achieved using `removePair`. Retrieval of all the stored pairs via `getPairs` or perform
   * lookup of a pair for a given account address or public key using `getPair`. JSON metadata associated with
   * an account may be obtained using `toJson` accompanied by the account passphrase.
   */

  var _pairs = /*#__PURE__*/_classPrivateFieldKey("pairs");

  var _type = /*#__PURE__*/_classPrivateFieldKey("type");

  var _ss = /*#__PURE__*/_classPrivateFieldKey("ss58");

  class Keyring {
    constructor(options = {}) {
      Object.defineProperty(this, _pairs, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _type, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _ss, {
        writable: true,
        value: void 0
      });
      this.decodeAddress = utilCrypto.decodeAddress;

      this.encodeAddress = (address, ss58Format) => {
        return this.type === 'ethereum' ? utilCrypto.ethereumEncode(address) : utilCrypto.encodeAddress(address, util.isUndefined(ss58Format) ? _classPrivateFieldBase(this, _ss)[_ss] : ss58Format);
      };

      options.type = options.type || 'ed25519';
      util.assert(['ecdsa', 'ethereum', 'ed25519', 'sr25519'].includes(options.type || 'undefined'), () => `Expected a keyring type of either 'ed25519', 'sr25519', 'ethereum' or 'ecdsa', found '${options.type || 'unknown'}`);
      _classPrivateFieldBase(this, _pairs)[_pairs] = new Pairs();
      _classPrivateFieldBase(this, _ss)[_ss] = options.ss58Format;
      _classPrivateFieldBase(this, _type)[_type] = options.type;
    }
    /**
     * @description retrieve the pairs (alias for getPairs)
     */


    get pairs() {
      return this.getPairs();
    }
    /**
     * @description retrieve the publicKeys (alias for getPublicKeys)
     */


    get publicKeys() {
      return this.getPublicKeys();
    }
    /**
     * @description Returns the type of the keyring, ed25519, sr25519 or ecdsa
     */


    get type() {
      return _classPrivateFieldBase(this, _type)[_type];
    }
    /**
     * @name addPair
     * @summary Stores an account, given a keyring pair, as a Key/Value (public key, pair) in Keyring Pair Dictionary
     */


    addPair(pair) {
      return _classPrivateFieldBase(this, _pairs)[_pairs].add(pair);
    }
    /**
     * @name addFromAddress
     * @summary Stores an account, given an account address, as a Key/Value (public key, pair) in Keyring Pair Dictionary
     * @description Allows user to explicitly provide separate inputs including account address or public key, and optionally
     * the associated account metadata, and the default encoded value as arguments (that may be obtained from the json file
     * of an account backup), and then generates a keyring pair from them that it passes to
     * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
     */


    addFromAddress(address, meta = {}, encoded = null, type = this.type, ignoreChecksum, encType) {
      const publicKey = this.decodeAddress(address, ignoreChecksum);
      return this.addPair(createPair({
        toSS58: this.encodeAddress,
        type
      }, {
        publicKey,
        secretKey: new Uint8Array()
      }, meta, encoded, encType));
    }
    /**
     * @name addFromJson
     * @summary Stores an account, given JSON data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
     * @description Allows user to provide a json object argument that contains account information (that may be obtained from the json file
     * of an account backup), and then generates a keyring pair from it that it passes to
     * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
     */


    addFromJson(json, ignoreChecksum) {
      return this.addPair(this.createFromJson(json, ignoreChecksum));
    }
    /**
     * @name addFromMnemonic
     * @summary Stores an account, given a mnemonic, as a Key/Value (public key, pair) in Keyring Pair Dictionary
     * @description Allows user to provide a mnemonic (seed phrase that is provided when account is originally created)
     * argument and a metadata argument that contains account information (that may be obtained from the json file
     * of an account backup), and then generates a keyring pair from it that it passes to
     * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
     */


    addFromMnemonic(mnemonic, meta = {}, type = this.type) {
      return this.addFromUri(mnemonic, meta, type);
    }
    /**
     * @name addFromPair
     * @summary Stores an account created from an explicit publicKey/secreteKey combination
     */


    addFromPair(pair, meta = {}, type = this.type) {
      return this.addPair(this.createFromPair(pair, meta, type));
    }
    /**
     * @name addFromSeed
     * @summary Stores an account, given seed data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
     * @description Stores in a keyring pair dictionary the public key of the pair as a key and the pair as the associated value.
     * Allows user to provide the account seed as an argument, and then generates a keyring pair from it that it passes to
     * `addPair` to store in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
     */


    addFromSeed(seed, meta = {}, type = this.type) {
      return this.addPair(createPair({
        toSS58: this.encodeAddress,
        type
      }, keypairFromSeed[type](seed), meta, null));
    }
    /**
     * @name addFromUri
     * @summary Creates an account via an suri
     * @description Extracts the phrase, path and password from a SURI format for specifying secret keys `<secret>/<soft-key>//<hard-key>///<password>` (the `///password` may be omitted, and `/<soft-key>` and `//<hard-key>` maybe repeated and mixed). The secret can be a hex string, mnemonic phrase or a string (to be padded)
     */


    addFromUri(suri, meta = {}, type = this.type) {
      return this.addPair(this.createFromUri(suri, meta, type));
    }
    /**
     * @name createFromJson
     * @description Creates a pair from a JSON keyfile
     */


    createFromJson({
      address,
      encoded,
      encoding: {
        content,
        type,
        version
      },
      meta
    }, ignoreChecksum) {
      util.assert(version !== '3' || content[0] === 'pkcs8', () => `Unable to decode non-pkcs8 type, [${content.join(',')}] found}`);
      const cryptoType = version === '0' || !Array.isArray(content) ? this.type : content[1];
      const encType = !Array.isArray(type) ? [type] : type;
      util.assert(['ed25519', 'sr25519', 'ecdsa', 'ethereum'].includes(cryptoType), () => `Unknown crypto type ${cryptoType}`); // Here the address and publicKey are 32 bytes and isomorphic. This is why the address field needs to be the public key for ethereum type pairs

      const publicKey = util.isHex(address) ? util.hexToU8a(address) : this.decodeAddress(address, ignoreChecksum);
      const decoded = util.isHex(encoded) ? util.hexToU8a(encoded) : utilCrypto.base64Decode(encoded);
      return createPair({
        toSS58: this.encodeAddress,
        type: cryptoType
      }, {
        publicKey,
        secretKey: new Uint8Array()
      }, meta, decoded, encType);
    }
    /**
     * @name createFromPair
     * @summary Creates a pair from an explicit publicKey/secreteKey combination
     */


    createFromPair(pair, meta = {}, type = this.type) {
      return createPair({
        toSS58: this.encodeAddress,
        type
      }, pair, meta, null);
    }
    /**
     * @name createFromUri
     * @summary Creates a Keypair from an suri
     * @description This creates a pair from the suri, but does not add it to the keyring
     */


    createFromUri(_suri, meta = {}, type = this.type) {
      // here we only aut-add the dev phrase if we have a hard-derived path
      const suri = _suri.startsWith('//') ? `${DEV_PHRASE}${_suri}` : _suri;
      const {
        derivePath,
        password,
        path,
        phrase
      } = utilCrypto.keyExtractSuri(suri);
      let seed;
      const isPhraseHex = util.isHex(phrase, 256);

      if (isPhraseHex) {
        seed = util.hexToU8a(phrase);
      } else {
        const parts = phrase.split(' ');

        if ([12, 15, 18, 21, 24].includes(parts.length)) {
          seed = type === 'ethereum' ? utilCrypto.mnemonicToLegacySeed(phrase, '', false, 64) : utilCrypto.mnemonicToMiniSecret(phrase, password);
        } else {
          util.assert(phrase.length <= 32, 'specified phrase is not a valid mnemonic and is invalid as a raw seed at > 32 bytes');
          seed = util.stringToU8a(phrase.padEnd(32));
        }
      }

      const derived = type === 'ethereum' ? isPhraseHex ? keypairFromSeed[type](seed) // for eth, if the private key is provided as suri, it must be derived only once
      : utilCrypto.hdEthereum(seed, derivePath.substring(1)) : utilCrypto.keyFromPath(keypairFromSeed[type](seed), path, type);
      return createPair({
        toSS58: this.encodeAddress,
        type
      }, derived, meta, null);
    }
    /**
     * @name encodeAddress
     * @description Encodes the input into an ss58 representation
     */


    /**
     * @name getPair
     * @summary Retrieves an account keyring pair from the Keyring Pair Dictionary, given an account address
     * @description Returns a keyring pair value from the keyring pair dictionary by performing
     * a key lookup using the provided account address or public key (after decoding it).
     */
    getPair(address) {
      return _classPrivateFieldBase(this, _pairs)[_pairs].get(address);
    }
    /**
     * @name getPairs
     * @summary Retrieves all account keyring pairs from the Keyring Pair Dictionary
     * @description Returns an array list of all the keyring pair values that are stored in the keyring pair dictionary.
     */


    getPairs() {
      return _classPrivateFieldBase(this, _pairs)[_pairs].all();
    }
    /**
     * @name getPublicKeys
     * @summary Retrieves Public Keys of all Keyring Pairs stored in the Keyring Pair Dictionary
     * @description Returns an array list of all the public keys associated with each of the keyring pair values that are stored in the keyring pair dictionary.
     */


    getPublicKeys() {
      return _classPrivateFieldBase(this, _pairs)[_pairs].all().map(({
        publicKey
      }) => publicKey);
    }
    /**
     * @name removePair
     * @description Deletes the provided input address or public key from the stored Keyring Pair Dictionary.
     */


    removePair(address) {
      _classPrivateFieldBase(this, _pairs)[_pairs].remove(address);
    }
    /**
     * @name setSS58Format;
     * @description Sets the ss58 format for the keyring
     */


    setSS58Format(ss58) {
      _classPrivateFieldBase(this, _ss)[_ss] = ss58;
    }
    /**
     * @name toJson
     * @summary Returns a JSON object associated with the input argument that contains metadata assocated with an account
     * @description Returns a JSON object containing the metadata associated with an account
     * when valid address or public key and when the account passphrase is provided if the account secret
     * is not already unlocked and available in memory. Note that in [AXIA-JS Apps](https://github.com/axia-js/apps) the user
     * may backup their account to a JSON file that contains this information.
     */


    toJson(address, passphrase) {
      return _classPrivateFieldBase(this, _pairs)[_pairs].get(address).toJson(passphrase);
    }

  }

  // Copyright 2017-2021 @axia-js/keyring authors & contributors
  // SPDX-License-Identifier: Apache-2.0
  // Auto-generated by @axia-js/dev, do not edit
  const packageInfo = {
    name: '@axia-js/keyring',
    version: '1.1.0'
  };

  // Copyright 2017-2021 @axia-js/keyring authors & contributors
  // NOTE This is not great since we have the secretKey here explicitly, but a testing
  // keyring is for testing - what happens is that in most cases the keyring is initialises
  // before anything else. Since the sr25519 crypto is async, this creates problems with
  // adding the keys when only the keyring is used.
  const PAIRSSR25519 = [{
    publicKey: util.hexToU8a('0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'),
    secretKey: util.hexToU8a('0x98319d4ff8a9508c4bb0cf0b5a78d760a0b2082c02775e6e82370816fedfff48925a225d97aa00682d6a59b95b18780c10d7032336e88f3442b42361f4a66011'),
    // nosemgrep
    seed: 'Alice',
    type: 'sr25519'
  }, {
    publicKey: util.hexToU8a('0xbe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f'),
    secretKey: util.hexToU8a('0xe8da6c9d810e020f5e3c7f5af2dea314cbeaa0d72bc6421e92c0808a0c584a6046ab28e97c3ffc77fe12b5a4d37e8cd4afbfebbf2391ffc7cb07c0f38c023efd'),
    // nosemgrep
    seed: 'Alice//stash',
    type: 'sr25519'
  }, {
    publicKey: util.hexToU8a('0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48'),
    secretKey: util.hexToU8a('0x081ff694633e255136bdb456c20a5fc8fed21f8b964c11bb17ff534ce80ebd5941ae88f85d0c1bfc37be41c904e1dfc01de8c8067b0d6d5df25dd1ac0894a325'),
    // nosemgrep
    seed: 'Bob',
    type: 'sr25519'
  }, {
    publicKey: util.hexToU8a('0xfe65717dad0447d715f660a0a58411de509b42e6efb8375f562f58a554d5860e'),
    secretKey: util.hexToU8a('0xc006507cdfc267a21532394c49ca9b754ca71de21e15a1cdf807c7ceab6d0b6c3ed408d9d35311540dcd54931933e67cf1ea10d46f75408f82b789d9bd212fde'),
    // nosemgrep
    seed: 'Bob//stash',
    type: 'sr25519'
  }, {
    publicKey: util.hexToU8a('0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22'),
    secretKey: util.hexToU8a('0xa8f2d83016052e5d6d77b2f6fd5d59418922a09024cda701b3c34369ec43a7668faf12ff39cd4e5d92bb773972f41a7a5279ebc2ed92264bed8f47d344f8f18c'),
    // nosemgrep
    seed: 'Charlie',
    type: 'sr25519'
  }, {
    publicKey: util.hexToU8a('0x306721211d5404bd9da88e0204360a1a9ab8b87c66c1bc2fcdd37f3c2222cc20'),
    secretKey: util.hexToU8a('0x20e05482ca4677e0edbc58ae9a3a59f6ed3b1a9484ba17e64d6fe8688b2b7b5d108c4487b9323b98b11fe36cb301b084e920f7b7895536809a6d62a451b25568'),
    // nosemgrep
    seed: 'Dave',
    type: 'sr25519'
  }, {
    publicKey: util.hexToU8a('0xe659a7a1628cdd93febc04a4e0646ea20e9f5f0ce097d9a05290d4a9e054df4e'),
    secretKey: util.hexToU8a('0x683576abfd5dc35273e4264c23095a1bf21c14517bece57c7f0cc5c0ed4ce06a3dbf386b7828f348abe15d76973a72009e6ef86a5c91db2990cb36bb657c6587'),
    // nosemgrep
    seed: 'Eve',
    type: 'sr25519'
  }, {
    publicKey: util.hexToU8a('0x1cbd2d43530a44705ad088af313e18f80b53ef16b36177cd4b77b846f2a5f07c'),
    secretKey: util.hexToU8a('0xb835c20f450079cf4f513900ae9faf8df06ad86c681884122c752a4b2bf74d4303e4f21bc6cc62bb4eeed5a9cce642c25e2d2ac1464093b50f6196d78e3a7426'),
    // nosemgrep
    seed: 'Ferdie',
    type: 'sr25519'
  }];
  const PAIRSETHEREUM = [{
    name: 'Alith',
    publicKey: util.hexToU8a('0x02509540919faacf9ab52146c9aa40db68172d83777250b28e4679176e49ccdd9f'),
    secretKey: util.hexToU8a('0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133'),
    // nosemgrep
    seed: "m/44'/40'/0'/0",
    type: 'ethereum'
  }, {
    name: 'Baltathar',
    publicKey: util.hexToU8a('0x033bc19e36ff1673910575b6727a974a9abd80c9a875d41ab3e2648dbfb9e4b518'),
    secretKey: util.hexToU8a('0x8075991ce870b93a8870eca0c0f91913d12f47948ca0fd25b49c6fa7cdbeee8b'),
    // nosemgrep
    seed: "m/44'/40'/0'/0",
    type: 'ethereum'
  }, {
    name: 'Charleth',
    publicKey: util.hexToU8a('0x0234637bdc0e89b5d46543bcbf8edff329d2702bc995e27e9af4b1ba009a3c2a5e'),
    secretKey: util.hexToU8a('0x0b6e18cafb6ed99687ec547bd28139cafdd2bffe70e6b688025de6b445aa5c5b'),
    // nosemgrep
    seed: "m/44'/40'/0'/0",
    type: 'ethereum'
  }, {
    name: 'Dorothy',
    publicKey: util.hexToU8a('0x02a00d60b2b408c2a14c5d70cdd2c205db8985ef737a7e55ad20ea32cc9e7c417c'),
    secretKey: util.hexToU8a('0x39539ab1876910bbf3a223d84a29e28f1cb4e2e456503e7e91ed39b2e7223d68'),
    // nosemgrep
    seed: "m/44'/40'/0'/0",
    type: 'ethereum'
  }, {
    name: 'Ethan',
    publicKey: util.hexToU8a('0x025cdc005b752651cd3f728fb9192182acb3a9c89e19072cbd5b03f3ee1f1b3ffa'),
    secretKey: util.hexToU8a('0x7dce9bc8babb68fec1409be38c8e1a52650206a7ed90ff956ae8a6d15eeaaef4'),
    // nosemgrep
    seed: "m/44'/40'/0'/0",
    type: 'ethereum'
  }, {
    name: 'Faith',
    publicKey: util.hexToU8a('0x037964b6c9d546da4646ada28a99e34acaa1d14e7aba861a9055f9bd200c8abf74'),
    secretKey: util.hexToU8a('0xb9d2ea9a615f3165812e8d44de0d24da9bbd164b65c4f0573e1ce2c8dbd9c8df'),
    // nosemgrep
    seed: "m/44'/40'/0'/0",
    type: 'ethereum'
  }];
  /**
   * @name testKeyring
   * @summary Create an instance of Keyring pre-populated with locked test accounts
   * @description The test accounts (i.e. alice, bob, dave, eve, ferdie)
   * are available on the dev chain and each test account is initialized with DOT funds.
   */

  function createTestKeyring(options = {}, isDerived = true) {
    const keyring = new Keyring(options);
    const pairs = options.type && options.type === 'ethereum' ? PAIRSETHEREUM : PAIRSSR25519;
    pairs.forEach(({
      name,
      publicKey,
      secretKey,
      seed,
      type
    }) => {
      const meta = {
        isTesting: true,
        name: name || seed.replace('//', '_').toLowerCase()
      };
      const pair = !isDerived && !name ? keyring.addFromUri(seed, meta, options.type) : keyring.addPair(createPair({
        toSS58: keyring.encodeAddress,
        type
      }, {
        publicKey,
        secretKey
      }, meta));

      pair.lock = () => {// we don't have lock/unlock functionality here
      };
    });
    return keyring;
  }

  // Copyright 2017-2021 @axia-js/keyring authors & contributors
  const publicKey = new Uint8Array(32);
  const address = utilCrypto.encodeAddress(publicKey);
  const meta = {
    isTesting: true,
    name: 'nobody'
  };
  const json = {
    address,
    encoded: '',
    encoding: {
      content: ['pkcs8', 'ed25519'],
      type: 'none',
      version: '0'
    },
    meta
  };
  const pair = {
    address,
    addressRaw: publicKey,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decodePkcs8: (passphrase, encoded) => undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decryptMessage: (encryptedMessageWithNonce, senderPublicKey) => null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    derive: (suri, meta) => pair,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    encodePkcs8: passphrase => new Uint8Array(0),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    encryptMessage: (message, recipientPublicKey, _nonce) => new Uint8Array(),
    isLocked: true,
    lock: () => {// no locking, it is always locked
    },
    meta,
    publicKey,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setMeta: meta => undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sign: message => new Uint8Array(64),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toJson: passphrase => json,
    type: 'ed25519',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unlock: passphrase => undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    verify: (message, signature) => false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vrfSign: (message, context, extra) => new Uint8Array(96),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vrfVerify: (message, vrfResult, context, extra) => false
  };
  function nobody() {
    return pair;
  }

  // Copyright 2017-2021 @axia-js/keyring authors & contributors
  function createTestPairs(options, isDerived = true) {
    const keyring = createTestKeyring(options, isDerived);
    const pairs = keyring.getPairs();
    const map = {
      nobody: nobody()
    };
    return pairs.reduce((result, pair) => {
      const {
        name
      } = pair.meta;
      result[name] = pair;
      return result;
    }, map);
  }

  Object.defineProperty(exports, 'decodeAddress', {
    enumerable: true,
    get: function () {
      return utilCrypto.decodeAddress;
    }
  });
  Object.defineProperty(exports, 'encodeAddress', {
    enumerable: true,
    get: function () {
      return utilCrypto.encodeAddress;
    }
  });
  Object.defineProperty(exports, 'setSS58Format', {
    enumerable: true,
    get: function () {
      return utilCrypto.setSS58Format;
    }
  });
  exports.DEV_PHRASE = DEV_PHRASE;
  exports.DEV_SEED = DEV_SEED;
  exports.Keyring = Keyring;
  exports.createPair = createPair;
  exports.createTestKeyring = createTestKeyring;
  exports.createTestPairs = createTestPairs;
  exports.packageInfo = packageInfo;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, axiaUtil, axiaUtilCrypto));
