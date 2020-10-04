import React from 'react'
import { Keyboard } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { mainRoot } from '../navigation/mainRootNavigation'
import test from '../helper/test.json'
import API from '../helper/API'
import {LOGIN, LOGOUT, LOGIN_FAILURE, SIGN_UP, SIGN_UP_FAILURE, FORGOT_PASSWORD, 
  VERIFY_EMAIL, RESEND_CODE, HAS_ONBOARDED} from './reducerTypes'
import { authRoot } from '../navigation/authRootNavigation'
import { authLoadingRoot } from '../navigation/authLoadingRootNavigation'
import AsyncStorage from '@react-native-community/async-storage'

export const onboard = data => async (dispatch) => {
  await AsyncStorage.setItem('has_onboarded', 'true')
  dispatch({ type: HAS_ONBOARDED, data: true})
}

export const login = ({email, password}) => async (dispatch) => {

  // if(email == email && password == password){
  //   Navigation.setRoot(mainRoot)
  // }
    await API.post('signin-student', { email, password })
    .then(res => {
      const { data } = res
      console.log(data)
      if(res.status === 200){
        AsyncStorage.setItem('access_token', `${data.token}`)
        console.log(data.token)
        AsyncStorage.setItem('access_id', `${data.id}`)
        dispatch({type: LOGIN, payload: data})
        Navigation.setRoot(mainRoot)
      }
      else{
        console.log(err)
        dispatch({ type: LOGIN_FAILURE, msg: data.message })
      }
    })
    .catch(err => {
        console.log(err)
        dispatch({type: LOGIN_FAILURE, msg: 'Something went wrong, please try again'})
    })
}

export const signup = (data) => async (dispatch) => {

    await API.post('signup-student', { data })
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
	AsyncStorage.removeItem('access_token')
	AsyncStorage.removeItem('access_id')
	Navigation.setRoot(authRoot)
	setTimeout(() => {
		dispatch({type: LOGOUT})
	}, 1000);
}