import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, 
    Keyboard, ScrollView, ActivityIndicator} from 'react-native'
import { Input, Button } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-material-dropdown-v2'
import { useNetInfo } from "@react-native-community/netinfo"
import { Formik } from 'formik'
import * as Yup from 'yup'

import CustomText from './CustomText'
import { signup, clearErrorMessages } from '../reducers/authAction'
import InvisibleIcon from '../constants/InvisibleIcon'

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
    classSelected: Yup.string().required('Required'),
    password: Yup.string().required('Required').min(6, 'Must be 6 characters or more'),
    confirm_password: Yup.string().required('Required').min(6, 'Must be 6 characters or more').when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref('password')],
            "Both password need to be the same"
        )
    })
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
            <ScrollView style={{}}>
                <View style={styles.container}>

                    {/* Title */}
                    <View style={{alignSelf: 'center', width: width/1.24, paddingBottom: 30, marginTop: 20}}>
                        <CustomText style={{fontSize: 23, fontWeight: '700', color: '#171717'}}>Create your account</CustomText>
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
                                    inputStyle={{color: '#707070'}} 
                                    value={values.firstName}
                                    onChangeText={handleChange('firstName')}
                                    onFocus={() => {
                                        if (!touched.firstName) {
                                        setTouched({ ...touched, firstName: true })
                                    }
                                    }}
                                    onBlur={() => validateField('firstName')}
                                />
                                {errors.firstName && touched.firstName ? <CustomText style={styles.errorMessage}>{errors.firstName}</CustomText> : null}

                                <Input 
                                    placeholder='Last Name'
                                    placeholderTextColor='#707070'
                                    textContentType='familyName'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070'}} 
                                    value={values.lastName}
                                    onChangeText={handleChange('lastName')} 
                                    onFocus={() => {
                                        if (!touched.lastName) {
                                        setTouched({ ...touched, lastName: true })
                                    }
                                    }}
                                    onBlur={() => validateField('lastName')}
                                />
                                {errors.lastName && touched.lastName ? <CustomText style={styles.errorMessage}>{errors.lastName}</CustomText> : null}

                                <Input 
                                    placeholder='Email'
                                    placeholderTextColor='#707070'
                                    textContentType='emailAddress'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070'}}
                                    value={values.email} 
                                    onChangeText={handleChange('email')}
                                    onFocus={() => {
                                        if (!touched.email) {
                                        setTouched({ ...touched, email: true })
                                    }
                                    }}
                                    onBlur={() => validateField('email')} 
                                />
                                {errors.email && touched.email ? <CustomText style={styles.errorMessage}>{errors.email}</CustomText> : null}

                                <Input 
                                    placeholder='Phone Number'
                                    placeholderTextColor='#707070'
                                    textContentType='telephoneNumber'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070'}}
                                    value={values.phone} 
                                    onChangeText={handleChange('phone')} 
                                    onFocus={() => {
                                        if (!touched.phone) {
                                        setTouched({ ...touched, phone: true })
                                    }
                                    }}
                                    onBlur={() => validateField('phone')}
                                />
                                {errors.phone && touched.phone ? <CustomText style={styles.errorMessage}>{errors.phone}</CustomText> : null}

                                <Input 
                                    placeholder='Address'
                                    placeholderTextColor='#707070'
                                    textContentType='fullStreetAddress'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={{color: '#707070'}} 
                                    value={values.address}
                                    onChangeText={handleChange('address')}
                                    onFocus={() => {
                                        if (!touched.address) {
                                        setTouched({ ...touched, address: true })
                                    }
                                    }}
                                    onBlur={() => validateField('address')} 
                                />
                                {errors.address && touched.address ? <CustomText style={styles.errorMessage}>{errors.address}</CustomText> : null}

                                <Dropdown
                                    data={classes}
                                    containerStyle={{...styles.inputContainerStyle, marginTop: -25, marginBottom: 20, width: width/1.3, alignSelf: "center"}}
                                    labelTextStyle={{color: '#707070'}}
                                    itemColor='#707070'
                                    style={{borderBottomWidth: 0, backgroundColor: 'transparent'}}
                                    label='Class'
                                    value={values.classSelected}
                                    onChangeText={(value) => setFieldValue('classSelected', value)}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                />
                                {errors.classSelected && touched.classSelected ? <CustomText style={styles.errorMessage}>{errors.classSelected}</CustomText> : null}

                                <Input 
                                    placeholder='Password' 
                                    placeholderTextColor='#707070'
                                    textContentType='password'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    rightIcon={<InvisibleIcon />}
                                    inputStyle={{color: '#707070'}}
                                    value={values.password}
                                    secureTextEntry onChangeText={handleChange('password')} 
                                    onFocus={() => {
                                        if (!touched.password) {
                                        setTouched({ ...touched, password: true })
                                    }
                                    }}
                                    onBlur={() => validateField('password')}
                                />
                                {errors.password && touched.password ? <CustomText style={styles.errorMessage}>{errors.password}</CustomText> : null}

                                <Input 
                                    placeholder='Confirm Password' 
                                    placeholderTextColor='#707070'
                                    textContentType='password'
                                    inputContainerStyle={styles.inputContainerStyle}
                                    rightIcon={<InvisibleIcon />}
                                    value={values.confirm_password}
                                    inputStyle={{color: '#707070'}}
                                    secureTextEntry 
                                    onChangeText={handleChange('confirm_password')}
                                    onFocus={() => {
                                        if (!touched.confirm_password) {
                                        setTouched({ ...touched, confirm_password: true })
                                        }
                                    }}
                                    onBlur={() => validateField('confirm_password')}
                                />
                                {errors.confirm_password && touched.confirm_password ? <CustomText style={styles.errorMessage}>{errors.confirm_password}</CustomText> : null}

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
                                            titleStyle={{fontSize: 22, fontWeight: '700'}}
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

                    <View style={{flexDirection: 'row'}}>
                        <Button title="Already have an account?" type='clear' titleStyle={{fontSize: 16, color: '#707070'}} />
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
        height: height/2.1,
        width: width,
        alignItems: 'center',
        marginTop: -100
    },

    clearButton: {
        color: '#3FB0D4',
        fontSize: 16,
        fontWeight: '200',
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
