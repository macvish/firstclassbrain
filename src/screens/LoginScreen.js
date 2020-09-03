import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, Keyboard, InteractionManager, ActivityIndicator, ImageBackground } from 'react-native'
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

const LoginScreen = props => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [signupMsg, setSignupMsg] = useState('')

    const [err, setErr] = useState('')

    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        setSignupMsg(props.signup_success_message)
    }, [props.signup_success_message])

    const navigate = (screenName) => {
        setErr('')
        setSignupMsg('')
        Navigation.push(props.componentId, {
            component: {
                name: screenName
            },
            options: {
                animations: {
                    push: {
                        content: {
                            translationX: {
                                from: width,
                                to: 0,
                                duration: 600
                            }
                        }
                    },
                    pop: {
                        content: {
                            translationX: {
                                from: 0,
                                to: width,
                                duration: 600
                            }
                        }
                    }
                }
            }
        })
    }

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
            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={
                    Platform.select({
                        ios: () => 0,
                        android: () => 40
                })()}
                style={styles.inputContainer}
            >

            <View style={styles.header}>
                <View style={{marginTop: -80}}>
                    <ImageBackground source={img} style={styles.img}>
                        <ImageBackground source={img_overlay} style={styles.img_fade}>
                            <View style={{alignSelf: 'flex-end', right: 60, paddingBottom: 50}}>
                                <Text style={{fontSize: 22, color: 'white'}}>Sign in</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 40, color: 'white'}}>LOGO</Text>
                                <Text style={{fontSize: 40, color: 'white'}}>LOGO</Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </View>

                <View style={{alignSelf: 'center', width: width/1.24}}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>Login to your account</Text>
                    {props.signup_success_message ? <Text style={{color: '#171717'}}>{signupMsg}</Text> : null}
                </View>

                <View style={styles.inputs}>
                    <Input 
                        placeholder='Email'
                        placeholderTextColor='#707070'
                        textContentType='emailAddress'
                        inputContainerStyle={{ borderBottomColor: '#171717', borderBottomWidth: 2.5 }}
                        leftIcon={<EmailIcon />}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('email', e)} />
                    <Input 
                        placeholder='Password' 
                        placeholderTextColor='#707070'
                        textContentType='password'
                        inputContainerStyle={{ borderBottomColor: '#171717', borderBottomWidth: 2.5 }}
                        leftIcon={<LockIcon />}
                        rightIcon={<InvisibleIcon />}
                        inputStyle={{color: '#707070'}}
                        secureTextEntry onChangeText={e => handleInput('password', e)} />

                    {err ? 
                        <Text style={{ color: 'red', fontSize: 15, marginLeft: 10 }}>{err}</Text> : 
                        (props.err_message ? <Text style={{ color: 'red', fontSize: 15, marginLeft: 10 }}>{props.err_message}</Text> : null)
                    }
                </View>
                <View style={{
                    // flexDirection: "row",
                    alignItems: "center",
                    alignSelf: 'center',
                    justifyContent: "space-between",
                    width: width/1.3,
                    // height: height/6,
                    paddingTop: height/13
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
            </KeyboardAvoidingView>

            <View style={{
                alignSelf: "center",
                width: width/1.2,
                alignItems: 'center'
            }}>

                <View style={{flexDirection: 'row'}}>
                    <Button title="Don't have an account yet?" type='clear' titleStyle={{fontSize: 16, color: '#707070'}} />
                    <Button title='Sign Up' type='clear' titleStyle={styles.clearButton} onPress={() => navigate('Signup')} />
                </View>
                <View style={{marginTop: -14}}>
                    <Button title='Forget Password' type='clear' titleStyle={styles.clearButton} />
                </View>
            </View>
        </View>
    )
}

LoginScreen.options = {
    topBar: {
        visible: false
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        // justifyContent: "center",
    },

    header: {
        height: height/2,
        width: width,
        alignItems: 'center',
        // backgroundColor: '#000'
    },

    img: {
        height: height/1.6,
        width: width*1.23,
        borderBottomRightRadius: 75,
        marginTop: -50
    },

    img_fade: {
        height: height/1.6,
        width: width*1.23,
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
        height: height/1.14,
        // backgroundColor: '#000'
    },

    inputs: {
        width: width/1.2,
        justifyContent: 'center',
        alignSelf: 'center',
        height: height/5,
        paddingTop: 80
    },

    button: {
        backgroundColor: '#257F9B',
        borderRadius: 15,
        width: width/1.2,
        height: 50,
        alignSelf: 'center',
    }
})
