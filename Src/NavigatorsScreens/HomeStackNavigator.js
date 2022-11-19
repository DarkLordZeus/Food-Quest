import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from '../Screens/Cart'

export default function HomeStackNavigator(){
    const Tab=createBottomTabNavigator()
    return (
      
        <Tab.Navigator screenOptions={({route}) => ({
          tabBarActiveTintColor: '#ffffff',
          tabBarActiveBackgroundColor: '#000000',
          tabBarInactiveBackgroundColor: '#000000',
          tabBarLabelStyle:{
                fontSize:11
          },
          lazy:false,
          tabBarIcon:({focused,size,color})=>{
            let iconname
              if(route.name==='Home'){
                iconname='home',
                size=focused?25:20,
                color="#ffffff"
              }      
              else if(route.name==='Cart'){
                iconname='shopping-cart',
                size=focused?25:20,
                color="#ffffff"
              }   

            return( 
              <Icon
              name={iconname}
              size={size}
              color={color}
              />)
          }
        })}>
            <Tab.Screen
                name='Home'
                
                component={Home}
                options={{header:()=>null}}
            /> 
            
            <Tab.Screen
                name='Cart'
                component={Cart}
                options={{header:()=>null}}

/>
            
        </Tab.Navigator>
      
    )
  
}

const styles = StyleSheet.create({})