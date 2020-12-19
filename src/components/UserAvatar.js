import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'

const UserAvatar = props => {

    return (
        <>
            {
                props.uri ? 
                <Avatar
                    rounded={props.rounded ?? false}
                    size={props.size ?? 'medium'}
                    source={{uri: props.uri, cache: true}}
                    activeOpacity={0.7}
                    containerStyle={props.containerStyle ?? {}}
                    overlayContainerStyle={props.containerStyle ?? {backgroundColor: 'rgba(240, 240, 240, 1)'}}
                    avatarStyle={{borderRadius: 30, resizeMode: 'cover'}}
                    onPress={props.onPress}
                    renderPlaceholderContent={<ActivityIndicator size={40} color='#257F9B' />}
                    placeholderStyle={props.placeholderStyle}
                /> 
                : 
                (props.title ? 
                <Avatar 
                    rounded={props.rounded ?? false}
                    size={props.size ?? 'medium'}
                    title={props.title}
                    titleStyle={props.titleStyle ?? {}}
                    overlayContainerStyle={props.containerStyle ?? {backgroundColor: 'rgba(240, 240, 240, 1)'}}
                    activeOpacity={0.7}
                    onPress={props.onPress}
                /> 
                :
                <Avatar
                    rounded={props.rounded ?? false}
                    size={props.size ?? 'medium'}
                    icon={{name: 'person', type: 'material'}}
                    overlayContainerStyle={props.containerStyle ?? { backgroundColor: 'rgba(240, 240, 240, 1)'}}
                    activeOpacity={0.7}
                    onPress={props.onPress}
                /> )
            }
        </>
    )
}

export default UserAvatar

const styles = StyleSheet.create({})
