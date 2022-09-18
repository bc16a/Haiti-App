//import * as React from 'react';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './ContactPage';  
interface Props {
  navigation: any

}

export default class ContactPage extends React.Component<Props>{

  render() {
 
    return (
      <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{margin:100}}></View>
       
          <Text>Para mais enformação entra em contato no : </Text>
          <Text>Email : celissaintb@gmail.com </Text>
          <Text>Tel : +55 41 998318677 </Text> 
          
      </View>
    );
  }
}