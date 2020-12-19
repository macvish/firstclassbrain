import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import splash_bg from '../assets/images/splash_bg.png'
import { mainRoot } from '../navigation/mainRootNavigation'
import { authRoot } from '../navigation/authRootNavigation'
import { get_user, get_courses, get_tests } from '../reducers/mainAction'
import { getAccessToken } from '../reducers/authAction'

const {width, height} = Dimensions.get('screen')

const AuthLoadingScreen = (props) => {
    const [counter, setCounter] = useState(0.0)

    // using station to limit the amount of times useEffect rerender
    const [station, setStation] = useState(0)

    useEffect(() => {
        let mounted = true
        if(mounted){
            setStation(1)
            setTimeout(() => {
                setCounter(prevState => prevState + 0.5)
            }, 2000)

            if(counter == 1){
                _bootstrapAsyncNaviagete()
            }
        }

        return () => {
            clearTimeout()
            mounted = false
        }
        
    }, [counter])

    useEffect(() => {
        let mounted = true
        if(mounted)
        {
            _bootstrapAsync()
        }

        return () => {
            mounted = false
        }
    }, [station])

    // Fetch the token from storage then navigate to our appropriate place
	const _bootstrapAsync = async () => {

        // Fetch the token from storage then navigate to our appropriate place
          const userToken = await AsyncStorage.getItem('access_token')

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.

        if (userToken){
            props.get_courses()
            props.get_tests()
            props.get_user(userToken)
            props.getAccessToken()
        }
    }

      // Fetch the token from storage then navigate to our appropriate place
	const _bootstrapAsyncNaviagete = async () => {

        // Fetch the token from storage then navigate to our appropriate place
        const userToken = await AsyncStorage.getItem('access_token')

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if (userToken){
            if(Object.keys(props.payload).length !== 0){
                Navigation.setRoot(mainRoot)
            }
            else{
                Navigation.setRoot(authRoot)
            }
        }
        else{
            Navigation.setRoot(authRoot)
        }
    }

    return (
        <ImageBackground source={splash_bg} style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator color='#F6F5F5' size="large" />
                </View>
            </View>

        </ImageBackground>
    )
}

AuthLoadingScreen.options = {
    topBar: {
        visible: false
    }
}

const mapStateToProps = (state) => ({
    payload: state.auth.payload
})

const mapDispatchToProps = {
    get_courses,
    get_tests,
    get_user,
    getAccessToken
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    },

    contentWrapper: {
        width: width,
        height: height,
        backgroundColor: 'rgba(43, 126, 151, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
