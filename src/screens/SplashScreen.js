import React, { Component } from 'react'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { Image } from 'react-native-elements'

import splash_bg from '../assets/images/splash_bg.png'
import { onBoardRoot } from '../navigation/onBoardRootNavigation'
import { mainRoot } from '../navigation/mainRootNavigation'
import { authRoot } from '../navigation/authRootNavigation'
import { get_user, get_courses, get_tests } from '../reducers/mainAction'
import { getAccessToken } from '../reducers/authAction'
import logo from '../assets/logo/logo.jpeg'

const {width, height} = Dimensions.get('screen')

class SplashScreen extends Component {
    state = {
        counter: 0.0
    }

    _bootstrapAsync = async () => {

        // Fetch the token from storage then navigate to our appropriate place
          const userToken = await AsyncStorage.getItem('access_token')
  
          const onboarded = await AsyncStorage.getItem('has_onboarded')
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          if(onboarded){
              if (userToken){
                  if(Object.keys(this.props.payload).length !== 0){
                    this.props.get_courses()
                  }
                  else{
                    this.props.get_courses()
                    this.props.get_user(userToken)
                    this.props.get_tests()
                    this.props.getAccessToken()
                  }
              }
              else{
              }
          }else{
          }
      }

      // Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsyncNaviagete = async () => {

        // Fetch the token from storage then navigate to our appropriate place
        const userToken = await AsyncStorage.getItem('access_token')

        const onboarded = await AsyncStorage.getItem('has_onboarded')
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if(onboarded){
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
        else{
            Navigation.setRoot(onBoardRoot)
        }
    }

    componentDidMount() {
        this._bootstrapAsync()
        setTimeout(() => {
            this.setState(prevState => ({counter: prevState.counter + 0.2}))
        }, 2000)
    }

    componentDidUpdate() {
        if(this.state.counter < 1) {
            setTimeout(() => {
                this.setState(prevState => ({counter: prevState.counter + 0.2}))
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
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Image 
                            source={logo}
                            style={styles.logo}
                        />
                    </View>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Progress.Bar 
                        progress={this.state.counter} 
                        width={width/1.2}
                        height={15}
                        borderColor='#F6F5F5'
                        color='#F6F5F5'
                        borderRadius={20}
                        borderWidth={2} 
                        style={{marginBottom: 100}}
                    />
                </View>
                </View>

            </ImageBackground>
        )
    }
}

SplashScreen.options = {
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


export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)

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

    logo: {
        width: 120,
        height: 120,
        borderRadius: 10
    }
})
