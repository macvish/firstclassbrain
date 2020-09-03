import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Icon, Button } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import { Navigation } from 'react-native-navigation'
import * as Animatable from 'react-native-animatable'

import onboard_one from '../assets/onboard_one.png'
import onboard_two from '../assets/onboard_two.png'
import onboard_three from '../assets/onboard_three.png'

import { authRoot } from '../navigation/authRootNavigation'
import { onboard } from '../reducers/authAction'
import { connect } from 'react-redux'

const {width, height} = Dimensions.get('window')
const OnboardingScreen = props => {
    const onCompleted = async () => {
        props.onboard()
        
        buttonAnimation.current.bounceOut(300).then(endState => {
            Navigation.setRoot(authRoot)
        })
    }

    const swiperRef = useRef(0)
    const buttonAnimation = useRef(null)


    return (
        <View style={{
            width: width,
            height: height,
        }}>
            <Swiper 
                loop={false}
                // onIndexChanged={}
                showsPagination={false}
                ref={swiperRef}
                scrollEnabled={true}
            >
                {/* Slide 1 */}
                <View style={styles.container}>
                    <OnboardingContent 
                        title='Access to Course Materials' 
                        content='Have access to various course materials depending on your subject and class'
                        onPress={() => swiperRef.current.scrollBy(1)}
                        image={onboard_one}
                        skip={true}
                    />
                </View>

                {/* Slide 2 */}
                <View style={styles.container}>
                    <OnboardingContent 
                        title='Study made easier with Videos' 
                        content='Have access to various course videos depending on your subject and class'
                        onPress={() => swiperRef.current.scrollBy(1)}
                        image={onboard_two}
                        skip={true}
                    />
                </View>

                {/* Slide 3 */}
                <View style={styles.container}>
                    <OnboardingContent 
                        title='Prepare for your Examination' 
                        content='Prepare for your upcoming examination with various course materials'
                        btnTitle='Get Started'
                        onPress={() => onCompleted()}
                        image={onboard_three}
                    />
                </View>
            </Swiper>
        </View>
    )
}

const OnboardingContent = params => {
    return (
        <>
                <View style={{alignItems: 'center', height: '25%', justifyContent: 'flex-start'}}>
                    {/* <LogoSvg /> */}
                    <View style={{backgroundColor: '#3FB0D4', width: width, height: '90%', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={() => params.onPress()}>
                            <Text style={{color: 'white', marginRight: 30, marginTop: 30}}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Animatable.View animation='bounceIn' duration={4000} style={{alignItems: 'center', justifyContent: 'center', height: height/2}}>
                    <ImageBackground source={params.image} style={{width: width/1.3, height: width}} resizeMode='contain'>
                    </ImageBackground>
                </Animatable.View>

                <View style={{alignItems: 'center', height: height/8}}>
                    <View style={{width: width/1.2}}>
                        <Text style={styles.title}>{params.title}</Text>
                    </View>

                    <View>
                        <Text style={styles.subTitle}>{params.content}</Text>
                    </View>

                </View>
            
                <Button 
                    title={params.btnTitle ?? 'Next'}
                    buttonStyle={styles.button}
                    titleStyle={{fontSize: 22, fontWeight: '700'}}
                    onPress={() => params.onPress()}
                />
        </>
    )
}

OnboardingScreen.options = {
    topBar: {
        visible: false
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    onboard
}


export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen)

const styles = StyleSheet.create({
    wrapper: {
        width: width,
        height: height
    },
    container: {
        height: height,
        backgroundColor: '#FFF',
    },
    
    logo: {
        // flex: 1
        
    },

    title: {
        fontSize: 22,
        color: '#171717',
        fontWeight: '700',
        textAlign: 'center',
        // width: width/1.2
    },

    subTitle: {
        fontSize: 13,
        color: '#707070',
        fontWeight: '700',
        textAlign: 'center',
        width: width/1.25
    },

    nextIcon: {
        
    },
    button: {
        backgroundColor: '#257F9B',
        borderRadius: 15,
        width: width/1.6,
        height: 50,
        alignSelf: 'center',
    },
})
