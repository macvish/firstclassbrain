import React, { useEffect } from 'react'
import { 
  StyleSheet, View, Modal, 
  TouchableWithoutFeedback, Dimensions 
} from 'react-native'

import CustomText from './CustomText'

const {width, height} = Dimensions.get('window')

const NoContentModal = props => {
	useEffect(() => {
		if(props.visible){
		setTimeout(() => {
			props.handleOnpress()
		}, 3000);
	}
	}, [props.visible])

    return (
        
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
            }}
        >
            <TouchableWithoutFeedback onPress={() => props.handleOnpress()}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CustomText style={{ fontSize: 20, color: "#fff" }}>No Content Yet</CustomText>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default NoContentModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(112, 112, 112, 0.8)',
      },

      modalView: {
        margin: 20,
        backgroundColor: "transparent",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        width: width/1.3
      },

      modalInput: {
        fontSize: 15,
        textAlign: 'center',
        borderWidth: 0.3,
        borderColor: '#707070',
        borderRadius: 5,
        width: width/1.6,
        marginTop: 20
      },

      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },

      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
