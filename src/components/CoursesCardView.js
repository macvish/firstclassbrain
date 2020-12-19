import React, { useRef, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import pp from '../assets/images/quiz.png'

const { width, height } = Dimensions.get('window')

const CoursesCardView = props => {
    const onContinue = () => {
      handleNavigation('Class')
    }

    const handleNavigation = screenName => {
        Navigation.push(props.componentId, {
            component: {
                name: screenName,
                passProps: {
                    options: props.options,
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

    return (
        <>
            <TouchableOpacity 
                onPress={() => onContinue()}
            >
                <View style={styles.container}>
                    <ImageBackground 
                        source={props.src ? {uri: props.src} : pp} 
                        imageStyle={{borderRadius: 20}} 
                        style={styles.imageContainer} 
                        blurRadius={1.5}
                    >
                        <View style={styles.fadeContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        </>
    )
}

const mapStateToProps = (state) => ({
    courses: state.main.courses,
    user: state.auth.payload
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, )(CoursesCardView)

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
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        paddingLeft: 20
    },

    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        // textAlign: 'center'
    }
})
