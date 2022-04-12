import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import splash_bg from '../assets/images/splash_bg.png'
import { mainRoot } from '../navigation/mainRootNavigation'
import { authRoot } from '../navigation/authRootNavigation'
import { get_user, get_courses, get_tests } from '../reducers/mainAction'
import { getAccessToken } from '../reducers/authAction'

const {width, height} = Dimensions.get('screen')

class AuthLoadingScreen extends Component {
    state = {
        counter: 0.0
    }

    _bootstrapAsync = async () => {

        // Fetch the token from storage then navigate to our appropriate place
          const userToken = await AsyncStorage.getItem('access_token')

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.

        if (userToken){
            this.props.get_courses()
            this.props.get_tests()
            this.props.get_user(userToken)
            this.props.getAccessToken()
        }
    }

	_bootstrapAsyncNaviagete = async () => {

        // Fetch the token from storage then navigate to our appropriate place
        const userToken = await AsyncStorage.getItem('access_token')

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if (userToken){
            if(Object.keys(this.props.payload).length !== 0){
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

    componentDidMount() {
        this._bootstrapAsync()
        setTimeout(() => {
            this.setState(prevState => ({counter: prevState.counter + 0.5}))
        }, 2000)
    }

    componentDidUpdate() {
        if(this.state.counter < 1) {
            setTimeout(() => {
                this.setState(prevState => ({counter: prevState.counter + 0.5}))
            }, 2000)
        }

        if(this.state.counter === 1){
            this._bootstrapAsyncNaviagete()
        }
    }

    render() {
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
