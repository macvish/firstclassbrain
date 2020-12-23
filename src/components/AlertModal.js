import React from 'react'
import { StyleSheet, View, Modal, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown-v2'

import CustomText from './CustomText'

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
                    <CustomText style={styles.message} >{props.message}</CustomText>
                    {
                        props.screen === 'class' 
                            ? <Dropdown
                                data={[
                                    {value: 1, label: '1 Month'},
                                    {value: 2, label: '3 Months'},
                                    {value: 3, label: '6 Months'},
                                    {value: 4, label: '1 Year'}
                                ]}
                                containerStyle={{ width: width/1.27, alignSelf: "center"}}
                                labelTextStyle={{color: '#707070'}}
                                itemColor='#707070'
                                label='Choose Subscription Type'
                                onChangeText={e => props.onChange(e)}
                                inputContainerStyle={{}}
                            />
                            : null
                    }
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
        height: height/1.02,
        backgroundColor: 'rgba(112, 112, 112, 0.5)',
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
        height: 70,
        width: width/2,
        borderRadius: 0
    },

    buttonTitle: {
        fontSize: 17
    }
})
