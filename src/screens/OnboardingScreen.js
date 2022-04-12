import React, { useRef } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import {  Button } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import { Navigation } from 'react-native-navigation'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'

import onboarding_header from '../assets/images/onboarding_header.png'
import onboard_one from '../assets/images/onboard_one.png'
import CustomText from '../components/CustomText'
import onboard_two from '../assets/images/onboard_two.png'
import onboard_three from '../assets/images/onboard_three.png'
import { authRoot } from '../navigation/authRootNavigation'
import { onboard } from '../reducers/authAction'

const {width} = Dimensions.get('window')
const OnboardingScreen = props => {
    const onCompleted = () => {
        props.onboard()
        Navigation.setRoot(authRoot)
    }

    const swiperRef = useRef(0)


    return (
        <View style={{
            width: width,
            flex: 1
        }}>
            <Swiper 
                loop={false}
                showsPagination={false}
                ref={swiperRef}
                scrollEnabled={false}
            >
                {/* Slide 1 */}
                <View style={styles.container}>
                    <OnboardingContent 
                        title='Access to Course Materials' 
                        content='Have access to various course materials depending on your subject and class'
                        onPress={() => swiperRef.current.scrollBy(1)}
                        skip={true}
                        skipAction={() => swiperRef.current.scrollBy(2)}
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
                        skip={true}
                        skipAction={() => swiperRef.current.scrollBy(1)}
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
                    {/* <headerSvg /> */}
                    <View 
                        style={styles.headerWrapper}
                    >
                        <ImageBackground 
                            source={onboarding_header} 
                            style={styles.header}
                        >
                            {params.skip ? <TouchableOpacity onPress={() => params.skipAction()}>
                                <CustomText style={{color: 'white', marginRight: 30, marginTop: 30}}>Skip</CustomText>
                            </TouchableOpacity> : null}
                        </ImageBackground>
                    </View>
                </View>

                <Animatable.View 
                    animation='bounceIn' 
                    duration={4000} 
                    style={{
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        flex: 2,
                    }}
                >
                    <ImageBackground source={params.image} style={{width: width/1.3, height: width}} resizeMode='contain'>
                    </ImageBackground>
                </Animatable.View>

                <View style={{alignItems: 'center', flex: 1}}>
                    <View style={{width: width/1.2}}>
                        <CustomText weight="bold" style={styles.title}>{params.title}</CustomText>
                    </View>

                    <View>
                        <CustomText weight="bold" style={styles.subTitle}>{params.content}</CustomText>
                    </View>

                </View>
                <View style={{flex: 1}}>

                    <Button 
                        title={params.btnTitle ?? 'Next'}
                        buttonStyle={styles.button}
                        titleStyle={{fontSize: 22, fontFamily: 'Montserrat-Bold'}}
                        onPress={() => params.onPress()}
                    />
                </View>
            
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
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    headerWrapper: {
        backgroundColor: 'transparent', 
        width: width, 
        height: width/1.7,
    },
    
    header: {
        width: width,
        height: '100%',
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },

    title: {
        fontSize: 22,
        color: '#171717',
        textAlign: 'center',
    },

    subTitle: {
        fontSize: 13,
        color: '#707070',
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
        marginTop: 5
    },
})
