import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {getRecommendation, getSearchfood,Clearsearchdata} from '../Redux/apiactions';
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchScreenRecom } from '../uicomponents/SearchScreenRecom';



export default function SearchScreens({navigation,route}) {
  
  const [searching, setsearching] = useState(false);
  const dispatch = useDispatch();
  const {databysearch} = useSelector(state => state.Apireducer);
  const [itemtosearch,setitemtosearch]=useState('')
  const [items,setitems]=useState('')
  useEffect(() => {
    if(route.params?.itemname!=null)
    {   setitemtosearch(route.params?.itemname) }
  }, [])
  
  useEffect(() => {
      

      if (itemtosearch.length >= 1) {
        setsearching(true)
        dispatch(getSearchfood(itemtosearch));
      }
      else{
        setsearching(false)
        dispatch(Clearsearchdata())
      }
    
      
    
  
  }, [itemtosearch]);


  return (
    <View style={searchstyles.viewparentblack}>
      <View style={searchstyles.viewblack}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={searchstyles.headertext}>Kitchen Quest</Text>
        </View>
        <View style={searchstyles.textandicon}>
          <Icon name="search" light size={28}></Icon>
          <TextInput
            onChangeText={text => {
              setitemtosearch(text)
            }}
            style={searchstyles.textinput}
            placeholder="Search for something tasty..."></TextInput>
        </View>
      </View>
      { (searching)?
          <FlatList
          data={databysearch.results}
          contentContainerStyle={searchstyles.contentContainer}
          showsVerticalScrollIndicator={false}
          //  inverted
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={searchstyles.flatlistitem}
              onPress={() => {
                navigation.navigate('Description', {Id: item.id});
              }}>
              <View style={searchstyles.viewinflatlist}>
                <Image
                  source={{uri: item.image}}
                  //chage heres
                  style={{width: 100, height: 100, borderRadius: 25}}></Image>
                <View style={searchstyles.titledescriptiontype}>
                  <View style={searchstyles.typetitle}>
                    <IconA
                      name={item.vegan ? 'leaf' : 'square-circle'}
                      size={20}
                      color={
                        item.vegan
                          ? '#16dc1a'
                          : item.vegetarian
                          ? '#16dc1a'
                          : '#ff0000'
                      }
                    />
                    <Text
                      style={searchstyles.title}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
  
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={3}
                    style={searchstyles.descriptiondish}>
                    {item.summary.replace(/<[^>]+>/g, '')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}></FlatList>
          :<SearchScreenRecom onClickitem={(itemname)=>{ setitemtosearch(itemname)}}/>
      }
      
    </View>
  );
}

const searchstyles = StyleSheet.create({
  viewblack: {
    width: '100%',
    height: '20%',
    backgroundColor: '#000000',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 24,
    justifyContent: 'center',
  },
  viewparentblack: {flex: 1, backgroundColor: '#efefef'},
  title:{
    fontFamily: 'Josefin Sans SemiBold',
    fontSize: 14,
    color: '#000000',
    marginEnd: 24,
    marginStart: 4,
    flex: 1,
  },
  textinput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 16,
    fontFamily: 'JosefinSans',
    color: '#ffffff',
    paddingStart: 10,
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
  flatlistitem: {
    backgroundColor: '#ffffff',
    height: 120,
    borderRadius: 25,
    marginStart: 16,
    marginEnd: 16,
    margin: 8,
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    flexgrow: 1,
  },
  contentContainer: {
    marginTop: 8,
  },
  descriptiondish: {
    flex: 2,
    fontFamily: 'JosefinSans',
    textAlign: 'left',
    lineHeight: 16,
    marginTop: 8,
    fontSize: 14,
  },

  headertext: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'JosefinSans',
    marginBottom: 16,
  },
  viewinflatlist: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  titledescriptiontype: {flex: 1, flexDirection: 'column', marginStart: 16},
  typetitle: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
