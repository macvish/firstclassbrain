import React from 'react'
import { Image } from 'react-native'

const IconImage = props => {
    return (
        <Image source={props.source} style={{width: props.width ?? 18, height: props.height ?? 18}} />
    )
}

export default IconImage
