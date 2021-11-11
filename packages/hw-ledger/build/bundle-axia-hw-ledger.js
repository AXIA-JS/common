const axiaHwLedger = (function (exports, util) {
  'use strict';

  const global = window;

  function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
  }

  var id$2 = 0;
  function _classPrivateFieldKey(name) {
    return "__private_" + id$2++ + "_" + name;
  }

  // Copyright 2017-2021 @axia-js/x-bundle authors & contributors
  // SPDX-License-Identifier: Apache-2.0
  const EventEmitter = {};

  const empty = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': EventEmitter
  });

  /* eslint-disable no-continue */
  /* eslint-disable no-unused-vars */
  /* eslint-disable no-param-reassign */
  /* eslint-disable no-prototype-builtins */
  var __values$1 = (undefined && undefined.__values) || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var errorClasses = {};
  var deserializers = {};
  var addCustomErrorDeserializer = function (name, deserializer) {
      deserializers[name] = deserializer;
  };
  var createCustomErrorClass = function (name) {
      var C = function CustomError(message, fields) {
          Object.assign(this, fields);
          this.name = name;
          this.message = message || name;
          this.stack = new Error().stack;
      };
      C.prototype = new Error();
      errorClasses[name] = C;
      return C;
  };
  // inspired from https://github.com/programble/errio/blob/master/index.js
  var deserializeError = function (object) {
      if (typeof object === "object" && object) {
          try {
              // $FlowFixMe FIXME HACK
              var msg = JSON.parse(object.message);
              if (msg.message && msg.name) {
                  object = msg;
              }
          }
          catch (e) {
              // nothing
          }
          var error = void 0;
          if (typeof object.name === "string") {
              var name_1 = object.name;
              var des = deserializers[name_1];
              if (des) {
                  error = des(object);
              }
              else {
                  var constructor = name_1 === "Error" ? Error : errorClasses[name_1];
                  if (!constructor) {
                      console.warn("deserializing an unknown class '" + name_1 + "'");
                      constructor = createCustomErrorClass(name_1);
                  }
                  error = Object.create(constructor.prototype);
                  try {
                      for (var prop in object) {
                          if (object.hasOwnProperty(prop)) {
                              error[prop] = object[prop];
                          }
                      }
                  }
                  catch (e) {
                      // sometimes setting a property can fail (e.g. .name)
                  }
              }
          }
          else {
              error = new Error(object.message);
          }
          if (!error.stack && Error.captureStackTrace) {
              Error.captureStackTrace(error, deserializeError);
          }
          return error;
      }
      return new Error(String(object));
  };
  // inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js
  var serializeError = function (value) {
      if (!value)
          return value;
      if (typeof value === "object") {
          return destroyCircular(value, []);
      }
      if (typeof value === "function") {
          return "[Function: " + (value.name || "anonymous") + "]";
      }
      return value;
  };
  // https://www.npmjs.com/package/destroy-circular
  function destroyCircular(from, seen) {
      var e_1, _a;
      var to = {};
      seen.push(from);
      try {
          for (var _b = __values$1(Object.keys(from)), _c = _b.next(); !_c.done; _c = _b.next()) {
              var key = _c.value;
              var value = from[key];
              if (typeof value === "function") {
                  continue;
              }
              if (!value || typeof value !== "object") {
                  to[key] = value;
                  continue;
              }
              if (seen.indexOf(from[key]) === -1) {
                  to[key] = destroyCircular(from[key], seen.slice(0));
                  continue;
              }
              to[key] = "[Circular]";
          }
      }
      catch (e_1_1) { e_1 = { error: e_1_1 }; }
      finally {
          try {
              if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
          }
          finally { if (e_1) throw e_1.error; }
      }
      if (typeof from.name === "string") {
          to.name = from.name;
      }
      if (typeof from.message === "string") {
          to.message = from.message;
      }
      if (typeof from.stack === "string") {
          to.stack = from.stack;
      }
      return to;
  }

  var AccountNameRequiredError = createCustomErrorClass("AccountNameRequired");
  var AccountNotSupported = createCustomErrorClass("AccountNotSupported");
  var AmountRequired = createCustomErrorClass("AmountRequired");
  var BluetoothRequired = createCustomErrorClass("BluetoothRequired");
  var BtcUnmatchedApp = createCustomErrorClass("BtcUnmatchedApp");
  var CantOpenDevice = createCustomErrorClass("CantOpenDevice");
  var CashAddrNotSupported = createCustomErrorClass("CashAddrNotSupported");
  var CurrencyNotSupported = createCustomErrorClass("CurrencyNotSupported");
  var DeviceAppVerifyNotSupported = createCustomErrorClass("DeviceAppVerifyNotSupported");
  var DeviceGenuineSocketEarlyClose = createCustomErrorClass("DeviceGenuineSocketEarlyClose");
  var DeviceNotGenuineError = createCustomErrorClass("DeviceNotGenuine");
  var DeviceOnDashboardExpected = createCustomErrorClass("DeviceOnDashboardExpected");
  var DeviceOnDashboardUnexpected = createCustomErrorClass("DeviceOnDashboardUnexpected");
  var DeviceInOSUExpected = createCustomErrorClass("DeviceInOSUExpected");
  var DeviceHalted = createCustomErrorClass("DeviceHalted");
  var DeviceNameInvalid = createCustomErrorClass("DeviceNameInvalid");
  var DeviceSocketFail = createCustomErrorClass("DeviceSocketFail");
  var DeviceSocketNoBulkStatus = createCustomErrorClass("DeviceSocketNoBulkStatus");
  var DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
  var DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
  var EnpointConfigError = createCustomErrorClass("EnpointConfig");
  var EthAppPleaseEnableContractData = createCustomErrorClass("EthAppPleaseEnableContractData");
  var FeeEstimationFailed = createCustomErrorClass("FeeEstimationFailed");
  var FirmwareNotRecognized = createCustomErrorClass("FirmwareNotRecognized");
  var HardResetFail = createCustomErrorClass("HardResetFail");
  var InvalidXRPTag = createCustomErrorClass("InvalidXRPTag");
  var InvalidAddress = createCustomErrorClass("InvalidAddress");
  var InvalidAddressBecauseDestinationIsAlsoSource = createCustomErrorClass("InvalidAddressBecauseDestinationIsAlsoSource");
  var LatestMCUInstalledError = createCustomErrorClass("LatestMCUInstalledError");
  var UnknownMCU = createCustomErrorClass("UnknownMCU");
  var LedgerAPIError = createCustomErrorClass("LedgerAPIError");
  var LedgerAPIErrorWithMessage = createCustomErrorClass("LedgerAPIErrorWithMessage");
  var LedgerAPINotAvailable = createCustomErrorClass("LedgerAPINotAvailable");
  var ManagerAppAlreadyInstalledError = createCustomErrorClass("ManagerAppAlreadyInstalled");
  var ManagerAppRelyOnBTCError = createCustomErrorClass("ManagerAppRelyOnBTC");
  var ManagerAppDepInstallRequired = createCustomErrorClass("ManagerAppDepInstallRequired");
  var ManagerAppDepUninstallRequired = createCustomErrorClass("ManagerAppDepUninstallRequired");
  var ManagerDeviceLockedError = createCustomErrorClass("ManagerDeviceLocked");
  var ManagerFirmwareNotEnoughSpaceError = createCustomErrorClass("ManagerFirmwareNotEnoughSpace");
  var ManagerNotEnoughSpaceError = createCustomErrorClass("ManagerNotEnoughSpace");
  var ManagerUninstallBTCDep = createCustomErrorClass("ManagerUninstallBTCDep");
  var NetworkDown = createCustomErrorClass("NetworkDown");
  var NoAddressesFound = createCustomErrorClass("NoAddressesFound");
  var NotEnoughBalance = createCustomErrorClass("NotEnoughBalance");
  var NotEnoughBalanceToDelegate = createCustomErrorClass("NotEnoughBalanceToDelegate");
  var NotEnoughBalanceInParentAccount = createCustomErrorClass("NotEnoughBalanceInParentAccount");
  var NotEnoughSpendableBalance = createCustomErrorClass("NotEnoughSpendableBalance");
  var NotEnoughBalanceBecauseDestinationNotCreated = createCustomErrorClass("NotEnoughBalanceBecauseDestinationNotCreated");
  var NoAccessToCamera = createCustomErrorClass("NoAccessToCamera");
  var NotEnoughGas = createCustomErrorClass("NotEnoughGas");
  var NotSupportedLegacyAddress = createCustomErrorClass("NotSupportedLegacyAddress");
  var GasLessThanEstimate = createCustomErrorClass("GasLessThanEstimate");
  var PasswordsDontMatchError = createCustomErrorClass("PasswordsDontMatch");
  var PasswordIncorrectError = createCustomErrorClass("PasswordIncorrect");
  var RecommendSubAccountsToEmpty = createCustomErrorClass("RecommendSubAccountsToEmpty");
  var RecommendUndelegation = createCustomErrorClass("RecommendUndelegation");
  var TimeoutTagged = createCustomErrorClass("TimeoutTagged");
  var UnexpectedBootloader = createCustomErrorClass("UnexpectedBootloader");
  var MCUNotGenuineToDashboard = createCustomErrorClass("MCUNotGenuineToDashboard");
  var RecipientRequired = createCustomErrorClass("RecipientRequired");
  var UnavailableTezosOriginatedAccountReceive = createCustomErrorClass("UnavailableTezosOriginatedAccountReceive");
  var UnavailableTezosOriginatedAccountSend = createCustomErrorClass("UnavailableTezosOriginatedAccountSend");
  var UpdateFetchFileFail = createCustomErrorClass("UpdateFetchFileFail");
  var UpdateIncorrectHash = createCustomErrorClass("UpdateIncorrectHash");
  var UpdateIncorrectSig = createCustomErrorClass("UpdateIncorrectSig");
  var UpdateYourApp = createCustomErrorClass("UpdateYourApp");
  var UserRefusedDeviceNameChange = createCustomErrorClass("UserRefusedDeviceNameChange");
  var UserRefusedAddress = createCustomErrorClass("UserRefusedAddress");
  var UserRefusedFirmwareUpdate = createCustomErrorClass("UserRefusedFirmwareUpdate");
  var UserRefusedAllowManager = createCustomErrorClass("UserRefusedAllowManager");
  var UserRefusedOnDevice = createCustomErrorClass("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
  var TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
  var TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
  var TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
  var TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
  var DeviceShouldStayInApp = createCustomErrorClass("DeviceShouldStayInApp");
  var WebsocketConnectionError = createCustomErrorClass("WebsocketConnectionError");
  var WebsocketConnectionFailed = createCustomErrorClass("WebsocketConnectionFailed");
  var WrongDeviceForAccount = createCustomErrorClass("WrongDeviceForAccount");
  var WrongAppForCurrency = createCustomErrorClass("WrongAppForCurrency");
  var ETHAddressNonEIP = createCustomErrorClass("ETHAddressNonEIP");
  var CantScanQRCode = createCustomErrorClass("CantScanQRCode");
  var FeeNotLoaded = createCustomErrorClass("FeeNotLoaded");
  var FeeRequired = createCustomErrorClass("FeeRequired");
  var FeeTooHigh = createCustomErrorClass("FeeTooHigh");
  var SyncError = createCustomErrorClass("SyncError");
  var PairingFailed = createCustomErrorClass("PairingFailed");
  var GenuineCheckFailed = createCustomErrorClass("GenuineCheckFailed");
  var LedgerAPI4xx = createCustomErrorClass("LedgerAPI4xx");
  var LedgerAPI5xx = createCustomErrorClass("LedgerAPI5xx");
  var FirmwareOrAppUpdateRequired = createCustomErrorClass("FirmwareOrAppUpdateRequired");
  // db stuff, no need to translate
  var NoDBPathGiven = createCustomErrorClass("NoDBPathGiven");
  var DBWrongPassword = createCustomErrorClass("DBWrongPassword");
  var DBNotReset = createCustomErrorClass("DBNotReset");
  /**
   * TransportError is used for any generic transport errors.
   * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
   */
  function TransportError(message, id) {
      this.name = "TransportError";
      this.message = message;
      this.stack = new Error().stack;
      this.id = id;
  }
  TransportError.prototype = new Error();
  addCustomErrorDeserializer("TransportError", function (e) { return new TransportError(e.message, e.id); });
  var StatusCodes = {
      PIN_REMAINING_ATTEMPTS: 0x63c0,
      INCORRECT_LENGTH: 0x6700,
      MISSING_CRITICAL_PARAMETER: 0x6800,
      COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
      SECURITY_STATUS_NOT_SATISFIED: 0x6982,
      CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
      INCORRECT_DATA: 0x6a80,
      NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
      REFERENCED_DATA_NOT_FOUND: 0x6a88,
      FILE_ALREADY_EXISTS: 0x6a89,
      INCORRECT_P1_P2: 0x6b00,
      INS_NOT_SUPPORTED: 0x6d00,
      CLA_NOT_SUPPORTED: 0x6e00,
      TECHNICAL_PROBLEM: 0x6f00,
      OK: 0x9000,
      MEMORY_PROBLEM: 0x9240,
      NO_EF_SELECTED: 0x9400,
      INVALID_OFFSET: 0x9402,
      FILE_NOT_FOUND: 0x9404,
      INCONSISTENT_FILE: 0x9408,
      ALGORITHM_NOT_SUPPORTED: 0x9484,
      INVALID_KCV: 0x9485,
      CODE_NOT_INITIALIZED: 0x9802,
      ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
      CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
      CONTRADICTION_INVALIDATION: 0x9810,
      CODE_BLOCKED: 0x9840,
      MAX_VALUE_REACHED: 0x9850,
      GP_AUTH_FAILED: 0x6300,
      LICENSING: 0x6f42,
      HALTED: 0x6faa
  };
  function getAltStatusMessage(code) {
      switch (code) {
          // improve text of most common errors
          case 0x6700:
              return "Incorrect length";
          case 0x6800:
              return "Missing critical parameter";
          case 0x6982:
              return "Security not satisfied (dongle locked or have invalid access rights)";
          case 0x6985:
              return "Condition of use not satisfied (denied by the user?)";
          case 0x6a80:
              return "Invalid data received";
          case 0x6b00:
              return "Invalid parameter received";
      }
      if (0x6f00 <= code && code <= 0x6fff) {
          return "Internal error, please report";
      }
  }
  /**
   * Error thrown when a device returned a non success status.
   * the error.statusCode is one of the `StatusCodes` exported by this library.
   */
  function TransportStatusError(statusCode) {
      this.name = "TransportStatusError";
      var statusText = Object.keys(StatusCodes).find(function (k) { return StatusCodes[k] === statusCode; }) ||
          "UNKNOWN_ERROR";
      var smsg = getAltStatusMessage(statusCode) || statusText;
      var statusCodeStr = statusCode.toString(16);
      this.message = "Ledger device: " + smsg + " (0x" + statusCodeStr + ")";
      this.stack = new Error().stack;
      this.statusCode = statusCode;
      this.statusText = statusText;
  }
  TransportStatusError.prototype = new Error();
  addCustomErrorDeserializer("TransportStatusError", function (e) { return new TransportStatusError(e.statusCode); });

  const libEs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    serializeError: serializeError,
    deserializeError: deserializeError,
    createCustomErrorClass: createCustomErrorClass,
    addCustomErrorDeserializer: addCustomErrorDeserializer,
    AccountNameRequiredError: AccountNameRequiredError,
    AccountNotSupported: AccountNotSupported,
    AmountRequired: AmountRequired,
    BluetoothRequired: BluetoothRequired,
    BtcUnmatchedApp: BtcUnmatchedApp,
    CantOpenDevice: CantOpenDevice,
    CashAddrNotSupported: CashAddrNotSupported,
    CurrencyNotSupported: CurrencyNotSupported,
    DeviceAppVerifyNotSupported: DeviceAppVerifyNotSupported,
    DeviceGenuineSocketEarlyClose: DeviceGenuineSocketEarlyClose,
    DeviceNotGenuineError: DeviceNotGenuineError,
    DeviceOnDashboardExpected: DeviceOnDashboardExpected,
    DeviceOnDashboardUnexpected: DeviceOnDashboardUnexpected,
    DeviceInOSUExpected: DeviceInOSUExpected,
    DeviceHalted: DeviceHalted,
    DeviceNameInvalid: DeviceNameInvalid,
    DeviceSocketFail: DeviceSocketFail,
    DeviceSocketNoBulkStatus: DeviceSocketNoBulkStatus,
    DisconnectedDevice: DisconnectedDevice,
    DisconnectedDeviceDuringOperation: DisconnectedDeviceDuringOperation,
    EnpointConfigError: EnpointConfigError,
    EthAppPleaseEnableContractData: EthAppPleaseEnableContractData,
    FeeEstimationFailed: FeeEstimationFailed,
    FirmwareNotRecognized: FirmwareNotRecognized,
    HardResetFail: HardResetFail,
    InvalidXRPTag: InvalidXRPTag,
    InvalidAddress: InvalidAddress,
    InvalidAddressBecauseDestinationIsAlsoSource: InvalidAddressBecauseDestinationIsAlsoSource,
    LatestMCUInstalledError: LatestMCUInstalledError,
    UnknownMCU: UnknownMCU,
    LedgerAPIError: LedgerAPIError,
    LedgerAPIErrorWithMessage: LedgerAPIErrorWithMessage,
    LedgerAPINotAvailable: LedgerAPINotAvailable,
    ManagerAppAlreadyInstalledError: ManagerAppAlreadyInstalledError,
    ManagerAppRelyOnBTCError: ManagerAppRelyOnBTCError,
    ManagerAppDepInstallRequired: ManagerAppDepInstallRequired,
    ManagerAppDepUninstallRequired: ManagerAppDepUninstallRequired,
    ManagerDeviceLockedError: ManagerDeviceLockedError,
    ManagerFirmwareNotEnoughSpaceError: ManagerFirmwareNotEnoughSpaceError,
    ManagerNotEnoughSpaceError: ManagerNotEnoughSpaceError,
    ManagerUninstallBTCDep: ManagerUninstallBTCDep,
    NetworkDown: NetworkDown,
    NoAddressesFound: NoAddressesFound,
    NotEnoughBalance: NotEnoughBalance,
    NotEnoughBalanceToDelegate: NotEnoughBalanceToDelegate,
    NotEnoughBalanceInParentAccount: NotEnoughBalanceInParentAccount,
    NotEnoughSpendableBalance: NotEnoughSpendableBalance,
    NotEnoughBalanceBecauseDestinationNotCreated: NotEnoughBalanceBecauseDestinationNotCreated,
    NoAccessToCamera: NoAccessToCamera,
    NotEnoughGas: NotEnoughGas,
    NotSupportedLegacyAddress: NotSupportedLegacyAddress,
    GasLessThanEstimate: GasLessThanEstimate,
    PasswordsDontMatchError: PasswordsDontMatchError,
    PasswordIncorrectError: PasswordIncorrectError,
    RecommendSubAccountsToEmpty: RecommendSubAccountsToEmpty,
    RecommendUndelegation: RecommendUndelegation,
    TimeoutTagged: TimeoutTagged,
    UnexpectedBootloader: UnexpectedBootloader,
    MCUNotGenuineToDashboard: MCUNotGenuineToDashboard,
    RecipientRequired: RecipientRequired,
    UnavailableTezosOriginatedAccountReceive: UnavailableTezosOriginatedAccountReceive,
    UnavailableTezosOriginatedAccountSend: UnavailableTezosOriginatedAccountSend,
    UpdateFetchFileFail: UpdateFetchFileFail,
    UpdateIncorrectHash: UpdateIncorrectHash,
    UpdateIncorrectSig: UpdateIncorrectSig,
    UpdateYourApp: UpdateYourApp,
    UserRefusedDeviceNameChange: UserRefusedDeviceNameChange,
    UserRefusedAddress: UserRefusedAddress,
    UserRefusedFirmwareUpdate: UserRefusedFirmwareUpdate,
    UserRefusedAllowManager: UserRefusedAllowManager,
    UserRefusedOnDevice: UserRefusedOnDevice,
    TransportOpenUserCancelled: TransportOpenUserCancelled,
    TransportInterfaceNotAvailable: TransportInterfaceNotAvailable,
    TransportRaceCondition: TransportRaceCondition,
    TransportWebUSBGestureRequired: TransportWebUSBGestureRequired,
    DeviceShouldStayInApp: DeviceShouldStayInApp,
    WebsocketConnectionError: WebsocketConnectionError,
    WebsocketConnectionFailed: WebsocketConnectionFailed,
    WrongDeviceForAccount: WrongDeviceForAccount,
    WrongAppForCurrency: WrongAppForCurrency,
    ETHAddressNonEIP: ETHAddressNonEIP,
    CantScanQRCode: CantScanQRCode,
    FeeNotLoaded: FeeNotLoaded,
    FeeRequired: FeeRequired,
    FeeTooHigh: FeeTooHigh,
    SyncError: SyncError,
    PairingFailed: PairingFailed,
    GenuineCheckFailed: GenuineCheckFailed,
    LedgerAPI4xx: LedgerAPI4xx,
    LedgerAPI5xx: LedgerAPI5xx,
    FirmwareOrAppUpdateRequired: FirmwareOrAppUpdateRequired,
    NoDBPathGiven: NoDBPathGiven,
    DBWrongPassword: DBWrongPassword,
    DBNotReset: DBNotReset,
    TransportError: TransportError,
    StatusCodes: StatusCodes,
    getAltStatusMessage: getAltStatusMessage,
    TransportStatusError: TransportStatusError
  });

  var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  };
  var __read$1 = (undefined && undefined.__read) || function (o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  };
  var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
          }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
  };
  var __values = (undefined && undefined.__values) || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  /**
   * Transport defines the generic interface to share between node/u2f impl
   * A **Descriptor** is a parametric type that is up to be determined for the implementation.
   * it can be for instance an ID, an file path, a URL,...
   */
  var Transport = /** @class */ (function () {
      function Transport() {
          var _this = this;
          this.exchangeTimeout = 30000;
          this.unresponsiveTimeout = 15000;
          this.deviceModel = null;
          this._events = new EventEmitter();
          /**
           * wrapper on top of exchange to simplify work of the implementation.
           * @param cla
           * @param ins
           * @param p1
           * @param p2
           * @param data
           * @param statusList is a list of accepted status code (shorts). [0x9000] by default
           * @return a Promise of response buffer
           */
          this.send = function (cla, ins, p1, p2, data, statusList) {
              if (data === void 0) { data = Buffer.alloc(0); }
              if (statusList === void 0) { statusList = [StatusCodes.OK]; }
              return __awaiter$3(_this, void 0, void 0, function () {
                  var response, sw;
                  return __generator$3(this, function (_a) {
                      switch (_a.label) {
                          case 0:
                              if (data.length >= 256) {
                                  throw new TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
                              }
                              return [4 /*yield*/, this.exchange(Buffer.concat([
                                      Buffer.from([cla, ins, p1, p2]),
                                      Buffer.from([data.length]),
                                      data,
                                  ]))];
                          case 1:
                              response = _a.sent();
                              sw = response.readUInt16BE(response.length - 2);
                              if (!statusList.some(function (s) { return s === sw; })) {
                                  throw new TransportStatusError(sw);
                              }
                              return [2 /*return*/, response];
                      }
                  });
              });
          };
          this.exchangeAtomicImpl = function (f) { return __awaiter$3(_this, void 0, void 0, function () {
              var resolveBusy, busyPromise, unresponsiveReached, timeout, res;
              var _this = this;
              return __generator$3(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (this.exchangeBusyPromise) {
                              throw new TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
                          }
                          busyPromise = new Promise(function (r) {
                              resolveBusy = r;
                          });
                          this.exchangeBusyPromise = busyPromise;
                          unresponsiveReached = false;
                          timeout = setTimeout(function () {
                              unresponsiveReached = true;
                              _this.emit("unresponsive");
                          }, this.unresponsiveTimeout);
                          _a.label = 1;
                      case 1:
                          _a.trys.push([1, , 3, 4]);
                          return [4 /*yield*/, f()];
                      case 2:
                          res = _a.sent();
                          if (unresponsiveReached) {
                              this.emit("responsive");
                          }
                          return [2 /*return*/, res];
                      case 3:
                          clearTimeout(timeout);
                          if (resolveBusy)
                              resolveBusy();
                          this.exchangeBusyPromise = null;
                          return [7 /*endfinally*/];
                      case 4: return [2 /*return*/];
                  }
              });
          }); };
          this._appAPIlock = null;
      }
      /**
       * low level api to communicate with the device
       * This method is for implementations to implement but should not be directly called.
       * Instead, the recommanded way is to use send() method
       * @param apdu the data to send
       * @return a Promise of response data
       */
      Transport.prototype.exchange = function (_apdu) {
          throw new Error("exchange not implemented");
      };
      /**
       * set the "scramble key" for the next exchanges with the device.
       * Each App can have a different scramble key and they internally will set it at instanciation.
       * @param key the scramble key
       */
      Transport.prototype.setScrambleKey = function (_key) { };
      /**
       * close the exchange with the device.
       * @return a Promise that ends when the transport is closed.
       */
      Transport.prototype.close = function () {
          return Promise.resolve();
      };
      /**
       * Listen to an event on an instance of transport.
       * Transport implementation can have specific events. Here is the common events:
       * * `"disconnect"` : triggered if Transport is disconnected
       */
      Transport.prototype.on = function (eventName, cb) {
          this._events.on(eventName, cb);
      };
      /**
       * Stop listening to an event on an instance of transport.
       */
      Transport.prototype.off = function (eventName, cb) {
          this._events.removeListener(eventName, cb);
      };
      Transport.prototype.emit = function (event) {
          var _a;
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
          }
          (_a = this._events).emit.apply(_a, __spreadArray([event], __read$1(args), false));
      };
      /**
       * Enable or not logs of the binary exchange
       */
      Transport.prototype.setDebugMode = function () {
          console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
      };
      /**
       * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
       */
      Transport.prototype.setExchangeTimeout = function (exchangeTimeout) {
          this.exchangeTimeout = exchangeTimeout;
      };
      /**
       * Define the delay before emitting "unresponsive" on an exchange that does not respond
       */
      Transport.prototype.setExchangeUnresponsiveTimeout = function (unresponsiveTimeout) {
          this.unresponsiveTimeout = unresponsiveTimeout;
      };
      /**
       * create() allows to open the first descriptor available or
       * throw if there is none or if timeout is reached.
       * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
       * @example
      TransportFoo.create().then(transport => ...)
       */
      Transport.create = function (openTimeout, listenTimeout) {
          var _this = this;
          if (openTimeout === void 0) { openTimeout = 3000; }
          return new Promise(function (resolve, reject) {
              var found = false;
              var sub = _this.listen({
                  next: function (e) {
                      found = true;
                      if (sub)
                          sub.unsubscribe();
                      if (listenTimeoutId)
                          clearTimeout(listenTimeoutId);
                      _this.open(e.descriptor, openTimeout).then(resolve, reject);
                  },
                  error: function (e) {
                      if (listenTimeoutId)
                          clearTimeout(listenTimeoutId);
                      reject(e);
                  },
                  complete: function () {
                      if (listenTimeoutId)
                          clearTimeout(listenTimeoutId);
                      if (!found) {
                          reject(new TransportError(_this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
                      }
                  }
              });
              var listenTimeoutId = listenTimeout
                  ? setTimeout(function () {
                      sub.unsubscribe();
                      reject(new TransportError(_this.ErrorMessage_ListenTimeout, "ListenTimeout"));
                  }, listenTimeout)
                  : null;
          });
      };
      Transport.prototype.decorateAppAPIMethods = function (self, methods, scrambleKey) {
          var e_1, _a;
          try {
              for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
                  var methodName = methods_1_1.value;
                  self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
              }
          }
          catch (e_1_1) { e_1 = { error: e_1_1 }; }
          finally {
              try {
                  if (methods_1_1 && !methods_1_1.done && (_a = methods_1["return"])) _a.call(methods_1);
              }
              finally { if (e_1) throw e_1.error; }
          }
      };
      Transport.prototype.decorateAppAPIMethod = function (methodName, f, ctx, scrambleKey) {
          var _this = this;
          return function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return __awaiter$3(_this, void 0, void 0, function () {
                  var _appAPIlock;
                  return __generator$3(this, function (_a) {
                      switch (_a.label) {
                          case 0:
                              _appAPIlock = this._appAPIlock;
                              if (_appAPIlock) {
                                  return [2 /*return*/, Promise.reject(new TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"))];
                              }
                              _a.label = 1;
                          case 1:
                              _a.trys.push([1, , 3, 4]);
                              this._appAPIlock = methodName;
                              this.setScrambleKey(scrambleKey);
                              return [4 /*yield*/, f.apply(ctx, args)];
                          case 2: return [2 /*return*/, _a.sent()];
                          case 3:
                              this._appAPIlock = null;
                              return [7 /*endfinally*/];
                          case 4: return [2 /*return*/];
                      }
                  });
              });
          };
      };
      Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
      Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
      return Transport;
  }());

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  var hidFraming$1 = {};

  const require$$0 = /*@__PURE__*/getAugmentedNamespace(libEs);

  (function (exports) {
  exports.__esModule = true;
  var errors_1 = require$$0;
  var Tag = 0x05;
  function asUInt16BE(value) {
      var b = Buffer.alloc(2);
      b.writeUInt16BE(value, 0);
      return b;
  }
  var initialAcc = {
      data: Buffer.alloc(0),
      dataLength: 0,
      sequence: 0
  };
  /**
   *
   */
  var createHIDframing = function (channel, packetSize) {
      return {
          makeBlocks: function (apdu) {
              var data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
              var blockSize = packetSize - 5;
              var nbBlocks = Math.ceil(data.length / blockSize);
              data = Buffer.concat([
                  data,
                  Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0),
              ]);
              var blocks = [];
              for (var i = 0; i < nbBlocks; i++) {
                  var head = Buffer.alloc(5);
                  head.writeUInt16BE(channel, 0);
                  head.writeUInt8(Tag, 2);
                  head.writeUInt16BE(i, 3);
                  var chunk = data.slice(i * blockSize, (i + 1) * blockSize);
                  blocks.push(Buffer.concat([head, chunk]));
              }
              return blocks;
          },
          reduceResponse: function (acc, chunk) {
              var _a = acc || initialAcc, data = _a.data, dataLength = _a.dataLength, sequence = _a.sequence;
              if (chunk.readUInt16BE(0) !== channel) {
                  throw new errors_1.TransportError("Invalid channel", "InvalidChannel");
              }
              if (chunk.readUInt8(2) !== Tag) {
                  throw new errors_1.TransportError("Invalid tag", "InvalidTag");
              }
              if (chunk.readUInt16BE(3) !== sequence) {
                  throw new errors_1.TransportError("Invalid sequence", "InvalidSequence");
              }
              if (!acc) {
                  dataLength = chunk.readUInt16BE(5);
              }
              sequence++;
              var chunkData = chunk.slice(acc ? 5 : 7);
              data = Buffer.concat([data, chunkData]);
              if (data.length > dataLength) {
                  data = data.slice(0, dataLength);
              }
              return {
                  data: data,
                  dataLength: dataLength,
                  sequence: sequence
              };
          },
          getReducedResult: function (acc) {
              if (acc && acc.dataLength === acc.data.length) {
                  return acc.data;
              }
          }
      };
  };
  exports["default"] = createHIDframing;

  }(hidFraming$1));

  const hidFraming = /*@__PURE__*/getDefaultExportFromCjs(hidFraming$1);

  var re$5 = {exports: {}};

  // Note: this is the semver.org version of the spec that it implements
  // Not necessarily the package version of this code.
  const SEMVER_SPEC_VERSION = '2.0.0';

  const MAX_LENGTH$2 = 256;
  const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
    /* istanbul ignore next */ 9007199254740991;

  // Max safe segment length for coercion.
  const MAX_SAFE_COMPONENT_LENGTH = 16;

  var constants = {
    SEMVER_SPEC_VERSION,
    MAX_LENGTH: MAX_LENGTH$2,
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
    MAX_SAFE_COMPONENT_LENGTH
  };

  const debug$3 = (
    typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)
  ) ? (...args) => console.error('SEMVER', ...args)
    : () => {};

  var debug_1 = debug$3;

  (function (module, exports) {
  const { MAX_SAFE_COMPONENT_LENGTH } = constants;
  const debug = debug_1;
  exports = module.exports = {};

  // The actual regexps go on exports.re
  const re = exports.re = [];
  const src = exports.src = [];
  const t = exports.t = {};
  let R = 0;

  const createToken = (name, value, isGlobal) => {
    const index = R++;
    debug(index, value);
    t[name] = index;
    src[index] = value;
    re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
  };

  // The following Regular Expressions can be used for tokenizing,
  // validating, and parsing SemVer version strings.

  // ## Numeric Identifier
  // A single `0`, or a non-zero digit followed by zero or more digits.

  createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
  createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');

  // ## Non-numeric Identifier
  // Zero or more digits, followed by a letter or hyphen, and then zero or
  // more letters, digits, or hyphens.

  createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');

  // ## Main Version
  // Three dot-separated numeric identifiers.

  createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                     `(${src[t.NUMERICIDENTIFIER]})\\.` +
                     `(${src[t.NUMERICIDENTIFIER]})`);

  createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                          `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                          `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

  // ## Pre-release Version Identifier
  // A numeric identifier, or a non-numeric identifier.

  createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`);

  createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`);

  // ## Pre-release Version
  // Hyphen, followed by one or more dot-separated pre-release version
  // identifiers.

  createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

  createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

  // ## Build Metadata Identifier
  // Any combination of digits, letters, or hyphens.

  createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');

  // ## Build Metadata
  // Plus sign, followed by one or more period-separated build metadata
  // identifiers.

  createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

  // ## Full Version String
  // A main version, followed optionally by a pre-release version and
  // build metadata.

  // Note that the only major, minor, patch, and pre-release sections of
  // the version string are capturing groups.  The build metadata is not a
  // capturing group, because it should not ever be used in version
  // comparison.

  createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`);

  createToken('FULL', `^${src[t.FULLPLAIN]}$`);

  // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
  // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
  // common in the npm registry.
  createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`);

  createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

  createToken('GTLT', '((?:<|>)?=?)');

  // Something like "2.*" or "1.2.x".
  // Note that "x.x" is a valid xRange identifer, meaning "any version"
  // Only the first item is strictly required.
  createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

  createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                     `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                     `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                     `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                     `)?)?`);

  createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                          `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                          `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                          `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                          `)?)?`);

  createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
  createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

  // Coercion.
  // Extract anything that could conceivably be a part of a valid semver
  createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
                `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
                `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
                `(?:$|[^\\d])`);
  createToken('COERCERTL', src[t.COERCE], true);

  // Tilde ranges.
  // Meaning is "reasonably at or greater than"
  createToken('LONETILDE', '(?:~>?)');

  createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = '$1~';

  createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
  createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

  // Caret ranges.
  // Meaning is "at least and backwards compatible with"
  createToken('LONECARET', '(?:\\^)');

  createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = '$1^';

  createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
  createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

  // A simple gt/lt/eq thing, or just "" to indicate "any version"
  createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
  createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

  // An expression to strip any whitespace between the gtlt and the thing
  // it modifies, so that `> 1.2.3` ==> `>1.2.3`
  createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = '$1$2$3';

  // Something like `1.2.3 - 1.2.4`
  // Note that these all use the loose form, because they'll be
  // checked against either the strict or loose comparator form
  // later.
  createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                     `\\s+-\\s+` +
                     `(${src[t.XRANGEPLAIN]})` +
                     `\\s*$`);

  createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                          `\\s+-\\s+` +
                          `(${src[t.XRANGEPLAINLOOSE]})` +
                          `\\s*$`);

  // Star ranges basically just allow anything at all.
  createToken('STAR', '(<|>)?=?\\s*\\*');
  // >=0.0.0 is like a star
  createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$');
  createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$');
  }(re$5, re$5.exports));

  // parse out just the options we care about so we always get a consistent
  // obj with keys in a consistent order.
  const opts = ['includePrerelease', 'loose', 'rtl'];
  const parseOptions$4 = options =>
    !options ? {}
    : typeof options !== 'object' ? { loose: true }
    : opts.filter(k => options[k]).reduce((options, k) => {
      options[k] = true;
      return options
    }, {});
  var parseOptions_1 = parseOptions$4;

  const numeric = /^[0-9]+$/;
  const compareIdentifiers$1 = (a, b) => {
    const anum = numeric.test(a);
    const bnum = numeric.test(b);

    if (anum && bnum) {
      a = +a;
      b = +b;
    }

    return a === b ? 0
      : (anum && !bnum) ? -1
      : (bnum && !anum) ? 1
      : a < b ? -1
      : 1
  };

  const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);

  var identifiers = {
    compareIdentifiers: compareIdentifiers$1,
    rcompareIdentifiers
  };

  const debug$2 = debug_1;
  const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants;
  const { re: re$4, t: t$4 } = re$5.exports;

  const parseOptions$3 = parseOptions_1;
  const { compareIdentifiers } = identifiers;
  class SemVer$e {
    constructor (version, options) {
      options = parseOptions$3(options);

      if (version instanceof SemVer$e) {
        if (version.loose === !!options.loose &&
            version.includePrerelease === !!options.includePrerelease) {
          return version
        } else {
          version = version.version;
        }
      } else if (typeof version !== 'string') {
        throw new TypeError(`Invalid Version: ${version}`)
      }

      if (version.length > MAX_LENGTH$1) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH$1} characters`
        )
      }

      debug$2('SemVer', version, options);
      this.options = options;
      this.loose = !!options.loose;
      // this isn't actually relevant for versions, but keep it so that we
      // don't run into trouble passing this.options around.
      this.includePrerelease = !!options.includePrerelease;

      const m = version.trim().match(options.loose ? re$4[t$4.LOOSE] : re$4[t$4.FULL]);

      if (!m) {
        throw new TypeError(`Invalid Version: ${version}`)
      }

      this.raw = version;

      // these are actually numbers
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];

      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError('Invalid major version')
      }

      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError('Invalid minor version')
      }

      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError('Invalid patch version')
      }

      // numberify any prerelease numeric ids
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split('.').map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num
            }
          }
          return id
        });
      }

      this.build = m[5] ? m[5].split('.') : [];
      this.format();
    }

    format () {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join('.')}`;
      }
      return this.version
    }

    toString () {
      return this.version
    }

    compare (other) {
      debug$2('SemVer.compare', this.version, this.options, other);
      if (!(other instanceof SemVer$e)) {
        if (typeof other === 'string' && other === this.version) {
          return 0
        }
        other = new SemVer$e(other, this.options);
      }

      if (other.version === this.version) {
        return 0
      }

      return this.compareMain(other) || this.comparePre(other)
    }

    compareMain (other) {
      if (!(other instanceof SemVer$e)) {
        other = new SemVer$e(other, this.options);
      }

      return (
        compareIdentifiers(this.major, other.major) ||
        compareIdentifiers(this.minor, other.minor) ||
        compareIdentifiers(this.patch, other.patch)
      )
    }

    comparePre (other) {
      if (!(other instanceof SemVer$e)) {
        other = new SemVer$e(other, this.options);
      }

      // NOT having a prerelease is > having one
      if (this.prerelease.length && !other.prerelease.length) {
        return -1
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0
      }

      let i = 0;
      do {
        const a = this.prerelease[i];
        const b = other.prerelease[i];
        debug$2('prerelease compare', i, a, b);
        if (a === undefined && b === undefined) {
          return 0
        } else if (b === undefined) {
          return 1
        } else if (a === undefined) {
          return -1
        } else if (a === b) {
          continue
        } else {
          return compareIdentifiers(a, b)
        }
      } while (++i)
    }

    compareBuild (other) {
      if (!(other instanceof SemVer$e)) {
        other = new SemVer$e(other, this.options);
      }

      let i = 0;
      do {
        const a = this.build[i];
        const b = other.build[i];
        debug$2('prerelease compare', i, a, b);
        if (a === undefined && b === undefined) {
          return 0
        } else if (b === undefined) {
          return 1
        } else if (a === undefined) {
          return -1
        } else if (a === b) {
          continue
        } else {
          return compareIdentifiers(a, b)
        }
      } while (++i)
    }

    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc (release, identifier) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc('pre', identifier);
          break
        case 'preminor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc('pre', identifier);
          break
        case 'prepatch':
          // If this is already a prerelease, it will bump to the next version
          // drop any prereleases that might already exist, since they are not
          // relevant at this point.
          this.prerelease.length = 0;
          this.inc('patch', identifier);
          this.inc('pre', identifier);
          break
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case 'prerelease':
          if (this.prerelease.length === 0) {
            this.inc('patch', identifier);
          }
          this.inc('pre', identifier);
          break

        case 'major':
          // If this is a pre-major version, bump up to the same major version.
          // Otherwise increment major.
          // 1.0.0-5 bumps to 1.0.0
          // 1.1.0 bumps to 2.0.0
          if (
            this.minor !== 0 ||
            this.patch !== 0 ||
            this.prerelease.length === 0
          ) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break
        case 'minor':
          // If this is a pre-minor version, bump up to the same minor version.
          // Otherwise increment minor.
          // 1.2.0-5 bumps to 1.2.0
          // 1.2.1 bumps to 1.3.0
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break
        case 'patch':
          // If this is not a pre-release version, it will increment the patch.
          // If it is a pre-release it will bump up to the same patch version.
          // 1.2.0-5 patches to 1.2.0
          // 1.2.0 patches to 1.2.1
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case 'pre':
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            let i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === 'number') {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) {
              // didn't increment anything
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
            // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break

        default:
          throw new Error(`invalid increment argument: ${release}`)
      }
      this.format();
      this.raw = this.version;
      return this
    }
  }

  var semver$1 = SemVer$e;

  const {MAX_LENGTH} = constants;
  const { re: re$3, t: t$3 } = re$5.exports;
  const SemVer$d = semver$1;

  const parseOptions$2 = parseOptions_1;
  const parse$5 = (version, options) => {
    options = parseOptions$2(options);

    if (version instanceof SemVer$d) {
      return version
    }

    if (typeof version !== 'string') {
      return null
    }

    if (version.length > MAX_LENGTH) {
      return null
    }

    const r = options.loose ? re$3[t$3.LOOSE] : re$3[t$3.FULL];
    if (!r.test(version)) {
      return null
    }

    try {
      return new SemVer$d(version, options)
    } catch (er) {
      return null
    }
  };

  var parse_1 = parse$5;

  const parse$4 = parse_1;
  const valid$1 = (version, options) => {
    const v = parse$4(version, options);
    return v ? v.version : null
  };
  var valid_1 = valid$1;

  const parse$3 = parse_1;
  const clean = (version, options) => {
    const s = parse$3(version.trim().replace(/^[=v]+/, ''), options);
    return s ? s.version : null
  };
  var clean_1 = clean;

  const SemVer$c = semver$1;

  const inc = (version, release, options, identifier) => {
    if (typeof (options) === 'string') {
      identifier = options;
      options = undefined;
    }

    try {
      return new SemVer$c(version, options).inc(release, identifier).version
    } catch (er) {
      return null
    }
  };
  var inc_1 = inc;

  const SemVer$b = semver$1;
  const compare$a = (a, b, loose) =>
    new SemVer$b(a, loose).compare(new SemVer$b(b, loose));

  var compare_1 = compare$a;

  const compare$9 = compare_1;
  const eq$2 = (a, b, loose) => compare$9(a, b, loose) === 0;
  var eq_1 = eq$2;

  const parse$2 = parse_1;
  const eq$1 = eq_1;

  const diff = (version1, version2) => {
    if (eq$1(version1, version2)) {
      return null
    } else {
      const v1 = parse$2(version1);
      const v2 = parse$2(version2);
      const hasPre = v1.prerelease.length || v2.prerelease.length;
      const prefix = hasPre ? 'pre' : '';
      const defaultResult = hasPre ? 'prerelease' : '';
      for (const key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return prefix + key
          }
        }
      }
      return defaultResult // may be undefined
    }
  };
  var diff_1 = diff;

  const SemVer$a = semver$1;
  const major = (a, loose) => new SemVer$a(a, loose).major;
  var major_1 = major;

  const SemVer$9 = semver$1;
  const minor = (a, loose) => new SemVer$9(a, loose).minor;
  var minor_1 = minor;

  const SemVer$8 = semver$1;
  const patch = (a, loose) => new SemVer$8(a, loose).patch;
  var patch_1 = patch;

  const parse$1 = parse_1;
  const prerelease = (version, options) => {
    const parsed = parse$1(version, options);
    return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
  };
  var prerelease_1 = prerelease;

  const compare$8 = compare_1;
  const rcompare = (a, b, loose) => compare$8(b, a, loose);
  var rcompare_1 = rcompare;

  const compare$7 = compare_1;
  const compareLoose = (a, b) => compare$7(a, b, true);
  var compareLoose_1 = compareLoose;

  const SemVer$7 = semver$1;
  const compareBuild$2 = (a, b, loose) => {
    const versionA = new SemVer$7(a, loose);
    const versionB = new SemVer$7(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB)
  };
  var compareBuild_1 = compareBuild$2;

  const compareBuild$1 = compareBuild_1;
  const sort = (list, loose) => list.sort((a, b) => compareBuild$1(a, b, loose));
  var sort_1 = sort;

  const compareBuild = compareBuild_1;
  const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
  var rsort_1 = rsort;

  const compare$6 = compare_1;
  const gt$3 = (a, b, loose) => compare$6(a, b, loose) > 0;
  var gt_1 = gt$3;

  const compare$5 = compare_1;
  const lt$2 = (a, b, loose) => compare$5(a, b, loose) < 0;
  var lt_1 = lt$2;

  const compare$4 = compare_1;
  const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;
  var neq_1 = neq$1;

  const compare$3 = compare_1;
  const gte$2 = (a, b, loose) => compare$3(a, b, loose) >= 0;
  var gte_1 = gte$2;

  const compare$2 = compare_1;
  const lte$2 = (a, b, loose) => compare$2(a, b, loose) <= 0;
  var lte_1 = lte$2;

  const eq = eq_1;
  const neq = neq_1;
  const gt$2 = gt_1;
  const gte$1 = gte_1;
  const lt$1 = lt_1;
  const lte$1 = lte_1;

  const cmp$1 = (a, op, b, loose) => {
    switch (op) {
      case '===':
        if (typeof a === 'object')
          a = a.version;
        if (typeof b === 'object')
          b = b.version;
        return a === b

      case '!==':
        if (typeof a === 'object')
          a = a.version;
        if (typeof b === 'object')
          b = b.version;
        return a !== b

      case '':
      case '=':
      case '==':
        return eq(a, b, loose)

      case '!=':
        return neq(a, b, loose)

      case '>':
        return gt$2(a, b, loose)

      case '>=':
        return gte$1(a, b, loose)

      case '<':
        return lt$1(a, b, loose)

      case '<=':
        return lte$1(a, b, loose)

      default:
        throw new TypeError(`Invalid operator: ${op}`)
    }
  };
  var cmp_1 = cmp$1;

  const SemVer$6 = semver$1;
  const parse = parse_1;
  const {re: re$2, t: t$2} = re$5.exports;

  const coerce = (version, options) => {
    if (version instanceof SemVer$6) {
      return version
    }

    if (typeof version === 'number') {
      version = String(version);
    }

    if (typeof version !== 'string') {
      return null
    }

    options = options || {};

    let match = null;
    if (!options.rtl) {
      match = version.match(re$2[t$2.COERCE]);
    } else {
      // Find the right-most coercible string that does not share
      // a terminus with a more left-ward coercible string.
      // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
      //
      // Walk through the string checking with a /g regexp
      // Manually set the index so as to pick up overlapping matches.
      // Stop when we get a match that ends at the string end, since no
      // coercible string can be more right-ward without the same terminus.
      let next;
      while ((next = re$2[t$2.COERCERTL].exec(version)) &&
          (!match || match.index + match[0].length !== version.length)
      ) {
        if (!match ||
              next.index + next[0].length !== match.index + match[0].length) {
          match = next;
        }
        re$2[t$2.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
      }
      // leave it in a clean state
      re$2[t$2.COERCERTL].lastIndex = -1;
    }

    if (match === null)
      return null

    return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
  };
  var coerce_1 = coerce;

  var iterator = function (Yallist) {
    Yallist.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next) {
        yield walker.value;
      }
    };
  };

  var yallist = Yallist$1;

  Yallist$1.Node = Node;
  Yallist$1.create = Yallist$1;

  function Yallist$1 (list) {
    var self = this;
    if (!(self instanceof Yallist$1)) {
      self = new Yallist$1();
    }

    self.tail = null;
    self.head = null;
    self.length = 0;

    if (list && typeof list.forEach === 'function') {
      list.forEach(function (item) {
        self.push(item);
      });
    } else if (arguments.length > 0) {
      for (var i = 0, l = arguments.length; i < l; i++) {
        self.push(arguments[i]);
      }
    }

    return self
  }

  Yallist$1.prototype.removeNode = function (node) {
    if (node.list !== this) {
      throw new Error('removing node which does not belong to this list')
    }

    var next = node.next;
    var prev = node.prev;

    if (next) {
      next.prev = prev;
    }

    if (prev) {
      prev.next = next;
    }

    if (node === this.head) {
      this.head = next;
    }
    if (node === this.tail) {
      this.tail = prev;
    }

    node.list.length--;
    node.next = null;
    node.prev = null;
    node.list = null;

    return next
  };

  Yallist$1.prototype.unshiftNode = function (node) {
    if (node === this.head) {
      return
    }

    if (node.list) {
      node.list.removeNode(node);
    }

    var head = this.head;
    node.list = this;
    node.next = head;
    if (head) {
      head.prev = node;
    }

    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  };

  Yallist$1.prototype.pushNode = function (node) {
    if (node === this.tail) {
      return
    }

    if (node.list) {
      node.list.removeNode(node);
    }

    var tail = this.tail;
    node.list = this;
    node.prev = tail;
    if (tail) {
      tail.next = node;
    }

    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
    this.length++;
  };

  Yallist$1.prototype.push = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      push(this, arguments[i]);
    }
    return this.length
  };

  Yallist$1.prototype.unshift = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      unshift(this, arguments[i]);
    }
    return this.length
  };

  Yallist$1.prototype.pop = function () {
    if (!this.tail) {
      return undefined
    }

    var res = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
    return res
  };

  Yallist$1.prototype.shift = function () {
    if (!this.head) {
      return undefined
    }

    var res = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return res
  };

  Yallist$1.prototype.forEach = function (fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.head, i = 0; walker !== null; i++) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.next;
    }
  };

  Yallist$1.prototype.forEachReverse = function (fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.prev;
    }
  };

  Yallist$1.prototype.get = function (n) {
    for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
      // abort out of the list early if we hit a cycle
      walker = walker.next;
    }
    if (i === n && walker !== null) {
      return walker.value
    }
  };

  Yallist$1.prototype.getReverse = function (n) {
    for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
      // abort out of the list early if we hit a cycle
      walker = walker.prev;
    }
    if (i === n && walker !== null) {
      return walker.value
    }
  };

  Yallist$1.prototype.map = function (fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist$1();
    for (var walker = this.head; walker !== null;) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.next;
    }
    return res
  };

  Yallist$1.prototype.mapReverse = function (fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist$1();
    for (var walker = this.tail; walker !== null;) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.prev;
    }
    return res
  };

  Yallist$1.prototype.reduce = function (fn, initial) {
    var acc;
    var walker = this.head;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.head) {
      walker = this.head.next;
      acc = this.head.value;
    } else {
      throw new TypeError('Reduce of empty list with no initial value')
    }

    for (var i = 0; walker !== null; i++) {
      acc = fn(acc, walker.value, i);
      walker = walker.next;
    }

    return acc
  };

  Yallist$1.prototype.reduceReverse = function (fn, initial) {
    var acc;
    var walker = this.tail;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.tail) {
      walker = this.tail.prev;
      acc = this.tail.value;
    } else {
      throw new TypeError('Reduce of empty list with no initial value')
    }

    for (var i = this.length - 1; walker !== null; i--) {
      acc = fn(acc, walker.value, i);
      walker = walker.prev;
    }

    return acc
  };

  Yallist$1.prototype.toArray = function () {
    var arr = new Array(this.length);
    for (var i = 0, walker = this.head; walker !== null; i++) {
      arr[i] = walker.value;
      walker = walker.next;
    }
    return arr
  };

  Yallist$1.prototype.toArrayReverse = function () {
    var arr = new Array(this.length);
    for (var i = 0, walker = this.tail; walker !== null; i++) {
      arr[i] = walker.value;
      walker = walker.prev;
    }
    return arr
  };

  Yallist$1.prototype.slice = function (from, to) {
    to = to || this.length;
    if (to < 0) {
      to += this.length;
    }
    from = from || 0;
    if (from < 0) {
      from += this.length;
    }
    var ret = new Yallist$1();
    if (to < from || to < 0) {
      return ret
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
      walker = walker.next;
    }
    for (; walker !== null && i < to; i++, walker = walker.next) {
      ret.push(walker.value);
    }
    return ret
  };

  Yallist$1.prototype.sliceReverse = function (from, to) {
    to = to || this.length;
    if (to < 0) {
      to += this.length;
    }
    from = from || 0;
    if (from < 0) {
      from += this.length;
    }
    var ret = new Yallist$1();
    if (to < from || to < 0) {
      return ret
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
      walker = walker.prev;
    }
    for (; walker !== null && i > from; i--, walker = walker.prev) {
      ret.push(walker.value);
    }
    return ret
  };

  Yallist$1.prototype.splice = function (start, deleteCount, ...nodes) {
    if (start > this.length) {
      start = this.length - 1;
    }
    if (start < 0) {
      start = this.length + start;
    }

    for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
      walker = walker.next;
    }

    var ret = [];
    for (var i = 0; walker && i < deleteCount; i++) {
      ret.push(walker.value);
      walker = this.removeNode(walker);
    }
    if (walker === null) {
      walker = this.tail;
    }

    if (walker !== this.head && walker !== this.tail) {
      walker = walker.prev;
    }

    for (var i = 0; i < nodes.length; i++) {
      walker = insert(this, walker, nodes[i]);
    }
    return ret;
  };

  Yallist$1.prototype.reverse = function () {
    var head = this.head;
    var tail = this.tail;
    for (var walker = head; walker !== null; walker = walker.prev) {
      var p = walker.prev;
      walker.prev = walker.next;
      walker.next = p;
    }
    this.head = tail;
    this.tail = head;
    return this
  };

  function insert (self, node, value) {
    var inserted = node === self.head ?
      new Node(value, null, node, self) :
      new Node(value, node, node.next, self);

    if (inserted.next === null) {
      self.tail = inserted;
    }
    if (inserted.prev === null) {
      self.head = inserted;
    }

    self.length++;

    return inserted
  }

  function push (self, item) {
    self.tail = new Node(item, self.tail, null, self);
    if (!self.head) {
      self.head = self.tail;
    }
    self.length++;
  }

  function unshift (self, item) {
    self.head = new Node(item, null, self.head, self);
    if (!self.tail) {
      self.tail = self.head;
    }
    self.length++;
  }

  function Node (value, prev, next, list) {
    if (!(this instanceof Node)) {
      return new Node(value, prev, next, list)
    }

    this.list = list;
    this.value = value;

    if (prev) {
      prev.next = this;
      this.prev = prev;
    } else {
      this.prev = null;
    }

    if (next) {
      next.prev = this;
      this.next = next;
    } else {
      this.next = null;
    }
  }

  try {
    // add if support for Symbol.iterator is present
    iterator(Yallist$1);
  } catch (er) {}

  // A linked list to keep track of recently-used-ness
  const Yallist = yallist;

  const MAX = Symbol('max');
  const LENGTH = Symbol('length');
  const LENGTH_CALCULATOR = Symbol('lengthCalculator');
  const ALLOW_STALE = Symbol('allowStale');
  const MAX_AGE = Symbol('maxAge');
  const DISPOSE = Symbol('dispose');
  const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
  const LRU_LIST = Symbol('lruList');
  const CACHE = Symbol('cache');
  const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

  const naiveLength = () => 1;

  // lruList is a yallist where the head is the youngest
  // item, and the tail is the oldest.  the list contains the Hit
  // objects as the entries.
  // Each Hit object has a reference to its Yallist.Node.  This
  // never changes.
  //
  // cache is a Map (or PseudoMap) that matches the keys to
  // the Yallist.Node object.
  class LRUCache {
    constructor (options) {
      if (typeof options === 'number')
        options = { max: options };

      if (!options)
        options = {};

      if (options.max && (typeof options.max !== 'number' || options.max < 0))
        throw new TypeError('max must be a non-negative number')
      // Kind of weird to have a default max of Infinity, but oh well.
      this[MAX] = options.max || Infinity;

      const lc = options.length || naiveLength;
      this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc;
      this[ALLOW_STALE] = options.stale || false;
      if (options.maxAge && typeof options.maxAge !== 'number')
        throw new TypeError('maxAge must be a number')
      this[MAX_AGE] = options.maxAge || 0;
      this[DISPOSE] = options.dispose;
      this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
      this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
      this.reset();
    }

    // resize the cache when the max changes.
    set max (mL) {
      if (typeof mL !== 'number' || mL < 0)
        throw new TypeError('max must be a non-negative number')

      this[MAX] = mL || Infinity;
      trim(this);
    }
    get max () {
      return this[MAX]
    }

    set allowStale (allowStale) {
      this[ALLOW_STALE] = !!allowStale;
    }
    get allowStale () {
      return this[ALLOW_STALE]
    }

    set maxAge (mA) {
      if (typeof mA !== 'number')
        throw new TypeError('maxAge must be a non-negative number')

      this[MAX_AGE] = mA;
      trim(this);
    }
    get maxAge () {
      return this[MAX_AGE]
    }

    // resize the cache when the lengthCalculator changes.
    set lengthCalculator (lC) {
      if (typeof lC !== 'function')
        lC = naiveLength;

      if (lC !== this[LENGTH_CALCULATOR]) {
        this[LENGTH_CALCULATOR] = lC;
        this[LENGTH] = 0;
        this[LRU_LIST].forEach(hit => {
          hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
          this[LENGTH] += hit.length;
        });
      }
      trim(this);
    }
    get lengthCalculator () { return this[LENGTH_CALCULATOR] }

    get length () { return this[LENGTH] }
    get itemCount () { return this[LRU_LIST].length }

    rforEach (fn, thisp) {
      thisp = thisp || this;
      for (let walker = this[LRU_LIST].tail; walker !== null;) {
        const prev = walker.prev;
        forEachStep(this, fn, walker, thisp);
        walker = prev;
      }
    }

    forEach (fn, thisp) {
      thisp = thisp || this;
      for (let walker = this[LRU_LIST].head; walker !== null;) {
        const next = walker.next;
        forEachStep(this, fn, walker, thisp);
        walker = next;
      }
    }

    keys () {
      return this[LRU_LIST].toArray().map(k => k.key)
    }

    values () {
      return this[LRU_LIST].toArray().map(k => k.value)
    }

    reset () {
      if (this[DISPOSE] &&
          this[LRU_LIST] &&
          this[LRU_LIST].length) {
        this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
      }

      this[CACHE] = new Map(); // hash of items by key
      this[LRU_LIST] = new Yallist(); // list of items in order of use recency
      this[LENGTH] = 0; // length of items in the list
    }

    dump () {
      return this[LRU_LIST].map(hit =>
        isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter(h => h)
    }

    dumpLru () {
      return this[LRU_LIST]
    }

    set (key, value, maxAge) {
      maxAge = maxAge || this[MAX_AGE];

      if (maxAge && typeof maxAge !== 'number')
        throw new TypeError('maxAge must be a number')

      const now = maxAge ? Date.now() : 0;
      const len = this[LENGTH_CALCULATOR](value, key);

      if (this[CACHE].has(key)) {
        if (len > this[MAX]) {
          del(this, this[CACHE].get(key));
          return false
        }

        const node = this[CACHE].get(key);
        const item = node.value;

        // dispose of the old one before overwriting
        // split out into 2 ifs for better coverage tracking
        if (this[DISPOSE]) {
          if (!this[NO_DISPOSE_ON_SET])
            this[DISPOSE](key, item.value);
        }

        item.now = now;
        item.maxAge = maxAge;
        item.value = value;
        this[LENGTH] += len - item.length;
        item.length = len;
        this.get(key);
        trim(this);
        return true
      }

      const hit = new Entry(key, value, len, now, maxAge);

      // oversized objects fall out of cache automatically.
      if (hit.length > this[MAX]) {
        if (this[DISPOSE])
          this[DISPOSE](key, value);

        return false
      }

      this[LENGTH] += hit.length;
      this[LRU_LIST].unshift(hit);
      this[CACHE].set(key, this[LRU_LIST].head);
      trim(this);
      return true
    }

    has (key) {
      if (!this[CACHE].has(key)) return false
      const hit = this[CACHE].get(key).value;
      return !isStale(this, hit)
    }

    get (key) {
      return get(this, key, true)
    }

    peek (key) {
      return get(this, key, false)
    }

    pop () {
      const node = this[LRU_LIST].tail;
      if (!node)
        return null

      del(this, node);
      return node.value
    }

    del (key) {
      del(this, this[CACHE].get(key));
    }

    load (arr) {
      // reset the cache
      this.reset();

      const now = Date.now();
      // A previous serialized cache has the most recent items first
      for (let l = arr.length - 1; l >= 0; l--) {
        const hit = arr[l];
        const expiresAt = hit.e || 0;
        if (expiresAt === 0)
          // the item was created without expiration in a non aged cache
          this.set(hit.k, hit.v);
        else {
          const maxAge = expiresAt - now;
          // dont add already expired items
          if (maxAge > 0) {
            this.set(hit.k, hit.v, maxAge);
          }
        }
      }
    }

    prune () {
      this[CACHE].forEach((value, key) => get(this, key, false));
    }
  }

  const get = (self, key, doUse) => {
    const node = self[CACHE].get(key);
    if (node) {
      const hit = node.value;
      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE])
          return undefined
      } else {
        if (doUse) {
          if (self[UPDATE_AGE_ON_GET])
            node.value.now = Date.now();
          self[LRU_LIST].unshiftNode(node);
        }
      }
      return hit.value
    }
  };

  const isStale = (self, hit) => {
    if (!hit || (!hit.maxAge && !self[MAX_AGE]))
      return false

    const diff = Date.now() - hit.now;
    return hit.maxAge ? diff > hit.maxAge
      : self[MAX_AGE] && (diff > self[MAX_AGE])
  };

  const trim = self => {
    if (self[LENGTH] > self[MAX]) {
      for (let walker = self[LRU_LIST].tail;
        self[LENGTH] > self[MAX] && walker !== null;) {
        // We know that we're about to delete this one, and also
        // what the next least recently used key will be, so just
        // go ahead and set it now.
        const prev = walker.prev;
        del(self, walker);
        walker = prev;
      }
    }
  };

  const del = (self, node) => {
    if (node) {
      const hit = node.value;
      if (self[DISPOSE])
        self[DISPOSE](hit.key, hit.value);

      self[LENGTH] -= hit.length;
      self[CACHE].delete(hit.key);
      self[LRU_LIST].removeNode(node);
    }
  };

  class Entry {
    constructor (key, value, length, now, maxAge) {
      this.key = key;
      this.value = value;
      this.length = length;
      this.now = now;
      this.maxAge = maxAge || 0;
    }
  }

  const forEachStep = (self, fn, node, thisp) => {
    let hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE])
        hit = undefined;
    }
    if (hit)
      fn.call(thisp, hit.value, hit.key, self);
  };

  var lruCache = LRUCache;

  // hoisted class for cyclic dependency
  class Range$a {
    constructor (range, options) {
      options = parseOptions$1(options);

      if (range instanceof Range$a) {
        if (
          range.loose === !!options.loose &&
          range.includePrerelease === !!options.includePrerelease
        ) {
          return range
        } else {
          return new Range$a(range.raw, options)
        }
      }

      if (range instanceof Comparator$3) {
        // just put it in the set and return
        this.raw = range.value;
        this.set = [[range]];
        this.format();
        return this
      }

      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;

      // First, split based on boolean or ||
      this.raw = range;
      this.set = range
        .split(/\s*\|\|\s*/)
        // map the range to a 2d array of comparators
        .map(range => this.parseRange(range.trim()))
        // throw out any comparator lists that are empty
        // this generally means that it was not a valid range, which is allowed
        // in loose mode, but will still throw if the WHOLE range is invalid.
        .filter(c => c.length);

      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${range}`)
      }

      // if we have any that are not the null set, throw out null sets.
      if (this.set.length > 1) {
        // keep the first one, in case they're all null sets
        const first = this.set[0];
        this.set = this.set.filter(c => !isNullSet(c[0]));
        if (this.set.length === 0)
          this.set = [first];
        else if (this.set.length > 1) {
          // if we have any that are *, then the range is just *
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break
            }
          }
        }
      }

      this.format();
    }

    format () {
      this.range = this.set
        .map((comps) => {
          return comps.join(' ').trim()
        })
        .join('||')
        .trim();
      return this.range
    }

    toString () {
      return this.range
    }

    parseRange (range) {
      range = range.trim();

      // memoize range parsing for performance.
      // this is a very hot path, and fully deterministic.
      const memoOpts = Object.keys(this.options).join(',');
      const memoKey = `parseRange:${memoOpts}:${range}`;
      const cached = cache.get(memoKey);
      if (cached)
        return cached

      const loose = this.options.loose;
      // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
      const hr = loose ? re$1[t$1.HYPHENRANGELOOSE] : re$1[t$1.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug$1('hyphen replace', range);
      // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
      range = range.replace(re$1[t$1.COMPARATORTRIM], comparatorTrimReplace);
      debug$1('comparator trim', range, re$1[t$1.COMPARATORTRIM]);

      // `~ 1.2.3` => `~1.2.3`
      range = range.replace(re$1[t$1.TILDETRIM], tildeTrimReplace);

      // `^ 1.2.3` => `^1.2.3`
      range = range.replace(re$1[t$1.CARETTRIM], caretTrimReplace);

      // normalize spaces
      range = range.split(/\s+/).join(' ');

      // At this point, the range is completely trimmed and
      // ready to be split into comparators.

      const compRe = loose ? re$1[t$1.COMPARATORLOOSE] : re$1[t$1.COMPARATOR];
      const rangeList = range
        .split(' ')
        .map(comp => parseComparator(comp, this.options))
        .join(' ')
        .split(/\s+/)
        // >=0.0.0 is equivalent to *
        .map(comp => replaceGTE0(comp, this.options))
        // in loose mode, throw out any that are not valid comparators
        .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true)
        .map(comp => new Comparator$3(comp, this.options));

      // if any comparators are the null set, then replace with JUST null set
      // if more than one comparator, remove any * comparators
      // also, don't include the same comparator more than once
      rangeList.length;
      const rangeMap = new Map();
      for (const comp of rangeList) {
        if (isNullSet(comp))
          return [comp]
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has(''))
        rangeMap.delete('');

      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result
    }

    intersects (range, options) {
      if (!(range instanceof Range$a)) {
        throw new TypeError('a Range is required')
      }

      return this.set.some((thisComparators) => {
        return (
          isSatisfiable(thisComparators, options) &&
          range.set.some((rangeComparators) => {
            return (
              isSatisfiable(rangeComparators, options) &&
              thisComparators.every((thisComparator) => {
                return rangeComparators.every((rangeComparator) => {
                  return thisComparator.intersects(rangeComparator, options)
                })
              })
            )
          })
        )
      })
    }

    // if ANY of the sets match ALL of its comparators, then pass
    test (version) {
      if (!version) {
        return false
      }

      if (typeof version === 'string') {
        try {
          version = new SemVer$5(version, this.options);
        } catch (er) {
          return false
        }
      }

      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true
        }
      }
      return false
    }
  }
  var range = Range$a;

  const LRU = lruCache;
  const cache = new LRU({ max: 1000 });

  const parseOptions$1 = parseOptions_1;
  const Comparator$3 = comparator;
  const debug$1 = debug_1;
  const SemVer$5 = semver$1;
  const {
    re: re$1,
    t: t$1,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = re$5.exports;

  const isNullSet = c => c.value === '<0.0.0-0';
  const isAny = c => c.value === '';

  // take a set of comparators and determine whether there
  // exists a version which can satisfy it
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();

    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options)
      });

      testComparator = remainingComparators.pop();
    }

    return result
  };

  // comprised of xranges, tildes, stars, and gtlt's at this point.
  // already replaced the hyphen ranges
  // turn into a set of JUST comparators.
  const parseComparator = (comp, options) => {
    debug$1('comp', comp, options);
    comp = replaceCarets(comp, options);
    debug$1('caret', comp);
    comp = replaceTildes(comp, options);
    debug$1('tildes', comp);
    comp = replaceXRanges(comp, options);
    debug$1('xrange', comp);
    comp = replaceStars(comp, options);
    debug$1('stars', comp);
    return comp
  };

  const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

  // ~, ~> --> * (any, kinda silly)
  // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
  // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
  // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
  // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
  // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
  const replaceTildes = (comp, options) =>
    comp.trim().split(/\s+/).map((comp) => {
      return replaceTilde(comp, options)
    }).join(' ');

  const replaceTilde = (comp, options) => {
    const r = options.loose ? re$1[t$1.TILDELOOSE] : re$1[t$1.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug$1('tilde', comp, _, M, m, p, pr);
      let ret;

      if (isX(M)) {
        ret = '';
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        // ~1.2 == >=1.2.0 <1.3.0-0
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug$1('replaceTilde pr', pr);
        ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`;
      } else {
        // ~1.2.3 == >=1.2.3 <1.3.0-0
        ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`;
      }

      debug$1('tilde return', ret);
      return ret
    })
  };

  // ^ --> * (any, kinda silly)
  // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
  // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
  // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
  // ^1.2.3 --> >=1.2.3 <2.0.0-0
  // ^1.2.0 --> >=1.2.0 <2.0.0-0
  const replaceCarets = (comp, options) =>
    comp.trim().split(/\s+/).map((comp) => {
      return replaceCaret(comp, options)
    }).join(' ');

  const replaceCaret = (comp, options) => {
    debug$1('caret', comp, options);
    const r = options.loose ? re$1[t$1.CARETLOOSE] : re$1[t$1.CARET];
    const z = options.includePrerelease ? '-0' : '';
    return comp.replace(r, (_, M, m, p, pr) => {
      debug$1('caret', comp, _, M, m, p, pr);
      let ret;

      if (isX(M)) {
        ret = '';
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === '0') {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug$1('replaceCaret pr', pr);
        if (M === '0') {
          if (m === '0') {
            ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`;
        }
      } else {
        debug$1('no pr');
        if (M === '0') {
          if (m === '0') {
            ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`;
        }
      }

      debug$1('caret return', ret);
      return ret
    })
  };

  const replaceXRanges = (comp, options) => {
    debug$1('replaceXRanges', comp, options);
    return comp.split(/\s+/).map((comp) => {
      return replaceXRange(comp, options)
    }).join(' ')
  };

  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re$1[t$1.XRANGELOOSE] : re$1[t$1.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug$1('xRange', comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;

      if (gtlt === '=' && anyX) {
        gtlt = '';
      }

      // if we're including prereleases in the match, then we need
      // to fix this to -0, the lowest possible prerelease value
      pr = options.includePrerelease ? '-0' : '';

      if (xM) {
        if (gtlt === '>' || gtlt === '<') {
          // nothing is allowed
          ret = '<0.0.0-0';
        } else {
          // nothing is forbidden
          ret = '*';
        }
      } else if (gtlt && anyX) {
        // we know patch is an x, because we have any x at all.
        // replace X with 0
        if (xm) {
          m = 0;
        }
        p = 0;

        if (gtlt === '>') {
          // >1 => >=2.0.0
          // >1.2 => >=1.3.0
          gtlt = '>=';
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === '<=') {
          // <=0.7.x is actually <0.8.0, since any 0.7.x should
          // pass.  Similarly, <=7.x is actually <8.0.0, etc.
          gtlt = '<';
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }

        if (gtlt === '<')
          pr = '-0';

        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`;
      }

      debug$1('xRange return', ret);

      return ret
    })
  };

  // Because * is AND-ed with everything else in the comparator,
  // and '' means "any version", just remove the *s entirely.
  const replaceStars = (comp, options) => {
    debug$1('replaceStars', comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re$1[t$1.STAR], '')
  };

  const replaceGTE0 = (comp, options) => {
    debug$1('replaceGTE0', comp, options);
    return comp.trim()
      .replace(re$1[options.includePrerelease ? t$1.GTE0PRE : t$1.GTE0], '')
  };

  // This function is passed to string.replace(re[t.HYPHENRANGE])
  // M, m, patch, prerelease, build
  // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
  // 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
  // 1.2 - 3.4 => >=1.2.0 <3.5.0-0
  const hyphenReplace = incPr => ($0,
    from, fM, fm, fp, fpr, fb,
    to, tM, tm, tp, tpr, tb) => {
    if (isX(fM)) {
      from = '';
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? '-0' : ''}`;
    }

    if (isX(tM)) {
      to = '';
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }

    return (`${from} ${to}`).trim()
  };

  const testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false
      }
    }

    if (version.prerelease.length && !options.includePrerelease) {
      // Find the set of versions that are allowed to have prereleases
      // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
      // That should allow `1.2.3-pr.2` to pass.
      // However, `1.2.4-alpha.notready` should NOT be allowed,
      // even though it's within the range set by the comparators.
      for (let i = 0; i < set.length; i++) {
        debug$1(set[i].semver);
        if (set[i].semver === Comparator$3.ANY) {
          continue
        }

        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version.major &&
              allowed.minor === version.minor &&
              allowed.patch === version.patch) {
            return true
          }
        }
      }

      // Version has a -pre, but it's not one of the ones we like.
      return false
    }

    return true
  };

  const ANY$2 = Symbol('SemVer ANY');
  // hoisted class for cyclic dependency
  class Comparator$2 {
    static get ANY () {
      return ANY$2
    }
    constructor (comp, options) {
      options = parseOptions(options);

      if (comp instanceof Comparator$2) {
        if (comp.loose === !!options.loose) {
          return comp
        } else {
          comp = comp.value;
        }
      }

      debug('comparator', comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);

      if (this.semver === ANY$2) {
        this.value = '';
      } else {
        this.value = this.operator + this.semver.version;
      }

      debug('comp', this);
    }

    parse (comp) {
      const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      const m = comp.match(r);

      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`)
      }

      this.operator = m[1] !== undefined ? m[1] : '';
      if (this.operator === '=') {
        this.operator = '';
      }

      // if it literally is just '>' or '' then allow anything.
      if (!m[2]) {
        this.semver = ANY$2;
      } else {
        this.semver = new SemVer$4(m[2], this.options.loose);
      }
    }

    toString () {
      return this.value
    }

    test (version) {
      debug('Comparator.test', version, this.options.loose);

      if (this.semver === ANY$2 || version === ANY$2) {
        return true
      }

      if (typeof version === 'string') {
        try {
          version = new SemVer$4(version, this.options);
        } catch (er) {
          return false
        }
      }

      return cmp(version, this.operator, this.semver, this.options)
    }

    intersects (comp, options) {
      if (!(comp instanceof Comparator$2)) {
        throw new TypeError('a Comparator is required')
      }

      if (!options || typeof options !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (this.operator === '') {
        if (this.value === '') {
          return true
        }
        return new Range$9(comp.value, options).test(this.value)
      } else if (comp.operator === '') {
        if (comp.value === '') {
          return true
        }
        return new Range$9(this.value, options).test(comp.semver)
      }

      const sameDirectionIncreasing =
        (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '>=' || comp.operator === '>');
      const sameDirectionDecreasing =
        (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '<=' || comp.operator === '<');
      const sameSemVer = this.semver.version === comp.semver.version;
      const differentDirectionsInclusive =
        (this.operator === '>=' || this.operator === '<=') &&
        (comp.operator === '>=' || comp.operator === '<=');
      const oppositeDirectionsLessThan =
        cmp(this.semver, '<', comp.semver, options) &&
        (this.operator === '>=' || this.operator === '>') &&
          (comp.operator === '<=' || comp.operator === '<');
      const oppositeDirectionsGreaterThan =
        cmp(this.semver, '>', comp.semver, options) &&
        (this.operator === '<=' || this.operator === '<') &&
          (comp.operator === '>=' || comp.operator === '>');

      return (
        sameDirectionIncreasing ||
        sameDirectionDecreasing ||
        (sameSemVer && differentDirectionsInclusive) ||
        oppositeDirectionsLessThan ||
        oppositeDirectionsGreaterThan
      )
    }
  }

  var comparator = Comparator$2;

  const parseOptions = parseOptions_1;
  const {re, t} = re$5.exports;
  const cmp = cmp_1;
  const debug = debug_1;
  const SemVer$4 = semver$1;
  const Range$9 = range;

  const Range$8 = range;
  const satisfies$3 = (version, range, options) => {
    try {
      range = new Range$8(range, options);
    } catch (er) {
      return false
    }
    return range.test(version)
  };
  var satisfies_1 = satisfies$3;

  const Range$7 = range;

  // Mostly just for testing and legacy API reasons
  const toComparators = (range, options) =>
    new Range$7(range, options).set
      .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));

  var toComparators_1 = toComparators;

  const SemVer$3 = semver$1;
  const Range$6 = range;

  const maxSatisfying = (versions, range, options) => {
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range$6(range, options);
    } catch (er) {
      return null
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        // satisfies(v, range, options)
        if (!max || maxSV.compare(v) === -1) {
          // compare(max, v, true)
          max = v;
          maxSV = new SemVer$3(max, options);
        }
      }
    });
    return max
  };
  var maxSatisfying_1 = maxSatisfying;

  const SemVer$2 = semver$1;
  const Range$5 = range;
  const minSatisfying = (versions, range, options) => {
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range$5(range, options);
    } catch (er) {
      return null
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        // satisfies(v, range, options)
        if (!min || minSV.compare(v) === 1) {
          // compare(min, v, true)
          min = v;
          minSV = new SemVer$2(min, options);
        }
      }
    });
    return min
  };
  var minSatisfying_1 = minSatisfying;

  const SemVer$1 = semver$1;
  const Range$4 = range;
  const gt$1 = gt_1;

  const minVersion = (range, loose) => {
    range = new Range$4(range, loose);

    let minver = new SemVer$1('0.0.0');
    if (range.test(minver)) {
      return minver
    }

    minver = new SemVer$1('0.0.0-0');
    if (range.test(minver)) {
      return minver
    }

    minver = null;
    for (let i = 0; i < range.set.length; ++i) {
      const comparators = range.set[i];

      let setMin = null;
      comparators.forEach((comparator) => {
        // Clone to avoid manipulating the comparator's semver object.
        const compver = new SemVer$1(comparator.semver.version);
        switch (comparator.operator) {
          case '>':
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
            /* fallthrough */
          case '':
          case '>=':
            if (!setMin || gt$1(compver, setMin)) {
              setMin = compver;
            }
            break
          case '<':
          case '<=':
            /* Ignore maximum versions */
            break
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${comparator.operator}`)
        }
      });
      if (setMin && (!minver || gt$1(minver, setMin)))
        minver = setMin;
    }

    if (minver && range.test(minver)) {
      return minver
    }

    return null
  };
  var minVersion_1 = minVersion;

  const Range$3 = range;
  const validRange = (range, options) => {
    try {
      // Return '*' instead of '' so that truthiness works.
      // This will throw if it's invalid anyway
      return new Range$3(range, options).range || '*'
    } catch (er) {
      return null
    }
  };
  var valid = validRange;

  const SemVer = semver$1;
  const Comparator$1 = comparator;
  const {ANY: ANY$1} = Comparator$1;
  const Range$2 = range;
  const satisfies$2 = satisfies_1;
  const gt = gt_1;
  const lt = lt_1;
  const lte = lte_1;
  const gte = gte_1;

  const outside$2 = (version, range, hilo, options) => {
    version = new SemVer(version, options);
    range = new Range$2(range, options);

    let gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case '>':
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = '>';
        ecomp = '>=';
        break
      case '<':
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = '<';
        ecomp = '<=';
        break
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"')
    }

    // If it satisfies the range it is not outside
    if (satisfies$2(version, range, options)) {
      return false
    }

    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.

    for (let i = 0; i < range.set.length; ++i) {
      const comparators = range.set[i];

      let high = null;
      let low = null;

      comparators.forEach((comparator) => {
        if (comparator.semver === ANY$1) {
          comparator = new Comparator$1('>=0.0.0');
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, options)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, options)) {
          low = comparator;
        }
      });

      // If the edge version comparator has a operator then our version
      // isn't outside it
      if (high.operator === comp || high.operator === ecomp) {
        return false
      }

      // If the lowest version comparator has an operator and our version
      // is less than it then it isn't higher than the range
      if ((!low.operator || low.operator === comp) &&
          ltefn(version, low.semver)) {
        return false
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false
      }
    }
    return true
  };

  var outside_1 = outside$2;

  // Determine if version is greater than all the versions possible in the range.
  const outside$1 = outside_1;
  const gtr = (version, range, options) => outside$1(version, range, '>', options);
  var gtr_1 = gtr;

  const outside = outside_1;
  // Determine if version is less than all the versions possible in the range
  const ltr = (version, range, options) => outside(version, range, '<', options);
  var ltr_1 = ltr;

  const Range$1 = range;
  const intersects = (r1, r2, options) => {
    r1 = new Range$1(r1, options);
    r2 = new Range$1(r2, options);
    return r1.intersects(r2)
  };
  var intersects_1 = intersects;

  // given a set of versions and a range, create a "simplified" range
  // that includes the same versions that the original range does
  // If the original range is shorter than the simplified one, return that.
  const satisfies$1 = satisfies_1;
  const compare$1 = compare_1;
  var simplify = (versions, range, options) => {
    const set = [];
    let min = null;
    let prev = null;
    const v = versions.sort((a, b) => compare$1(a, b, options));
    for (const version of v) {
      const included = satisfies$1(version, range, options);
      if (included) {
        prev = version;
        if (!min)
          min = version;
      } else {
        if (prev) {
          set.push([min, prev]);
        }
        prev = null;
        min = null;
      }
    }
    if (min)
      set.push([min, null]);

    const ranges = [];
    for (const [min, max] of set) {
      if (min === max)
        ranges.push(min);
      else if (!max && min === v[0])
        ranges.push('*');
      else if (!max)
        ranges.push(`>=${min}`);
      else if (min === v[0])
        ranges.push(`<=${max}`);
      else
        ranges.push(`${min} - ${max}`);
    }
    const simplified = ranges.join(' || ');
    const original = typeof range.raw === 'string' ? range.raw : String(range);
    return simplified.length < original.length ? simplified : range
  };

  const Range = range;
  const Comparator = comparator;
  const { ANY } = Comparator;
  const satisfies = satisfies_1;
  const compare = compare_1;

  // Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
  // - Every simple range `r1, r2, ...` is a null set, OR
  // - Every simple range `r1, r2, ...` which is not a null set is a subset of
  //   some `R1, R2, ...`
  //
  // Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
  // - If c is only the ANY comparator
  //   - If C is only the ANY comparator, return true
  //   - Else if in prerelease mode, return false
  //   - else replace c with `[>=0.0.0]`
  // - If C is only the ANY comparator
  //   - if in prerelease mode, return true
  //   - else replace C with `[>=0.0.0]`
  // - Let EQ be the set of = comparators in c
  // - If EQ is more than one, return true (null set)
  // - Let GT be the highest > or >= comparator in c
  // - Let LT be the lowest < or <= comparator in c
  // - If GT and LT, and GT.semver > LT.semver, return true (null set)
  // - If any C is a = range, and GT or LT are set, return false
  // - If EQ
  //   - If GT, and EQ does not satisfy GT, return true (null set)
  //   - If LT, and EQ does not satisfy LT, return true (null set)
  //   - If EQ satisfies every C, return true
  //   - Else return false
  // - If GT
  //   - If GT.semver is lower than any > or >= comp in C, return false
  //   - If GT is >=, and GT.semver does not satisfy every C, return false
  //   - If GT.semver has a prerelease, and not in prerelease mode
  //     - If no C has a prerelease and the GT.semver tuple, return false
  // - If LT
  //   - If LT.semver is greater than any < or <= comp in C, return false
  //   - If LT is <=, and LT.semver does not satisfy every C, return false
  //   - If GT.semver has a prerelease, and not in prerelease mode
  //     - If no C has a prerelease and the LT.semver tuple, return false
  // - Else return true

  const subset = (sub, dom, options = {}) => {
    if (sub === dom)
      return true

    sub = new Range(sub, options);
    dom = new Range(dom, options);
    let sawNonNull = false;

    OUTER: for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub)
          continue OUTER
      }
      // the null set is a subset of everything, but null simple ranges in
      // a complex range should be ignored.  so if we saw a non-null range,
      // then we know this isn't a subset, but if EVERY simple range was null,
      // then it is a subset.
      if (sawNonNull)
        return false
    }
    return true
  };

  const simpleSubset = (sub, dom, options) => {
    if (sub === dom)
      return true

    if (sub.length === 1 && sub[0].semver === ANY) {
      if (dom.length === 1 && dom[0].semver === ANY)
        return true
      else if (options.includePrerelease)
        sub = [ new Comparator('>=0.0.0-0') ];
      else
        sub = [ new Comparator('>=0.0.0') ];
    }

    if (dom.length === 1 && dom[0].semver === ANY) {
      if (options.includePrerelease)
        return true
      else
        dom = [ new Comparator('>=0.0.0') ];
    }

    const eqSet = new Set();
    let gt, lt;
    for (const c of sub) {
      if (c.operator === '>' || c.operator === '>=')
        gt = higherGT(gt, c, options);
      else if (c.operator === '<' || c.operator === '<=')
        lt = lowerLT(lt, c, options);
      else
        eqSet.add(c.semver);
    }

    if (eqSet.size > 1)
      return null

    let gtltComp;
    if (gt && lt) {
      gtltComp = compare(gt.semver, lt.semver, options);
      if (gtltComp > 0)
        return null
      else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<='))
        return null
    }

    // will iterate one or zero times
    for (const eq of eqSet) {
      if (gt && !satisfies(eq, String(gt), options))
        return null

      if (lt && !satisfies(eq, String(lt), options))
        return null

      for (const c of dom) {
        if (!satisfies(eq, String(c), options))
          return false
      }

      return true
    }

    let higher, lower;
    let hasDomLT, hasDomGT;
    // if the subset has a prerelease, we need a comparator in the superset
    // with the same tuple and a prerelease, or it's not a subset
    let needDomLTPre = lt &&
      !options.includePrerelease &&
      lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt &&
      !options.includePrerelease &&
      gt.semver.prerelease.length ? gt.semver : false;
    // exception: <1.2.3-0 is the same as <1.2.3
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
        lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
      needDomLTPre = false;
    }

    for (const c of dom) {
      hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
      hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
      if (gt) {
        if (needDomGTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length &&
              c.semver.major === needDomGTPre.major &&
              c.semver.minor === needDomGTPre.minor &&
              c.semver.patch === needDomGTPre.patch) {
            needDomGTPre = false;
          }
        }
        if (c.operator === '>' || c.operator === '>=') {
          higher = higherGT(gt, c, options);
          if (higher === c && higher !== gt)
            return false
        } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options))
          return false
      }
      if (lt) {
        if (needDomLTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length &&
              c.semver.major === needDomLTPre.major &&
              c.semver.minor === needDomLTPre.minor &&
              c.semver.patch === needDomLTPre.patch) {
            needDomLTPre = false;
          }
        }
        if (c.operator === '<' || c.operator === '<=') {
          lower = lowerLT(lt, c, options);
          if (lower === c && lower !== lt)
            return false
        } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options))
          return false
      }
      if (!c.operator && (lt || gt) && gtltComp !== 0)
        return false
    }

    // if there was a < or >, and nothing in the dom, then must be false
    // UNLESS it was limited by another range in the other direction.
    // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
    if (gt && hasDomLT && !lt && gtltComp !== 0)
      return false

    if (lt && hasDomGT && !gt && gtltComp !== 0)
      return false

    // we needed a prerelease range in a specific tuple, but didn't get one
    // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
    // because it includes prereleases in the 1.2.3 tuple
    if (needDomGTPre || needDomLTPre)
      return false

    return true
  };

  // >=1.2.3 is lower than >1.2.3
  const higherGT = (a, b, options) => {
    if (!a)
      return b
    const comp = compare(a.semver, b.semver, options);
    return comp > 0 ? a
      : comp < 0 ? b
      : b.operator === '>' && a.operator === '>=' ? b
      : a
  };

  // <=1.2.3 is higher than <1.2.3
  const lowerLT = (a, b, options) => {
    if (!a)
      return b
    const comp = compare(a.semver, b.semver, options);
    return comp < 0 ? a
      : comp > 0 ? b
      : b.operator === '<' && a.operator === '<=' ? b
      : a
  };

  var subset_1 = subset;

  // just pre-load all the stuff that index.js lazily exports
  const internalRe = re$5.exports;
  var semver = {
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
    SemVer: semver$1,
    compareIdentifiers: identifiers.compareIdentifiers,
    rcompareIdentifiers: identifiers.rcompareIdentifiers,
    parse: parse_1,
    valid: valid_1,
    clean: clean_1,
    inc: inc_1,
    diff: diff_1,
    major: major_1,
    minor: minor_1,
    patch: patch_1,
    prerelease: prerelease_1,
    compare: compare_1,
    rcompare: rcompare_1,
    compareLoose: compareLoose_1,
    compareBuild: compareBuild_1,
    sort: sort_1,
    rsort: rsort_1,
    gt: gt_1,
    lt: lt_1,
    eq: eq_1,
    neq: neq_1,
    gte: gte_1,
    lte: lte_1,
    cmp: cmp_1,
    coerce: coerce_1,
    Comparator: comparator,
    Range: range,
    satisfies: satisfies_1,
    toComparators: toComparators_1,
    maxSatisfying: maxSatisfying_1,
    minSatisfying: minSatisfying_1,
    minVersion: minVersion_1,
    validRange: valid,
    outside: outside_1,
    gtr: gtr_1,
    ltr: ltr_1,
    intersects: intersects_1,
    simplifyRange: simplify,
    subset: subset_1,
  };

  var __assign = (undefined && undefined.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  var _a;
  var DeviceModelId;
  (function (DeviceModelId) {
      DeviceModelId["blue"] = "blue";
      DeviceModelId["nanoS"] = "nanoS";
      DeviceModelId["nanoSP"] = "nanoSP";
      DeviceModelId["nanoX"] = "nanoX";
  })(DeviceModelId || (DeviceModelId = {}));
  var devices = (_a = {},
      _a[DeviceModelId.blue] = {
          id: DeviceModelId.blue,
          productName: "Ledger Blue",
          productIdMM: 0x00,
          legacyUsbProductId: 0x0000,
          usbOnly: true,
          memorySize: 480 * 1024,
          masks: [0x31000000, 0x31010000],
          getBlockSize: function (_firwareVersion) { return 4 * 1024; }
      },
      _a[DeviceModelId.nanoS] = {
          id: DeviceModelId.nanoS,
          productName: "Ledger Nano S",
          productIdMM: 0x10,
          legacyUsbProductId: 0x0001,
          usbOnly: true,
          memorySize: 320 * 1024,
          masks: [0x31100000],
          getBlockSize: function (firmwareVersion) {
              var _a;
              return semver.lt((_a = semver.coerce(firmwareVersion)) !== null && _a !== void 0 ? _a : "", "2.0.0")
                  ? 4 * 1024
                  : 2 * 1024;
          }
      },
      _a[DeviceModelId.nanoSP] = {
          id: DeviceModelId.nanoSP,
          productName: "Ledger Nano SP",
          productIdMM: 0x50,
          legacyUsbProductId: 0x0005,
          usbOnly: true,
          memorySize: 1533 * 1024,
          masks: [0x33100000],
          getBlockSize: function (_firmwareVersion) { return 512; }
      },
      _a[DeviceModelId.nanoX] = {
          id: DeviceModelId.nanoX,
          productName: "Ledger Nano X",
          productIdMM: 0x40,
          legacyUsbProductId: 0x0004,
          usbOnly: false,
          memorySize: 2 * 1024 * 1024,
          masks: [0x33000000],
          getBlockSize: function (_firwareVersion) { return 4 * 1024; },
          bluetoothSpec: [
              {
                  // this is the legacy one (prototype version). we will eventually drop it.
                  serviceUuid: "d973f2e0-b19e-11e2-9e96-0800200c9a66",
                  notifyUuid: "d973f2e1-b19e-11e2-9e96-0800200c9a66",
                  writeUuid: "d973f2e2-b19e-11e2-9e96-0800200c9a66"
              },
              {
                  serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
                  notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
                  writeUuid: "13d63400-2c97-0004-0002-4c6564676572"
              },
          ]
      },
      _a);
  ({
      Blue: DeviceModelId.blue,
      "Nano S": DeviceModelId.nanoS,
      "Nano X": DeviceModelId.nanoX
  });
  var devicesList = Object.values(devices);
  /**
   *
   */
  var ledgerUSBVendorId = 0x2c97;
  /**
   *
   */
  var identifyUSBProductId = function (usbProductId) {
      var legacy = devicesList.find(function (d) { return d.legacyUsbProductId === usbProductId; });
      if (legacy)
          return legacy;
      var mm = usbProductId >> 8;
      var deviceModel = devicesList.find(function (d) { return d.productIdMM === mm; });
      return deviceModel;
  };
  var bluetoothServices = [];
  var serviceUuidToInfos = {};
  for (var id$1 in devices) {
      var deviceModel = devices[id$1];
      var bluetoothSpec = deviceModel.bluetoothSpec;
      if (bluetoothSpec) {
          for (var i = 0; i < bluetoothSpec.length; i++) {
              var spec = bluetoothSpec[i];
              bluetoothServices.push(spec.serviceUuid);
              serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = __assign({ deviceModel: deviceModel }, spec);
          }
      }
  }

  var id = 0;
  var subscribers = [];
  /**
   * log something
   * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
   * @param message a clear message of the log associated to the type
   */
  var log = function (type, message, data) {
      var obj = {
          type: type,
          id: String(++id),
          date: new Date()
      };
      if (message)
          obj.message = message;
      if (data)
          obj.data = data;
      dispatch(obj);
  };
  /**
   * listen to logs.
   * @param cb that is called for each future log() with the Log object
   * @return a function that can be called to unsubscribe the listener
   */
  var listen = function (cb) {
      subscribers.push(cb);
      return function () {
          var i = subscribers.indexOf(cb);
          if (i !== -1) {
              // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
              subscribers[i] = subscribers[subscribers.length - 1];
              subscribers.pop();
          }
      };
  };
  function dispatch(log) {
      for (var i = 0; i < subscribers.length; i++) {
          try {
              subscribers[i](log);
          }
          catch (e) {
              console.error(e);
          }
      }
  }
  if (typeof window !== "undefined") {
      window.__ledgerLogsListen = listen;
  }

  var __extends$1 = (undefined && undefined.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          if (typeof b !== "function" && b !== null)
              throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  };
  var __read = (undefined && undefined.__read) || function (o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  };
  var ledgerDevices$1 = [
      {
          vendorId: ledgerUSBVendorId
      },
  ];
  var isSupported$1 = function () {
      return Promise.resolve(!!(window.navigator && window.navigator.hid));
  };
  var getHID = function () {
      // $FlowFixMe
      var hid = navigator.hid;
      if (!hid)
          throw new TransportError("navigator.hid is not supported", "HIDNotSupported");
      return hid;
  };
  function requestLedgerDevices() {
      return __awaiter$2(this, void 0, void 0, function () {
          var device;
          return __generator$2(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, getHID().requestDevice({
                          filters: ledgerDevices$1
                      })];
                  case 1:
                      device = _a.sent();
                      if (Array.isArray(device))
                          return [2 /*return*/, device];
                      return [2 /*return*/, [device]];
              }
          });
      });
  }
  function getLedgerDevices$1() {
      return __awaiter$2(this, void 0, void 0, function () {
          var devices;
          return __generator$2(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, getHID().getDevices()];
                  case 1:
                      devices = _a.sent();
                      return [2 /*return*/, devices.filter(function (d) { return d.vendorId === ledgerUSBVendorId; })];
              }
          });
      });
  }
  function getFirstLedgerDevice$1() {
      return __awaiter$2(this, void 0, void 0, function () {
          var existingDevices, devices;
          return __generator$2(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, getLedgerDevices$1()];
                  case 1:
                      existingDevices = _a.sent();
                      if (existingDevices.length > 0)
                          return [2 /*return*/, existingDevices[0]];
                      return [4 /*yield*/, requestLedgerDevices()];
                  case 2:
                      devices = _a.sent();
                      return [2 /*return*/, devices[0]];
              }
          });
      });
  }
  /**
   * WebHID Transport implementation
   * @example
   * import TransportWebHID from "@ledgerhq/hw-transport-webhid";
   * ...
   * TransportWebHID.create().then(transport => ...)
   */
  var TransportWebHID = /** @class */ (function (_super) {
      __extends$1(TransportWebHID, _super);
      function TransportWebHID(device) {
          var _this = _super.call(this) || this;
          _this.channel = Math.floor(Math.random() * 0xffff);
          _this.packetSize = 64;
          _this.inputs = [];
          _this.read = function () {
              if (_this.inputs.length) {
                  return Promise.resolve(_this.inputs.shift());
              }
              return new Promise(function (success) {
                  _this.inputCallback = success;
              });
          };
          _this.onInputReport = function (e) {
              var buffer = Buffer.from(e.data.buffer);
              if (_this.inputCallback) {
                  _this.inputCallback(buffer);
                  _this.inputCallback = null;
              }
              else {
                  _this.inputs.push(buffer);
              }
          };
          _this._disconnectEmitted = false;
          _this._emitDisconnect = function (e) {
              if (_this._disconnectEmitted)
                  return;
              _this._disconnectEmitted = true;
              _this.emit("disconnect", e);
          };
          /**
           * Exchange with the device using APDU protocol.
           * @param apdu
           * @returns a promise of apdu response
           */
          _this.exchange = function (apdu) { return __awaiter$2(_this, void 0, void 0, function () {
              var b;
              var _this = this;
              return __generator$2(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.exchangeAtomicImpl(function () { return __awaiter$2(_this, void 0, void 0, function () {
                              var _a, channel, packetSize, framing, blocks, i, result, acc, buffer;
                              return __generator$2(this, function (_b) {
                                  switch (_b.label) {
                                      case 0:
                                          _a = this, channel = _a.channel, packetSize = _a.packetSize;
                                          log("apdu", "=> " + apdu.toString("hex"));
                                          framing = hidFraming(channel, packetSize);
                                          blocks = framing.makeBlocks(apdu);
                                          i = 0;
                                          _b.label = 1;
                                      case 1:
                                          if (!(i < blocks.length)) return [3 /*break*/, 4];
                                          return [4 /*yield*/, this.device.sendReport(0, blocks[i])];
                                      case 2:
                                          _b.sent();
                                          _b.label = 3;
                                      case 3:
                                          i++;
                                          return [3 /*break*/, 1];
                                      case 4:
                                          if (!!(result = framing.getReducedResult(acc))) return [3 /*break*/, 6];
                                          return [4 /*yield*/, this.read()];
                                      case 5:
                                          buffer = _b.sent();
                                          acc = framing.reduceResponse(acc, buffer);
                                          return [3 /*break*/, 4];
                                      case 6:
                                          log("apdu", "<= " + result.toString("hex"));
                                          return [2 /*return*/, result];
                                  }
                              });
                          }); })["catch"](function (e) {
                              if (e && e.message && e.message.includes("write")) {
                                  _this._emitDisconnect(e);
                                  throw new DisconnectedDeviceDuringOperation(e.message);
                              }
                              throw e;
                          })];
                      case 1:
                          b = _a.sent();
                          return [2 /*return*/, b];
                  }
              });
          }); };
          _this.device = device;
          _this.deviceModel =
              typeof device.productId === "number"
                  ? identifyUSBProductId(device.productId)
                  : undefined;
          device.addEventListener("inputreport", _this.onInputReport);
          return _this;
      }
      /**
       * Similar to create() except it will always display the device permission (even if some devices are already accepted).
       */
      TransportWebHID.request = function () {
          return __awaiter$2(this, void 0, void 0, function () {
              var _a, device;
              return __generator$2(this, function (_b) {
                  switch (_b.label) {
                      case 0: return [4 /*yield*/, requestLedgerDevices()];
                      case 1:
                          _a = __read.apply(void 0, [_b.sent(), 1]), device = _a[0];
                          return [2 /*return*/, TransportWebHID.open(device)];
                  }
              });
          });
      };
      /**
       * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
       */
      TransportWebHID.openConnected = function () {
          return __awaiter$2(this, void 0, void 0, function () {
              var devices;
              return __generator$2(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, getLedgerDevices$1()];
                      case 1:
                          devices = _a.sent();
                          if (devices.length === 0)
                              return [2 /*return*/, null];
                          return [2 /*return*/, TransportWebHID.open(devices[0])];
                  }
              });
          });
      };
      /**
       * Create a Ledger transport with a HIDDevice
       */
      TransportWebHID.open = function (device) {
          return __awaiter$2(this, void 0, void 0, function () {
              var transport, onDisconnect;
              return __generator$2(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, device.open()];
                      case 1:
                          _a.sent();
                          transport = new TransportWebHID(device);
                          onDisconnect = function (e) {
                              if (device === e.device) {
                                  getHID().removeEventListener("disconnect", onDisconnect);
                                  transport._emitDisconnect(new DisconnectedDevice());
                              }
                          };
                          getHID().addEventListener("disconnect", onDisconnect);
                          return [2 /*return*/, transport];
                  }
              });
          });
      };
      /**
       * Release the transport device
       */
      TransportWebHID.prototype.close = function () {
          return __awaiter$2(this, void 0, void 0, function () {
              return __generator$2(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.exchangeBusyPromise];
                      case 1:
                          _a.sent();
                          this.device.removeEventListener("inputreport", this.onInputReport);
                          return [4 /*yield*/, this.device.close()];
                      case 2:
                          _a.sent();
                          return [2 /*return*/];
                  }
              });
          });
      };
      TransportWebHID.prototype.setScrambleKey = function () { };
      /**
       * Check if WebUSB transport is supported.
       */
      TransportWebHID.isSupported = isSupported$1;
      /**
       * List the WebUSB devices that was previously authorized by the user.
       */
      TransportWebHID.list = getLedgerDevices$1;
      /**
       * Actively listen to WebUSB devices and emit ONE device
       * that was either accepted before, if not it will trigger the native permission UI.
       *
       * Important: it must be called in the context of a UI click!
       */
      TransportWebHID.listen = function (observer) {
          var unsubscribed = false;
          getFirstLedgerDevice$1().then(function (device) {
              if (!device) {
                  observer.error(new TransportOpenUserCancelled("Access denied to use Ledger device"));
              }
              else if (!unsubscribed) {
                  var deviceModel = typeof device.productId === "number"
                      ? identifyUSBProductId(device.productId)
                      : undefined;
                  observer.next({
                      type: "add",
                      descriptor: device,
                      deviceModel: deviceModel
                  });
                  observer.complete();
              }
          }, function (error) {
              observer.error(new TransportOpenUserCancelled(error.message));
          });
          function unsubscribe() {
              unsubscribed = true;
          }
          return {
              unsubscribe: unsubscribe
          };
      };
      return TransportWebHID;
  }(Transport));
  const LedgerWebHid = TransportWebHID;

  var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  };
  var ledgerDevices = [
      {
          vendorId: ledgerUSBVendorId
      },
  ];
  function requestLedgerDevice() {
      return __awaiter$1(this, void 0, void 0, function () {
          var device;
          return __generator$1(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, navigator.usb.requestDevice({
                          filters: ledgerDevices
                      })];
                  case 1:
                      device = _a.sent();
                      return [2 /*return*/, device];
              }
          });
      });
  }
  function getLedgerDevices() {
      return __awaiter$1(this, void 0, void 0, function () {
          var devices;
          return __generator$1(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, navigator.usb.getDevices()];
                  case 1:
                      devices = _a.sent();
                      return [2 /*return*/, devices.filter(function (d) { return d.vendorId === ledgerUSBVendorId; })];
              }
          });
      });
  }
  function getFirstLedgerDevice() {
      return __awaiter$1(this, void 0, void 0, function () {
          var existingDevices;
          return __generator$1(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, getLedgerDevices()];
                  case 1:
                      existingDevices = _a.sent();
                      if (existingDevices.length > 0)
                          return [2 /*return*/, existingDevices[0]];
                      return [2 /*return*/, requestLedgerDevice()];
              }
          });
      });
  }
  var isSupported = function () {
      return Promise.resolve(!!navigator &&
          !!navigator.usb &&
          typeof navigator.usb.getDevices === "function");
  };

  var __extends = (undefined && undefined.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          if (typeof b !== "function" && b !== null)
              throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  };
  var configurationValue = 1;
  var endpointNumber = 3;
  /**
   * WebUSB Transport implementation
   * @example
   * import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
   * ...
   * TransportWebUSB.create().then(transport => ...)
   */
  var TransportWebUSB = /** @class */ (function (_super) {
      __extends(TransportWebUSB, _super);
      function TransportWebUSB(device, interfaceNumber) {
          var _this = _super.call(this) || this;
          _this.channel = Math.floor(Math.random() * 0xffff);
          _this.packetSize = 64;
          _this._disconnectEmitted = false;
          _this._emitDisconnect = function (e) {
              if (_this._disconnectEmitted)
                  return;
              _this._disconnectEmitted = true;
              _this.emit("disconnect", e);
          };
          _this.device = device;
          _this.interfaceNumber = interfaceNumber;
          _this.deviceModel = identifyUSBProductId(device.productId);
          return _this;
      }
      /**
       * Similar to create() except it will always display the device permission (even if some devices are already accepted).
       */
      TransportWebUSB.request = function () {
          return __awaiter(this, void 0, void 0, function () {
              var device;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, requestLedgerDevice()];
                      case 1:
                          device = _a.sent();
                          return [2 /*return*/, TransportWebUSB.open(device)];
                  }
              });
          });
      };
      /**
       * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
       */
      TransportWebUSB.openConnected = function () {
          return __awaiter(this, void 0, void 0, function () {
              var devices;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, getLedgerDevices()];
                      case 1:
                          devices = _a.sent();
                          if (devices.length === 0)
                              return [2 /*return*/, null];
                          return [2 /*return*/, TransportWebUSB.open(devices[0])];
                  }
              });
          });
      };
      /**
       * Create a Ledger transport with a USBDevice
       */
      TransportWebUSB.open = function (device) {
          return __awaiter(this, void 0, void 0, function () {
              var iface, interfaceNumber, e_1, transport, onDisconnect;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, device.open()];
                      case 1:
                          _a.sent();
                          if (!(device.configuration === null)) return [3 /*break*/, 3];
                          return [4 /*yield*/, device.selectConfiguration(configurationValue)];
                      case 2:
                          _a.sent();
                          _a.label = 3;
                      case 3: return [4 /*yield*/, gracefullyResetDevice(device)];
                      case 4:
                          _a.sent();
                          iface = device.configurations[0].interfaces.find(function (_a) {
                              var alternates = _a.alternates;
                              return alternates.some(function (a) { return a.interfaceClass === 255; });
                          });
                          if (!iface) {
                              throw new TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
                          }
                          interfaceNumber = iface.interfaceNumber;
                          _a.label = 5;
                      case 5:
                          _a.trys.push([5, 7, , 9]);
                          return [4 /*yield*/, device.claimInterface(interfaceNumber)];
                      case 6:
                          _a.sent();
                          return [3 /*break*/, 9];
                      case 7:
                          e_1 = _a.sent();
                          return [4 /*yield*/, device.close()];
                      case 8:
                          _a.sent();
                          throw new TransportInterfaceNotAvailable(e_1.message);
                      case 9:
                          transport = new TransportWebUSB(device, interfaceNumber);
                          onDisconnect = function (e) {
                              if (device === e.device) {
                                  // $FlowFixMe
                                  navigator.usb.removeEventListener("disconnect", onDisconnect);
                                  transport._emitDisconnect(new DisconnectedDevice());
                              }
                          };
                          // $FlowFixMe
                          navigator.usb.addEventListener("disconnect", onDisconnect);
                          return [2 /*return*/, transport];
                  }
              });
          });
      };
      /**
       * Release the transport device
       */
      TransportWebUSB.prototype.close = function () {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.exchangeBusyPromise];
                      case 1:
                          _a.sent();
                          return [4 /*yield*/, this.device.releaseInterface(this.interfaceNumber)];
                      case 2:
                          _a.sent();
                          return [4 /*yield*/, gracefullyResetDevice(this.device)];
                      case 3:
                          _a.sent();
                          return [4 /*yield*/, this.device.close()];
                      case 4:
                          _a.sent();
                          return [2 /*return*/];
                  }
              });
          });
      };
      /**
       * Exchange with the device using APDU protocol.
       * @param apdu
       * @returns a promise of apdu response
       */
      TransportWebUSB.prototype.exchange = function (apdu) {
          return __awaiter(this, void 0, void 0, function () {
              var b;
              var _this = this;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, this.exchangeAtomicImpl(function () { return __awaiter(_this, void 0, void 0, function () {
                              var _a, channel, packetSize, framing, blocks, i, result, acc, r, buffer;
                              return __generator(this, function (_b) {
                                  switch (_b.label) {
                                      case 0:
                                          _a = this, channel = _a.channel, packetSize = _a.packetSize;
                                          log("apdu", "=> " + apdu.toString("hex"));
                                          framing = hidFraming(channel, packetSize);
                                          blocks = framing.makeBlocks(apdu);
                                          i = 0;
                                          _b.label = 1;
                                      case 1:
                                          if (!(i < blocks.length)) return [3 /*break*/, 4];
                                          return [4 /*yield*/, this.device.transferOut(endpointNumber, blocks[i])];
                                      case 2:
                                          _b.sent();
                                          _b.label = 3;
                                      case 3:
                                          i++;
                                          return [3 /*break*/, 1];
                                      case 4:
                                          if (!!(result = framing.getReducedResult(acc))) return [3 /*break*/, 6];
                                          return [4 /*yield*/, this.device.transferIn(endpointNumber, packetSize)];
                                      case 5:
                                          r = _b.sent();
                                          buffer = Buffer.from(r.data.buffer);
                                          acc = framing.reduceResponse(acc, buffer);
                                          return [3 /*break*/, 4];
                                      case 6:
                                          log("apdu", "<= " + result.toString("hex"));
                                          return [2 /*return*/, result];
                                  }
                              });
                          }); })["catch"](function (e) {
                              if (e && e.message && e.message.includes("disconnected")) {
                                  _this._emitDisconnect(e);
                                  throw new DisconnectedDeviceDuringOperation(e.message);
                              }
                              throw e;
                          })];
                      case 1:
                          b = _a.sent();
                          return [2 /*return*/, b];
                  }
              });
          });
      };
      TransportWebUSB.prototype.setScrambleKey = function () { };
      /**
       * Check if WebUSB transport is supported.
       */
      TransportWebUSB.isSupported = isSupported;
      /**
       * List the WebUSB devices that was previously authorized by the user.
       */
      TransportWebUSB.list = getLedgerDevices;
      /**
       * Actively listen to WebUSB devices and emit ONE device
       * that was either accepted before, if not it will trigger the native permission UI.
       *
       * Important: it must be called in the context of a UI click!
       */
      TransportWebUSB.listen = function (observer) {
          var unsubscribed = false;
          getFirstLedgerDevice().then(function (device) {
              if (!unsubscribed) {
                  var deviceModel = identifyUSBProductId(device.productId);
                  observer.next({
                      type: "add",
                      descriptor: device,
                      deviceModel: deviceModel
                  });
                  observer.complete();
              }
          }, function (error) {
              if (window.DOMException &&
                  error instanceof window.DOMException &&
                  error.code === 18) {
                  observer.error(new TransportWebUSBGestureRequired(error.message));
              }
              else {
                  observer.error(new TransportOpenUserCancelled(error.message));
              }
          });
          function unsubscribe() {
              unsubscribed = true;
          }
          return {
              unsubscribe: unsubscribe
          };
      };
      return TransportWebUSB;
  }(Transport));
  const LedgerWebUsb = TransportWebUSB;
  function gracefullyResetDevice(device) {
      return __awaiter(this, void 0, void 0, function () {
          var err_1;
          return __generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      _a.trys.push([0, 2, , 3]);
                      return [4 /*yield*/, device.reset()];
                  case 1:
                      _a.sent();
                      return [3 /*break*/, 3];
                  case 2:
                      err_1 = _a.sent();
                      console.warn(err_1);
                      return [3 /*break*/, 3];
                  case 3: return [2 /*return*/];
              }
          });
      });
  }

  // Copyright 2017-2021 @axia-js/hw-ledger authors & contributors
  const transports = [// deprecated
  // import LedgerU2F from '@ledgerhq/hw-transport-u2f';
  // {
  //   create: (): Promise<Transport> =>
  //     LedgerU2F.create(),
  //   type: 'u2f'
  // },
  {
    create: () => LedgerWebUsb.create(),
    type: 'webusb'
  }, {
    create: () => LedgerWebHid.create(),
    type: 'hid'
  }];

  // Copyright 2017-2021 @axia-js/hw-ledger authors & contributors
  // SPDX-License-Identifier: Apache-2.0
  const LEDGER_DEFAULT_ACCOUNT = 0x80000000;
  const LEDGER_DEFAULT_CHANGE = 0x80000000;
  const LEDGER_DEFAULT_INDEX = 0x80000000;
  const LEDGER_SUCCESS_CODE = 0x9000;

  var interopRequireDefault = {exports: {}};

  (function (module) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  module.exports = _interopRequireDefault;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(interopRequireDefault));

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });

    define(Gp, "toString", function() {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  }(runtime));

  var regenerator = runtime.exports;

  var toConsumableArray = {exports: {}};

  var arrayWithoutHoles = {exports: {}};

  var arrayLikeToArray = {exports: {}};

  (function (module) {
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  module.exports = _arrayLikeToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(arrayLikeToArray));

  (function (module) {
  var arrayLikeToArray$1 = arrayLikeToArray.exports;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray$1(arr);
  }

  module.exports = _arrayWithoutHoles;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(arrayWithoutHoles));

  var iterableToArray = {exports: {}};

  (function (module) {
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  module.exports = _iterableToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(iterableToArray));

  var unsupportedIterableToArray = {exports: {}};

  (function (module) {
  var arrayLikeToArray$1 = arrayLikeToArray.exports;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray$1(o, minLen);
  }

  module.exports = _unsupportedIterableToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(unsupportedIterableToArray));

  var nonIterableSpread = {exports: {}};

  (function (module) {
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  module.exports = _nonIterableSpread;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(nonIterableSpread));

  (function (module) {
  var arrayWithoutHoles$1 = arrayWithoutHoles.exports;

  var iterableToArray$1 = iterableToArray.exports;

  var unsupportedIterableToArray$1 = unsupportedIterableToArray.exports;

  var nonIterableSpread$1 = nonIterableSpread.exports;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles$1(arr) || iterableToArray$1(arr) || unsupportedIterableToArray$1(arr) || nonIterableSpread$1();
  }

  module.exports = _toConsumableArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(toConsumableArray));

  var asyncToGenerator = {exports: {}};

  (function (module) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  module.exports = _asyncToGenerator;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(asyncToGenerator));

  var classCallCheck = {exports: {}};

  (function (module) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  module.exports = _classCallCheck;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(classCallCheck));

  var createClass = {exports: {}};

  (function (module) {
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  module.exports = _createClass;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(createClass));

  var _typeof = {exports: {}};

  (function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  }(_typeof));

  var _interopRequireDefault$1 = interopRequireDefault.exports;

  var _regenerator$1 = _interopRequireDefault$1(regenerator);

  var _asyncToGenerator2$1 = _interopRequireDefault$1(asyncToGenerator.exports);

  var _typeof2 = _interopRequireDefault$1(_typeof.exports);

  var INS$1 = {
    GET_VERSION: 0x00
  };
  var CHUNK_SIZE = 250;
  var PAYLOAD_TYPE = {
    INIT: 0x00,
    ADD: 0x01,
    LAST: 0x02
  };
  var P1_VALUES = {
    ONLY_RETRIEVE: 0x00,
    SHOW_ADDRESS_IN_DEVICE: 0x01
  };
  var SCHEME = {
    ED25519: 0x00,
    SR25519: 0x01
  };
  var ERROR_CODE = {
    NoError: 0x9000
  };
  var ERROR_DESCRIPTION = {
    1: 'U2F: Unknown',
    2: 'U2F: Bad request',
    3: 'U2F: Configuration unsupported',
    4: 'U2F: Device Ineligible',
    5: 'U2F: Timeout',
    14: 'Timeout',
    0x9000: 'No errors',
    0x9001: 'Device is busy',
    0x6802: 'Error deriving keys',
    0x6400: 'Execution Error',
    0x6700: 'Wrong Length',
    0x6982: 'Empty Buffer',
    0x6983: 'Output buffer too small',
    0x6984: 'Data is invalid',
    0x6985: 'Conditions not satisfied',
    0x6986: 'Transaction rejected',
    0x6a80: 'Bad key handle',
    0x6b00: 'Invalid P1/P2',
    0x6d00: 'Instruction not supported',
    0x6e00: 'App does not seem to be open',
    0x6f00: 'Unknown error',
    0x6f01: 'Sign/verify error'
  };

  function errorCodeToString(statusCode) {
    if (statusCode in ERROR_DESCRIPTION) return ERROR_DESCRIPTION[statusCode];
    return "Unknown Status Code: ".concat(statusCode);
  }

  function isDict(v) {
    return (0, _typeof2.default)(v) === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
  }

  function processErrorResponse(response) {
    if (response) {
      if (isDict(response)) {
        if (Object.prototype.hasOwnProperty.call(response, 'statusCode')) {
          return {
            return_code: response.statusCode,
            error_message: errorCodeToString(response.statusCode)
          };
        }

        if (Object.prototype.hasOwnProperty.call(response, 'return_code') && Object.prototype.hasOwnProperty.call(response, 'error_message')) {
          return response;
        }
      }

      return {
        return_code: 0xffff,
        error_message: response.toString()
      };
    }

    return {
      return_code: 0xffff,
      error_message: response.toString()
    };
  }

  function getVersion(_x, _x2) {
    return _getVersion.apply(this, arguments);
  }

  function _getVersion() {
    _getVersion = (0, _asyncToGenerator2$1.default)( /*#__PURE__*/_regenerator$1.default.mark(function _callee(transport, cla) {
      return _regenerator$1.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", transport.send(cla, INS$1.GET_VERSION, 0, 0).then(function (response) {
                var errorCodeData = response.slice(-2);
                var returnCode = errorCodeData[0] * 256 + errorCodeData[1]; // 12 bytes + 2 error code

                // 12 bytes + 2 error code
                if (response.length !== 14) {
                  return {
                    return_code: 0x6984,
                    error_message: errorCodeToString(0x6984)
                  };
                }

                var major = response[1] * 256 + response[2];
                var minor = response[3] * 256 + response[4];
                var patch = response[5] * 256 + response[6];
                var deviceLocked = response[7] === 1; // eslint-disable-next-line no-bitwise

                // eslint-disable-next-line no-bitwise
                var targetId = (response[8] << 24) + (response[9] << 16) + (response[10] << 8) + (response[11] << 0);
                return {
                  return_code: returnCode,
                  error_message: errorCodeToString(returnCode),
                  // ///
                  test_mode: response[0] !== 0,
                  major: major,
                  minor: minor,
                  patch: patch,
                  deviceLocked: deviceLocked,
                  target_id: targetId.toString(16)
                };
              }, processErrorResponse));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getVersion.apply(this, arguments);
  }

  var common = {
    CHUNK_SIZE: CHUNK_SIZE,
    INS: INS$1,
    PAYLOAD_TYPE: PAYLOAD_TYPE,
    P1_VALUES: P1_VALUES,
    SCHEME: SCHEME,
    ERROR_CODE: ERROR_CODE,
    getVersion: getVersion,
    processErrorResponse: processErrorResponse,
    errorCodeToString: errorCodeToString
  };

  var CLA = {
    AXIA: 0x90,
    POLYMESH: 0x91,
    DOCK: 0x92,
    CENTRIFUGE: 0x93,
    EDGEWARE: 0x94,
    EQUILIBRIUM: 0x95,
    STATEMINT: 0x96,
    STATEMINE: 0x97,
    NODLE: 0x98,
    KUSAMA: 0x99,
    GENSHIRO: 0x9e,
    SORA: 0x9f
  }; // https://github.com/satoshilabs/slips/blob/master/slip-0044.md

  var SLIP0044 = {
    AXIA: 0x80000162,
    POLYMESH: 0x80000253,
    DOCK: 0x80000252,
    CENTRIFUGE: 0x800002eb,
    EDGEWARE: 0x8000020b,
    EQUILIBRIUM: 0x85f5e0fd,
    GENSHIRO: 0x85f5e0fc,
    STATEMINT: 0x80000162,
    STATEMINE: 0x800001b2,
    NODLE: 0x800003eb,
    KUSAMA: 0x800001b2,
    SORA: 0x80000269
  };
  var SS58_ADDR_TYPE = {
    AXIA: 0,
    KUSAMA: 2,
    EDGEWARE: 7,
    POLYMESH: 12,
    DOCK: 22,
    //mainnet
    CENTRIFUGE: 36,
    EQUILIBRIUM: 67,
    GENSHIRO: 67,
    STATEMINT: 0,
    STATEMINE: 2,
    NODLE: 37,
    SORA: 69
  };
  var config = {
    CLA: CLA,
    SLIP0044: SLIP0044,
    SS58_ADDR_TYPE: SS58_ADDR_TYPE
  };

  const require$$12 = /*@__PURE__*/getAugmentedNamespace(empty);

  var _interopRequireDefault = interopRequireDefault.exports;

  var _regenerator = _interopRequireDefault(regenerator);

  var _toConsumableArray2 = _interopRequireDefault(toConsumableArray.exports);

  var _asyncToGenerator2 = _interopRequireDefault(asyncToGenerator.exports);

  var _classCallCheck2 = _interopRequireDefault(classCallCheck.exports);

  var _createClass2 = _interopRequireDefault(createClass.exports);

  var _common = common;

  var _config = config;

  /** ******************************************************************************
   *  (c) 2019 ZondaX GmbH
   *  (c) 2016-2017 Ledger
   *
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   ******************************************************************************* */
  var bip39 = require$$12;

  var hash = require$$12;

  var bip32ed25519 = require$$12;

  var bs58 = require$$12;

  var blake = require$$12;

  var HDPATH_0_DEFAULT = 0x8000002c;
  var INS = {
    GET_VERSION: 0x00,
    GET_ADDR: 0x01,
    SIGN: 0x02,
    // Allow list related commands
    ALLOWLIST_GET_PUBKEY: 0x90,
    ALLOWLIST_SET_PUBKEY: 0x91,
    ALLOWLIST_GET_HASH: 0x92,
    ALLOWLIST_UPLOAD: 0x93
  };

  var SubstrateApp = /*#__PURE__*/function () {
    function SubstrateApp(transport, cla, slip0044) {
      (0, _classCallCheck2.default)(this, SubstrateApp);

      if (!transport) {
        throw new Error('Transport has not been defined');
      }

      this.transport = transport;
      this.cla = cla;
      this.slip0044 = slip0044;
    }

    (0, _createClass2.default)(SubstrateApp, [{
      key: "getVersion",
      value: function () {
        var _getVersion2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return (0, _common.getVersion)(this.transport, this.cla);

                case 3:
                  return _context.abrupt("return", _context.sent);

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", (0, _common.processErrorResponse)(_context.t0));

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 6]]);
        }));

        function getVersion() {
          return _getVersion2.apply(this, arguments);
        }

        return getVersion;
      }()
    }, {
      key: "appInfo",
      value: function () {
        var _appInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", this.transport.send(0xb0, 0x01, 0, 0).then(function (response) {
                    var errorCodeData = response.slice(-2);
                    var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                    var appName = 'err';
                    var appVersion = 'err';
                    var flagLen = 0;
                    var flagsValue = 0;

                    if (response[0] !== 1) ; else {
                      var appNameLen = response[1];
                      appName = response.slice(2, 2 + appNameLen).toString('ascii');
                      var idx = 2 + appNameLen;
                      var appVersionLen = response[idx];
                      idx += 1;
                      appVersion = response.slice(idx, idx + appVersionLen).toString('ascii');
                      idx += appVersionLen;
                      var appFlagsLen = response[idx];
                      idx += 1;
                      flagLen = appFlagsLen;
                      flagsValue = response[idx];
                    }

                    return {
                      return_code: returnCode,
                      error_message: (0, _common.errorCodeToString)(returnCode),
                      // //
                      appName: appName,
                      appVersion: appVersion,
                      flagLen: flagLen,
                      flagsValue: flagsValue,
                      // eslint-disable-next-line no-bitwise
                      flag_recovery: (flagsValue & 1) !== 0,
                      // eslint-disable-next-line no-bitwise
                      flag_signed_mcu_code: (flagsValue & 2) !== 0,
                      // eslint-disable-next-line no-bitwise
                      flag_onboarded: (flagsValue & 4) !== 0,
                      // eslint-disable-next-line no-bitwise
                      flag_pin_validated: (flagsValue & 128) !== 0
                    };
                  }, _common.processErrorResponse));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function appInfo() {
          return _appInfo.apply(this, arguments);
        }

        return appInfo;
      }()
    }, {
      key: "getAddress",
      value: function () {
        var _getAddress = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(account, change, addressIndex) {
          var requireConfirmation,
              scheme,
              bip44Path,
              p1,
              p2,
              _args3 = arguments;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  requireConfirmation = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : false;
                  scheme = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : _common.SCHEME.ED25519;
                  bip44Path = SubstrateApp.serializePath(this.slip0044, account, change, addressIndex);
                  p1 = 0;
                  if (requireConfirmation) p1 = 1;
                  p2 = 0;
                  if (!isNaN(scheme)) p2 = scheme;
                  return _context3.abrupt("return", this.transport.send(this.cla, INS.GET_ADDR, p1, p2, bip44Path).then(function (response) {
                    var errorCodeData = response.slice(-2);
                    var errorCode = errorCodeData[0] * 256 + errorCodeData[1];
                    return {
                      pubKey: response.slice(0, 32).toString('hex'),
                      address: response.slice(32, response.length - 2).toString('ascii'),
                      return_code: errorCode,
                      error_message: (0, _common.errorCodeToString)(errorCode)
                    };
                  }, _common.processErrorResponse));

                case 8:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function getAddress(_x, _x2, _x3) {
          return _getAddress.apply(this, arguments);
        }

        return getAddress;
      }()
    }, {
      key: "signSendChunk",
      value: function () {
        var _signSendChunk = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(chunkIdx, chunkNum, chunk) {
          var scheme,
              payloadType,
              p2,
              _args4 = arguments;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  scheme = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : _common.SCHEME.ED25519;
                  payloadType = _common.PAYLOAD_TYPE.ADD;

                  if (chunkIdx === 1) {
                    payloadType = _common.PAYLOAD_TYPE.INIT;
                  }

                  if (chunkIdx === chunkNum) {
                    payloadType = _common.PAYLOAD_TYPE.LAST;
                  }

                  p2 = 0;
                  if (!isNaN(scheme)) p2 = scheme;
                  return _context4.abrupt("return", this.transport.send(this.cla, INS.SIGN, payloadType, p2, chunk, [_common.ERROR_CODE.NoError, 0x6984, 0x6a80]).then(function (response) {
                    var errorCodeData = response.slice(-2);
                    var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                    var errorMessage = (0, _common.errorCodeToString)(returnCode);
                    var signature = null;

                    if (returnCode === 0x6a80 || returnCode === 0x6984) {
                      errorMessage = response.slice(0, response.length - 2).toString('ascii');
                    } else if (response.length > 2) {
                      signature = response.slice(0, response.length - 2);
                    }

                    return {
                      signature: signature,
                      return_code: returnCode,
                      error_message: errorMessage
                    };
                  }, _common.processErrorResponse));

                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function signSendChunk(_x4, _x5, _x6) {
          return _signSendChunk.apply(this, arguments);
        }

        return signSendChunk;
      }()
    }, {
      key: "sign",
      value: function () {
        var _sign = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(account, change, addressIndex, message) {
          var _this = this;

          var scheme,
              chunks,
              _args6 = arguments;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  scheme = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : _common.SCHEME.ED25519;
                  chunks = SubstrateApp.signGetChunks(this.slip0044, account, change, addressIndex, message);
                  return _context6.abrupt("return", this.signSendChunk(1, chunks.length, chunks[0], scheme).then( /*#__PURE__*/function () {
                    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(result) {
                      var i;
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              i = 1;

                            case 1:
                              if (!(i < chunks.length)) {
                                _context5.next = 10;
                                break;
                              }

                              _context5.next = 4;
                              return _this.signSendChunk(1 + i, chunks.length, chunks[i], scheme);

                            case 4:
                              result = _context5.sent;

                              if (!(result.return_code !== _common.ERROR_CODE.NoError)) {
                                _context5.next = 7;
                                break;
                              }

                              return _context5.abrupt("break", 10);

                            case 7:
                              i += 1;
                              _context5.next = 1;
                              break;

                            case 10:
                              return _context5.abrupt("return", {
                                return_code: result.return_code,
                                error_message: result.error_message,
                                signature: result.signature
                              });

                            case 11:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    }));

                    return function (_x11) {
                      return _ref.apply(this, arguments);
                    };
                  }(), _common.processErrorResponse));

                case 3:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function sign(_x7, _x8, _x9, _x10) {
          return _sign.apply(this, arguments);
        }

        return sign;
      }() /// Allow list related commands. They are NOT available on all apps

    }, {
      key: "getAllowlistPubKey",
      value: function () {
        var _getAllowlistPubKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt("return", this.transport.send(this.cla, INS.ALLOWLIST_GET_PUBKEY, 0, 0).then(function (response) {
                    var errorCodeData = response.slice(-2);
                    var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                    console.log(response);
                    var pubkey = response.slice(0, 32); // 32 bytes + 2 error code

                    // 32 bytes + 2 error code
                    if (response.length !== 34) {
                      return {
                        return_code: 0x6984,
                        error_message: (0, _common.errorCodeToString)(0x6984)
                      };
                    }

                    return {
                      return_code: returnCode,
                      error_message: (0, _common.errorCodeToString)(returnCode),
                      pubkey: pubkey
                    };
                  }, _common.processErrorResponse));

                case 1:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function getAllowlistPubKey() {
          return _getAllowlistPubKey.apply(this, arguments);
        }

        return getAllowlistPubKey;
      }()
    }, {
      key: "setAllowlistPubKey",
      value: function () {
        var _setAllowlistPubKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(pk) {
          return _regenerator.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.abrupt("return", this.transport.send(this.cla, INS.ALLOWLIST_SET_PUBKEY, 0, 0, pk).then(function (response) {
                    var errorCodeData = response.slice(-2);
                    var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                    return {
                      return_code: returnCode,
                      error_message: (0, _common.errorCodeToString)(returnCode)
                    };
                  }, _common.processErrorResponse));

                case 1:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function setAllowlistPubKey(_x12) {
          return _setAllowlistPubKey.apply(this, arguments);
        }

        return setAllowlistPubKey;
      }()
    }, {
      key: "getAllowlistHash",
      value: function () {
        var _getAllowlistHash = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
          return _regenerator.default.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt("return", this.transport.send(this.cla, INS.ALLOWLIST_GET_HASH, 0, 0).then(function (response) {
                    var errorCodeData = response.slice(-2);
                    var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                    console.log(response);
                    var hash = response.slice(0, 32); // 32 bytes + 2 error code

                    // 32 bytes + 2 error code
                    if (response.length !== 34) {
                      return {
                        return_code: 0x6984,
                        error_message: (0, _common.errorCodeToString)(0x6984)
                      };
                    }

                    return {
                      return_code: returnCode,
                      error_message: (0, _common.errorCodeToString)(returnCode),
                      hash: hash
                    };
                  }, _common.processErrorResponse));

                case 1:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function getAllowlistHash() {
          return _getAllowlistHash.apply(this, arguments);
        }

        return getAllowlistHash;
      }()
    }, {
      key: "uploadSendChunk",
      value: function () {
        var _uploadSendChunk = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(chunkIdx, chunkNum, chunk) {
          var payloadType;
          return _regenerator.default.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  payloadType = _common.PAYLOAD_TYPE.ADD;

                  if (chunkIdx === 1) {
                    payloadType = _common.PAYLOAD_TYPE.INIT;
                  }

                  if (chunkIdx === chunkNum) {
                    payloadType = _common.PAYLOAD_TYPE.LAST;
                  }

                  return _context10.abrupt("return", this.transport.send(this.cla, INS.ALLOWLIST_UPLOAD, payloadType, 0, chunk, [_common.ERROR_CODE.NoError]).then(function (response) {
                    var errorCodeData = response.slice(-2);
                    var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                    var errorMessage = (0, _common.errorCodeToString)(returnCode);
                    return {
                      return_code: returnCode,
                      error_message: errorMessage
                    };
                  }, _common.processErrorResponse));

                case 4:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10, this);
        }));

        function uploadSendChunk(_x13, _x14, _x15) {
          return _uploadSendChunk.apply(this, arguments);
        }

        return uploadSendChunk;
      }()
    }, {
      key: "uploadAllowlist",
      value: function () {
        var _uploadAllowlist = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(message) {
          var _this2 = this;

          var chunks;
          return _regenerator.default.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  chunks = [];
                  chunks.push(Buffer.from([0]));
                  chunks.push.apply(chunks, (0, _toConsumableArray2.default)(SubstrateApp.GetChunks(message)));
                  return _context12.abrupt("return", this.uploadSendChunk(1, chunks.length, chunks[0]).then( /*#__PURE__*/function () {
                    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(result) {
                      var i;
                      return _regenerator.default.wrap(function _callee11$(_context11) {
                        while (1) {
                          switch (_context11.prev = _context11.next) {
                            case 0:
                              if (!(result.return_code !== _common.ERROR_CODE.NoError)) {
                                _context11.next = 2;
                                break;
                              }

                              return _context11.abrupt("return", {
                                return_code: result.return_code,
                                error_message: result.error_message
                              });

                            case 2:
                              i = 1;

                            case 3:
                              if (!(i < chunks.length)) {
                                _context11.next = 12;
                                break;
                              }

                              _context11.next = 6;
                              return _this2.uploadSendChunk(1 + i, chunks.length, chunks[i]);

                            case 6:
                              result = _context11.sent;

                              if (!(result.return_code !== _common.ERROR_CODE.NoError)) {
                                _context11.next = 9;
                                break;
                              }

                              return _context11.abrupt("break", 12);

                            case 9:
                              i += 1;
                              _context11.next = 3;
                              break;

                            case 12:
                              return _context11.abrupt("return", {
                                return_code: result.return_code,
                                error_message: result.error_message
                              });

                            case 13:
                            case "end":
                              return _context11.stop();
                          }
                        }
                      }, _callee11);
                    }));

                    return function (_x17) {
                      return _ref2.apply(this, arguments);
                    };
                  }(), _common.processErrorResponse));

                case 4:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee12, this);
        }));

        function uploadAllowlist(_x16) {
          return _uploadAllowlist.apply(this, arguments);
        }

        return uploadAllowlist;
      }()
    }], [{
      key: "serializePath",
      value: function serializePath(slip0044, account, change, addressIndex) {
        if (!Number.isInteger(account)) throw new Error('Input must be an integer');
        if (!Number.isInteger(change)) throw new Error('Input must be an integer');
        if (!Number.isInteger(addressIndex)) throw new Error('Input must be an integer');
        var buf = Buffer.alloc(20);
        buf.writeUInt32LE(0x8000002c, 0);
        buf.writeUInt32LE(slip0044, 4);
        buf.writeUInt32LE(account, 8);
        buf.writeUInt32LE(change, 12);
        buf.writeUInt32LE(addressIndex, 16);
        return buf;
      }
    }, {
      key: "GetChunks",
      value: function GetChunks(message) {
        var chunks = [];
        var buffer = Buffer.from(message);

        for (var i = 0; i < buffer.length; i += _common.CHUNK_SIZE) {
          var end = i + _common.CHUNK_SIZE;

          if (i > buffer.length) {
            end = buffer.length;
          }

          chunks.push(buffer.slice(i, end));
        }

        return chunks;
      }
    }, {
      key: "signGetChunks",
      value: function signGetChunks(slip0044, account, change, addressIndex, message) {
        var chunks = [];
        var bip44Path = SubstrateApp.serializePath(slip0044, account, change, addressIndex);
        chunks.push(bip44Path);
        chunks.push.apply(chunks, (0, _toConsumableArray2.default)(SubstrateApp.GetChunks(message)));
        return chunks;
      }
    }]);
    return SubstrateApp;
  }();

  function newKusamaApp(transport) {
    return new SubstrateApp(transport, _config.CLA.KUSAMA, _config.SLIP0044.KUSAMA);
  }

  function newAXIAApp(transport) {
    return new SubstrateApp(transport, _config.CLA.AXIA, _config.SLIP0044.AXIA);
  }

  function newPolymeshApp(transport) {
    return new SubstrateApp(transport, _config.CLA.POLYMESH, _config.SLIP0044.POLYMESH);
  }

  function newDockApp(transport) {
    return new SubstrateApp(transport, _config.CLA.DOCK, _config.SLIP0044.DOCK);
  }

  function newCentrifugeApp(transport) {
    return new SubstrateApp(transport, _config.CLA.CENTRIFUGE, _config.SLIP0044.CENTRIFUGE);
  }

  function newEdgewareApp(transport) {
    return new SubstrateApp(transport, _config.CLA.EDGEWARE, _config.SLIP0044.EDGEWARE);
  }

  function newEquilibriumApp(transport) {
    return new SubstrateApp(transport, _config.CLA.EQUILIBRIUM, _config.SLIP0044.EQUILIBRIUM);
  }

  function newGenshiroApp(transport) {
    return new SubstrateApp(transport, _config.CLA.GENSHIRO, _config.SLIP0044.GENSHIRO);
  }

  function newStatemintApp(transport) {
    return new SubstrateApp(transport, _config.CLA.STATEMINT, _config.SLIP0044.STATEMINT);
  }

  function newStatemineApp(transport) {
    return new SubstrateApp(transport, _config.CLA.STATEMINE, _config.SLIP0044.STATEMINE);
  }

  function newNodleApp(transport) {
    return new SubstrateApp(transport, _config.CLA.NODLE, _config.SLIP0044.NODLE);
  }

  function newSoraApp(transport) {
    return new SubstrateApp(transport, _config.CLA.SORA, _config.SLIP0044.SORA);
  }

  function sha512(data) {
    var digest = hash.sha512().update(data).digest();
    return Buffer.from(digest);
  }

  function hmac256(key, data) {
    var digest = hash.hmac(hash.sha256, key).update(data).digest();
    return Buffer.from(digest);
  }

  function hmac512(key, data) {
    var digest = hash.hmac(hash.sha512, key).update(data).digest();
    return Buffer.from(digest);
  }

  function ss58hash(data) {
    var hash = blake.blake2bInit(64, null);
    blake.blake2bUpdate(hash, Buffer.from('SS58PRE'));
    blake.blake2bUpdate(hash, data);
    return blake.blake2bFinal(hash);
  }

  function ss58_encode(prefix, pubkey) {
    if (pubkey.byteLength !== 32) {
      return null;
    }

    var data = Buffer.alloc(35);
    data[0] = prefix;
    pubkey.copy(data, 1);
    var hash = ss58hash(data.slice(0, 33));
    data[33] = hash[0];
    data[34] = hash[1];
    return bs58.encode(data);
  }

  function root_node_slip10(master_seed) {
    var data = Buffer.alloc(1 + 64);
    data[0] = 0x01;
    master_seed.copy(data, 1);
    var c = hmac256('ed25519 seed', data);
    var I = hmac512('ed25519 seed', data.slice(1));
    var kL = I.slice(0, 32);
    var kR = I.slice(32);

    while ((kL[31] & 32) !== 0) {
      I.copy(data, 1);
      I = hmac512('ed25519 seed', data.slice(1));
      kL = I.slice(0, 32);
      kR = I.slice(32);
    }

    kL[0] &= 248;
    kL[31] &= 127;
    kL[31] |= 64;
    return Buffer.concat([kL, kR, c]);
  }

  function hdKeyDerivation(mnemonic, password, slip0044, accountIndex, changeIndex, addressIndex, ss58prefix) {
    if (!bip39.validateMnemonic(mnemonic)) {
      console.log('Invalid mnemonic');
      return null;
    }

    var seed = bip39.mnemonicToSeedSync(mnemonic, password);
    var node = root_node_slip10(seed);
    node = bip32ed25519.derivePrivate(node, HDPATH_0_DEFAULT);
    node = bip32ed25519.derivePrivate(node, slip0044);
    node = bip32ed25519.derivePrivate(node, accountIndex);
    node = bip32ed25519.derivePrivate(node, changeIndex);
    node = bip32ed25519.derivePrivate(node, addressIndex);
    var kL = node.slice(0, 32);
    var sk = sha512(kL).slice(0, 32);
    sk[0] &= 248;
    sk[31] &= 127;
    sk[31] |= 64;
    var pk = bip32ed25519.toPublic(sk);
    var address = ss58_encode(ss58prefix, pk);
    return {
      sk: kL,
      pk: pk,
      address: address
    };
  }

  var dist = {
    hdKeyDerivation: hdKeyDerivation,
    newKusamaApp: newKusamaApp,
    newAXIAApp: newAXIAApp,
    newPolymeshApp: newPolymeshApp,
    newDockApp: newDockApp,
    newCentrifugeApp: newCentrifugeApp,
    newEdgewareApp: newEdgewareApp,
    newEquilibriumApp: newEquilibriumApp,
    newGenshiroApp: newGenshiroApp,
    newStatemintApp: newStatemintApp,
    newStatemineApp: newStatemineApp,
    newNodleApp: newNodleApp,
    newSoraApp: newSoraApp
  };

  // Copyright 2017-2021 @axia-js/hw-ledger authors & contributors

  const ledgerApps = {
    centrifuge: dist.newCentrifugeApp,
    'dock-mainnet': dist.newDockApp,
    edgeware: dist.newEdgewareApp,
    equilibrium: dist.newEquilibriumApp,
    axialunar: dist.newAXIALunarApp,
    'nodle-chain': dist.newNodleApp,
    axia: dist.newAXIAApp,
    polymesh: dist.newPolymeshApp,
    statemine: dist.newStatemineApp
  };

  // Copyright 2017-2021 @axia-js/hw-ledger authors & contributors
  // SPDX-License-Identifier: Apache-2.0
  // Auto-generated by @axia-js/dev, do not edit
  const packageInfo = {
    name: '@axia-js/hw-ledger',
    version: '1.1.0'
  };

  var _app = /*#__PURE__*/_classPrivateFieldKey("app");

  var _chain = /*#__PURE__*/_classPrivateFieldKey("chain");

  var _transport = /*#__PURE__*/_classPrivateFieldKey("transport");

  var _getApp = /*#__PURE__*/_classPrivateFieldKey("getApp");

  var _withApp = /*#__PURE__*/_classPrivateFieldKey("withApp");

  var _wrapError = /*#__PURE__*/_classPrivateFieldKey("wrapError");

  // A very basic wrapper for a ledger app -
  //  - it connects automatically, creating an app as required
  //  - Promises return errors (instead of wrapper errors)
  class Ledger {
    constructor(_transport2, chain) {
      Object.defineProperty(this, _app, {
        writable: true,
        value: null
      });
      Object.defineProperty(this, _chain, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _transport, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _getApp, {
        writable: true,
        value: async () => {
          if (!_classPrivateFieldBase(this, _app)[_app]) {
            const def = transports.find(({
              type
            }) => type === _classPrivateFieldBase(this, _transport)[_transport]);
            util.assert(def, () => `Unable to find a transport for ${_classPrivateFieldBase(this, _transport)[_transport]}`);
            const transport = await def.create();
            _classPrivateFieldBase(this, _app)[_app] = ledgerApps[_classPrivateFieldBase(this, _chain)[_chain]](transport);
          }

          return _classPrivateFieldBase(this, _app)[_app];
        }
      });
      Object.defineProperty(this, _withApp, {
        writable: true,
        value: async fn => {
          try {
            const app = await _classPrivateFieldBase(this, _getApp)[_getApp]();
            return await fn(app);
          } catch (error) {
            _classPrivateFieldBase(this, _app)[_app] = null;
            throw error;
          }
        }
      });
      Object.defineProperty(this, _wrapError, {
        writable: true,
        value: async promise => {
          const result = await promise;
          util.assert(result.return_code === LEDGER_SUCCESS_CODE, () => result.error_message);
          return result;
        }
      });
      // u2f is deprecated
      util.assert(['hid', 'webusb'].includes(_transport2), () => `Unsupported transport ${_transport2}`);
      util.assert(Object.keys(ledgerApps).includes(chain), () => `Unsupported chain ${chain}`);
      _classPrivateFieldBase(this, _chain)[_chain] = chain;
      _classPrivateFieldBase(this, _transport)[_transport] = _transport2;
    }

    async getAddress(confirm = false, accountOffset = 0, addressOffset = 0, {
      account = LEDGER_DEFAULT_ACCOUNT,
      addressIndex = LEDGER_DEFAULT_INDEX,
      change = LEDGER_DEFAULT_CHANGE
    } = {}) {
      return _classPrivateFieldBase(this, _withApp)[_withApp](async app => {
        const {
          address,
          pubKey
        } = await _classPrivateFieldBase(this, _wrapError)[_wrapError](app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));
        return {
          address,
          publicKey: `0x${pubKey}`
        };
      });
    }

    async getVersion() {
      return _classPrivateFieldBase(this, _withApp)[_withApp](async app => {
        const {
          device_locked: isLocked,
          major,
          minor,
          patch,
          test_mode: isTestMode
        } = await _classPrivateFieldBase(this, _wrapError)[_wrapError](app.getVersion());
        return {
          isLocked,
          isTestMode,
          version: [major, minor, patch]
        };
      });
    }

    async sign(message, accountOffset = 0, addressOffset = 0, {
      account = LEDGER_DEFAULT_ACCOUNT,
      addressIndex = LEDGER_DEFAULT_INDEX,
      change = LEDGER_DEFAULT_CHANGE
    } = {}) {
      return _classPrivateFieldBase(this, _withApp)[_withApp](async app => {
        const buffer = util.u8aToBuffer(message);
        const {
          signature
        } = await _classPrivateFieldBase(this, _wrapError)[_wrapError](app.sign(account + accountOffset, change, addressIndex + addressOffset, buffer));
        return {
          signature: `0x${signature.toString('hex')}`
        };
      });
    }

  }

  exports.Ledger = Ledger;
  exports.packageInfo = packageInfo;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, axiaUtil));
