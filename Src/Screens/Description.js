import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScrollDetails from '../uicomponents/ScrollDetails';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {getFoodbyId} from '../Redux/apiactions';
import {SetCartitemcount} from '../Redux/stateactions';

export default function Description({route, navigation}) {
  const {Id} = route?.params;
  const [cart, setcart] = useState([]);
  const [amountloading, setamountloading] = useState(true);
  const {countincart} = useSelector(state => state.Statereducer);
  const {databyid} = useSelector(state => state.Apireducer);
  const dispatch = useDispatch();
  let amount = 0;
  const [amountt, setamount] = useState(0);

  useEffect(() => {
    dispatch(getFoodbyId(Id));

    console.log(databyid);
    const subscribedish = firestore()
      .collection('Users')
      .doc('zpJE7YTJV9SsWnxikiAa')
      .onSnapshot(querysnapshot => {
        setcart(querysnapshot.data().Cart);
        dispatch(SetCartitemcount(querysnapshot.data().Cart.length));
        console.log('jshs')
        setamountloading(false);
      });
    return () => subscribedish();
  }, []);

  const ifincart = wantamount => {
    
    const object = cart.find(obj => {
      return obj.Name === databyid.title;
    });

    if (wantamount === true) {
      if (object != null) {
        amount=object.amount
        return object.amount;
      } else return 0;
    } else return object;
  };

  const updateamount = amount => {
    setamountloading(true);
    const updatedcart = cart.map(obj => {
      if (obj.Name === databyid.title) {
        return {...obj, amount: amount};
      }
      return obj;
    });

    return updatedcart;
  };
  return (
    <View style={Describestyles.viewparentblack}>
      <View style={Describestyles.viewblack}>
        <Text style={Describestyles.Headertitle}>Kitchen Quest</Text>
        <TouchableOpacity
          style={Describestyles.cartcard}
          onPress={() => {
            navigation.navigate('HomeStackNavigator',{screen:'Cart'}); //why no nested navigation error??
          }}>
          <Icon name="cart-outline" size={20}></Icon>
          <Text style={Describestyles.countincarttext}>{countincart}</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(databyid).length === 0 || Id != databyid.id ? (
        <ActivityIndicator
          size={64}
          color={'#FFAA33'}
          style={Describestyles.loading}
        />
      ) : (
        <View style={{flex: 1}}>
          <ScrollDetails Item={databyid} />
          <TouchableOpacity style={Describestyles.addbutton}>
            {amountloading ? (
              <ActivityIndicator color={'#000000'} size={24} />
            ) : ifincart((wantamount = true)) != 0 ? (
              <View style={Describestyles.viewofaddminus}>
                <Icon
                  name="plus"
                  size={24}
                  onPress={() => {
                    firestore()
                      .collection('Users')
                      .doc('zpJE7YTJV9SsWnxikiAa')
                      .update({
                        Cart: updateamount(amount + 1),
                      });
                      console.log('start')
                      setamountloading(true);
                  }}
                  color="#000000"></Icon>
                <Text style={Describestyles.amountofitem}>{amount}</Text>
                <Icon
                  name="minus"
                  size={24}
                  onPress={() => {
                    setamountloading(true);
                    firestore()
                      .collection('Users')
                      .doc('zpJE7YTJV9SsWnxikiAa')
                      .update(
                        amount >= 2
                          ? {
                              Cart: updateamount(amount - 1),
                            }
                          : {
                              Cart: firebase.firestore.FieldValue.arrayRemove(
                                ifincart((wantamount = false)),
                              ),
                            },
                      );
                  }}
                  color="#000000"></Icon>
              </View>
            ) : (
              <Text
                onPress={() => {
                  setamountloading(true);
                  firestore()
                    .collection('Users')
                    .doc('zpJE7YTJV9SsWnxikiAa')
                    .update({
                      Cart: firebase.firestore.FieldValue.arrayUnion({
                        Id: databyid.id,
                        Name: databyid.title,
                        Img: databyid.image,
                        description: String(databyid.summary)
                          .replace(/<[^>]+>/g, '')
                          .substring(0, 50),
                        amount: 1,
                        dishtype: databyid.vegan
                          ? 'vegan'
                          : databyid.vegetarian
                          ? 'vegetarian'
                          : 'nonvegetarian',
                      }),
                    });
                }}
                style={Describestyles.textadd}>
                Add
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const Describestyles = StyleSheet.create({
  viewblack: {
    width: '100%',
    height: '20%',
    backgroundColor: '#000000',
    padding: 24,
    paddingBottom: 64,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewparentblack: {
    flex: 1,
    backgroundColor: '#efefef',
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
  addbutton: {
    position: 'absolute',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 32,
    bottom: 32,
    backgroundColor: '#FFAA33',
    borderRadius: 15,
    elevation: 8,
    overflow: 'hidden',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Headertitle: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'JosefinSans',
    marginBottom: 16,
  },
  countincarttext: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'JosefinSans',
  },
  viewofaddminus: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  amountofitem: {
    fontSize: 16,
    fontFamily: 'JosefinSans',
    color: '#000000',
  },
  textadd: {
    fontSize: 16,
    fontFamily: 'JosefinSans',
    color: '#000000',
  },
});
