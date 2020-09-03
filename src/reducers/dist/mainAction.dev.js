"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paystack_payment = exports.send_cart = exports.set_avatar = exports.get_products = exports.delete_user = exports.edit_user = exports.get_user = exports.fullscreen = void 0;

var _react = _interopRequireDefault(require("react"));

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _reducerTypes = require("../reducers/reducerTypes");

var _API = _interopRequireDefault(require("../helper/API"));

var _mainRootNavigation = require("../navigation/mainRootNavigation");

var _reactNativeNavigation = require("react-native-navigation");

var _authRootNavigation = require("../navigation/authRootNavigation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userId = _asyncStorage["default"].getItem('access_id');

var fullscreen = function fullscreen(bool) {
  return function (dispatch) {
    dispatch({
      type: _reducerTypes.FULLSCREEN,
      data: bool
    });
  };
}; // Get User


exports.fullscreen = fullscreen;

var get_user = function get_user(user_id) {
  return function _callee(dispatch) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _API["default"].get("users/".concat(user_id)).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                dispatch({
                  type: _reducerTypes.GET_USER,
                  payload: data
                });

                _reactNativeNavigation.Navigation.setRoot(_mainRootNavigation.mainRoot);
              } else {
                dispatch({
                  type: _reducerTypes.GET_USER_FAILED,
                  msg: data.message
                });
              }
            })["catch"](function (err) {
              dispatch({
                type: _reducerTypes.GET_USER_FAILED,
                msg: 'Something went wrong, please try again'
              });
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}; // Edit User


exports.get_user = get_user;

var edit_user = function edit_user(_ref) {
  var fullname = _ref.fullname,
      email = _ref.email,
      phone = _ref.phone,
      pictureURL = _ref.pictureURL,
      address = _ref.address,
      password = _ref.password;
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _API["default"].put("users/".concat(data.user_id), {
              fullname: fullname,
              email: email,
              phone: phone,
              pictureURL: pictureURL,
              address: address,
              password: password
            }).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                dispatch({
                  type: _reducerTypes.GET_USER,
                  payload: data
                });

                _reactNativeNavigation.Navigation.setRoot(_mainRootNavigation.mainRoot);
              } else {
                dispatch({
                  type: _reducerTypes.GET_USER_FAILED,
                  msg: data.message
                });
              }
            })["catch"](function (err) {
              dispatch({
                type: _reducerTypes.GET_USER_FAILED,
                msg: 'Something went wrong, please try again'
              });
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
}; // Delete User


exports.edit_user = edit_user;

var delete_user = function delete_user() {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _API["default"]["delete"]("users/".concat(user_id)).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                dispatch({
                  type: _reducerTypes.GET_USER,
                  payload: data
                });

                _reactNativeNavigation.Navigation.setRoot(_authRootNavigation.authRoot);
              } else {
                dispatch({
                  type: _reducerTypes.GET_USER_FAILED,
                  msg: data.message
                });
              }
            })["catch"](function (err) {
              dispatch({
                type: _reducerTypes.GET_USER_FAILED,
                msg: 'Something went wrong, please try again'
              });
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
}; // Get Products


exports.delete_user = delete_user;

var get_products = function get_products() {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _API["default"].get("product/product/".concat(userId)).then(function (res) {
              var data = res.data;

              if (res.status === 200) {
                console.log(data);
                var preschool = data.filter(function (d) {
                  return d.categoryId == 1;
                });
                var nursery = data.filter(function (d) {
                  return d.categoryId == 2;
                });
                var primary = data.filter(function (d) {
                  return d.categoryId == 3;
                });
                var secondary = data.filter(function (d) {
                  return d.categoryId == 4;
                });
                var videos = data.filter(function (d) {
                  return d.producttype == 'video';
                });
                var docs = data.filter(function (d) {
                  return d.producttype == 'Documents';
                });
                var audios = data.filter(function (d) {
                  return d.producttype == 'audio';
                });
                var cat = {
                  preschool: preschool,
                  nursery: nursery,
                  primary: primary,
                  secondary: secondary
                };
                var _media = {
                  videos: videos,
                  docs: docs,
                  audios: audios
                };
                dispatch({
                  type: _reducerTypes.GET_PRODUCTS,
                  payload: _media,
                  cat: cat
                });
              } else {
                console.log('other than 200', data);
                dispatch({
                  type: _reducerTypes.GET_PRODUCTS_FAILED,
                  msg: data.message
                });
              }
            })["catch"](function (err) {
              dispatch({
                type: _reducerTypes.GET_PRODUCTS_FAILED,
                msg: 'Something went wrong, please try again'
              });
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.get_products = get_products;

var set_avatar = function set_avatar(data) {
  return function (dispatch) {
    dispatch({
      type: _reducerTypes.PROFILE_PICS,
      payload: data
    });
  };
};

exports.set_avatar = set_avatar;

var send_cart = function send_cart(data) {
  return function (dispatch) {
    _API["default"].post("carts/carts/".concat(userId), {
      data: data
    }).then(function (res) {
      var data = res.data;

      if (res.status === 200) {
        dispatch({
          type: _reducerTypes.SEND_CART,
          payload: media
        });
      } else {
        dispatch({
          type: SEND_CART_FAILED,
          msg: data.message
        });
      }
    })["catch"](function (err) {
      dispatch({
        type: SEND_CART_FAILED,
        msg: 'Something went wrong, please try again'
      });
    });
  };
};

exports.send_cart = send_cart;

var paystack_payment = function paystack_payment(data) {
  return function (dispatch) {
    _API["default"].post("payment/paystack/pay", {
      data: data
    }).then(function (res) {
      var data = res.data;

      if (res.status === 200) {
        dispatch({
          type: _reducerTypes.PAYMENT_SUCCESSFUL,
          payload: media
        });
      } else {
        dispatch({
          type: _reducerTypes.PAYMENT_FAILURE,
          msg: data.message
        });
      }
    })["catch"](function (err) {
      dispatch({
        type: _reducerTypes.PAYMENT_FAILURE,
        msg: 'Something went wrong, please try again'
      });
    });
  };
};

exports.paystack_payment = paystack_payment;