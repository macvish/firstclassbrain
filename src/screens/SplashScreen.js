import React, { useEffect, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { Image } from 'react-native-elements'

import splash_bg from '../assets/images/splash_bg.png'
import { onBoardRoot } from '../navigation/onBoardRootNavigation'
import { mainRoot } from '../navigation/mainRootNavigation'
import { authRoot } from '../navigation/authRootNavigation'
import { get_user, get_products } from '../reducers/mainAction'
import logo from '../assets/logo/logo.jpeg'

const {width, height} = Dimensions.get('window')

const SplashScreen = props => {

    const [counter, setCounter] = useState(0.0)

    // using station to limit the amount of times useEffect rerender
    const [station, setStation] = useState(0)

    useEffect(() => {
        setStation(1)
        setTimeout(() => {
            setCounter(prevState => prevState + 0.2)
        }, 2000);

        return () => {
            if(counter == 1){
                clearInterval()
                _bootstrapAsyncNaviagete()
            }
        }
        
    }, [counter])

    useEffect(() => {
        _bootstrapAsync()
        return () => {
        }
    }, [station])

    // Fetch the token from storage then navigate to our appropriate place
	const _bootstrapAsync = async () => {
        console.log('get info')

        // Fetch the token from storage then navigate to our appropriate place
          const userToken = await AsyncStorage.getItem('access_id')
  
          const onboarded = await AsyncStorage.getItem('has_onboarded')
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          if(onboarded){
              if (userToken){
                  if(Object.keys(props.payload).length !== 0){
                      props.get_products(userToken)
                  }
                  else{
                      props.get_products(userToken)
                      props.get_user(userToken)
                  }
              }
              else{
              }
          }else{
          }
      }

      // Fetch the token from storage then navigate to our appropriate place
	const _bootstrapAsyncNaviagete = async () => {

        console.log('navigate')

        // Fetch the token from storage then navigate to our appropriate place
          const userToken = await AsyncStorage.getItem('access_id')
  
          const onboarded = await AsyncStorage.getItem('has_onboarded')
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          if(onboarded){
              if (userToken){
                  if(Object.keys(props.payload).length !== 0){
                      Navigation.setRoot(mainRoot)
                  }
              }
              else{
                  Navigation.setRoot(authRoot)
              }
          }else{
              Navigation.setRoot(onBoardRoot)
          }
      };

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
                    progress={counter} 
                    width={width/1.2}
                    height={15}
                    borderColor='#F6F5F5'
                    color='#F6F5F5'
                    borderRadius={20}
                    borderWidth={2} 
                    style={{marginBottom: 70}}
                />
            </View>
            </View>

        </ImageBackground>
    )
}

SplashScreen.options = {
    topBar: {
        visible: false
    }
}

const mapStateToProps = (state) => ({
    payload: state.main.payload
})

const mapDispatchToProps = {
    get_products,
    get_user,
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
