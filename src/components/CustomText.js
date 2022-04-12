import React from 'react'
import { StyleSheet, Text } from 'react-native'

const CustomText = ({ children, style, weight }) => {
  return (
    <Text 
      style={
        weight === 'regular' 
        ? {...styles.default, ...style} 
        : (weight === 'medium' 
          ? {...styles.medium, ...style} 
          : (weight === 'bold' 
            ? {...styles.bold, ...style} 
            : (weight === 'extra-bold' 
              ? {...styles.extraBold, ...style} 
              : (weight === 'black' 
                ? {...styles.black, ...style} 
                : { ...styles.medium, ...style }
              )
            )
          )
        )
      }
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Montserrat-Regular',
    color: '#171717'
  },

  medium: {
    fontFamily: 'Montserrat-Medium',
    color: '#171717'
  },

  bold: {
    fontFamily: 'Montserrat-Bold'
  },

  extraBold: {
    fontFamily: 'Montserrat-ExtraBold'
  },

  black: {
    fontFamily: 'Montserrat-Black'
  }
})

export default CustomText
