"use strict";

var _reactNativeNavigation = require("react-native-navigation");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _rootReducer = require("./src/reducers/rootReducer");

var _authLoadingRootNavigation = require("./src/navigation/authLoadingRootNavigation");

var _authRootNavigation = require("./src/navigation/authRootNavigation");

var _mainRootNavigation = require("./src/navigation/mainRootNavigation");

var _onBoardRootNavigation = require("./src/navigation/onBoardRootNavigation");

var _SplashScreen = _interopRequireDefault(require("./src/screens/SplashScreen"));

var _OnboardingScreen = _interopRequireDefault(require("./src/screens/OnboardingScreen"));

var _LoginScreen = _interopRequireDefault(require("./src/screens/LoginScreen"));

var _RegistrationScreen = _interopRequireDefault(require("./src/screens/RegistrationScreen"));

var _DashboardScreen = _interopRequireDefault(require("./src/screens/DashboardScreen"));

var _ClassroomScreen = _interopRequireDefault(require("./src/screens/ClassroomScreen"));

var _AuthLoadingScreen = _interopRequireDefault(require("./src/screens/AuthLoadingScreen"));

var _QuestionsScreen = _interopRequireDefault(require("./src/screens/QuestionsScreen"));

var _ProfileScreen = _interopRequireDefault(require("./src/screens/ProfileScreen"));

var _ClassScreen = _interopRequireDefault(require("./src/screens/ClassScreen"));

var _ChatScreen = _interopRequireDefault(require("./src/screens/ChatScreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @format
 */
// import App from './App'
// import {name as appName} from './app.json'
var store = (0, _redux.createStore)(_rootReducer.rootReducer, (0, _redux.applyMiddleware)(_reduxThunk["default"]));

var isLoggeIn = function isLoggeIn() {
  return store.getState().auth.is_logged_in;
};

var isOnboarded = function isOnboarded() {
  return store.getState().auth.has_onboarded;
}; // AppRegistry.registerComponent(appName, () => App)


_reactNativeNavigation.Navigation.registerComponentWithRedux('Splash', function () {
  return _SplashScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Intro', function () {
  return _OnboardingScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Login', function () {
  return _LoginScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Signup', function () {
  return _RegistrationScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Dashboard', function () {
  return _DashboardScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Classroom', function () {
  return _ClassroomScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('AuthLoading', function () {
  return _AuthLoadingScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Questions', function () {
  return _QuestionsScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Profile', function () {
  return _ProfileScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Class', function () {
  return _ClassScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.registerComponentWithRedux('Chat', function () {
  return _ChatScreen["default"];
}, _reactRedux.Provider, store);

_reactNativeNavigation.Navigation.events().registerAppLaunchedListener(function () {
  // Navigation.setRoot(isOnboarded() ? (isLoggeIn() ? mainRoot : authRoot ) : onBoardRoot)
  _reactNativeNavigation.Navigation.setRoot(_onBoardRootNavigation.onBoardRoot);
});