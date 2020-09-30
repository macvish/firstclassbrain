import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default axios.create({
    //API Base Url goes here
    baseURL: 'https://firstclassbrain-server.herokuapp.com/',
    headers: {
    Authorization: `${AsyncStorage.getItem('access_token')}`,
    'content-type': 'application/json',
  },
})
