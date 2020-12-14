import { 
    FULLSCREEN, GET_COURSES, GET_COURSES_FAILED, PROFILE_PICS,
    GET_TESTS, GET_TESTS_FAILED
 } from './reducerTypes';
const INT_STATE = {
    courses: [],
    tests: [],
    profile_pics: '',
    err_msg: '',
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
        default:
            return state
    }
}