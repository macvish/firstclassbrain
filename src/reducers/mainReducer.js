import { 
    FULLSCREEN, GET_COURSES, GET_COURSES_FAILED, PROFILE_PICS,
    GET_TESTS, GET_TESTS_FAILED, PAYMENT_SUCCESSFUL, PAYMENT_FAILURE
 } from './reducerTypes';
const INT_STATE = {
    courses: [],
    tests: [],
    profile_pics: '',
    err_msg: '',
    payment_message: undefined,
    fullscreen: false,
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
        default:
            return state
    }
}