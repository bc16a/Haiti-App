//import * as React from 'react';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { getEmail, getId, getName, getStateAdmin, getToken } from '../Auth/Auth';
import { ContaService } from '../../services/Rest/ContaService'

import styles from './ProfilePageStyles';
interface Props {
  navigation: any

}

export default class ProfilePage extends React.Component<Props>{

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


  render() {

    return (
      <View>


        <ScrollView style={styles.body}>
          <View style={styles.titleBar}>
            <Text style={{ fontWeight: 'bold' }}>DADOS PESSOAIS</Text>
          </View>



          <View style={styles.datasBar}>
            <View style={styles.textLeft}>
              <Text>Nome</Text>
            </View>
            <View style={styles.textRight}>
              <Text>{this.state.name}</Text>
            </View>
          </View>

          <View style={styles.datasBar}>
            <View style={styles.textLeft}>
              <Text>Email</Text>
            </View>
            <View style={styles.textRight}>
              <Text>{this.state.email}</Text>
            </View>
          </View>

          <View style={styles.datasBar}>
            <View style={styles.textLeft}>
              <Text>Tel</Text>
            </View>
            <View style={styles.textRight}>
              <Text>{this.state.conta.tel}</Text>
            </View>
          </View>


          <View style={styles.titleBar}>
            <Text style={{ fontWeight: 'bold' }}>ENDEREÇO DE RESIDENCIA</Text>
          </View>



          <View style={styles.datasBar}>
            <View style={styles.textLeft}>
              <Text>Nome</Text>
            </View>
            <View style={styles.textRight}>
              <Text>{this.state.name}</Text>
            </View>
          </View>

          <View style={styles.datasBar}>
            <View style={styles.textLeft}>
              <Text>Email</Text>
            </View>
            <View style={styles.textRight}>
              <Text>{this.state.email}</Text>
            </View>
          </View>

          <View style={styles.datasBar}>
            <View style={styles.textLeft}>
              <Text>Tel</Text>
            </View>
            <View style={styles.textRight}>
              <Text>{this.state.conta.tel}</Text>
            </View>
          </View>

          <View style={styles.titleBar}><Text style={{ fontWeight: 'bold' }}>ENDEREÇO ELETRÔNICO</Text></View>

          <View style={styles.datasBar}>
            <View style={styles.textLeft}>
              <Text>Email</Text>
            </View>
            <View style={styles.textRight}>
              <Text>{this.state.email}</Text>
            </View>
          </View>

          <View style={[styles.titleBar, { height: 200 }]}>

            <TouchableOpacity onPress={() => console.log("teste teste")}>
              <View style={styles.buttonView}>
                <Text style={{ fontWeight: 'bold' }}>SALVAR ALTERAÇÕES</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("teste teste")}>
              <View style={styles.buttonView}>
                <Text style={{ fontWeight: 'bold' }}>CANCELAR</Text>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    );
  }
}