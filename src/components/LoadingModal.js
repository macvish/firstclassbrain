import React, { useEffect } from 'react'
import { StyleSheet, View, Modal, Dimensions, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')

const LoadingModal = props => {
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
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ActivityIndicator size={50} color='#1F78B4' />
                </View>
                <TouchableOpacity></TouchableOpacity>
            </View>
        </Modal>
    )
}

export default LoadingModal

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
