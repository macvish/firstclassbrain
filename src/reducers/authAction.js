import { Navigation } from 'react-native-navigation'

import { authCheckerRoot } from '../navigation/authCheckerRootNavigation'
import API from '../helper/API'
import {CLEAR_ALL_ERROR_MESSAGE, LOGIN, LOGOUT, LOGIN_FAILURE, SIGN_UP, SIGN_UP_FAILURE, FORGOT_PASSWORD, HAS_ONBOARDED} from './reducerTypes'
import { authRoot } from '../navigation/authRootNavigation'
import AsyncStorage from '@react-native-community/async-storage'

export const onboard = () => async (dispatch) => {
  await AsyncStorage.setItem('has_onboarded', 'true')
  dispatch({ type: HAS_ONBOARDED, data: true})
}

export const clearErrorMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_ALL_ERROR_MESSAGE, data: true})
}

export const login = (data) => async (dispatch) => {
    await API.post('signin-student/', data)
    .then(res => {
      const { data } = res
      if(res.status === 200){
        AsyncStorage.setItem('access_token', `${data.token}`)
        AsyncStorage.setItem('access_id', `${data.id}`)
        dispatch({ type: LOGIN })
        Navigation.setRoot(authCheckerRoot)
      }
      else{
        dispatch({ type: LOGIN_FAILURE, msg: data.message })
      }
    })
    .catch(err => {
      console.log(err.response.data.error)
      dispatch({type: LOGIN_FAILURE, msg: err.response.data ? err.response.data.error : 'Something went wrong, please try again'})
    })
}

export const signup = (data) => async (dispatch) => {

  await API.post('signup-student/', data)
    .then(res => {
      const { data } = res
      if(res.status === 200){
        AsyncStorage.setItem('access_token', data.access_token)
        dispatch({type: SIGN_UP})
        Navigation.pop('AuthStack')
      }
      else{
        dispatch({ type: SIGN_UP_FAILURE, msg: data.message })
      }
    })
    .catch(err => {
      console.log(err.response)
      dispatch({type: SIGN_UP_FAILURE, msg: 'Something went wrong, please try again'})
    })
}

export const forgot_password = ({email}) => async (dispatch) => {

  await API.post('auth/password/token', { email })
.then(res => {
  const { data } = res
  if(res.status === 200){
    dispatch({ type: FORGOT_PASSWORD, msg: data.message })
    Navigation.push('AuthStack', {
      component: {
          name: 'Verify',
          passProps: {
            email: email,
            uid: data.uid
          }
      }
    })
  } else{
    dispatch({ type: FORGOT_PASSWORD, msg: data.message })
  }
})
.catch(err => {
  console.log(err)
  dispatch({ type: FORGOT_PASSWORD, msg: err })
})
}

export const logout = () => async (dispatch) => {
	AsyncStorage.removeItem('access_token')
	AsyncStorage.removeItem('access_id')
	Navigation.setRoot(authRoot)
	setTimeout(() => {
		dispatch({type: LOGOUT})
	}, 1000);
}