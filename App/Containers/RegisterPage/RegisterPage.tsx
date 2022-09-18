import * as React from 'react'
import { Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native'
import { UsuarioService } from '../../services/Rest/UsuarioService'
//import { Usuario } from '../../models/Usuario'
import styles from './RegisterPageStyles';
//import console = require('console');

//import PasswordInputText from 'react-native-hide-show-password-input';
import { IconButton } from 'react-native-paper';
import { Images } from '../../Themes';


interface Props {
  navigation: any
}
export default class RegisterPage extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);

  }

  state = {
    showPassword: true,
    ShowHide: 'Show',

    login_user: {
      dados: {
        usuario: {
          id: 1,
          name: "",
          email: "",
          email_verified_at: null,
          admin: true,
          created_at: "",
          updated_at: ""
        },
        token: ""
      },
      mensagem: ""
    },

    usuario: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""

    },
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  }


  updateFormProjeto() {
    let usuario = this.state.usuario

    usuario.email = this.state.email
    usuario.password = this.state.password
    usuario.name = this.state.name
    usuario.password_confirmation = this.state.password_confirmation

    this.setState({ usuario: usuario });
    
    const projetoService = new UsuarioService()
    if (this.state.email != '' && this.state.password_confirmation != '' && this.state.password != '' && this.state.name != '') {
      projetoService.fazerCadastro(this.state.usuario).then(login_user => {

        console.log(login_user)

        ///this.setState({ login_user: login_user });

        this.redirect(login_user)

      }).catch(err => Alert.alert(err.toString()))
    } else Alert.alert("Preenche todos os Campos por favor")

  }

  redirect(login_user) {
    if (login_user.mensagem == "Usuário registrado com sucesso.") {
      Alert.alert('Cadastro cria com Sucesso')
      this.props.navigation.navigate('LoginPageScreen')
    } else {
      Alert.alert("Falha ao cadastrar usuario. " + login_user.error.password + login_user.error.email)
    }
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
    if (!this.state.showPassword)
      this.setState({ ShowHide: 'Show' })
    else
      this.setState({ ShowHide: 'Hide' })
  }

  render() {
    return (
      <View style={styles.body}>

        <View style={styles.sectionContainer}>
          <View style={{ padding: 2, backgroundColor: 'white', borderColor: '#00feef', borderRadius: 10, borderWidth: 2, margin: 10 }}>
            <TextInput
              style={{ width: 250 }}
              placeholder="Nome Completo"
              onChangeText={(name) => this.setState({ name })}
            // value={this.state.usuario.email}
            />
          </View>

          <View style={{ padding: 2, backgroundColor: 'white', borderColor: '#00feef', borderRadius: 10, borderWidth: 2, margin: 10 }}>
            <TextInput
              style={{ width: 250 }}
              placeholder="Seu email@com"
              onChangeText={(email) => this.setState({ email })}
            //value={this.state.usuario.email}
            />
          </View>

          <View style={{ flexDirection: 'row', padding: 2, backgroundColor: 'white', borderColor: '#00feef', borderRadius: 10, borderWidth: 2, margin: 10 }}>
            <TextInput
              style={{ width: 220 }}
              placeholderTextColor="gray"
              placeholder="Password"
              secureTextEntry={this.state.showPassword}
              onChangeText={(password) => this.setState({ password })} />

            {
              /* 
              <TouchableOpacity onPress={() => this.toggleSwitch()} style={{ alignSelf: 'center', justifyContent: 'flex-end' }} >
                <Text>{this.state.ShowHide}</Text>
              </TouchableOpacity> 
              */
            }
            {
              this.state.showPassword ? (
                <IconButton
                  icon={Images.show}
                  color={"grey"}
                  size={20}
                  onPress={() => this.toggleSwitch()}
                />
              ) : (
                <IconButton
                  icon={Images.hide}
                  color={"grey"}
                  size={20}
                  onPress={() => this.toggleSwitch()}
                />
              )
            }

          </View>

          <View style={{ flexDirection: 'row', padding: 2, backgroundColor: 'white', borderColor: '#00feef', borderRadius: 10, borderWidth: 2, margin: 10 }}>
            <TextInput
              style={{ width: 220 }}
              placeholderTextColor="gray"
              placeholder="Password Confirmation"
              secureTextEntry={this.state.showPassword}
              onChangeText={(password_confirmation) => this.setState({ password_confirmation })} />

            {/* <TouchableOpacity onPress={() => this.toggleSwitch()} style={{ alignSelf: 'center', justifyContent: 'flex-end' }} >
            <Text>{this.state.ShowHide}</Text>
          </TouchableOpacity> */}

            {
              this.state.showPassword ? (
                <IconButton
                  icon={Images.show}
                  color={"grey"}
                  size={20}
                  onPress={() => this.toggleSwitch()}
                />
              ) : (
                <IconButton
                  icon={Images.hide}
                  color={"grey"}
                  size={20}
                  onPress={() => this.toggleSwitch()}
                />
              )
            }

          </View>

          <View style={styles.fixToText}>
            <Button
              title="Cadastrar"
              color="lightblue"
              onPress={() => this.updateFormProjeto()}
            />

          </View></View>

        <View style={styles.circuloView}>

          <View style={{ backgroundColor: 'white', marginTop: 330, borderRadius: 10, height: 100, width: 300, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 5 }}>
              <Text >Já está cadastrada ?</Text>
              <Text style={{ color: 'lightblue', fontWeight: 'bold' }} onPress={() => this.props.navigation.navigate('LoginPageScreen')} > Login </Text>
            </Text>
          </View>

        </View>

      </View>
    )
  }

}

