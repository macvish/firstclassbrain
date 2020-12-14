import { 
    HAS_ONBOARDED, 
    AUTH_TYPE, 
    LOGIN, 
    LOGIN_FAILURE,
    SIGN_UP, 
    SIGN_UP_FAILURE, 
    LOGOUT,
    FORGOT_PASSWORD, 
    GET_USER, 
    GET_USER_FAILED 
} from './reducerTypes'

const INT_STATE = {
    payload: {},
    forgot_payload: {},
    login_err_msg: '',
    signup_err_msg: '',
    signup_success_message: '',
    err_msg: '',
    is_logged_in: false,
    has_onboarded: false,
    auth_type: '',
}

export const authReducer = (state = INT_STATE, action) => {
    switch (action.type) {
        case HAS_ONBOARDED:
            return Object.assign({}, state, {
                has_onboarded: action.data
            })
        case AUTH_TYPE:
            return Object.assign({}, state, {
                auth_type: action.type
            })
        case LOGIN:
            return Object.assign({}, state, {
                is_logged_in: true
            })
        case GET_USER:
            return Object.assign({}, state, {
                payload: action.payload,
                is_logged_in: true
            })
        case GET_USER_FAILED:
            return Object.assign({}, state, {
                is_logged_in: false
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                login_err_msg: action.msg,
            })
            case SIGN_UP:
            return Object.assign({}, state, {
                // payload: action.data,
                // is_logged_in: true,
                signup_success_message: 'Registration was successful, a verification email has been be sent to you.'
            })
        case SIGN_UP_FAILURE:
            return Object.assign({}, state, {
                signup_err_msg: action.msg,
            })
        case FORGOT_PASSWORD:
            return Object.assign({}, state, {
                forgot_payload: action.data
            })
        case LOGOUT:
            return Object.assign({}, state, {
                payload: {},
                msg: '',
                is_logged_in: false,
                has_onboarded: true,
                auth_type: '',
            })
        default:
            return state
    }
}