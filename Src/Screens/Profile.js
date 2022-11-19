import { Text, StyleSheet, View, Button } from 'react-native'
import React, { Component } from 'react'

export default function Profile({navigation}) {
  
    return (
      <View style={styles.forclick}>
      <Button onPress={()=>{navigation.navigate('HomeStackNavigator',{screen:'Home'})}} title='Hi'></Button>
      </View>
    )
  
}

const styles = StyleSheet.create({
  forclick:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})
