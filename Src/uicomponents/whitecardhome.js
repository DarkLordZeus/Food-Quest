import { StyleSheet,View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/MaterialCommunityIcons'
import {Hairline} from './hairline';


const Whitecardhome = () => {
  return (
    <View style={Homewhitecard.view}>
    <TouchableOpacity style={Homewhitecard.touchableopacity}>
      <Icon name="repeat" size={20} color='#000000' style={{marginEnd:16}}></Icon>
      <Text style={{fontSize: 16, fontWeight: '500' , fontFamily:'JosefinSans' , color:'#000000'}}>Repeat last order</Text>
    </TouchableOpacity>
    <Hairline/>
    <TouchableOpacity style={Homewhitecard.touchableopacity}>
      <IconA name="help" size={20} color='#000000' style={{marginEnd:16}}></IconA>
      <Text style={{fontSize: 16, fontWeight: '500' , fontFamily:'JosefinSans' , color:'#000000'}}>Help me choose</Text>
    </TouchableOpacity>
    <Hairline/>
    <TouchableOpacity style={Homewhitecard.touchableopacity}>
      <IconA name="food-outline" size={20} color='#000000' style={{marginEnd:16}}></IconA>
      <Text style={{fontSize: 16, fontWeight: '500' , fontFamily:'JosefinSans' , color:'#000000'}}>Surprise me</Text>
    </TouchableOpacity>
    
    </View>
  )
}

const Homewhitecard = StyleSheet.create({
 view:{
    flex:1,
    padding:12,
    paddingStart:24,
    paddingEnd:24,
    justifyContent:'center'
    
    
 },
 touchableopacity:{
    flexDirection:'row',
    marginBottom:8,
    marginTop:8,
    alignItems:'center'
 }
})

export default Whitecardhome