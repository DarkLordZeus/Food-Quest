import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore, { firebase } from '@react-native-firebase/firestore';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector , useDispatch } from 'react-redux';
import { SetCartitemcount } from '../Redux/stateactions';


export default function Cart({navigation}) {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [shimmering, setshimmering] = useState(true);
  const [cartitems, setcartitems] = useState([{}, {}, {}, {},{}]);
  const [amountupdating,setamountupdating]=useState(false)
  const {countincart} = useSelector(state => state.Statereducer);
  const dispatch=useDispatch()
  //why cant u use as a function 
  useEffect(() => {
    calldocument()
  }, []);


  const calldocument=()=>{
    const usersCollection=firestore()
      .collection('Users').doc('zpJE7YTJV9SsWnxikiAa') //ur collection and doc name 
      .onSnapshot(querySnapshot => {
        setcartitems(querySnapshot.data().Cart)
        setshimmering(false)
        dispatch(SetCartitemcount(querySnapshot.data().Cart.length))
      })
      return () => usersCollection();
  }

  //why cant use aync
  const updateamount=(amount,Id)=>{
      
      const updatedcartitems=cartitems.map(obj=>{
        if(obj.Id===Id){
          return {...obj,amount:amount}
        }
        return obj
      })
      setamountupdating(false)
      return updatedcartitems
    }
  
  return (
    <View style={styles.viewparentblack}>
      <View style={styles.viewblack}>
        <Text style={styles.kitchenquesttext}>Kitchen Quest</Text>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Text style={styles.carttext}>Cart</Text>
          <Icon name="cart" size={32} color="#FFAA33"></Icon>
        </View>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false} >
      <FlatList
      scrollEnabled={false}
        data={cartitems}
        style={styles.flatlist}
        keyExtractor={(item,index)=>String(index)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.flatlistitem}
            onPress={() => {
              navigation.navigate('Description', {
                Id:item.Id
              });
            }}>
            <View style={styles.viewinflatlistitem}>
              <ShimmerPlaceholder
                visible={shimmering ? false : true}
                shimmerStyle={styles.shimmer}>
                {shimmering ? null : (
                  <Image
                    source={{uri: `${item.Img}`}}
                    size={20}
                    resizeMode="stretch"
                    style={styles.imageview}></Image>
                )}
              </ShimmerPlaceholder>
              <View style={{flex: 1,flexGrow:1}}>
                <ShimmerPlaceholder
                  visible={shimmering ? false : true}
                  shimmerStyle={styles.shimmertext}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Icon name={item.dishtype=='vegan'?'leaf':"square-circle"} size={20} color={item.dishtype=='nonvegetarian'?'#ff0000':"#16dc1a"} />
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.titledish}>
                      {item.Name}
                    </Text>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={()=>{
                          firestore().collection('Users').doc('zpJE7YTJV9SsWnxikiAa').update({
                            Cart:updateamount(item.amount+1,item.Id)
                          });
                        }}
                        style={styles.plusminus}>
                        <Icon name="plus" size={20} color="#000000"></Icon>
                      </TouchableOpacity>
                     { amountupdating?<ActivityIndicator/>:<Text style={styles.amountdish}>{item.amount>99?99:item.amount}</Text>}
                      <TouchableOpacity style={styles.plusminus}
                        onPress={()=>{

                          item.amount===1?firestore().collection('Users').doc('zpJE7YTJV9SsWnxikiAa').update({
                            Cart:firebase.firestore.FieldValue.arrayRemove(item)
                          }):
                          firestore().collection('Users').doc('zpJE7YTJV9SsWnxikiAa').update({
                            Cart:updateamount(item.amount-1,item.Id)
                          });
                        }}>
                        <Icon name="minus" size={20} color="#000000"></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ShimmerPlaceholder>
                <ShimmerPlaceholder
                  visible={shimmering ? false : true}
                  shimmerStyle={styles.shimmerdescriptiontext}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={3}
                    style={styles.descriptiondish}>
                    {item.description}
                  </Text>
                </ShimmerPlaceholder>
              </View>
            </View>
          </TouchableOpacity>
        )}></FlatList>
        </ScrollView>
        <TouchableOpacity style={styles.finalbuttontoorder} onPress={()=>{navigation.navigate('Delivery')}}>
            <Text style={styles.finalordertext}>Place Order</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewblack: {
    width: '100%',
    height: '20%',
    backgroundColor: '#000000',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 24,
    paddingBottom: 64,
  },
  viewparentblack: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  flatlist:{flex:1,marginBottom:56},

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
    flexgrow:1
  },
  kitchenquesttext: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'JosefinSans',
    marginBottom: 16,
  },
  carttext: {
    fontSize: 32,
    fontFamily: 'Josefin Sans SemiBold',
    marginBottom: 16,
    color: '#FFAA33',
    marginRight: 8,
  },
  viewinflatlistitem: {
    flex: 1,
    flexGrow:1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imageview: {
    marginEnd: 16,
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  shimmer: {
    height: 100,
    width: 100,
    borderRadius: 25,
    marginEnd: 16,
  },
  shimmertext: {
    width: '100%',
    height: 28,
    borderRadius: 15,
    marginEnd: 16,
  },
  shimmerdescriptiontext: {
    width: '100%',
    height: 28,
    borderRadius: 15,
    marginTop: 8,
    flexGrow: 1,
    alignItems:'stretch'
  },
  titledish: {
    marginStart: 4,
    flex: 1,
    
    textAlign: 'center',
    fontFamily: 'Josefin Sans SemiBold',
    fontSize: 14,
    color: '#000000',
    
    flexGrow:1
  },
  button: {
    width: 80,
    height: 32,
    borderRadius: 12,
    borderColor: '#FFAA33',
    borderWidth: 1,
    marginStart: 16,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  plusminus: {
    backgroundColor: '#FFAA33',
    height: '100%',
    width: '33.33%',
    flex: 1,
    justifyContent: 'center',
  },
  amountdish: {
    height: '100%',
    width: '33.33%',
    flex: 1,
    flexShrink:1,
    fontSize: 16,
    fontFamily: 'JosefinSans',
    color: '#000000',
    backgroundColor: '#ffffff',
    textAlign:'center',
    textAlignVertical:'center'
  },
  descriptiondish: {
    flexgrow: 1,
    fontFamily: 'JosefinSans',
    textAlign: 'left',
    lineHeight: 16,
    marginTop: 8,
    fontSize: 14,
  },
  finalbuttontoorder:{
      width:148,
      height:48,
      backgroundColor:'#FFAA33',
      position:'absolute',
      bottom:8,
      alignSelf:'center',
      borderRadius:20,
      elevation:8,
      alignItems:'center',
      justifyContent:'center',
      
  },
  finalordertext:{
    fontSize:16,
    fontFamily:'JosefinSans',
    color:'#000000'
  }
});
