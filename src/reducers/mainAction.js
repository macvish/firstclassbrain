import { FULLSCREEN, GET_USER, GET_USER_FAILED, GET_COURSES, 
    GET_COURSES_FAILED, PROFILE_PICS, PAYMENT_SUCCESSFUL, 
    PAYMENT_FAILURE, GET_TESTS, GET_TESTS_FAILED, POST_SCORE, CHANGE_CLASS,
    POST_SCORE_FAILED, CHANGE_PASSWORD, CHANGE_PASSWORD_FAILED, CHANGE_CLASS_FAILED, MOST_VIEWED, MARK_ATTENDANCE
} from '../reducers/reducerTypes'
import API from '../helper/API'
import { Navigation } from 'react-native-navigation'
import { authRoot } from '../navigation/authRootNavigation'
import AsyncStorage from '@react-native-community/async-storage'

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
        }
        else{
            dispatch({ type: GET_USER_FAILED, msg: data.message })
        }
        })
    .catch(err => {
        dispatch({type: GET_USER_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Get updated user
export const get_updated_user = data => dispatch => {
    dispatch({type: GET_USER, payload: data})
}

// Edit User
export const change_password = (value) => async (dispatch) => {

    const token = await AsyncStorage.getItem('access_token')

    await API.put(`student/change-password`, value, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
        if(res.status === 200){
            dispatch({type: CHANGE_PASSWORD, message: 'Password successfully changed'})
        }
        else{
            dispatch({ type: CHANGE_PASSWORD_FAILED, message: 'Something went wrong, please try again' })
        }
        })
    .catch(err => {
        dispatch({type: CHANGE_PASSWORD_FAILED, message: 'Something went wrong, please try again'})
    })
}

// Edit User
export const change_class = (value) => async (dispatch) => {

    const token = await AsyncStorage.getItem('access_token')

    await API.put(`update-class`, value, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
        const {data} = res
        if(res.status === 200){
            dispatch({type: CHANGE_CLASS, payload: data.result, message: 'Class successfully changed'})
        }
        else{
            dispatch({ type: CHANGE_CLASS_FAILED, message: 'Something went wrong, please try again' })
        }
        })
    .catch(err => {
        dispatch({type: CHANGE_CLASS_FAILED, message: 'Something went wrong, please try again'})
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

// Mark Attendance
export const mark_attendance = (topicId) => async (dispatch) => {

    const token = await AsyncStorage.getItem('access_token')

    API.post(`topic/attendance/${topicId}`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
        const { data } = res

        if(res.status === 200){
            dispatch({type: MARK_ATTENDANCE, payload: data.tests})
        }
        else{
            dispatch({ type: MARK_ATTENDANCE_FAILED, msg: data.message })
        }
    })
    .catch(err => {
        dispatch({type: MARK_ATTENDANCE_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Post Score
export const send_score = (values) => async (dispatch) => {

    const token = await AsyncStorage.getItem('access_token')

    API.post('test-score', values, {headers: {Authorization: `Bearer ${token}`}})
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
        dispatch({type: POST_SCORE_FAILED, msg: 'Something went wrong, please try again'})
    })
}

// Set Avatar
export const set_avatar = data => dispatch => {
    dispatch({type: PROFILE_PICS, payload: data})
}

// Payment
export const paystack_payment = (type, reference) => async dispatch => {

    const token = await AsyncStorage.getItem('access_token')

    API.post(`verify/payment/${type}/${reference}`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
        const { data } = res

        if(res.status === 200){

            dispatch({type: PAYMENT_SUCCESSFUL, message: data.message})
        }
        else{
            dispatch({ type: PAYMENT_FAILURE, msg: data.message })
        }
    })
    .catch(err => {
        dispatch({type: PAYMENT_FAILURE, msg: 'Something went wrong, please try again or contact us'})
    })
}