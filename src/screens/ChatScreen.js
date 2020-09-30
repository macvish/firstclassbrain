import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const {width, height} = Dimensions.get('window')

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Coming Soon...</Text>
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
