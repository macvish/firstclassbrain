import { 
    FULLSCREEN, GET_COURSES, GET_COURSES_FAILED, PROFILE_PICS,
    GET_TESTS, GET_TESTS_FAILED, PAYMENT_SUCCESSFUL, PAYMENT_FAILURE,
    POST_SCORE, POST_SCORE_FAILED, CHANGE_CLASS, CHANGE_CLASS_FAILED, 
    CHANGE_PASSWORD, CHANGE_PASSWORD_FAILED, CLEAR_ALL_ERROR_MESSAGE, MOST_VIEWED, GET_USER
 } from './reducerTypes';
 import subjects from '../helper/subjects.json'

const INT_STATE = {
    courses: [],
    tests: [],
    most_viewed_classes: [],
    profile_pics: '',
    err_msg: '',
    payment_message: undefined,
    fullscreen: false,
    change_class_message: '',
    change_password_message: ''
}

export const mainReducer = (state = INT_STATE, action) => {
    switch (action.type) {
        case FULLSCREEN:
            return Object.assign({}, state, {
                has_onboarded: action.data
            })
        case GET_COURSES:
            return Object.assign({}, state, {
                courses: action.payload
            })
        case GET_COURSES_FAILED:
            return Object.assign({}, state, {
                err_msg: action.msg
            })
        case GET_TESTS:
            return Object.assign({}, state, {
                tests: action.payload
            })
        case GET_TESTS_FAILED:
            return Object.assign({}, state, {
                err_msg: action.msg
            })
        case PROFILE_PICS:
            return Object.assign({}, state, {
                profile_pics: action.payload
            })
        case PAYMENT_SUCCESSFUL:
            return Object.assign({}, state, {
                payment_message: action.message
            })
        case PAYMENT_FAILURE:
            return Object.assign({}, state, {
                payment_message: action.message
            })
        case CHANGE_CLASS:
            return Object.assign({}, state, {
                change_class_message: action.message
            })
        case CHANGE_CLASS_FAILED:
            return Object.assign({}, state, {
                change_class_message: action.message
            })
        case CHANGE_PASSWORD:
            return Object.assign({}, state, {
                change_password_message: action.message
            })
        case CHANGE_PASSWORD_FAILED:
            return Object.assign({}, state, {
                change_password_message: action.message
            })
        case GET_USER:
            return Object.assign({}, state, {
                most_viewed_classes: subjects.filter(item => item.class === action.payload.classSelected).map((data, index) => ({...data, id: index+1})).sort(() =>  0.5 - Math.random()).slice(0, 4),
            })
        case CLEAR_ALL_ERROR_MESSAGE:
            return Object.assign({}, state, {
                change_class_message: '',
                change_password_message: ''
            })
        default:
            return state
    }
}