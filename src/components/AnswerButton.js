import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

const AnswerButton = props => {
    return (
        <Button 
            title={props.title} 
            titleStyle={{ 
                color: props.textColor ?? '#171717',
                fontSize: props.textSize,
                fontWeight: props.textWeight
            }} 
            buttonStyle={{ 
                backgroundColor: props.backgroundColor ?? 'transparent',
                height: 55,
                borderWidth: 2, 
                borderRadius: 10,
                borderColor: props.borderColor ?? '#707070'
            }}
            containerStyle={{ paddingTop: 10, paddingBottom: 10 }}
            onPress={() => props.onPress()}
            disabled={props.disabled}
        />
    )
}

export default AnswerButton

const styles = StyleSheet.create({})
