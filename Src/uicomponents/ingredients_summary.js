import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Hairline2} from './hairline';

export default function Ingredients_summary(props) {
  const ingredientsdata = props.ingredients
  const proceduredata = props.instruction
  
  return (
    <View>
      <Hairline2 />
      <Text
        style={[
          scdetailstyles.text,
          {color: '#000000', fontSize: 18, fontFamily: 'Josefin Sans SemiBold'},
        ]}>
        Summary
      </Text>
      <Text style={[scdetailstyles.text, {marginTop: 8, marginBottom: 16,lineHeight:20}]}>
        {props.summary.replace(/<[^>]+>/g, '')}
      </Text>
      <Hairline2 />
      <Text style={[scdetailstyles.text, {color: '#000000', fontSize: 18}]}>
        Ingredients
      </Text>
      <FlatList
        contentContainerStyle={{justifyContent: 'center', marginBottom: 16}}
        data={ingredientsdata}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => (
          <Text style={scdetailstyles.text}>
            {index + 1}) {item.name} - {item.amount}
            {item.unit}
          </Text>
        )}></FlatList>
      <Hairline2 />
      {proceduredata.length!=0?<Text style={[scdetailstyles.text, {color: '#000000', fontSize: 18}]}>
        How to make
      </Text>:null}
      {proceduredata.length!=0?<FlatList
        contentContainerStyle={{justifyContent: 'center', marginBottom: 16}}
        data={proceduredata}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Text style={scdetailstyles.text}>{index + 1})</Text>
            <Text style={[scdetailstyles.text, {flex:1,marginStart: 0,marginRight:12,lineHeight:20}]}>
              {item.step}
            </Text>
          </View>
        )}></FlatList>:null}
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
    marginTop: 12,
    marginEnd: 12,
  },
});
