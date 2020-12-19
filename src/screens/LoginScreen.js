import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, 
    Keyboard, ActivityIndicator, ImageBackground, Linking } from 'react-native'
import { Input, Button, Image } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { useNetInfo } from "@react-native-community/netinfo"
import * as Yup from 'yup'

import img from '../assets/images/login_image.png'
import img_overlay from '../assets/images/login_fade.png'
import { login, clearErrorMessages } from '../reducers/authAction'
import logo from '../assets/logo/logo.jpeg'

const {width, height} = Dimensions.get('window')

const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    classSelected: '',
    password: '',
    confirm_password: ''
}

const signupValidation = Yup.object({
    email: Yup.string().required('Required').min(5, 'Must be more than 5 characters').matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email address'),
    password: Yup.string().required('Required')
})

const LoginScreen = props => {

    const netInfo = useNetInfo()

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [signupMsg, setSignupMsg] = useState('')

    const [err, setErr] = useState('')

    const [submitLoading, setSubmitLoading] = useState(false)

    const [loginState, setLoginState] = useState({
        is_user_logged_in: false,
        login_err_msg: ''
    })

    useEffect(() => {
        let mounted = true
        if(mounted) {
            setSignupMsg(props.signupSuccessMessage)
        }

        return () => {
            mounted = false
        }
    }, [props.signupSuccessMessage])

    useEffect(() => {
        let mounted = true
        if(mounted) {
            setLoginState({
                is_user_logged_in: props.isLoggedIn,
                login_err_msg: props.loginMessage
            })
        }

        return () => {
            mounted = false
        }
    }, [props.isLoggedIn, props.loginMessage])

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(loginState.is_user_logged_in) {
                setSubmitLoading(false)
            }

            if(loginState.login_err_msg) {
                setSubmitLoading(false)
            }
        }

        return () => {
            mounted = false
        }
    }, [loginState])

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
    
    const handleSubmit = (values) => {
        Keyboard.dismiss()
        setSubmitLoading(true)
        setErr('')
        props.clearErrorMessages()
        if(netInfo.isConnected && netInfo.isInternetReachable) {
            props.login(values)
        }
        else {
            setTimeout(() => {
                setSubmitLoading(false)
                setErr('Your internet connection is down, try again later')
            }, 1500);
        }
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
                            <View style={{}}>
                                <Image 
                                    source={logo}
                                    style={{
                                        width: width/3,
                                        height: width/3,
                                        borderRadius: 10,
                                        marginTop: 120
                                    }}
                                />
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </View>

                <View style={{alignSelf: 'center', width: width/1.24, paddingTop: 20}}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>Login to your account</Text>
                    {props.signupSuccessMessage ? <Text style={{color: '#3FB0D4'}}>{signupMsg}</Text> : null}
                </View>

                <Formik
                    initialValues={INITIAL_VALUES}
                    validationSchema={signupValidation}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({ errors, handleChange, handleSubmit, setTouched, touched, validateField, values, setFieldValue }) => (
                        <>       
                            <View style={styles.inputs}>
                                <Input 
                                    placeholder='Email'
                                    placeholderTextColor='#707070'
                                    textContentType='emailAddress'
                                    inputContainerStyle={{ borderBottomColor: '#171717', borderBottomWidth: 2.5, marginBottom: -10 }}
                                    inputStyle={{color: '#707070'}} 
                                    onChangeText={e => handleInput('email', e)} 
                                    value={values.email} 
                                    onChangeText={handleChange('email')}
                                    onFocus={() => {
                                        if (!touched.email) {
                                        setTouched({ ...touched, email: true })
                                    }
                                    }}
                                    onBlur={() => validateField('email')} 
                                />
                                {errors.email && touched.email ? <Text style={styles.errorMessage}>{errors.email}</Text> : null}

                                <Input 
                                    placeholder='Password' 
                                    placeholderTextColor='#707070'
                                    textContentType='password'
                                    inputContainerStyle={{ borderBottomColor: '#171717', borderBottomWidth: 2.5, marginTop: -10 }}
                                    inputStyle={{color: '#707070',}}
                                    secureTextEntry onChangeText={e => handleInput('password', e)}
                                    value={values.password} 
                                    onChangeText={handleChange('password')}
                                    onFocus={() => {
                                        if (!touched.password) {
                                        setTouched({ ...touched, password: true })
                                    }
                                    }}
                                    onBlur={() => validateField('password')} 
                                />
                                {errors.password && touched.password ? <Text style={styles.errorMessage}>{errors.password}</Text> : null}

                                {
                                    props.loginMessage 
                                    ? <Text style={styles.errorMessage}>{props.loginMessage}</Text> 
                                    : (err ? <Text style={styles.errorMessage}>{err}</Text> : null)
                                }
                            </View>
                            <View style={{
                                alignItems: "center",
                                alignSelf: 'center',
                                justifyContent: "space-between",
                                width: width/1.3,
                                paddingTop: height/13
                            }}>
                                {!submitLoading ? <View>
                                    <Button 
                                        title='Sign in'
                                        buttonStyle={styles.button}
                                        titleStyle={{fontSize: 22, fontWeight: '700'}}
                                        onPress={() => handleSubmit()}
                                    />
                                </View> : <ActivityIndicator size={50} color='#257F9B' />}
                            </View>
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingView>

            <View style={{
                alignSelf: "center",
                width: width/1.2,
                alignItems: 'center',
            }}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#707070'}}>Don't have an account yet?</Text>
                    <Button title='Sign Up' type='clear' titleStyle={styles.clearButton} onPress={() => navigate('Signup')} />
                </View>
                <View style={{marginTop: -14}}>
                    <Button 
                        title='Forget Password' 
                        type='clear' 
                        titleStyle={styles.clearButton} 
                        onPress={async () => await Linking.openURL('https://firstclassbrain.com/forgot-password')} 
                    />
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
    loginMessage: state.auth.login_err_msg,
    isLoggedIn: state.auth.is_logged_in,
    signupSuccessMessage: state.auth.signup_success_message
})

const mapDispatchToProps = {
    login,
    clearErrorMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
    container: {
        width: width,
    },

    header: {
        width: width,
        alignItems: 'center',
    },

    img: {
        height: height/1.6,
        width: width*1.23,
        borderBottomRightRadius: 75,
        marginTop: -50
    },

    img_fade: {
        height: '100%',
        width: '100%',
        borderBottomRightRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },

    clearButton: {
        color: '#3FB0D4',
        fontSize: 16,
        fontWeight: '200',
    },

    inputContainer: {
        paddingBottom: 5
    },

    inputs: {
        width: width/1.2,
        justifyContent: 'center',
        alignSelf: 'center',
        height: height/6,
        paddingTop: 50
    },

    errorMessage: {
        color: 'red',
        marginTop: -18,
        marginBottom: 18,
        marginLeft: 10
    },

    button: {
        backgroundColor: '#257F9B',
        borderRadius: 15,
        width: width/1.2,
        height: 50,
        alignSelf: 'center',
    }
})
