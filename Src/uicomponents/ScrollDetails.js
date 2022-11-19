import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import Hairline from './hairline';
import Ingredients_summary from './ingredients_summary';
import { Hairline2 } from './hairline';
export default function ScrollDetails(props) {
  const data = [
    {
      name: props.Item.vegan
        ? 'Vegan'
        : props.Item.vegetarian
        ? 'Veg'
        : 'Non-Veg',
      image: props.Item.vegan
        ? 'leaf'
        : props.Item.vegetarian
        ? 'square-circle'
        : 'square-circle',
      color: props.Item.vegan
        ? '#16dc1a'
        : props.Item.vegetarian
        ? '#16dc1a'
        : '#ff0000',
    },
    {
      name: props.Item.veryHealthy ? 'Healthy' : 'Unhealthy',
      image: props.Item.veryHealthy ? 'cards-heart' : 'heart-off',
      color: '#ff4583',
    },
    {
      name: props.Item.dairyFree ? 'Lacto-Free' : 'Lactose',
      image: props.Item.dairyFree ? 'cow-off' : 'cow',
      color: '#0096FF',
    },
    {
      name: props.Item.glutenFree ? 'Gluten-Free' : 'Gluten',
      image: props.Item.glutenFree ? 'barley-off' : 'barley',
      color: '#FFAA33',
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        marginTop: -25,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: '#efefef',
        flexWrap:'wrap',
        overflow: 'hidden',
        
        
      }}>
      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:25
        }}>
        <Image
          source={{uri:props.Item.image}}
          style={{width: 250, height: 250, marginBottom: 25,borderRadius:25}}
        />
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            paddingTop: 12,
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
            flexDirection: 'column',
            paddingBottom:25
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 30,
              fontFamily: 'JosefinSans',
              marginBottom: 16,
              marginStart: 24,
            }}>
            {props.Item.title}
          </Text>

          <FlatList
            contentContainerStyle={{height: 60, justifyContent: 'center'}}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {}}
                style={scdetailstyles.flatlistitem}>
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
          <Hairline2/>
          <Text style={[scdetailstyles.text,{fontSize:18}]}>Nutrition Value</Text>
          {/* for nutrition values  */}
          <FlatList
            contentContainerStyle={{height: 60, justifyContent: 'center',marginBottom:16,marginTop:8}}
            data={props.Item.nutrition.nutrients}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[
                  scdetailstyles.text,
                  {
                    marginTop: 0,
                    fontSize: 20,
                    color: '#000000',
                    marginBottom: 0,
                  },
                ]}>
                {Math.round(item.amount*10)/10}{item.unit}
              </Text>
              <Text style={[scdetailstyles.text, {marginTop: 0}]}>{item.name}</Text>
            </View>
            )}></FlatList>
          
          {/* for nutrition values  */}

          
          <Ingredients_summary ingredients={props.Item.nutrition.ingredients} instruction={props.Item.analyzedInstructions.length===0?[]:props.Item.analyzedInstructions[0].steps} summary={props.Item.summary}/>
          </View>
      </ScrollView>
    </View>
  );
}

const scdetailstyles = StyleSheet.create({
  flatlistitem: {
    backgroundColor: '#f7f7f7',
    paddingLeft: 12,
    paddingRight: 12,
    height: 40,
    borderRadius: 50,
    marginEnd: 6,
    marginStart: 6,
    elevation: 2,
    marginBottom: 16,
  },
  text: {
    color: '#8e8e8e',
    fontSize: 16,
    fontFamily: 'JosefinSans',
    marginBottom: 0,
    marginStart: 12,
    marginTop: 16,
    marginEnd: 12,
  },
});
