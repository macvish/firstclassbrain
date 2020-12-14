import React, { useState, useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown-v2'
import { Input, Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ImagePicker from 'react-native-image-picker'
import { Avatar, Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import UserAvatar from '../components/UserAvatar'
import { logout } from '../reducers/authAction'

const { width, height } = Dimensions.get('window')

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

const INITIAL_Profile_VALUES = {
    classSelected: '',
}

const INITIAL_SECURITY_VALUES = {
    password: '',
    confirm_password: ''
}

const profileValidation = Yup.object({
    classSelected: Yup.string().required('Required'),
})

const securityValidation = Yup.object({
    password: Yup.string().required('Required').min(6, 'Must be 6 characters or more'),
    confirm_password: Yup.string().required('Required').min(6, 'Must be 6 characters or more')
})

const ProfileScreen = props => {

    const [avatar, setAvatar] = useState(props.user.pic)

    const [submitLoading, setSubmitLoading] = useState(false)

    const [editProfileDropdown, setEditProfileDropdown] = useState(false)

    const [securityDropdown, setSecurityDropdown] = useState(false)

    const [data, setData] = useState({

    })

    useEffect(() => {
        return () => {
            // setData(prevState => ({
            //     ...prevState, 
            //     uid: props.user.id, 
            //     fullname: props.user.fullname,
            //     email: props.user.email,
            //     phone: props.user.phone,
            //     pictureURL: props.user.pictureURL,
            //     address: props.user.address,
            // }))
        }
    }, [props.user])

    const handleChangeAvatar = async () => {

        ImagePicker.showImagePicker({}, async (response) => {
           
            if (response.didCancel) {
                console.info('Cancel')
            } else if (response.error) {
                console.info(response.error)
            } else {
                console.info('success')
                const source = { uri: response.uri, cache: true };
                const pictureURL = 'data:image/jpeg;base64,' + response.data
                // const pictureURL = response.data
                const filename = response.fileName

                await API.put(`/updatepic/student`, { pictureURL  })
                .then(res => {
                    if(res.status === 200){
                        const { data } = res
                        
                        setAvatar({title: '', source: source.uri});
                        props.set_avatar(source.uri)
                    } else {
                        Alert.alert("Alert Title",
                        "Picture upload failed",
                        [
                          { text: "OK"}
                        ],
                        { cancelable: true })
                    }
                })
                .catch(err => 
                    {
                        console.log(err)
                        Alert.alert("Alert Title",
                        "Picture upload failed",
                        [
                        { text: "OK" }
                        ],
                        { cancelable: true })
                    }
                )
                
                
              setAvatar(pictureURL)

            }
        });
    }

    const handleSubmit = (values) => {
        Keyboard.dismiss()
        setSubmitLoading(true)
        setErr('')
        props.signup(values)
        setTimeout(() => {
            setSubmitLoading(false)
        }, 2000);
    }

    const handleSecuritySubmit = (values) => {
        Keyboard.dismiss()
        setSubmitLoading(true)
        setErr('')
        props.signup(values)
        setTimeout(() => {
            setSubmitLoading(false)
        }, 2000);
    }

    return (
        <ScrollView style={{ }}>
            <View style={styles.container}>
                <View style={styles.avatarWrapper}>
                    <UserAvatar 
                        uri={avatar}
                        size={width/1.2} 
                        containerStyle={styles.avatar}
                    />
                    <View style={styles.fadeContainer}>
                        <Text style={styles.avatarTitle}>{`${props.user.firstName ?? 'Unknown'} ${props.user.lastName ?? null}`}</Text>
                        <Avatar 
                            rounded
                            size={70}
                            containerStyle={{backgroundColor: '#257F9B', top: -20}} 
                            icon={{ name: 'edit', type: 'material' }} 
                            onPress={() => handleChangeAvatar()}
                        />
                    </View>
                </View>
                <View style={styles.contents}>
                    <Text style={styles.title}>My Account</Text>
                    <Divider style={{width: width, backgroundColor: '#707070', borderWidth: 1, borderColor: '#707070'}} />
                    <View style={styles.menuWrapper}>
                        <TouchableOpacity onPress={() => setEditProfileDropdown(prev => !prev)}>
                            <View style={styles.menu}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon type='antdesign' color='#707070' size={30} name='lock' />
                                    <Text style={styles.menuTitle}>Edit Profile</Text>
                                </View>
                                <Icon type='antdesign' color='#707070' size={30} name={editProfileDropdown ? 'up' : 'down'} />
                            </View>
                        </TouchableOpacity>

                        {
                            editProfileDropdown 
                                ? <View>
                                    <Formik
                                        initialValues={INITIAL_Profile_VALUES}
                                        validationSchema={profileValidation}
                                        onSubmit={values => handleSubmit(values)}
                                    >
                                        {({ errors, handleSubmit, touched, validateField, values, setFieldValue }) => (
                                        <>
                                            <Dropdown
                                                data={classes}
                                                containerStyle={{...styles.inputContainerStyle, marginTop: -10, marginBottom: 20, width: width/1.27, alignSelf: "center"}}
                                                labelTextStyle={{color: '#707070'}}
                                                itemColor='#707070'
                                                style={{borderBottomWidth: 0, backgroundColor: 'transparent'}}
                                                label='Class'
                                                value={props.user.classSelected}
                                                onChangeText={(value) => setFieldValue('classSelected', value)}
                                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                            />
                                            {errors.classSelected && touched.classSelected ? <Text style={styles.errorMessage}>{errors.classSelected}</Text> : null}
 
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
                                                        title='Submit'
                                                        buttonStyle={styles.button}
                                                        titleStyle={{fontSize: 17, fontWeight: '500'}}
                                                        onPress={() => handleSubmit()}
                                                    />
                                                </View> : <ActivityIndicator size={40} color='#FDAD45' />}
                                            </View>
                                        </>
                                        )}
                                    </Formik>
                                </View>
                                : null
                        }

                        <TouchableOpacity onPress={() => setSecurityDropdown(prev => !prev)}>
                            <View style={styles.menu}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon type='antdesign' color='#707070' size={30} name='setting' />
                                    <Text style={styles.menuTitle}>Privacy & Security</Text>
                                </View>
                                <Icon type='antdesign' color='#707070' size={30} name={securityDropdown ? 'up' : 'down'} />
                            </View>
                        </TouchableOpacity>

                        {
                            securityDropdown 
                                ? <View>
                                    <Formik
                                        initialValues={INITIAL_SECURITY_VALUES}
                                        validationSchema={securityValidation}
                                        onSubmit={values => handleSecuritySubmit(values)}
                                    >
                                        {({ errors, handleChange, setTouched, handleSubmit, touched, validateField, values }) => (
                                        <>
                                            <Input 
                                                placeholder='Password' 
                                                placeholderTextColor='#707070'
                                                textContentType='password'
                                                inputContainerStyle={styles.inputContainerStyle}
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
                                                        title='Submit'
                                                        buttonStyle={styles.button}
                                                        titleStyle={{fontSize: 17, fontWeight: '500'}}
                                                        onPress={() => handleSubmit()}
                                                    />
                                                </View> : <ActivityIndicator size={40} color='#FDAD45' />}
                                            </View>
                                        </>
                                        )}
                                    </Formik>
                                </View>
                                : null
                        }
                    </View>

                    <Divider style={{width: width, backgroundColor: '#707070', borderWidth: 1, borderColor: '#707070'}} />

                    <TouchableOpacity onPress={() => props.logout()}>
                        <View style={[styles.menu, { paddingTop: 20 }]}>
                            <Text style={styles.Logout}>Logout</Text>
                            <Icon type='antdesign' color='#EC5959' size={30} name='logout' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = state => ({
    user: state.auth.payload
})

const mapDispatchToProps = {
    logout
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        width: width,
        paddingTop: 40
    },

    avatarWrapper: {
        alignItems: 'center',
        height: width/1.2
    },

    avatar: {
        backgroundColor: '#707070',
        borderRadius: 40
    },

    fadeContainer: {
        flexDirection: 'row', 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        top: -70, 
        width: width/1.2,
        height: 70,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    avatarTitle: {
        color: '#257F9B',
        fontWeight: 'bold',
        fontSize: 25,
        width: width/2
    },

    contents: {
        marginTop: 20,
        alignItems: 'center'
    },

    title: {
        color: '#171717',
        fontWeight: 'bold',
        fontSize: 25,
        width: width/1.2,
        paddingBottom: 10
    },

    menuWrapper: {
        paddingTop: 20,
    },

    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/1.2,
        // paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "space-between"
    },

    menuTitle: {
        color: '#707070',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 20
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
        width: width/3.5,
        height: 45,
        alignSelf: 'center',
        marginBottom: 15,
        borderRadius: 15
    },

    Logout:{
        color: '#EC5959',
        fontSize: 22,
        fontWeight: 'bold'
    }
})
