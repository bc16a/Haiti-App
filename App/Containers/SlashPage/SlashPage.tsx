import React from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './SlashPageStyles';
import { Images } from '../../Themes';
import { getToken } from '../Auth/Auth';

interface Props {
  navigation: any
}

export default class SlashPage extends React.Component<Props>{

  constructor(props: Props) {
    super(props);

  }

  componentDidMount() {
    getToken().then(res => {
      if (res)
        setTimeout(() => this.props.navigation.replace('PosLogin'), 3000)
      else
        this.props.navigation.replace('ProfileScreenA')
    }).catch(err => Alert.alert("Erro"));
  }


  render() {
    return (
      <View style={{ width: '100%', alignContent: 'center', alignItems: 'center' }}>
        <View style={styles.body}>

          <View style={styles.sectionContainer}>

            <TouchableOpacity onPress={() => this.props.navigation.replace('ProfileScreenA')}>
              <Image source={Images.slashlogo} style={{ width: 200, height: 200 }} />
            </TouchableOpacity>

          </View>
          <View style={styles.circuloView}>
          </View>

        </View>

      </View>
    );
  }
}
