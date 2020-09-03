"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.change_password = exports.verify_email = exports.forgot_password = exports.signup = exports.login = exports.onboard = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeNavigation = require("react-native-navigation");

var _mainRootNavigation = require("../navigation/mainRootNavigation");

var _test = _interopRequireDefault(require("../helper/test.json"));

var _API = _interopRequireDefault(require("../helper/API"));

var _reducerTypes = require("./reducerTypes");

var _authRootNavigation = require("../navigation/authRootNavigation");

var _authLoadingRootNavigation = require("../navigation/authLoadingRootNavigation");

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var onboard = function onboard(data) {
  return function _callee(dispatch) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_asyncStorage["default"].setItem('has_onboarded', 'true'));

          case 2:
            dispatch({
              type: _reducerTypes.HAS_ONBOARDED,
              data: true
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.onboard = onboard;

var login = function login(_ref) {
  var email = _ref.email,
      password = _ref.password;
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_API["default"].post('auth/login', {
              email: email,
              password: password
            }).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                _asyncStorage["default"].setItem('access_token', "".concat(data.data.token));

                _asyncStorage["default"].setItem('access_id', "".concat(data.data.id));

                dispatch({
                  type: _reducerTypes.LOGIN,
                  payload: data.data
                });

                _reactNativeNavigation.Navigation.setRoot(_authLoadingRootNavigation.authLoadingRoot);
              } else {
                dispatch({
                  type: _reducerTypes.LOGIN_FAILURE,
                  msg: data.data.message
                });
              }
            })["catch"](function (err) {
              dispatch({
                type: _reducerTypes.LOGIN_FAILURE,
                msg: 'Something went wrong, please try again'
              });
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.login = login;

var signup = function signup(_ref2) {
  var fullname = _ref2.fullname,
      email = _ref2.email,
      password = _ref2.password;
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_API["default"].post('auth/signup', {
              fullname: fullname,
              email: email,
              password: password
            }).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                _asyncStorage["default"].setItem('access_token', data.access_token);

                dispatch({
                  type: _reducerTypes.SIGN_UP
                });

                _reactNativeNavigation.Navigation.pop('AuthStack');
              } else {
                dispatch({
                  type: _reducerTypes.SIGN_UP_FAILURE,
                  msg: data.data.message
                });
              }
            })["catch"](function (err) {
              dispatch({
                type: _reducerTypes.SIGN_UP_FAILURE,
                msg: 'Something went wrong, please try again'
              });
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.signup = signup;

var forgot_password = function forgot_password(_ref3) {
  var email = _ref3.email;
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_API["default"].post('auth/password/token', {
              email: email
            }).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                dispatch({
                  type: _reducerTypes.FORGOT_PASSWORD,
                  msg: data.data.message
                });

                _reactNativeNavigation.Navigation.push('AuthStack', {
                  component: {
                    name: 'Verify',
                    passProps: {
                      email: email,
                      uid: data.data.uid
                    }
                  }
                });
              } else {
                dispatch({
                  type: _reducerTypes.FORGOT_PASSWORD,
                  msg: data.data.message
                });
              }
            })["catch"](function (err) {
              console.log(err);
              dispatch({
                type: _reducerTypes.FORGOT_PASSWORD,
                msg: err
              });
            }));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.forgot_password = forgot_password;

var verify_email = function verify_email(uid, token) {
  return function _callee5(dispatch) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(_API["default"].get("auth//token/".concat(uid, "/").concat(token)).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                dispatch({
                  type: _reducerTypes.VERIFY_EMAIL,
                  msg: data.data.message
                }); // Navigation.setRoot(mainRoot)
              } else {
                dispatch({
                  type: _reducerTypes.FORGOT_PASSWORD,
                  msg: data.data.message
                });
              }
            })["catch"](function (err) {
              dispatch({
                type: _reducerTypes.VERIFY_EMAIL,
                msg: err.msg
              });
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
};

exports.verify_email = verify_email;

var change_password = function change_password(uid, token, email, _ref4) {
  var password = _ref4.password;
  return function _callee6(dispatch) {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(_API["default"].post("auth/password/token/".concat(uid, "/").concat(token), {
              email: email,
              password: password
            }).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                dispatch({
                  type: _reducerTypes.RESEND_CODE,
                  msg: data.msg
                });

                _reactNativeNavigation.Navigation.popToRoot('AuthStack');
              } else {
                dispatch({
                  type: _reducerTypes.FORGOT_PASSWORD,
                  msg: data.data.message
                });
              }
            })["catch"](function (err) {
              dispatch({
                type: _reducerTypes.RESEND_CODE,
                msg: err.msg
              });
            }));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  };
};

exports.change_password = change_password;

var logout = function logout() {
  return function _callee7(dispatch) {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // await API.post('auth/logout')
            // .then(res => {
            //   const { data } = res
            //   if(res.status === 200){
            //     AsyncStorage.removeItem('access_token')
            //     dispatch({type: LOGIN, payload: data})
            //   }
            //   else{
            //     dispatch({ type: LOGIN_FAILURE, msg: data.msg })
            //   }
            // })
            // .catch(err => {
            //     dispatch({type: LOGIN_FAILURE, msg: data.msg})
            // })
            // console.log('LOGOUT')
            _asyncStorage["default"].removeItem('access_token');

            _asyncStorage["default"].removeItem('access_id');

            _reactNativeNavigation.Navigation.setRoot(_authRootNavigation.authRoot);

            setTimeout(function () {
              dispatch({
                type: _reducerTypes.LOGOUT
              });
            }, 1000);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    });
  };
};

exports.logout = logout;