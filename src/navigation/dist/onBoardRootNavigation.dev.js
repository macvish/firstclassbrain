"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onBoardRoot = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var onBoardRoot = {
  root: {
    stack: {
      id: 'OnboardStack',
      children: [{
        component: {
          name: 'Intro'
        }
      }]
    }
  }
};
exports.onBoardRoot = onBoardRoot;