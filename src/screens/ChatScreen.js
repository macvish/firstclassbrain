import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import CustomText from '../components/CustomText'

const {width, height} = Dimensions.get('window')

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text}>Coming Soon...</CustomText>
        </View>
    )
}

ChatScreen.options = {
    topBar: {
        visible: false
    }
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'center', 
        alignItems: 'center'
    },

    text: {
        fontSize: 20,
        fontWeight: '100'
    }
})
