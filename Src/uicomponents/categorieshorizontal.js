import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import React, {Component} from 'react';
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


export const Categorieshorizontal = () => {
  const navigation=useNavigation()
  const data = [
    {
      name: 'Vegan',
      image: 'leaf',
      color: '#16dc1a',
    },
    {
      name: 'Coffee',
      image: 'coffee',
      color: '#FFAA33',
    },
    {
      name: 'Pizza',
      image: 'pizza',
      color: '#E30B5C',
    },
    {
      name: 'Ice-cream',
      image: 'ice-cream',
      color: '#0096FF',
    },
  ];

  return (
    <View>
      <View
        style={{
          flexShrink:1, 
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom:16,
          marginTop:16
          
        }}>
        <Text style={cathorstyles.text}>Top Categories</Text>
        <TouchableOpacity>
          <Text
            style={[
              cathorstyles.text,
              {fontSize: 14, marginEnd: 24, color: '#7e7e7e'},
            ]}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        //  inverted
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {navigation.navigate('SearchScreens',{itemname:item.name})}}
            style={cathorstyles.flatlistitem}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <IconA
                name={`${item.image}`}
                size={20}
                color={`${item.color}`}
                style={{marginEnd: 8}}></IconA>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Josefin Sans SemiBold',
                  fontSize: 14,
                  color: '#000000',
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}></FlatList>
    </View>
  );
};

const cathorstyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 24,
    flex:1,
    flexShrink:1,
    fontFamily: 'JosefinSans',
    
  },
  flatlistitem: {
    backgroundColor: '#ffffff',
    width: 115,
    height: 40,
    borderRadius: 50,
    marginStart: 8,
    marginEnd: 8,
  },
});
