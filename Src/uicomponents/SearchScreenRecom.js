import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {datacuisines, dataingredients} from '../Utils/constants';

export const SearchScreenRecom = (props) => {
  
  return (
    <View style={styles.MainView}>
      <View style={styles.card}>
        <Text style={styles.cardtext}>Popular Cuisines</Text>
        <FlatList
          horizontal
          data={datacuisines}
          keyExtractor={(item, index) => String(index)}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.flatlistitem}
            onPress={()=>{
              props.onClickitem(item.name)
              }}
            >
              <Image
              
                source={item.image}
                style={{height: 80, width: 80}}
                resizeMode="cover"
              />
              <Text style={styles.flatlisttext}>{item.name}</Text>
            </TouchableOpacity>
          )}></FlatList>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardtext}>Popular Ingredients</Text>
        <FlatList
          horizontal
          data={dataingredients}
          keyExtractor={(item, index) => String(index)}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity  style={styles.flatlistitem} onPress={()=>{
                  props.onClickitem(item.name)
            }}>
              <Image
                source={item.image}
                style={{height: 80, width: 80}}
                resizeMode="cover"
              />
              <Text style={styles.flatlisttext}>{item.name}</Text>
            </TouchableOpacity>
          )}></FlatList>
      </View>
      <View style={[styles.card, {flexGrow: 1}]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  card: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#ffffff',
    height: 170,
  },
  cardtext: {
    marginTop: 8,
    marginStart: 8,
    fontSize: 16,
    fontFamily: 'Josefin Sans SemiBold',
    color: '#000000',
  },
  flatlistitem: {
    height: 120,
    width: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  flatlisttext: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'JosefinSans',
  },
});
