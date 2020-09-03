import { FULLSCREEN, GET_PRODUCTS, GET_PRODUCTS_FAILED, PROFILE_PICS } from './reducerTypes';
const INT_STATE = {
    products: {},
    categories: {},
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
        case GET_PRODUCTS:
            return Object.assign({}, state, {
                products: action.payload,
                categories: action.cat
            })
        case GET_PRODUCTS_FAILED:
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