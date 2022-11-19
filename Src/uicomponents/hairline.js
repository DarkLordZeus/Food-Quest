import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export const Hairline =()=> {
  
    return (
        <View
        style={{
          borderBottomColor: '#a1a1a1',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    )
  }
  export const Hairline2 =()=> {
  
    return (
      <View
      style={{
        borderBottomColor: '#a1a1a1',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginEnd: 16,
        marginStart: 16,
      }}
    />
    )
  }

