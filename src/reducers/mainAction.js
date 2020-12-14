import AsyncStorage from '@react-native-community/async-storage'

import { FULLSCREEN, GET_USER, GET_USER_FAILED, GET_COURSES, 
    GET_COURSES_FAILED, PROFILE_PICS, SEND_CART, PAYMENT_SUCCESSFUL, 
    PAYMENT_FAILURE, GET_TESTS, GET_TESTS_FAILED, POST_SCORE, POST_SCORE_FAILED
} from '../reducers/reducerTypes'
import API from '../helper/API'
import { mainRoot } from '../navigation/mainRootNavigation'
import { Navigation } from 'react-native-navigation'
import { authRoot } from '../navigation/authRootNavigation'

const userId = AsyncStorage.getItem('access_id')

export const fullscreen = bool => dispatch => {
    dispatch({type: FULLSCREEN, data: bool})
}

// Get User
export const get_user = (user_token) => async (dispatch) => {

    API.get(`usertoken/${user_token}`)
    .then(res => {
        const { data } = res
        if(res.status === 200){
            dispatch({type: GET_USER, payload: data.studentData})
            // Navigation.setRoot(mainRoot)
        }
        else{
            dispatch({ type: GET_USER_FAILED, msg: data.message })
        }
        })
    .catch(err => {
        dispatch({type: GET_USER_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Edit User
export const edit_user = ({fullname, email, phone, pictureURL, address, password}) => async (dispatch) => {

    API.put(`users/${data.user_id}`, {fullname, email, phone, pictureURL, address, password})
    .then(res => {
        const { data } = res
        if(res.status === 200){
            dispatch({type: GET_USER, payload: data.studentData})
            Navigation.setRoot(mainRoot)
        }
        else{
            dispatch({ type: GET_USER_FAILED, msg: data.message })
        }
        })
    .catch(err => {
        dispatch({type: GET_USER_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Delete User
export const delete_user = () => async (dispatch) => {
    API.delete(`usertoken/${user_id}`)
    .then(res => {
        const { data } = res
        if(res.status === 200){
            dispatch({type: GET_USER, payload: data})
            Navigation.setRoot(authRoot)
        }
        else{
            dispatch({ type: GET_USER_FAILED, msg: data.message })
        }
        })
    .catch(err => {
        dispatch({type: GET_USER_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Get Courses
export const get_courses = () => async (dispatch) => {
    API.get(`all-courses`)
    .then(res => {
        const { data } = res

        if(res.status === 200){
            dispatch({type: GET_COURSES, payload: data.posts})
        }
        else{
            dispatch({ type: GET_COURSES_FAILED, msg: data.message })
        }
    })
    .catch(err => {
        dispatch({type: GET_COURSES_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Get tests
export const get_tests = () => async (dispatch) => {
    API.get(`all-tests`)
    .then(res => {
        const { data } = res

        if(res.status === 200){
            dispatch({type: GET_TESTS, payload: data.tests})
        }
        else{
            dispatch({ type: GET_TESTS_FAILED, msg: data.message })
        }
    })
    .catch(err => {
        dispatch({type: GET_COURSES_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Post Score
export const send_score = (values) => async (dispatch) => {
    API.post('/test-score', values)
    .then(res => {
        const { data } = res

        if(res.status === 200){
            dispatch({type: POST_SCORE, payload: data.tests})
        }
        else{
            dispatch({ type: POST_SCORE_FAILED, msg: data.message })
        }
    })
    .catch(err => {
        dispatch({type: GET_COURSES_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Set Avatar
export const set_avatar = data => dispatch => {
    dispatch({type: PROFILE_PICS, payload: data})
}

export const send_cart = data => dispatch => {
    API.post(`carts/carts/${userId}`, {data})
    .then(res => {
        const { data } = res

        if(res.status === 200){

            dispatch({type: SEND_CART, payload: media})
        }
        else{
            dispatch({ type: SEND_CART_FAILED, msg: data.message })
        }
    })
    .catch(err => {
        dispatch({type: SEND_CART_FAILED, msg: 'Something went wrong, please try again'})
    })
}

export const paystack_payment = data => dispatch => {
    API.post(`payment/paystack/pay`, {data})
    .then(res => {
        const { data } = res

        if(res.status === 200){

            dispatch({type: PAYMENT_SUCCESSFUL, payload: media})
        }
        else{
            dispatch({ type: PAYMENT_FAILURE, msg: data.message })
        }
    })
    .catch(err => {
        dispatch({type: PAYMENT_FAILURE, msg: 'Something went wrong, please try again'})
    })
}