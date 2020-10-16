"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _app["default"];
  }
});
exports.storage = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyDNQRLwHXC_zYcknNdf1rplcYpBP2qIKxA",
  authDomain: "project-share-8df06.firebaseapp.com",
  databaseURL: "https://project-share-8df06.firebaseio.com",
  projectId: "project-share-8df06",
  storageBucket: "project-share-8df06.appspot.com",
  messagingSenderId: "242999336210",
  appId: "1:242999336210:web:43105302d4336a9113a7cb",
  measurementId: "G-FXCLV7D7WE"
};

_app["default"].initializeApp(firebaseConfig);

var storage = _app["default"].storage();

exports.storage = storage;