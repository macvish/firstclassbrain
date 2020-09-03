import React, { useEffect, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import * as Progress from 'react-native-progress'

import splash_bg from '../assets/splash_bg.png'
import { onBoardRoot } from '../navigation/onBoardRootNavigation'

const {width, height} = Dimensions.get('window')

const SplashScreen = props => {

    const [counter, setCounter] = useState(0.0)

    useEffect(() => {
        setInterval(() => {
            setCounter(prevState => prevState + 0.2)
        }, 2000);

        if(counter == 1){
            clearInterval()
            Navigation.setRoot(onBoardRoot)
        }
        
    }, [counter])

    return (
        <ImageBackground source={splash_bg} style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={styles.logo}>Logo</Text>
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

export default SplashScreen

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
        fontSize: 50,
        color: '#fff'
    }
})
