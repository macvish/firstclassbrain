import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, 
    Keyboard, ScrollView, ActivityIndicator, ImageBackground } from 'react-native'
import { Input, Button, Image } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-material-dropdown-v2'
import { useNetInfo } from "@react-native-community/netinfo"
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Icon } from 'react-native-elements'

import CustomText from '../components/CustomText'
import { signup, clearErrorMessages } from '../reducers/authAction'
import logo from '../assets/logo/logo.jpeg'
import img from '../assets/images/login_image.png'
import img_overlay from '../assets/images/login_fade.png'

const {width, height} = Dimensions.get('window')

const classes = [
    {value: 1, label: 'Basic 1'},
    {value: 2, label: 'Basic 2'},
    {value: 3, label: 'Basic 3'},
    {value: 4, label: 'Basic 4'},
    {value: 5, label: 'Basic 5'},
    {value: 6, label: 'Jss 1'},
    {value: 7, label: 'Jss 2'},
    {value: 8, label: 'Jss 3'},
    {value: 9, label: 'Sss 1 - Science'},
    {value: 10, label: 'Sss 1 - Commercial'},
    {value: 11, label: 'Sss 1 - Art'},
    {value: 12, label: 'Sss 2 - Science'},
    {value: 13, label: 'Sss 2 - Commercial'},
    {value: 14, label: 'Sss 2 - Art'},
    {value: 15, label: 'Sss 3 - Science'},
    {value: 16, label: 'Sss 3 - Commercial'},
    {value: 17, label: 'Sss 3 - Art'},
]

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
    firstName: Yup.string().required('Required').min(2, 'Must be more than 2 characters').matches(/^[A-Za-z-]+$/, 'Must only contain letters and hyphens'),
    lastName: Yup.string().required('Required').min(2, 'Must be more than 2 characters').matches(/^[A-Za-z-]+$/, 'Must only contain letters and hyphens'),
    email: Yup.string().required('Required').min(5, 'Must be more than 5 characters').matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email address'),
    phone: Yup.string().required('Required').min(11, 'Must be more than 11 numbers'),
    address: Yup.string().required('Required').min(5, 'Must be more than 5 characters'),
    classSelected: Yup.string().required('Required')
})

const RegistrationScreen = props => {

    const netInfo = useNetInfo()

    const [signupMsg, setSignupMsg] = useState('')

    const [err, setErr] = useState('')

    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        let mounted = true
        if(mounted) {
            setSignupMsg(props.signupMessage)
        }

        return () => {
            mounted = false
        }
    }, [props.signupMessage])

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(signupMsg) {
                setSubmitLoading(false)
            }
        }

        return () => {
            mounted = false
        }
    }, [signupMsg])
    
    const handleSubmit = (values) => {
        Keyboard.dismiss()
        setSubmitLoading(true)
        setErr('')
        props.clearErrorMessages()
        if(netInfo.isConnected && netInfo.isInternetReachable) {
            props.signup(values)
        }
        else {
            setTimeout(() => {
                setSubmitLoading(false)
                setErr('Your internet connection is down, try again later')
            }, 1500);
        }
    }

    return (
            <ScrollView style={{ }}>
                <View style={styles.container}>

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

                    {/* Title */}
                    <View style={{alignSelf: 'center', width: width/1.24, paddingBottom: 30, marginTop: 50}}>
                        <CustomText weight="bold" style={{fontSize: 23, color: '#171717'}}>Create your account</CustomText>
                        {props.signup_success_message ? <CustomText style={{color: '#171717'}}>{signupMsg}</CustomText> : null}
                    </View>
                    
                    {/* Input Fields */}
                    <View style={styles.inputs}>
                        <Formik
                            initialValues={INITIAL_VALUES}
                            validationSchema={signupValidation}
                            onSubmit={values => handleSubmit(values)}
                        >
                            {({ errors, handleChange, handleSubmit, setTouched, touched, validateField, values, setFieldValue }) => (
                            <>
                                <Input 
                                    placeholder='First Name'
                                    placeholderTextColor='#707070'
                                    textContentType='givenName'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070',  fontFamily: 'Montserrat-Regular', fontSize: 16}} 
                                    value={values.firstName}
                                    onChangeText={handleChange('firstName')}
                                    onFocus={() => {
                                        if (!touched.firstName) {
                                        setTouched({ ...touched, firstName: true })
                                    }
                                    }}
                                    onBlur={() => validateField('firstName')}
                                    leftIcon={<Icon type="antdesign" name="user" />}
                                />
                                {errors.firstName && touched.firstName ? <CustomText style={styles.errorMessage}>{errors.firstName}</CustomText> : null}

                                <Input 
                                    placeholder='Last Name'
                                    placeholderTextColor='#707070'
                                    textContentType='familyName'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070',  fontFamily: 'Montserrat-Regular', fontSize: 16}} 
                                    value={values.lastName}
                                    onChangeText={handleChange('lastName')} 
                                    onFocus={() => {
                                        if (!touched.lastName) {
                                        setTouched({ ...touched, lastName: true })
                                    }}}
                                    onBlur={() => validateField('lastName')}
                                    leftIcon={<Icon type="antdesign" name="user" />}
                                />
                                {errors.lastName && touched.lastName ? <CustomText style={styles.errorMessage}>{errors.lastName}</CustomText> : null}

                                <Input 
                                    placeholder='Email'
                                    placeholderTextColor='#707070'
                                    textContentType='emailAddress'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070',  fontFamily: 'Montserrat-Regular', fontSize: 16}}
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

                                <Input 
                                    placeholder='Phone Number'
                                    placeholderTextColor='#707070'
                                    textContentType='telephoneNumber'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070',  fontFamily: 'Montserrat-Regular', fontSize: 16}}
                                    value={values.phone} 
                                    onChangeText={handleChange('phone')} 
                                    onFocus={() => {
                                        if (!touched.phone) {
                                        setTouched({ ...touched, phone: true })
                                    }}}
                                    onBlur={() => validateField('phone')}
                                    leftIcon={<Icon type="antdesign" name="phone" />}
                                />
                                {errors.phone && touched.phone ? <CustomText style={styles.errorMessage}>{errors.phone}</CustomText> : null}

                                <Input 
                                    placeholder='Address'
                                    placeholderTextColor='#707070'
                                    textContentType='fullStreetAddress'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070',  fontFamily: 'Montserrat-Regular', fontSize: 16}} 
                                    value={values.address}
                                    onChangeText={handleChange('address')}
                                    onFocus={() => {
                                        if (!touched.address) {
                                        setTouched({ ...touched, address: true })
                                    }}}
                                    onBlur={() => validateField('address')}
                                    leftIcon={<Icon type="antdesign" name="home" />}
                                />
                                {errors.address && touched.address ? <CustomText style={styles.errorMessage}>{errors.address}</CustomText> : null}

                                <Dropdown
                                    data={classes}
                                    containerStyle={{...styles.inputContainerStyle, marginTop: -25, marginBottom: 20, width: width/1.3, alignSelf: "center"}}
                                    itemTextStyle={{fontFamily: 'Montserrat-Regular'}}
                                    overlayStyle={{fontFamily: 'Montserrat-Regular'}}                              
                                    itemColor='#707070'
                                    style={{borderBottomWidth: 0, backgroundColor: 'transparent', fontFamily: 'Montserrat-Regular'}}
                                    label='Class'
                                    value={values.classSelected}
                                    onChangeText={(value) => setFieldValue('classSelected', value)}
                                />
                                {errors.classSelected && touched.classSelected ? <CustomText style={styles.errorMessage}>{errors.classSelected}</CustomText> : null}

                                {
                                    signupMsg 
                                    ? <CustomText style={styles.errorMessage}>{signupMsg}</CustomText> 
                                    : (err ? <CustomText style={styles.errorMessage}>{err}</CustomText> : null)
                                }

                                <View style={{
                                    alignItems: "center",
                                    alignSelf: 'center',
                                    justifyContent: "space-between",
                                    width: width/1.3,
                                    paddingTop: -10
                                }}>
                                    {!submitLoading ? <View>
                                        <Button 
                                            title='Sign Up'
                                            buttonStyle={styles.button}
                                            titleStyle={{fontSize: 22,  fontFamily: 'Montserrat-Bold'}}
                                            onPress={() => handleSubmit()}
                                        />
                                    </View> : <ActivityIndicator size={50} color='#257F9B' />}
                                </View>
                            </>
                            )}
                        </Formik>
                    </View>

                <View style={{
                    alignSelf: "center",
                    width: width/1.2,
                    alignItems: 'center'
                }}>

                    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 20}}>
                        <CustomText style={{fontSize: 16, color: '#707070'}}>Already have an account?</CustomText>
                        <Button title='Sign In' type='clear' titleStyle={styles.clearButton} onPress={() => Navigation.pop(props.componentId)} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

RegistrationScreen.options = {
    topBar: {
        visible: false
    }
}

const mapStateToProps = (state) => ({
  signupMessage: state.auth.signup_err_msg
})

const mapDispatchToProps = {
    signup,
    clearErrorMessages
}


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#fff'
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

    inputs: {
        width: width/1.2,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    inputContainerStyle: {
        borderBottomColor: '#171717',
        borderBottomWidth: 2.5,
        marginTop: -10,
        marginBottom: -10
    },

    errorMessage: {
        color: 'red',
        marginTop: -14,
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
