import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, 
    Keyboard, ScrollView, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native'
import { Input, Button, Avatar } from 'react-native-elements'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
// import * as Animatable from 'react-native-animatable'
import { Dropdown } from 'react-native-material-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker'

import img from '../assets/images/login_image.png'
import img_overlay from '../assets/images/login_fade.png'
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

const RegistrationScreen = props => {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        otherName: '',
        email: '',
        phone: '',
        dateOfBirth: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
        address: '',
        schoolClass: null,
        password: '',
        confirm_password: ''
    })

    const [showDate, setShowDate] = useState(false)

    const [date, setDate] = useState(new Date)

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
        console.log(data)
    }

    const handleChangeDate = (e, s) => {
        handleInput('dateOfBirth', `${new Date(s).getFullYear()}-${new Date(s).getMonth()}-${new Date(s).getDate()}`)
        setDate(s)
        setShowDate(false)
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
    
            if(data.email !== '' && data.password !== '' && data.confirm_password === data.password && data.fullname !== '' && data.class !== '' ){
                setErr('')
                props.signup(data)
                setTimeout(() => {
                    setSubmitLoading(false)
                }, 2000);
            }
    
        })
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
                    <Input 
                        placeholder='First Name'
                        placeholderTextColor='#707070'
                        textContentType='givenName'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('firstName', e)} />
                    <Input 
                        placeholder='Last Name'
                        placeholderTextColor='#707070'
                        textContentType='familyName'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('lastName', e)} />
                    <Input 
                        placeholder='Other Name'
                        placeholderTextColor='#707070'
                        textContentType='middleName'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('otherName', e)} />
                    <Input 
                        placeholder='Email'
                        placeholderTextColor='#707070'
                        textContentType='emailAddress'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('email', e)} />
                    <Input 
                        placeholder='Phone Number'
                        placeholderTextColor='#707070'
                        textContentType='telephoneNumber'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{color: '#707070'}} 
                        onChangeText={e => handleInput('phone', e)} />
                    <TouchableOpacity onPress={() => setShowDate(true) }>
                        <Input 
                            placeholder='date of Birth'
                            placeholderTextColor='#707070'
                            disabled={true}
                            value={`${data.dateOfBirth}`}
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={{color: '#707070'}} />
                    </TouchableOpacity>
                    {showDate && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            display="default"
                            onChange={handleChangeDate}
                        />
                    )}
                    <Dropdown
                        data={classes}
                        containerStyle={{...styles.inputContainerStyle, marginTop: -40, marginBottom: 20, width: width/1.27, alignSelf: "center"}}
                        labelTextStyle={{color: '#707070'}}
                        itemColor='#707070'
                        style={{borderBottomWidth: 0}}
                        label='Class'
                        onChangeText={e => handleInput('schoolClass', e)}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />
                    <Input 
                        placeholder='Password' 
                        placeholderTextColor='#707070'
                        textContentType='password'
                        inputContainerStyle={styles.inputContainerStyle}
                        rightIcon={<InvisibleIcon />}
                        inputStyle={{color: '#707070'}}
                        secureTextEntry onChangeText={e => handleInput('password', e)} />
                    <Input 
                        placeholder='Confirm Password' 
                        placeholderTextColor='#707070'
                        textContentType='password'
                        inputContainerStyle={styles.inputContainerStyle}
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
                            title='Sign Up'
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
