"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authLoadingRoot = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authLoadingRoot = {
  root: {
    stack: {
      id: 'AuthLoadingStack',
      children: [{
        component: {
          name: 'Splash'
        }
      }]
    }
  }
};
exports.authLoadingRoot = authLoadingRoot;