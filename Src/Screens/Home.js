import {StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView,Keyboard} from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Whitecardhome from '../uicomponents/whitecardhome';
import { Categorieshorizontal } from '../uicomponents/categorieshorizontal';
import {Recommendation} from '../uicomponents/recommendation';
import { SetCartitemcount } from '../Redux/stateactions';
import { useSelector,useDispatch } from 'react-redux';
import firestore , {firebase} from '@react-native-firebase/firestore'


export default function Home({navigation}) {
  useEffect(() => {
    
    firestore().collection('Users').doc('zpJE7YTJV9SsWnxikiAa')
    .get()
    .then(querysnapshot=>{
      dispatch(SetCartitemcount(querysnapshot.data().Cart.length))
    })
  
  }, [])
  
  const {countincart}=useSelector(state=>state.Statereducer)
  const dispatch=useDispatch()
  return (
    <View style={{flex:1, backgroundColor: '#efefef'}}>
      
      <View style={Homestyles.viewparentblack}>
        
        <View style={Homestyles.viewblack}>
          <View style={{flexDirection: 'row' , alignItems:'center', justifyContent:'space-between' }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 30,
                fontFamily: 'JosefinSans',
                marginBottom: 16,
              }}>
              Kitchen Quest
            </Text>
            <TouchableOpacity style={Homestyles.cartcard} onPress={()=>{navigation.navigate('Cart')}}>
              <Icon name="shopping-cart" size={20}></Icon>
              <Text style={{fontSize: 18, fontWeight: '500' , fontFamily:'JosefinSans'}}>{countincart}</Text>
            </TouchableOpacity>
          </View>
          <View style={Homestyles.textandicon}>
            <Icon name="search" light size={28}></Icon>
            <TextInput
              textAlign='left'
              style={Homestyles.textinput}
              showSoftInputOnFocus={false}
              placeholder="Search for something tasty..."
              onFocus={()=>{navigation.navigate('SearchScreens')}}
              ></TextInput>
          </View>
        </View>
        <Whitecardhome/>  
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          justifyContent: 'center',
          
        }}>
      <Categorieshorizontal/>
      <Recommendation/>  
      </ScrollView>
      
    </View>
  );
}
const Homestyles = StyleSheet.create({
  Icon: {},
  viewblack: {
    width: '100%',
    height: '55%',
    backgroundColor: '#000000',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 24,
    justifyContent: 'center',
  },
  viewparentblack: {
    width: '100%',
    height: '35%',
    backgroundColor: '#ffffff',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  textinput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 16,
    fontFamily: 'JosefinSans',
    color: '#ffffff',
    paddingStart: 10,
    paddingTop:0,
    paddingBottom:0,
    height:'100%'
  },
  textandicon: {
    width: '100%',
    height: '40%',
    paddingStart: 16,
    paddingEnd: 12,
    backgroundColor: '#666666',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartcard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    width: 60,
    borderRadius: 8,
    backgroundColor: '#FFAA33',
    justifyContent: 'space-evenly',
  },
});
