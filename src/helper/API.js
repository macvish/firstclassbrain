import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default axios.create({
    //API Base Url goes here
    baseURL: 'http://139.59.212.211/',
    headers: {
    Authorization: `${AsyncStorage.getItem('access_token')}`,
    'content-type': 'application/json',
  },
})