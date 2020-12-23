import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

import pp from '../assets/images/quiz.png'
import CustomText from './CustomText'
import AlertModal from './AlertModal'


const { width, height } = Dimensions.get('window')

const QuestionsCardView = props => {

    const [modalVisible, setModalVisible] = useState(false)

    const onContinue = () => {
        setModalVisible(false)
        
        Navigation.push(props.componentId, {
            component: {
                name: 'Quiz',
                passProps: {
                    item: props.item
                },
                options: {  
                    animations: {
                        push: {
                            content: {
                                translationX: {
                                    from: width,
                                    to: 0,
                                    duration: 300
                                }
                            }
                        },
                        pop: {
                            content: {
                                translationX: {
                                    from: 0,
                                    to: width,
                                    duration: 300
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    const onCloseModal = () => {
        setModalVisible(false)
    }


    return (
        <>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={[styles.container, props.height ? {height: props.height} : null]}>
                <ImageBackground 
                    source={props.src ?? pp} 
                    imageStyle={{borderRadius: 20}} 
                    style={[styles.imageContainer, props.height ? {height: props.height} : null]} 
                    blurRadius={2.5}
                >
                    {props.title ? 
                        <View style={styles.contentContainer}>
                            <CustomText style={styles.title}>{String(props.title).toUpperCase()}</CustomText>
                            <CustomText style={styles.title}>{props.subTitle}</CustomText>
                            <CustomText style={styles.title}>{props.week}</CustomText>
                            <CustomText style={{fontSize: 17, color: 'white', textAlign: 'center'}}>Start Quiz</CustomText>
                        </View>
                    :
                        null
                    }
                </ImageBackground>
            </View>
        </TouchableOpacity>
        <AlertModal
                visible={modalVisible} 
                message='Do you want to start your Assignment Quiz?'
                onClose={onCloseModal} 
                onContinue={onContinue}
            />
        </>
    )
}

export default QuestionsCardView

const styles = StyleSheet.create({
    container: {
        width: width/2.3,
        height: height/9,
        borderRadius: 20,
    },

    imageContainer: {
        // flex: 1,
        width: width/2.3,
        height: height/9,
        borderRadius: 20,
        justifyContent: 'flex-end'
    },

    contentContainer: {
        height: height/7,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
        justifyContent: 'space-around',
        paddingLeft: 10,
        paddingRight: 10
    },

    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    }
})
