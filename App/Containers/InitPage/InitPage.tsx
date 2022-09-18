import React from 'react'
import { View, Text, TouchableOpacity,Alert } from 'react-native';
import styles from './InitPageStyles';
import { any } from 'prop-types';
import { getToken } from '../Auth/Auth';

interface Props {
  navigation: any
}

export default class InitPage extends React.Component<Props>{

  constructor(props: Props) {
    super(props);

  }



  render() {
    return (
      <View style={{ width: '100%', alignContent: 'center', alignItems: 'center' }}>


        <View style={styles.body}>

          <View style={styles.sectionContainer}>


            <TouchableOpacity onPress={() => this.props.navigation.replace('LoginPageScreen')}>
              <Text style={{
                marginBottom: '20%', marginTop: '20%', width: 120,
                backgroundColor: 'lightblue', borderRadius: 5, textAlign: 'center'
              }} >
                <Text style={styles.titleText}>Login </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.replace('RegisterPageScreen')}>
              <Text style={{
                marginBottom: '20%', width: 120,
                backgroundColor: 'lightblue', borderRadius: 5, textAlign: 'center'
              }} >
                <Text style={styles.titleText}>Cadastrar </Text>
              </Text>
            </TouchableOpacity>



          </View>
          <View style={styles.circuloView}>

          </View>

        </View>

      </View>
    );
  }
}
