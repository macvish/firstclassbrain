import React from 'react'
import { StyleSheet } from 'react-native'

import CustomText from './CustomText'

export const CustomText = ({ children, style }) => {
  return (
    <CustomText 
      style={{
        ...styles.default,
        ...style
      }}
    >
      {children}
    </CustomText>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Montserrat-Regular',
    color: 'blue'
  },

  bold: {
    fontFamily: 'Montserrat-Medium'
  }
})
