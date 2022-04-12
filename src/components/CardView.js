import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

import pp from '../assets/images/quiz.png'
import CustomText from './CustomText'


const { width, height } = Dimensions.get('window')

const CardView = props => {

    const [modalVisible, setModalVisible] = useState(false)


    const handleNavigation = screenName => {
        Navigation.push(props.componentId, {
            component: {
                name: screenName,
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


    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[styles.container, props.height ? {height: props.height} : null]}>
                    <ImageBackground source={props.src ?? pp} imageStyle={{borderRadius: 20}} style={[styles.imageContainer, props.height ? {height: props.height} : null]}>
                        {props.title ? 
                            <View style={styles.contentContainer}>
                                <CustomText weight="bold" style={styles.title}>{props.title}</CustomText>
                                <CustomText style={{fontSize: 17, color: 'white', textAlign: 'center'}}>Start Quiz</CustomText>
                            </View>
                        :
                            null
                        }
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default CardView

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
        height: height/9,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
        justifyContent: 'space-around',
        paddingLeft: 10,
        paddingRight: 10
    },

    title: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center'
    }
})
