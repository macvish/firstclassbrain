import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import pp from '../assets/physics_program.png'

const { width, height } = Dimensions.get('window')

const CardViewFade = props => {

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
        <TouchableOpacity onPress={() => handleNavigation(props.screenName)}>
            <View style={styles.container}>
                <ImageBackground source={props.src ?? pp} imageStyle={{borderRadius: 20}} style={styles.imageContainer}>
                    <View style={styles.fadeContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

export default CardViewFade

const styles = StyleSheet.create({
    container: {
        width: width/2.3,
        height: height/7,
        borderRadius: 20,
    },

    imageContainer: {
        // flex: 1,
        width: width/2.3,
        height: height/7,
        borderRadius: 20,
        justifyContent: 'flex-end'
    },

    fadeContainer: {
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        paddingLeft: 20
    },

    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 22
    }
})
