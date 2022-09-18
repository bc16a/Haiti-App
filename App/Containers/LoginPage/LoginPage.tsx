import * as React from 'react'
import { Text, TextInput, View, Button, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native'
import { UsuarioService } from '../../services/Rest/UsuarioService'
//import { Usuario } from '../../models/Usuario'
import styles from './LoginPageStyles';
//import console = require('console');
//import { NavigationScreenProp } from 'react-navigation';

//import PasswordInputText from 'react-native-hide-show-password-input';
import { IconButton } from 'react-native-paper';
import { Images } from '../../Themes';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'
import { NavigationActions, StackActions } from 'react-navigation';
import { onSignIn, setEmail, setId, setName, setStateAdmin } from '../Auth/Auth';

interface Props {
  navigation: any
}
export default class LoginPage extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);

  }

  state = {
    showPassword: true,
    ShowHide: 'Show',
    login_user: {
      dados: {
        // usuario: {
        id: 1,
        name: "",
        email: "",
        email_verified_at: null,
        admin: true,
        created_at: "",
        updated_at: ""
      },
      token: "",
      // },
      mensagem: ""
    },
    usauario: {
      email: "admin@ecomp.co",
      password: "secret/"
    },
    // usauario: {
    //   email: "",
    //   password: ""
    // },
    email: '',
    password: '',
    CicleProgress: false
  }


  updateFormProjeto() {

    let usuario = this.state.usauario

    usuario.email = this.state.email.toLowerCase()
    usuario.password = this.state.password
    this.setState({ usauario: usuario });

    if (!this.state.CicleProgress) {
      this.setState({ CicleProgress: !this.state.CicleProgress });

      const projetoService = new UsuarioService()

      projetoService.fazerLogin(this.state.usauario).then(login_user => {

        this.redirect(login_user)

      }).catch(err => Alert.alert(err.toString()))
    }

  }



  redirect(login_user) {
    this.setState({ CicleProgress: !this.state.CicleProgress });
    console.log("testa aqui", this.state.CicleProgress)
    if (login_user.token) {
      Alert.alert('Logar com Sucesso')
      //this.props.navigation.navigate('ContaScreen', { usuario: login_user })
      //this.props.navigation.navigate('PosLogin', { usuario: login_user })

      setEmail(login_user.usuario.email).then(() =>
        setName(login_user.usuario.name).then(() =>
          setId(login_user.usuario.id.toString()).then(() =>
            setStateAdmin(login_user.usuario.admin.toString()).then())));

      onSignIn(login_user.token).then(() => this.props.navigation.navigate('PosLogin'));
      //
      //this.props.navigation.navigate('RegisterPageScreen') 
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: 'PosLogin',})],
      // });

      // this.props.navigation.dispatch(resetAction);

    } else {
      Alert.alert("usuario ou senha incorreta")
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
    const login_user = this.state.login_user
    return (
      <View style={styles.body}>

        <View style={styles.sectionContainer}>

          <View style={{ padding: 10, backgroundColor: 'white', borderColor: '#00feef', borderRadius: 10, borderWidth: 2, margin: 10 }}>
            <TextInput
              style={{ width: 250 }}
              placeholder="Seu email@com"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />

          </View>

          <View style={{ flexDirection: 'row', padding: 10, backgroundColor: 'white', borderColor: '#00feef', borderRadius: 10, borderWidth: 2, margin: 10 }}>
            <TextInput
              style={{ width: 220 }}
              placeholderTextColor="gray"
              placeholder="Password"
              secureTextEntry={this.state.showPassword}
              onChangeText={(password) => this.setState({ password })}

            />

            {/* <TouchableOpacity onPress={() => this.toggleSwitch()} style={{ alignSelf: 'center', justifyContent: 'flex-end' }}>
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
              title="Login"
              color="lightblue"
              onPress={() => this.updateFormProjeto()}
            />

          </View>
          {this.state.CicleProgress ? (<View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{ marginTop: -10 }}>
              <Progress.Circle size={50} indeterminate={this.state.CicleProgress} borderWidth={5} />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 0 }}>
              <Text style={{ color: 'lightblue' }} onPress={() => this.props.navigation.replace('RegisterPageScreen')} > Esquece a Senha ?</Text>
            </Text>
          </View>
          ) : (<
            View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}>
              <Text style={{ color: 'lightblue' }} onPress={() => this.props.navigation.replace('RegisterPageScreen')} > Esquece a Senha ? </Text>
            </Text>
          </View>)
          }

        </View>

        <View style={styles.circuloView}>

          <View style={{ backgroundColor: 'white', marginTop: 330, borderRadius: 10, height: 100, width: 300, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 5 }}>
              <Text >Ainda não é usuasio ?</Text>
              <Text style={{ color: 'lightblue', fontWeight: 'bold' }} onPress={() => this.props.navigation.replace('RegisterPageScreen')} > Cadastrar </Text>
            </Text>
          </View>

        </View>


      </View>
    )
  }

}

