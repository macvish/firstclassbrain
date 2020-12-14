import React from 'react'
import { StyleSheet, Text, View, Modal, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown-v2'

const { width, height } = Dimensions.get('window')

const SelectionModal = (props) => {

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
                    <Text style={styles.message} >Select Course Term</Text>
                    <Dropdown
                        data={[
                            {value: 1, label: 'First Term'},
                            {value: 2, label: 'Second Term'},
                            {value: 3, label: 'Third Term'},
                        ]}
                        containerStyle={{ width: width/1.27, alignSelf: "center"}}
                        labelTextStyle={{color: '#707070'}}
                        itemColor='#707070'
                        label='Term'
                        onChangeText={e => props.onChange('term', e)}
                        inputContainerStyle={{}}
                    />

                    <Text style={styles.message} >Select Course Week</Text>

                    <Dropdown
                        data={[
                            {value: 1, label: 'Week 1'},
                            {value: 2, label: 'Week 2'},
                            {value: 3, label: 'Week 3'},
                            {value: 4, label: 'Week 4'},
                            {value: 5, label: 'Week 5'},
                            {value: 6, label: 'Week 6'},
                            {value: 7, label: 'Week 7'},
                            {value: 8, label: 'Week 8'},
                            {value: 9, label: 'Week 9'},
                            {value: 10, label: 'Week 10'},
                            {value: 11, label: 'Week 11'},
                            {value: 12, label: 'Week 12'},
                            {value: 13, label: 'Week 13'},
                            {value: 14, label: 'Week 14'},
                        ]}
                        containerStyle={{ width: width/1.27, alignSelf: "center" }}
                        labelTextStyle={{color: '#707070'}}
                        itemColor='#707070'
                        label='Week'
                        onChangeText={e => props.onChange('week', e)}
                    />
                </View>
                <View style={styles.buttonsWrapper}>
                    <Button 
                        title='Cancel' 
                        titleStyle={styles.buttonTitle}
                        buttonStyle={{...styles.button, backgroundColor: '#EC5959'}} 
                        containerStyle={{borderRadius: 0}} 
                        onPress={() => props.onClose()}
                    />
                    <Button 
                        title='Continue' 
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

export default SelectionModal

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

    selectContainer: {
        borderWidth: 1,
        borderRadius: 20,
        // height: 50
    },

    message: {
        paddingTop: 25,
        paddingBottom: 10,
        fontSize: 17,
        textAlign: 'center'
    },

    buttonsWrapper: {
        flexDirection: 'row',
        width: width,
        backgroundColor: '#fff'
    },

    button: {
        height: 60,
        width: width/2,
        borderRadius: 0
    },

    buttonTitle: {
        fontSize: 17
    }
})
