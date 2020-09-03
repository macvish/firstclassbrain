import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, 
    Keyboard, ScrollView, ActivityIndicator, ImageBackground } from 'react-native'
import { Input, Button, Avatar } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'

import img from '../assets/login_image.png'
import img_overlay from '../assets/login_fade.png'
import EmailIcon from '../constants/EmailIcon'
import LockIcon from '../constants/LockIcon'
import InvisibleIcon from '../constants/InvisibleIcon'

const {width, height} = Dimensions.get('window')

const RegistrationScreen = props => {

    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        student: '',
        class: '',
        password: '',
        confirm_password: ''
    })

    const [signupMsg, setSignupMsg] = useState('')

    const [err, setErr] = useState('')

    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        setSignupMsg(props.signup_success_message)
    }, [props.signup_success_message])

    const handleInput = (name, e) => {
        setData(prevState => ({
            ...prevState, [name]: e
        }))
    }

    
    const handleSubmit = () => {
        Keyboard.dismiss()

        submitButton.current.bounceOut(300).then(endState => {
            setSubmitLoading(true)
    
            if(data.password == '')
            {
                setSubmitLoading(false)
                setErr('Password field can not be empty')
            }
    
            if(data.email == '')
            {
                setSubmitLoading(false)
                setErr('Email field can not be empty')
            }
    
            if(data.email !== '' && data.password !== ''){
                setErr('')
                props.login(data)
                setTimeout(() => {
                    setSubmitLoading(false)
                }, 2000);
            }
    
        })
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={{marginTop: -80}}>
                    <ImageBackground source={img} style={styles.img}>
                        <ImageBackground source={img_overlay} style={styles.img_fade}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignSelf: 'flex-end', right: 30, marginTop: 30 }}>
                                <Text style={{fontSize: 22, color: 'white'}}>Sign up</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{fontSize: 40, color: 'white'}}>LOGO</Text>
                                <Text style={{fontSize: 40, color: 'white'}}>LOGO</Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </View>

            {/* Title */}
            <View style={{alignSelf: 'center', width: width/1.24, paddingBottom: 10}}>
                <Text style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>Create your account</Text>
                {props.signup_success_message ? <Text style={{color: '#171717'}}>{signupMsg}</Text> : null}
            </View>
            

            <ScrollView style={{flex: 1,}}>

            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={
                    Platform.select({
                        ios: () => 0,
                        android: () => 40
                })()}
                // style={styles.inputContainer}
            >

                {/* Input Fields */}
                <View style={styles.inputs}>
                    <Input 
                        placeholder='Full Name'
                        placeholderTextColor='#707070'
                        textContentType='name'
                        inputContainerStyle={{ borderBottomColor: '#171717', borderBottomWidth: 2.5, }}
                        leftIcon={<EmailIcon />}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('fullname', e)} />
                    <Input 
                        placeholder='Email'
                        placeholderTextColor='#707070'
                        textContentType='emailAddress'
                        inputContainerStyle={styles.inputContainerStyle}
                        leftIcon={<EmailIcon />}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('email', e)} />
                    <Input 
                        placeholder='Student' 
                        placeholderTextColor='#707070'
                        inputContainerStyle={styles.inputContainerStyle}
                        leftIcon={<LockIcon />}
                        rightIcon={<InvisibleIcon />}
                        inputStyle={{color: '#707070'}}
                        secureTextEntry onChangeText={e => handleInput('student', e)} />
                    <Input 
                        placeholder='Class'
                        placeholderTextColor='#707070'
                        inputContainerStyle={styles.inputContainerStyle}
                        leftIcon={<EmailIcon />}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('class', e)} />
                    <Input 
                        placeholder='Password' 
                        placeholderTextColor='#707070'
                        textContentType='password'
                        inputContainerStyle={styles.inputContainerStyle}
                        leftIcon={<LockIcon />}
                        rightIcon={<InvisibleIcon />}
                        inputStyle={{color: '#707070'}}
                        secureTextEntry onChangeText={e => handleInput('password', e)} />
                    <Input 
                        placeholder='Confirm Password' 
                        placeholderTextColor='#707070'
                        textContentType='password'
                        inputContainerStyle={styles.inputContainerStyle}
                        leftIcon={<LockIcon />}
                        rightIcon={<InvisibleIcon />}
                        inputStyle={{color: '#707070'}}
                        secureTextEntry onChangeText={e => handleInput('password', e)} />

                    {err ? 
                        <Text style={{ color: 'red', fontSize: 15, marginLeft: 10 }}>{err}</Text> : 
                        (props.err_message ? <Text style={{ color: 'red', fontSize: 15, marginLeft: 10 }}>{props.err_message}</Text> : null)
                    }
                </View>

            </KeyboardAvoidingView>
            </ScrollView>

            <View style={{
                    // flexDirection: "row",
                    alignItems: "center",
                    alignSelf: 'center',
                    justifyContent: "space-between",
                    width: width/1.3,
                    // height: height/6,
                    paddingTop: -10
                }}>
                    {!submitLoading ? <View>
                        <Button 
                            title='Sign in'
                            buttonStyle={styles.button}
                            titleStyle={{fontSize: 22, fontWeight: '700'}}
                            onPress={() => handleSubmit}
                        />
                    </View> : <ActivityIndicator size={50} color='#FDAD45' />}
                </View>

            <View style={{
                alignSelf: "center",
                width: width/1.2,
                alignItems: 'center'
            }}>

                <View style={{flexDirection: 'row'}}>
                    <Button title="Already have an account?" type='clear' titleStyle={{fontSize: 16, color: '#707070'}} />
                    <Button title='Sign Up' type='clear' titleStyle={styles.clearButton} onPress={() => Navigation.pop(props.componentId)} />
                </View>
            </View>
        </View>
    )
}

RegistrationScreen.options = {
    topBar: {
        visible: false
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        // justifyContent: "center",
        backgroundColor: '#fff'
    },

    header: {
        // flex: 1,
        height: height/2.1,
        width: width,
        alignItems: 'center',
        // backgroundColor: '#000',
        marginTop: -100
    },

    img: {
        flex: 1,
        height: height/1.6,
        width: width,
        borderBottomRightRadius: 75,
        marginTop: -50
    },

    img_fade: {
        flex: 1,
        height: height/1.6,
        width: width,
        borderBottomRightRadius: 75,
        justifyContent: 'center',
        alignItems: 'center'
    },

    clearButton: {
        color: '#3FB0D4',
        fontSize: 16,
        fontWeight: '200',
        borderBottomWidth: 1,
        borderBottomColor: '#FFF'
    },

    inputContainer: {
        // flex: 1,
        // height: height/1.14,
        // backgroundColor: 'blue',
        // marginTop: 100
    },

    inputs: {
        // flex: 1,
        width: width/1.2,
        justifyContent: 'center',
        alignSelf: 'center',
        // height: height/5,
        // paddingTop: 80
        // backgroundColor: 'blue'
    },

    inputContainerStyle: {
        borderBottomColor: '#171717',
        borderBottomWidth: 2.5,
        marginTop: -18
    },

    button: {
        backgroundColor: '#257F9B',
        borderRadius: 15,
        width: width/1.2,
        height: 50,
        alignSelf: 'center',
    }
})
