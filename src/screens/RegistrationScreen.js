import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, 
    Keyboard, ScrollView, ActivityIndicator} from 'react-native'
import { Input, Button } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-material-dropdown-v2'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { signup } from '../reducers/authAction'
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
    confirm_password: Yup.string().required('Required').min(8, 'Must be 8 characters or more')
})

const RegistrationScreen = props => {

    const [signupMsg, setSignupMsg] = useState('')

    const [err, setErr] = useState('')

    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        setSignupMsg(props.signup_success_message)
    }, [props.signup_success_message])

    
    const handleSubmit = (values) => {
        Keyboard.dismiss()
        setSubmitLoading(true)
        setErr('')
        props.signup(values)
        setTimeout(() => {
            setSubmitLoading(false)
        }, 2000);
    }

    return (
        <View style={styles.container}>

            {/* <View style={styles.header}>
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
            </View> */}

            {/* Title */}
            <View style={{alignSelf: 'center', width: width/1.24, paddingBottom: 60, marginTop: 60}}>
                <Text style={{fontSize: 25, fontWeight: '700', color: '#171717'}}>Create your account</Text>
                {props.signup_success_message ? <Text style={{color: '#171717'}}>{signupMsg}</Text> : null}
            </View>
            

            <ScrollView style={{}}>

            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={
                    Platform.select({
                        ios: () => 0,
                        android: () => -40
                })()}
                // style={styles.inputContainer}
            >

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
                        {errors.firstName && touched.firstName ? <Text style={styles.errorMessage}>{errors.firstName}</Text> : null}

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
                        {errors.lastName && touched.lastName ? <Text style={styles.errorMessage}>{errors.lastName}</Text> : null}

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
                        {errors.email && touched.email ? <Text style={styles.errorMessage}>{errors.email}</Text> : null}

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
                        {errors.phone && touched.phone ? <Text style={styles.errorMessage}>{errors.phone}</Text> : null}

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
                        {errors.address && touched.address ? <Text style={styles.errorMessage}>{errors.address}</Text> : null}

                        <Dropdown
                            data={classes}
                            containerStyle={{...styles.inputContainerStyle, marginTop: -10, marginBottom: 20, width: width/1.27, alignSelf: "center"}}
                            labelTextStyle={{color: '#707070'}}
                            itemColor='#707070'
                            style={{borderBottomWidth: 0, backgroundColor: '#fff'}}
                            label='Class'
                            value={values.classSelected}
                            onChangeText={(value) => setFieldValue('classSelected', value)}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                        />
                        {errors.classSelected && touched.classSelected ? <Text style={styles.errorMessage}>{errors.classSelected}</Text> : null}

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
                        {errors.password && touched.password ? <Text style={styles.errorMessage}>{errors.password}</Text> : null}

                        <Input 
                            placeholder='Confirm Password' 
                            placeholderTextColor='#707070'
                            textContentType='password'
                            inputContainerStyle={styles.inputContainerStyle}
                            rightIcon={<InvisibleIcon />}
                            value={values.confirm_password}
                            inputStyle={{color: '#707070'}}
                            secureTextEntry onChangeText={handleChange('confirm_password')}
                            onFocus={() => {
                                if (!touched.confirm_password) {
                                setTouched({ ...touched, confirm_password: true })
                                }
                            }}
                            onBlur={() => validateField('confirm_password')}
                        />
                        {errors.confirm_password && touched.confirm_password ? <Text style={styles.errorMessage}>{errors.confirm_password}</Text> : null}

                        {
                            props.signupMessage 
                            ? <Text style={styles.errorMessage}>{props.signupMessage}</Text> 
                            : null
                        }

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
                                    title='Sign Up'
                                    buttonStyle={styles.button}
                                    titleStyle={{fontSize: 22, fontWeight: '700'}}
                                    onPress={() => handleSubmit()}
                                />
                            </View> : <ActivityIndicator size={50} color='#FDAD45' />}
                        </View>
                      </>
                    )}
                  </Formik>
                </View>

            </KeyboardAvoidingView>
            </ScrollView>

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
    signup
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
    },

    inputContainer: {
    },

    inputs: {
        width: width/1.2,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    inputContainerStyle: {
        borderBottomColor: '#171717',
        borderBottomWidth: 2.5,
        marginTop: -18
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
