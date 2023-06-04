import React from 'react'
import ProductDetails from '../components/ProductDetails';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function ProductPage({route, navigation}) {

  const {id} = route.params;

  return (
      <View style={{flex : 1}}>
        <StatusBar backgroundColor='#f8eeea' />
        <ProductDetails navigation={navigation} id={id} />
      </View>
  )
}