import {Text, StyleSheet, View, TouchableOpacity, FlatList, Image, ToastAndroid} from 'react-native';
import React, {Component , useEffect} from 'react';
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import {LogBox} from 'react-native';
import Description from '../Screens/Description';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendation } from '../Redux/apiactions';

export const Recommendation = () => {
  
  const navigation = useNavigation()
  
  useEffect(() => {
    dispatch(getRecommendation())
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const {data} =  useSelector(state=>state.Apireducer)
  const dispatch = useDispatch()
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexShrink:1,
          marginTop:16,
          marginBottom:16
          
          
        }}>
        <Text style={recomstyles.text}>Recommended for you</Text>
        <TouchableOpacity>
          <Text
            style={[
              recomstyles.text,
              {fontSize: 14, paddingEnd: 24, color: '#7e7e7e',marginBottom:0},
            ]}>
            View all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        scrollEnabled={false}
        data={data.results}
        contentContainerStyle={recomstyles.contentContainer}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        
        //  inverted
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => (
          <TouchableOpacity 
          
          style={recomstyles.flatlistitem} onPress={()=>{
            navigation.navigate('Description' ,{Id:item.id})}}>
            <View
              style={{
                width:'100%',
                height:'100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                
                
              }}>
              <Image
                source={{uri:item.image}}
                style={{width:150,height:150,borderRadius:50}}></Image>
              <Text
                  style={{
                  textAlign: 'center',
                  fontFamily: 'Josefin Sans SemiBold',
                  fontSize: 14,
                  color: '#000000',
                  marginEnd:24,
                  marginStart:24
                  
                }}
                ellipsizeMode='tail'
                numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}></FlatList>
    </View>
  );
};

const recomstyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 24,
    fontFamily: 'JosefinSans',
    flex:1,
    flexShrink:1,
    
  },
  flatlistitem: {
    alignItems:'center',
    backgroundColor: '#ffffff',
    height: 200,
    borderRadius: 50,
    marginStart: 8,
    marginEnd: 8,
    flex: 1 / 2,
    marginBottom:8,
    justifyContent:'center',
    overflow:'hidden'
    
  },
  contentContainer: {
    
    
  }
});
