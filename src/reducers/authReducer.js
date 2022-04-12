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
    GET_USER_FAILED ,
    CLEAR_ALL_ERROR_MESSAGE,
    GET_ACCESS_TOKEN,
    CHANGE_CLASS,
    FORGOT_PASSWORD_FAILURE
} from './reducerTypes'

const INT_STATE = {
    payload: {},
    login_err_msg: '',
    signup_err_msg: '',
    signup_success_message: '',
    forgot_password_err_msg: '',
    forgot_password_success_message: '',
    err_msg: '',
    is_logged_in: false,
    has_onboarded: false,
    auth_type: '',
    access_token: ''
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
                is_logged_in: true,
                access_token: action.payload
            })
        case GET_ACCESS_TOKEN:
            return Object.assign({}, state, {
                access_token: action.payload
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
                signup_success_message: 'Registration was successful, a verification email has been be sent to you.'
            })
        case SIGN_UP_FAILURE:
            return Object.assign({}, state, {
                signup_err_msg: action.msg,
            })
        case FORGOT_PASSWORD:
            return Object.assign({}, state, {
                forgot_password_success_message: action.msg
            })
        case FORGOT_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                forgot_password_err_msg: action.msg
            })
        case CHANGE_CLASS:
            return Object.assign({}, state, {
                payload: action.payload
            })
        case LOGOUT:
            return Object.assign({}, state, {
                payload: {},
                msg: '',
                is_logged_in: false,
                has_onboarded: true,
                login_err_msg: '',
                signup_err_msg: '',
                forgot_password_err_msg: '',
                auth_type: '',
            })
        case CLEAR_ALL_ERROR_MESSAGE:
            return Object.assign({}, state, {
                login_err_msg: '',
                signup_err_msg: '',
                forgot_password_err_msg: '',
                forgot_password_err_msg: '',
                signup_success_message: '',
                err_msg: '',
            })
        default:
            return state
    }
}