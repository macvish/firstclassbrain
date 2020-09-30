import React from 'react'
import { StyleSheet, Text, View, Modal, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const AlertModal = props => {
    return (
        <Modal 
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
            }}
        >
            <View style={styles.container}>
                <View style={styles.messageWrapper} >
                    <Text style={styles.message} >{props.message}</Text>
                </View>
                <View style={styles.buttonsWrapper}>
                    <Button 
                        title='No' 
                        titleStyle={styles.buttonTitle}
                        buttonStyle={{...styles.button, backgroundColor: '#EC5959'}} 
                        containerStyle={{borderRadius: 0}} 
                        onPress={() => props.onClose()}
                    />
                    <Button 
                        title='Yes' 
                        titleStyle={styles.buttonTitle}
                        buttonStyle={{...styles.button, backgroundColor: '#18BE91'}}
                        containerStyle={{borderRadius: 0}} 
                        onPress={() => props.onContinue()} 
                    />
                </View>
            </View>
        </Modal>
    )
}

export default AlertModal

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: 'rgba(112, 112, 112, 0.8)',
        justifyContent: 'flex-end'
    },

    messageWrapper: {
        backgroundColor: '#fff',
        alignItems: 'center'
    },

    message: {
        paddingTop: 25,
        paddingBottom: 25,
        fontSize: 17,
        textAlign: 'center'
    },

    buttonsWrapper: {
        flexDirection: 'row',
        width: width,
        backgroundColor: '#fff'
    },

    button: {
        height: 80,
        width: width/2,
        borderRadius: 0
    },

    buttonTitle: {
        fontSize: 17
    }
})
