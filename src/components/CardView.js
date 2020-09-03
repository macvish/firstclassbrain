import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'

import pp from '../assets/intro_vector.png'


const { width, height } = Dimensions.get('window')

const CardView = props => {

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
        <TouchableOpacity onPress={() => handleNavigation(props.screen)}>
            <View style={[styles.container, props.height ? {height: props.height} : null]}>
                <ImageBackground source={props.src ?? pp} imageStyle={{borderRadius: 20}} style={[styles.imageContainer, props.height ? {height: props.height} : null]}>
                    {props.title ? 
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={{fontSize: 17, color: 'white', textAlign: 'center'}}>Start Quiz</Text>
                        </View>
                    :
                        null
                    }
                </ImageBackground>
            </View>
        </TouchableOpacity>
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
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    }
})
