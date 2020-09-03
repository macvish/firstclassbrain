import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { FULLSCREEN, GET_USER, GET_USER_FAILED, GET_PRODUCTS, 
    GET_PRODUCTS_FAILED, PROFILE_PICS, SEND_CART, PAYMENT_SUCCESSFUL, 
    PAYMENT_FAILURE } from '../reducers/reducerTypes'
import API from '../helper/API'
import { mainRoot } from '../navigation/mainRootNavigation'
import { Navigation } from 'react-native-navigation'
import { authRoot } from '../navigation/authRootNavigation'

const userId = AsyncStorage.getItem('access_id')

export const fullscreen = bool => dispatch => {
    dispatch({type: FULLSCREEN, data: bool})
}

// Get User
export const get_user = (user_id) => async (dispatch) => {

    API.get(`users/${user_id}`)
    .then(res => {
        const { data } = res
        if(res.status === 200){
            dispatch({type: GET_USER, payload: data})
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

// Edit User
export const edit_user = ({fullname, email, phone, pictureURL, address, password}) => async (dispatch) => {

    API.put(`users/${data.user_id}`, {fullname, email, phone, pictureURL, address, password})
    .then(res => {
        const { data } = res
        if(res.status === 200){
            dispatch({type: GET_USER, payload: data})
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
    API.delete(`users/${user_id}`)
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

// Get Products
export const get_products = () => async (dispatch) => {
    API.get(`product/product/${userId}`)
    .then(res => {
        const { data } = res

        if(res.status === 200){
            console.log(data)
            const preschool = data.filter(d => d.categoryId == 1)
            const nursery = data.filter(d => d.categoryId == 2)
            const primary = data.filter(d => d.categoryId == 3)
            const secondary = data.filter(d => d.categoryId == 4)

            const videos = data.filter(d => d.producttype == 'video')
            const docs = data.filter(d => d.producttype == 'Documents')
            const audios = data.filter(d => d.producttype == 'audio')

            const cat = {
                preschool: preschool,
                nursery: nursery,
                primary: primary,
                secondary: secondary
            }

            const media = {
                videos: videos,
                docs: docs,
                audios: audios,
            }

            dispatch({type: GET_PRODUCTS, payload: media, cat: cat})
        }
        else{
            console.log('other than 200', data)
            dispatch({ type: GET_PRODUCTS_FAILED, msg: data.message })
        }
    })
    .catch(err => {
        dispatch({type: GET_PRODUCTS_FAILED, msg: 'Something went wrong, please try again'})
    })
}

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