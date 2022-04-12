import React, { useState, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Dimensions, 
    Keyboard, ActivityIndicator, ImageBackground, Linking } from 'react-native'
import { Input, Button, Image } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { useNetInfo } from "@react-native-community/netinfo"
import * as Yup from 'yup'
import { Icon } from 'react-native-elements'

import img from '../assets/images/login_image.png'
import img_overlay from '../assets/images/login_fade.png'
import CustomText from '../components/CustomText'
import { forgot_password, clearErrorMessages } from '../reducers/authAction'
import logo from '../assets/logo/logo.jpeg'

const {width, height} = Dimensions.get('window')

const INITIAL_VALUES = {
    email: '',
}

const forgotValidation = Yup.object({
    email: Yup.string().required('Required').min(5, 'Must be more than 5 characters').matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email address')
})

const ForgotPasswordScreen = props => {

    const netInfo = useNetInfo()

    const [err, setErr] = useState('')

    const [submitLoading, setSubmitLoading] = useState(false)

    const [ForgotPasswordState, setForgotPasswordState] = useState({
        forgot_password_err_msg: ''
    })

    useEffect(() => {
        let mounted = true
        if(mounted) {
            setForgotPasswordState({
                forgot_password_err_msg: props.forgotPasswordMessage
            })
        }

        return () => {
            mounted = false
        }
    }, [props.forgotPasswordMessage])

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(ForgotPasswordState.forgot_password_err_msg) {
                setSubmitLoading(false)
            }
        }

        return () => {
            mounted = false
        }
    }, [ForgotPasswordState])

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
    
    const handleSubmit = (values) => {
        Keyboard.dismiss()
        setSubmitLoading(true)
        setErr('')
        props.clearErrorMessages()
        if(netInfo.isConnected && netInfo.isInternetReachable) {
            props.forgot_password(values)
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
                    <CustomText weight="bold" style={{fontSize: 20, color: '#171717'}}>Forgot your Password?</CustomText>
                </View>

                <Formik
                    initialValues={INITIAL_VALUES}
                    validationSchema={forgotValidation}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({ errors, handleChange, handleSubmit, setTouched, touched, validateField, values }) => (
                        <>       
                            <View style={styles.inputs}>
                                <Input 
                                    placeholder='Email'
                                    placeholderTextColor='#707070'
                                    textContentType='emailAddress'
                                    inputContainerStyle={{ borderBottomColor: '#171717', borderBottomWidth: 2.5, marginBottom: -10 }}
                                    inputStyle={{color: '#707070', fontFamily: 'Montserrat-Regular', fontSize: 16}}
                                    value={values.email} 
                                    onChangeText={handleChange('email')}
                                    onFocus={() => {
                                        if (!touched.email) {
                                        setTouched({ ...touched, email: true })
                                    }}}
                                    onBlur={() => validateField('email')} 
                                    leftIcon={<Icon type="antdesign" name="mail" />}
                                />
                                {errors.email && touched.email ? <CustomText style={styles.errorMessage}>{errors.email}</CustomText> : null}

                                {
                                    props.forgotPasswordMessage 
                                    ? <CustomText style={styles.errorMessage}>{props.forgotPasswordMessage}</CustomText> 
                                    : (err ? <CustomText style={styles.errorMessage}>{err}</CustomText> : null)
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
                                        titleStyle={{fontSize: 22, fontFamily: 'Montserrat-Bold'}}
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
                    <CustomText style={{fontSize: 16, color: '#707070'}}>Don't have an account yet?</CustomText>
                    <Button title='Sign Up' type='clear' titleStyle={styles.clearButton} onPress={() => navigate('Signup')} />
                </View>
                <View style={{marginTop: -14}}>
                    <Button 
                        title='Go back' 
                        type='clear' 
                        titleStyle={styles.clearButton} 
                        onPress={() => Navigation.pop(props.componentId)} 
                    />
                </View>
            </View>
        </View>
    )
}

ForgotPasswordScreen.options = {
    topBar: {
        visible: false
    }
}

const mapStateToProps = (state) => ({
    forgotPasswordMessage: state.auth.forgot_password_err_msg,
})

const mapDispatchToProps = {
    forgot_password,
    clearErrorMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: '#ffffff'
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
    },

    clearButton: {
        color: '#3FB0D4',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular'
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
