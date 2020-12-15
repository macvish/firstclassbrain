import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, Keyboard, InteractionManager, ActivityIndicator, ImageBackground, Linking } from 'react-native'
import { Input, Button, Avatar, Image } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'

import img from '../assets/images/login_image.png'
import img_overlay from '../assets/images/login_fade.png'
import { login } from '../reducers/authAction'
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

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [signupMsg, setSignupMsg] = useState('')

    const [err, setErr] = useState('')

    const [submitLoading, setSubmitLoading] = useState(false)

    const submitButton = useRef(null)

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
    
    const handleSubmit = (values) => {
        Keyboard.dismiss()
        setSubmitLoading(true)
        setErr('')
        props.login(values)
        setTimeout(() => {
            setSubmitLoading(false)
        }, 2000);
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
                                <Image 
                                    source={logo}
                                    style={{
                                        width: width/3,
                                        height: width/3,
                                        borderRadius: 10
                                    }}
                                />
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </View>

                <View style={{alignSelf: 'center', width: width/1.24}}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: '#171717'}}>Login to your account</Text>
                    {props.signup_success_message ? <Text style={{color: '#171717'}}>{signupMsg}</Text> : null}
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
                                    inputContainerStyle={{ borderBottomColor: '#171717', borderBottomWidth: 2.5 }}
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
                                    inputContainerStyle={{ borderBottomColor: '#171717', borderBottomWidth: 2.5 }}
                                    inputStyle={{color: '#707070'}}
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
                                    : null
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
                alignItems: 'center'
            }}>

                <View style={{flexDirection: 'row'}}>
                    <Button title="Don't have an account yet?" type='clear' titleStyle={{fontSize: 16, color: '#707070'}} />
                    <Button title='Sign Up' type='clear' titleStyle={styles.clearButton} onPress={() => navigate('Signup')} />
                </View>
                <View style={{marginTop: -14}}>
                    <Button 
                        title='Forget Password' 
                        type='clear' 
                        titleStyle={styles.clearButton} 
                        onPress={async () => await Linking.openURL('https://firstclassbrain.com/login')} 
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
    loginMessage: state.auth.login_err_msg
})

const mapDispatchToProps = {
    login
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
