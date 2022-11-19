import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GetLocation from 'react-native-get-location';
import { useState,useEffect } from 'react';

export default function Delivery () {
  const [loc,setloc]=useState({latitude:37.78825,longitude:-122.4324})
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  }).then(location=>{
    setloc({latitude:location.latitude,longitude:location.longitude})
  })
  }, [])
  
    
    return (
      <View style={styles.parentview}>
        <MapView style={{flex:1}}
        region={
          {latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
    
  >
    <Marker
    coordinate={{latitude: loc.latitude,
        longitude: loc.longitude}}
        pinColor = {'#FFAA33'} // any color
         title={"Your Location"}/>
    
</MapView>
      </View>
    )
  
}

const styles = StyleSheet.create({
    parentview:{
        flex:1,
        backgroundColor:"#ffffff"
    }
})