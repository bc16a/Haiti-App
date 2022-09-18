//import * as React from 'react';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { getEmail, getId, getName, getStateAdmin, getToken, onClean, onSignOut } from '../Auth/Auth';
import { ContaService } from '../../services/Rest/ContaService'

import styles from './MenuPage';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions, StackActions } from 'react-navigation';
interface Props {
  navigation: any

}

export default class MenuPage extends React.Component<Props>{

  state = {
    conta: {
      id: 0,
      nome: '',
      saldo: 0,
      beneficio: 0,
      estado: false,
      tel: '',
      cpf: '',
      user_id: 0,
    },
    name: "",
    admin: "",
    id: 0,
    email: "",
    token: ""
  }

  componentDidMount() {    // para pegar 
    getEmail().then(res => {
      this.setState({ email: res });
      getName().then(res => {
        this.setState({ name: res });
        this.setState({ nome: res })
        getId().then(res => {
          this.setState({ id: parseInt(res, 10) });
          getStateAdmin().then(res => {
            this.setState({ admin: res });

            getToken().then(token => {
              this.setState({ token: token });

              const contaService = new ContaService()
              let usuar = {
                dado: {
                  user_id: this.state.id
                },
                token: token
              }



              contaService.buscaConta(usuar).then(conta => {
                if (conta.dados)
                  this.setState({ conta: conta.dados });

              }).catch(err => Alert.alert(err.toString()));
            }).catch(err => Alert.alert("Erro"));
          }).catch(err => Alert.alert("Erro"));
        }).catch(err => Alert.alert("Erro"));
      }).catch(err => Alert.alert("Erro"));
    }).catch(err => Alert.alert("Erro"));


  }


  logout(){
    onClean().then(res => {   
      console.log("logout")
      this.props.navigation.replace('LoginPageScreen')

      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: 'ContaScreen'})],
      // });
      // this.props.navigation.dispatch(resetAction);
    }).catch(err => Alert.alert("Erro"));
  }


  render() {

    return (
      <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'flex-start' }}>

        <View style={{ margin: 10 }}></View>

        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Ionicons name="document" size={24} color="#506294" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text>Dados pessoais</Text>
          </View>
        </View>

        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Ionicons name="settings" size={24} color="#506294" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text>Configuração</Text>
          </View>
        </View>

        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Ionicons name="image" size={24} color="#506294" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text>Upload documentos</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => this.logout()}>
        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Ionicons name="power-outline" size={24} color="red" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text>Sair</Text>
          </View>
        </View>
            </TouchableOpacity>

      </View>
    );
  }
}