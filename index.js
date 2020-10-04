/**
 * @format
 */
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from './src/reducers/rootReducer'
import { authLoadingRoot } from './src/navigation/authLoadingRootNavigation'
import { authRoot } from './src/navigation/authRootNavigation'
import { mainRoot } from './src/navigation/mainRootNavigation'
import { onBoardRoot } from './src/navigation/onBoardRootNavigation'
import SplashScreen from './src/screens/SplashScreen'
import OnboardingScreen from './src/screens/OnboardingScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegistrationScreen from './src/screens/RegistrationScreen'
import DashboardScreen from './src/screens/DashboardScreen'
import ClassroomScreen from './src/screens/ClassroomScreen'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'
import QuestionsScreen from './src/screens/QuestionsScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import ClassScreen from './src/screens/ClassScreen'
import ChatScreen from './src/screens/ChatScreen'
import AccountScreen from './src/screens/AccountScreen'
import settingsIcon from './src/assets/icons/settings.png'
import QuizScreen from './src/screens/QuizScreen'


const store = createStore(rootReducer, applyMiddleware(thunk))

const isLoggeIn = () => {
    return store.getState().auth.is_logged_in
}

const isOnboarded = () => {
    return store.getState().auth.has_onboarded
}

// AppRegistry.registerComponent(appName, () => App)

Navigation.registerComponentWithRedux('Splash', () => SplashScreen, Provider, store)
Navigation.registerComponentWithRedux('Intro', () => OnboardingScreen, Provider, store)
Navigation.registerComponentWithRedux('Login', () => LoginScreen, Provider, store)
Navigation.registerComponentWithRedux('Signup', () => RegistrationScreen, Provider, store)
Navigation.registerComponentWithRedux('Dashboard', () => DashboardScreen, Provider, store)
Navigation.registerComponentWithRedux('Classroom', () => ClassroomScreen, Provider, store)
Navigation.registerComponentWithRedux('AuthLoading', () => AuthLoadingScreen, Provider, store)
Navigation.registerComponentWithRedux('Account', () => AccountScreen, Provider, store)
Navigation.registerComponentWithRedux('Questions', () => QuestionsScreen, Provider, store)
Navigation.registerComponentWithRedux('Account', () => ProfileScreen, Provider, store)
Navigation.registerComponentWithRedux('Class', () => ClassScreen, Provider, store)
Navigation.registerComponentWithRedux('Chat', () => ChatScreen, Provider, store)
Navigation.registerComponentWithRedux('Quiz', () => QuizScreen, Provider, store)

Navigation.setDefaultOptions({
    bottomTab: {
        // selectedTextColor: '#3FB0D4',
        selectedIconColor: '#3FB0D4',
        textColor: '#707070',
    },

    bottomTabs: {
        titleDisplayMode: 'alwaysShow'
    },

    topBar: {
        title: {
            text: 'First Class Brain',
            color: '#257F9B',
            fontWeight: 'bold',
            fontSize: '20'
        },
        rightButtons: [
            {
                // icon: settingsIcon
            }
        ]
    }
})

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot(isOnboarded() ? (isLoggeIn() ? mainRoot : authRoot ) : authLoadingRoot)
    Navigation.setRoot(authLoadingRoot)
})