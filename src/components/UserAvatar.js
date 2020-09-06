import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'

const UserAvatar = props => {

    return (
        <>
            {
                props.uri ? 
                <Avatar
                    rounded={props.rounded ?? false}
                    size={props.size ?? 'medium'}
                    source={{uri: props.uri}}
                    activeOpacity={0.7}
                    containerStyle={props.containerStyle ?? {}}
                    avatarStyle={{borderRadius: 30, resizeMode: 'cover'}}
                    onPress={props.onPress}

                /> 
                : 
                (props.title ? 
                <Avatar 
                    rounded={props.rounded ?? false}
                    size={props.size ?? 'medium'}
                    title={props.title}
                    titleStyle={props.titleStyle ?? {}}
                    overlayContainerStyle={props.containerStyle ?? {backgroundColor: '#707070'}}
                    activeOpacity={0.7}
                    onPress={props.onPress}
                /> 
                :
                <Avatar
                    rounded={props.rounded ?? false}
                    size={props.size ?? 'medium'}
                    icon={{name: 'person', type: 'material'}}
                    overlayContainerStyle={props.containerStyle ?? { backgroundColor: '#707070'}}
                    activeOpacity={0.7}
                    onPress={props.onPress}
                /> )
            }
        </>
    )
}

export default UserAvatar

const styles = StyleSheet.create({})
