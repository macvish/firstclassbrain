import React, { useState } from 'react'
import { Dimensions, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Avatar, Divider, Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import UserAvatar from '../components/UserAvatar'

const { width, height } = Dimensions.get('window')

const ProfileScreen = props => {

    const [avatar, setAvatar] = useState(null)

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

                // await API.post(`users/image/base64/${data.uid}`, { pictureURL, filename })
                // .then(res => {
                //     if(res.status === 200){
                //         const { data } = res
                        
                //         setAvatar({title: '', source: source.uri});
                //         props.set_avatar(source.uri)
                //     } else {
                //         Alert.alert("Alert Title",
                //         "Picture upload failed",
                //         [
                //           { text: "OK"}
                //         ],
                //         { cancelable: true })
                //     }
                // })
                // .catch(err => 
                //     {
                //         console.log(err)
                //         Alert.alert("Alert Title",
                //         "Picture upload failed",
                //         [
                //         { text: "OK" }
                //         ],
                //         { cancelable: true })
                //     }
                // )
                
                
              setAvatar(pictureURL)

            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.avatarWrapper}>
                {avatar ?  
                    <UserAvatar 
                        uri={avatar}
                        size={width/1.2} 
                        containerStyle={styles.avatar}
                    />
                : 
                    <UserAvatar 
                        size={width/1.2} 
                        containerStyle={styles.avatar}
                    />
                }

                <View style={styles.fadeContainer}>
                    <Text style={styles.avatarTitle}>John Doe</Text>
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
                    <TouchableOpacity>
                        <View style={styles.menu}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon type='antdesign' color='#707070' size={30} name='lock' />
                                <Text style={styles.menuTitle}>Edit Profile</Text>
                            </View>
                            <Icon type='antdesign' color='#707070' size={30} name='down' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menu}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon type='antdesign' color='#707070' size={30} name='setting' />
                                <Text style={styles.menuTitle}>Privacy & Security</Text>
                            </View>
                            <Icon type='antdesign' color='#707070' size={30} name='down' />
                        </View>
                    </TouchableOpacity>
                </View>

                <Divider style={{width: width, backgroundColor: '#707070', borderWidth: 1, borderColor: '#707070'}} />

                <View style={[styles.menu, { paddingTop: 20 }]}>
                    <Text style={styles.Logout}>Logout</Text>
                    <Icon type='antdesign' color='#EC5959' size={30} name='logout' />
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
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
        fontSize: 25
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

    Logout:{
        color: '#EC5959',
        fontSize: 22,
        fontWeight: 'bold'
    }
})
