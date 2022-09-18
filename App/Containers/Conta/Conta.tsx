//import * as React from 'react';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, Image, Dimensions, Button, Modal, ScrollView } from 'react-native';
import styles from './ContaStyles';
//import { Images } from '../../Themes';
import { number, any, object, string } from 'prop-types';
import { ContaService } from '../../services/Rest/ContaService'
//import console = require('console');
//import { Empresa } from '../../models/Empresa';

import RNPickerSelect from 'react-native-picker-select';
import { TextInput } from 'react-native-paper';
import { HistoricoService } from '../../services/Rest/HistoricoService';
import Images from '../../Themes/Images';
import { getEmail, getId, getName, getStateAdmin, getToken } from '../Auth/Auth';
import { RadioButton } from 'react-native-paper';
//import console = require('console');

interface Props {
	navigation: any
}

export default class Conta extends React.Component<Props>{

	[x: string]: any;

	constructor(props: Props) {
		super(props);
	}
	state = {
		usuario: any,
		dadoUsuario: {
			dado: {
				user_id: ''
			},
			token: ''
		},
		conta: {
			id: number,
			nome: '',
			saldo: 0,
			beneficio: 0,
			estado: true,
			tel: '',
			cpf: '',
			user_id: number,
		},
		recarregar: false,
		enviarRecarga: false,
		enviarMinuto: false,

		cpf: '',
		ativarContar: false,

		favNumber: 0,

		recarregargeral: true,

		telefone: '',
		modalVisible3: false,
		modalVisible4: false,
		modalVisible5: false,
		showModal: false,
		showModalPix: false,
		showBoleto: false,
		showComprovante: false,
		showModalSalesman: false,
		formaPagamento: [{
			label: 'Boleto',
			value: "Boleto",
			color: 'orange',
		},
		{
			label: 'Pix',
			value: "Pix",
			color: 'pink',
		},
		{
			label: 'Deposito',
			value: "Deposito",
			color: 'green',
		}],
		favOpera: '',
		historico: [{
			numero: "",
			entra: 0,
			sair: 0,
			data: Date(),
			pago: false
		}],
		history: false,
		reais: 0,
		dollars: 0,
		gourdes: 0,
		ValorEnGourdes: "",
		data: Date(),
		nome: "",

		showValues: false,
		value: [{
			reais: 0,
			htg: 0
		}],
		showBottunsValue: false,
		operatorName: '',

		name: "",
		admin: "",
		id: 0,
		email: "",
		token: "",
		checked: '',
		showSaldo:false


	}

	toggleSwitch() {
		this.setState({ showSaldo: !this.state.showSaldo });
		if (!this.state.showSaldo)
		  this.setState({ ShowHide: 'Show' })
		else
		  this.setState({ ShowHide: 'Hide' })
	  }

	setChecked(checked) {
		this.setState({ checked });
	}

	hideModal(visible) {
		this.setState({ showModal: visible });
		this.setState({ showModalSalesman: visible });
	}

	hideBoleto(visible) {
		this.setState({ showBoleto: visible });
	}

	history(visible) {
		this.setState({ history: visible });
	}

	showValues(visible) {
		this.setState({ showValues: visible });
	}

	showBottunsValues(visible) {
		this.setState({ showBottunsValue: visible });
	}


	setModalVisible(visible) {
		this.setState({ showModal: visible });
	}

	setModalPix(visible) {
		this.setState({ showModalPix: visible });
	}

	hidePix(visible) {
		this.setState({ showModalPix: visible });
	}

	setModalSalesmanVisible(visible) {
		this.setState({ showModalSalesman: visible });
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


							contaService.buscaMoney({
								dado: {
									id: 1
								},
								token: token
							}).then(dado => {
								if (dado.money) {
									this.setState({ reais: dado.money.reais });
									this.setState({ dollars: dado.money.dollars });
									this.setState({ gourdes: dado.money.gourdes });
								}

							}).catch(err => Alert.alert(err.toString()));

							contaService.buscaConta(usuar).then(conta => {
								console.log(conta.dados)
								if (conta.dados)
									this.setState({ conta: conta.dados });
							}).catch(err => Alert.alert(err.toString()));


						}).catch(err => Alert.alert("Erro"));
					}).catch(err => Alert.alert("Erro"));
				}).catch(err => Alert.alert("Erro"));
			}).catch(err => Alert.alert("Erro"));
		}).catch(err => Alert.alert("Erro"));


	}

	enviarRecarga(visible) {
		this.setState({ recarregargeral: false })
		this.setState({ enviarRecarga: visible })
		this.setState({ recarregar: false })
		this.setState({ enviarMinuto: false })
	}

	enviarMinuto(visible, valor) {
		this.setState({ recarregargeral: false })
		this.setState({ enviarMinuto: visible })
		this.setState({ enviarRecarga: false })
		this.setState({ recarregar: false })
		this.showValues(false)
		this.showBottunsValues(false)

		this.setState({ favNumber: (valor.reais + this.bonusCalcul(valor.reais)).toFixed(2) })
		this.setState({ ValorEnGourdes: valor.htg.toString() })

	}

	recarregar(visible) {
		this.setState({ recarregargeral: false })
		this.setState({ recarregar: visible })
		this.setState({ enviarRecarga: false })
		this.setState({ enviarMinuto: false })
	}

	cancelar() {
		this.setState({ haiti: false })
		this.setState({ dominica: false })
		this.setState({ enviarRecarga: false })
		this.setState({ enviarMinuto: false })
		this.setState({ recarregargeral: true })
		this.setState({ recarregar: false })
		this.setState({ ValorEnGourdes: "" })
	}

	confirmar() {
		this.setState({ recarregargeral: true })
		this.setState({ recarregar: false })
		this.recarecaConta()
	}

	calculDesconto(valor) {

		if (valor <= 130)
			valor = valor - 20
		else if (130 < valor && valor <= 600)
			valor = valor - 24
		else if (600 < valor && valor <= 1000)
			valor = valor - 35
		else if (1000 < valor && valor <= 1500)
			valor = valor - 60
		else if (1500 < valor && valor <= 2300)
			valor = valor - 90
		else if (2300 < valor)
			valor = valor - 120

		return valor
	}

	bonusCalcul(valor) {
		let val = (5 + (valor * 5) / 100) * 1.00
		return val
	}

	calularTaxa(valor) {
		//console.log(valor)
		this.setState({ favNumber: valor })

		let gourdes = this.calculDesconto(valor) * this.state.dollars * this.state.gourdes

		if (gourdes >= 20 && gourdes < 100)
			gourdes = gourdes - 2
		else if (gourdes >= 100 && gourdes < 300)
			gourdes = gourdes - 4
		else if (gourdes >= 300 && gourdes < 500)
			gourdes = gourdes - 7
		else if (gourdes >= 500 && gourdes < 1000)
			gourdes = gourdes - 10
		else if (gourdes >= 1000 && gourdes < 2000)
			gourdes = gourdes - 30
		else if (gourdes >= 2000 && gourdes < 4000)
			gourdes = gourdes - 40
		else if (gourdes >= 4000 && gourdes < 8000)
			gourdes = gourdes - 40
		else if (gourdes >= 8000 && gourdes < 12000)
			gourdes = gourdes - 70
		else if (gourdes >= 12000 && gourdes < 20000)
			gourdes = gourdes - 80
		else if (gourdes >= 20000 && gourdes < 40000)
			gourdes = gourdes - 90
		else if (gourdes >= 40000 && gourdes < 60000)
			gourdes = gourdes - 110
		else if (gourdes >= 60000 && gourdes < 75000)
			gourdes = gourdes - 125

		gourdes = parseFloat(gourdes.toFixed(2))

		this.state.ValorEnGourdes = gourdes.toString()
	}

	calularTaxaMinuto(valor) {

		this.setState({ favNumber: valor })

		let gourdes = valor * this.state.dollars * this.state.gourdes

		gourdes = parseFloat(gourdes.toFixed(2))

		this.state.ValorEnGourdes = gourdes.toString()
	}

	valores(conpania: string) {
		let natcom = [
			{
				reais: 11.54,
				htg: 233.64
			}, {
				reais: 17.32,
				htg: 350.46
			},
			{
				reais: 23.09,
				htg: 467.28
			}, {
				reais: 28.86,
				htg: 584.10
			}, {
				reais: 34.63,
				htg: 700.92
			}, {
				reais: 40.40,
				htg: 817.74
			}, {
				reais: 46.18,
				htg: 934.56
			}, {
				reais: 51.95,
				htg: 1051.38
			}]

		let digicel = [
			{
				reais: 5.43,
				htg: 124.04
			}, {
				reais: 10.97,
				htg: 248.09
			},
			{
				reais: 16.16,
				htg: 372.13
			}, {
				reais: 27.13,
				htg: 620.22
			}, {
				reais: 54.26,
				htg: 1240.44
			}]

		if (conpania == "digicel")
			return digicel
		else
			return natcom
	}

	showBottunValue = () => {
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showBottunsValue}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>

					<View style={{ alignItems: 'center', height: '100%', backgroundColor: '#FFFFF0' }}>

						<View style={{ backgroundColor: '#1E90FF', marginTop: 10, borderRadius: 10, height: 40, justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}> Escolhe operadores </Text>
						</View>

						<View style={{ alignItems: 'flex-end', width: '100%', marginTop: -40 }}>
							<TouchableOpacity onPress={() => { this.showBottunsValues(false); }}>
								<View style={{ height: 30, width: 30, backgroundColor: '#FF0000', marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
								</View>
							</TouchableOpacity>
						</View>
						{/* 						
						<ScrollView style={{ width: '100%' }} >{
							value.map((history, index) => (
								<View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
									<Text style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>{history.reais}</Text>
									<Text style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>{history.htg}</Text>
								</View>
							))}
						</ScrollView> */}

						<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 100 }}>

							<TouchableOpacity
								onPress={() => this.chooseOperator('digicel')}
								style={{ backgroundColor: 'red', borderRadius: 4, marginTop: 10, padding: 5 }} >
								<Text style={{ fontSize: 22, color: 'white' }} >Digicel</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => this.chooseOperator('natcom')}
								style={{ backgroundColor: 'blue', borderRadius: 4, marginTop: 10, padding: 5 }} >
								<Text style={{ fontSize: 22, color: 'white' }} > Natcom</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		)
	}

	showValue = () => {

		let value = this.valores(this.state.operatorName)
		return (
			<View style={{ backgroundColor: 'white' }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showValues}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>

					<View style={{ alignItems: 'center', height: '100%', backgroundColor: '#FFFFF0' }}>

						<View style={{ backgroundColor: '#1E90FF', marginTop: 10, borderRadius: 10, height: 40, justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}> Escolhe uma do valores ...</Text>
						</View>

						<View style={{ alignItems: 'flex-end', width: '100%', marginTop: -40 }}>
							<TouchableOpacity onPress={() => { this.showValues(false); }}>
								<View style={{ height: 30, width: 30, backgroundColor: '#FF0000', marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
								</View>
							</TouchableOpacity>
						</View>

						<ScrollView style={{ width: '100%', marginTop: 20 }} >{
							value.map((valor, index) => (

								<TouchableOpacity onPress={() => this.enviarMinuto(!this.state.enviarMinuto, valor)}>
									<View style={{ margin: '10%', borderColor: 'black', backgroundColor: 'grey', borderRadius: 10, height: 40, width: '80%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, justifyContent: 'center' }}>
										<Text style={{ fontWeight: 'bold', width: '40%', textAlign: 'center' }}>Reais : {(valor.reais + this.bonusCalcul(valor.reais)).toFixed(2)}</Text>
										<Text style={{ fontWeight: 'bold', width: '40%', textAlign: 'center' }}>HTG : {valor.htg}</Text>
									</View>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				</Modal>
			</View>
		)
	}

	chooseOperator(name) {
		this.setState({ operatorName: name })
		this.showValues(!this.state.showValues)
	}

	comprovante = () => {
		return (
			<View style={{ backgroundColor: 'white' }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showComprovante}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>

					<View style={{ alignItems: 'center', height: '100%', backgroundColor: '#FFFFF0' }}>

						<View style={{ backgroundColor: '#1E90FF', marginTop: 10, borderRadius: 10, height: 40, justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>  Comprovante de Pagamento  </Text>
						</View>

						<View style={{ alignItems: 'flex-end', width: '100%', marginTop: -40 }}>
							<TouchableOpacity onPress={() => { this.setState({ showComprovante: false }); }}>
								<View style={{ height: 30, width: 30, backgroundColor: '#FF0000', marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={{ width: '100%', alignItems: 'center' }}>
							<Text style={{ marginTop: 50, fontWeight: 'bold' }}>  Transfè de : $R {this.state.favNumber}</Text>
							<Text style={{ marginTop: 50, fontWeight: 'bold' }}>  Valè an Goud : $ht {this.state.ValorEnGourdes}</Text>
							<Text style={{ marginTop: 50, fontWeight: 'bold' }}> Nimero kap Resevwa  : {this.state.telefone}</Text>

							<Text style={{ marginTop: 50, fontWeight: 'bold' }}>  Dat {this.state.data}</Text>

							<Text style={{ fontWeight: 'bold' }}>Whatsapp : 41 99831-8677</Text>
							<Text style={{ fontWeight: 'bold' }}>E-mail: enfo.celissaintb@gmail.com </Text>
							<Text style={{ fontWeight: 'bold' }}>Mèsi dèske ou Chwazi MonkashBrezil</Text>
						</View>

					</View>
				</Modal>
			</View>
		)
	}

	recarecaConta() {
		//const usar = this.props.navigation.getParam('usuario')
		const historicoService = new HistoricoService()
		let forma = ""
		if (this.state.checked == "Boleto") {
			forma = "B"
		} else if (this.state.checked == "Pix") {
			forma = "P"
		} else {
			forma = "D"
		}
		let history = {
			dado: {
				conta_id: this.state.conta.id,
				valor: this.state.conta.saldo,
				entra: this.state.favNumber,
				sair: 0,
				gourdes: 0,
				numero: this.state.conta.tel + forma,
				data: new Date()
			},
			token: this.state.token
		}

		if (this.state.favNumber > 0) {
			historicoService.criarHistorico(history).then(historico => {
				//console.log("criou conta", historico)
				if (historico) {
					this.payment()
				} else {
					Alert.alert("Falha")
				}
			}).catch(err => Alert.alert(err.toString()));
		} else Alert.alert("Por favor seleciona um valor")
	}

	selectRNU = () => {
		return (
			<View style={{ backgroundColor: 'white' }}>
				<RNPickerSelect
					placeholder={{
						label: 'Forma de pagamento.',
						value: null,
						color: 'red',
					}}
					items={this.state.formaPagamento}
					onValueChange={value => {
						this.setState({
							favOpera: value,
						});
					}}
					style={{
						iconContainer: {
							top: 20,
							right: 10,
						},
						placeholder: {
							color: '#4169E1',
							fontSize: 12,
							fontWeight: 'bold',
						},
					}}
					value={this.state.favOpera}
				// Icon={() => {
				// 	return (
				// 		<View
				// 		// style={
				// 		// 	styles.IConeView
				// 		// }
				// 		/>
				// 	);
				// }}
				/>
			</View>
		)
	}

	payment() {
		//if (this.state.conta.nome == "Usuário")

		this.clientPayment()
		//;else if (this.state.conta.nome == "Vendedor")
		//this.salmanPayment()
	}

	confirmarE() {
		this.setState({ haiti: false })
		this.setState({ dominica: false })
		this.setState({ pais: '' })

		this.setState({ enviarRecarga: false })
		this.setState({ recarregargeral: true })
		this.setState({ recarregar: false })
		//this.setState({ telefone: this.state.telefone + " MO"})

		if (this.state.favNumber * 1.0 <= this.state.conta.saldo * 1.0)
			this.enviar(" MO");
		else
			Alert.alert('Ou pa gen ase lajan, rechaje kont ou silvouplè.')
	}

	confirmarEMinuto() {
		if (this.state.favNumber && this.state.telefone != "") {
			this.setState({ haiti: false })
			this.setState({ dominica: false })
			this.setState({ pais: '' })

			this.setState({ enviarMinuto: false })
			this.setState({ recarregargeral: true })
			this.setState({ recarregar: false })
			//this.setState({ telefone: this.state.telefone + " MI" })

			if (this.state.favNumber * 1.0 <= this.state.conta.saldo * 1.0)
				this.enviar(" MI");
			else
				Alert.alert('Ou pa gen ase lajan, rechaje kont ou silvouplè.')

		} else Alert.alert("Silvouplè ranpli espas vid yo")


	}

	enviar(typo: string) {
		//const usar = this.props.navigation.getParam('usuario')
		const historicoService = new HistoricoService()
		let dada = new Date()
		this.setState({ data: dada.getDate() + "/" + (dada.getMonth() + 1) + "/" + dada.getFullYear() })

		let history = {
			dado: {
				conta_id: this.state.conta.id,
				valor: this.state.conta.saldo,
				entra: 0,
				sair: this.state.favNumber,
				gourdes: this.state.ValorEnGourdes,
				numero: this.state.telefone + typo,
				data: new Date()
			},
			token: this.state.token
		}
		//console.log(this.state.favNumber, this.state.telefone)
		if (this.state.favNumber && this.state.telefone != "") {

			historicoService.criarHistorico(history).then(historico => {
				//console.log("criou conta", historico)
				if (historico) {
					let conta = this.state.conta
					conta.saldo = this.state.conta.saldo - this.state.favNumber
					conta.saldo = parseFloat(conta.saldo.toFixed(2))
					this.setState({ conta })
					// Alert.alert('Recarga enviar com Sucesso')
					this.setState({ showComprovante: true })
				} else {
					Alert.alert("Falha")
				}
			}).catch(err => Alert.alert(err.toString()));

		} else Alert.alert("Silvouplè ranpli espas vid yo")
	}

	verHistory() {
		//const usar = this.props.navigation.getParam('usuario')
		const historicoService = new HistoricoService()
		let history = {
			dado: {
				conta_id: this.state.conta.id,
			},
			token: this.state.token
		}

		historicoService.buscaHistorico(history).then(historico => {
			if (historico) {
				this.setState({ historico: historico })
				//console.log("criou conta", this.state.historico)
				this.history(!this.state.history)
				//Alert.alert('Recarga enviar com Sucesso')
			} else {
				Alert.alert("Não tem Historico")
			}
		}).catch(err => Alert.alert(err.toString()));
	}

	ativarContar(visible) {
		this.setState({ ativarContar: visible })
	}

	confirmarCtiva() {
		if (this.state.favNumber > 0 && this.state.telefone != "") {

			//const usar = this.props.navigation.getParam('usuario')
			const contaService = new ContaService()
			let forma = ''

			if (this.state.favOpera == "Boleto") {
				forma = "B"
			} if (this.state.favOpera == "Pix") {
				forma = "P"
			} else {
				forma = "D"
			}

			let conta = {
				dado: {
					user_id: this.state.id,
					nome: "Itilizatè",
					saldo: this.state.favNumber,
					estado: true,
					tel: this.state.telefone + forma,
				},
				token: this.state.token
			}

			contaService.criarConta(conta).then(acount => {
				//console.log("criou conta", acount)
				if (acount) {

					//this.props.navigation.navigate('ContaScreen', { usuario: usar })  

					this.clientPayment()
					//this.salmanPayment()
					//Alert.alert('Forma de pagament : ',acount.nome)
					//this.props.navigation.navigate('LoginPageScreen')

					let conta = this.state.conta
					conta.saldo = this.state.favNumber

					this.setState({ conta });
				} else {
					Alert.alert("Falha")
				}
			}).catch(err => Alert.alert(err.toString()));


		} else {
			Alert.alert('Tanpri rampli tout espas vid yo');
		}
		this.setState({ ativarContar: false })
	}

	modalBoleto = () => {
		return (
			<View style={{ backgroundColor: 'white' }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showBoleto}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>

					<View style={{ alignItems: 'center', height: '100%', backgroundColor: '#FFFFF0' }}>

						<View style={{ backgroundColor: '#1E90FF', marginTop: 10, borderRadius: 10, height: 40, justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>  Forma de Pagamento  </Text>
						</View>

						<View style={{ alignItems: 'flex-end', width: '100%', marginTop: -40 }}>
							<TouchableOpacity onPress={() => { this.hideBoleto(false); }}>
								<View style={{ height: 30, width: 30, backgroundColor: '#FF0000', marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={{ width: '100%', alignItems: 'center' }}>
							<Text style={{ marginTop: 50, fontWeight: 'bold' }}>  Ou fè yon rechaj : $R {this.state.favNumber}</Text>


							<Text style={{ marginTop: 10, fontWeight: 'bold' }}>Wap resevwa Boleto a sou Email ou ak Whatsapp ou.</Text>
							<Text style={{ fontWeight: 'bold' }}>Whatsapp : 41 99831-8677</Text>
							<Text style={{ fontWeight: 'bold' }}>E-mail: enfo.monkach@gmail.com </Text>
							<Text style={{ fontWeight: 'bold' }}>Mèsi dèske ou Chwazi MonkashAyiti</Text>
						</View>

					</View>
				</Modal>
			</View>
		)
	}

	modalPix = () => {
		return (
			<View style={{ backgroundColor: 'white' }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showModalPix}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>

					<View style={{ alignItems: 'center', height: '100%', backgroundColor: '#FFFFF0' }}>

						<View style={{ backgroundColor: '#1E90FF', marginTop: 10, borderRadius: 10, height: 40, justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>  Forma de Pagamento  </Text>
						</View>

						<View style={{ alignItems: 'flex-end', width: '100%', marginTop: -40 }}>
							<TouchableOpacity onPress={() => { this.hidePix(false); }}>
								<View style={{ height: 30, width: 30, backgroundColor: '#FF0000', marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={{ width: '100%', alignItems: 'center' }}>
							<Text style={{ marginTop: 50, fontWeight: 'bold' }}>  Ou fè yon rechaj : $R {this.state.favNumber}</Text>

							<Text style={{ marginTop: 10, fontWeight: 'bold' }}>Pix : CNPJ 45.255.245/1000-24.</Text>
							<Text style={{ fontWeight: 'bold' }}>Whatsapp : 41 99831-8677</Text>
							<Text style={{ fontWeight: 'bold' }}>E-mail: enfo.monkach@gmail.com </Text>
							<Text style={{ fontWeight: 'bold' }}>Mèsi dèske ou Chwazi MonkashAyiti</Text>
						</View>

					</View>
				</Modal>
			</View>
		)
	}

	modalPayment = () => {
		return (
			<View style={{ backgroundColor: 'white' }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showModal}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>

					<View style={{ alignItems: 'center', height: '100%', backgroundColor: '#FFFFF0' }}>

						<View style={{ backgroundColor: '#1E90FF', marginTop: 10, borderRadius: 10, height: 40, justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>  Forma de Pagamento  </Text>
						</View>

						<View style={{ alignItems: 'flex-end', width: '100%', marginTop: -40 }}>
							<TouchableOpacity onPress={() => { this.hideModal(false); }}>
								<View style={{ height: 30, width: 30, backgroundColor: '#FF0000', marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={{ width: '95%', borderWidth: 2, marginTop: 15, backgroundColor: '#FF8C00' }}>
							<Text style={{ marginTop: 10, fontWeight: 'bold' }}>  Titular da Conta : Bibinson Celissaint</Text>
							<Text style={{ fontWeight: 'bold' }}>  Banco : Itaú </Text>
							<Text style={{ fontWeight: 'bold' }}>  Agência : 3833 </Text>
							<Text style={{ marginBottom: 10, fontWeight: 'bold' }}>  Conta Corrente : 65709 - 5   Valor: $R {this.state.favNumber}</Text>
						</View>

						<View style={{ width: '95%', borderWidth: 2, marginTop: 15, backgroundColor: '#FFFF00' }}>
							<Text style={{ marginTop: 10, fontWeight: 'bold' }}>  Titular da Conta : Bibinson Celissaint</Text>
							<Text style={{ fontWeight: 'bold' }}>  Banco : Banco do Brasil </Text>
							<Text style={{ fontWeight: 'bold' }}>  Agência : 3262-0 </Text>
							<Text style={{ marginBottom: 10, fontWeight: 'bold' }}>  Conta Corrente : 33736 - 6   Valor: $R {this.state.favNumber}</Text>
						</View>

						<View style={{ width: '95%', borderWidth: 2, marginTop: 15, backgroundColor: '#4169E1' }}>
							<Text style={{ marginTop: 10, fontWeight: 'bold' }}>  Titular da Conta : Bibinson Celissaint</Text>
							<Text style={{ fontWeight: 'bold' }}>  Banco : Caixa </Text>
							<Text style={{ fontWeight: 'bold' }}>  Agência : 0368 </Text>
							<Text style={{ marginBottom: 10, fontWeight: 'bold' }}>  Conta Poupança : 013 00131198-4   Valor: $R {this.state.favNumber}</Text>
						</View>

						<View style={{ width: '95%', borderWidth: 2, marginTop: 15, backgroundColor: '#FF6347' }}>
							<Text style={{ marginTop: 10, fontWeight: 'bold' }}>  Titular da Conta : Bibinson Celissaint</Text>
							<Text style={{ fontWeight: 'bold' }}>  Banco : Bradesco </Text>
							<Text style={{ fontWeight: 'bold' }}>  Agência : 2996 </Text>
							<Text style={{ marginBottom: 10, fontWeight: 'bold' }}>  Conta Corrente : 10411 - 6   Valor: $R {this.state.favNumber}</Text>
						</View>

						<View style={{ width: '100%', alignItems: 'center' }}>
							<Text style={{ marginTop: 10, fontWeight: 'bold' }}>Pou ou konfime pèyman voye resi a sou Whatsapp ou Email sa yo..</Text>
							<Text style={{ fontWeight: 'bold' }}>pelo Whatsapp : 41 99831-8677</Text>
							<Text style={{ fontWeight: 'bold' }}>por e-mail: enfo.monkach@gmail.com </Text>
							<Text style={{ fontWeight: 'bold' }}>pode ser deposito bancária ou transferência </Text>
						</View>

					</View>
				</Modal>
			</View>
		)
	}

	clientPayment() {
		if (this.state.checked == "Deposito")
			this.setModalVisible(true)
		else if (this.state.checked == "Pix")
			this.setModalPix(true)
		else
			this.hideBoleto(true)
	}

	salmanPayment() {
		this.setModalSalesmanVisible(true)
	}

	allhistory = () => {
		return (
			<View style={{ backgroundColor: 'white' }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.history}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>

					<View style={{ alignItems: 'center', height: '100%', backgroundColor: '#FFFFF0' }}>

						<View style={{ backgroundColor: '#1E90FF', marginTop: 10, borderRadius: 10, height: 40, justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>  Istorik trazaksyon ou yo  </Text>
						</View>

						<View style={{ alignItems: 'flex-end', width: '100%', marginTop: -40 }}>
							<TouchableOpacity onPress={() => { this.history(false); }}>
								<View style={{ height: 30, width: 30, backgroundColor: '#FF0000', marginRight: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
							<Text style={{ fontWeight: 'bold', width: '15%', marginLeft: "5%", textAlign: 'center' }}>Tel</Text>
							<Text style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>Antre</Text>
							<Text style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>Sòti</Text>
							<Text style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Dat</Text>
							<Text style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>Estati</Text>
						</View>

						<ScrollView style={{ width: '100%' }} >{
							this.state.historico.map((history, index) => (

								<View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>

									<Text style={{ fontWeight: 'bold', width: '15%', marginLeft: "5%", textAlign: 'center' }}>{history.numero}</Text>
									<Text style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>{history.entra}</Text>
									<Text style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>{history.sair}</Text>
									<Text style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>{history.data}</Text>
									{
										history.pago ? (
											<Text>
												<Text style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>Reyalize</Text>
											</Text>
										) : (
											<Text>
												<Text style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>sispandi</Text>
											</Text>
										)
									}
								</View>
							))
						}</ScrollView>
					</View>
				</Modal>
			</View>
		)
	}

	render() {
		//console.log('conta: ', this.state.conta);
		const conta = this.state.conta;
		return (
			<ScrollView style={{ width: '100%', alignContent: 'center', backgroundColor: '#FFFFFF', height: '100%' }}>

				{conta.estado ? (
					<View>
						<View style={styles.headerView}>

							<View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
								<TouchableOpacity
									onPress={() => this.props.navigation.goBack()}
									style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight]}>
									<Image source={Images.maleUser} style={{ width: 40, height: 40, }} />
								</TouchableOpacity>
								{
								this.state.showSaldo ? (
									<TouchableOpacity
									onPress={() => this.toggleSwitch() }
									style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight]}>
									<Image source={Images.show} style={{ width: 20, height: 20, }} />
								</TouchableOpacity>
								) : (<TouchableOpacity
									onPress={() => this.toggleSwitch() }
									style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight]}>
									<Image source={Images.hide} style={{ width: 20, height: 20, }} />
								</TouchableOpacity>)
							}
							

								<TouchableOpacity
									onPress={() => this.props.navigation.goBack()}
									style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight]}>
									<Image source={Images.notification} style={{ width: 20, height: 20, }} />
								</TouchableOpacity>
							</View>

							<View style={{ alignItems: 'center', flexDirection: 'row' }}>
								<Text style={styles.titleValue}>Olá, {this.state.nome} </Text>
							</View>



							{/* <Text > 1 reais = {this.state.dollars} dollars</Text>
							<Text > 1 dollars = {this.state.gourdes} gourdes </Text> */}

							{/* <Text>  Itilizatè MonCash</Text> */}


							{/* <Text style={styles.textValue}> Benefis : {this.state.conta.beneficio} R$</Text> */}

							{/* <Text style={styles.textValue}>Bonis : {conta.saldo} R$</Text> */}

							{this.modalPayment()}
							{this.modalBoleto()}
							{this.modalPix()}
							{this.allhistory()}
							{this.comprovante()}
							{this.showValue()}
							{this.showBottunValue()}
							{/* {this.modalPaymentSalesman()} */}
						</View>
						<Text style={styles.textValue}>Saldo em Reias </Text>
						
						{
								this.state.showSaldo ? (
									<Text style={styles.textValue}>R$ ***** </Text>
								) : (<Text style={styles.textValue}>R$ {this.state.conta.saldo} </Text>)
							}
						<View style={styles.bodyView}>

							{/* {
								this.state.recarregargeral ? (
									<View>

										<TouchableOpacity
											onPress={() => this.enviarMinuto(!this.state.enviarMinuto)}
											style={{ backgroundColor: '#3CB371', borderRadius: 4, borderColor: 'white', borderWidth: 2 }} >
											<Text style={{ fontSize: 22, color: 'white', textAlign: 'center' }} > Voye minit  </Text>
										</TouchableOpacity>

										<TouchableOpacity
											onPress={() => this.enviarRecarga(!this.state.enviarRecarga)}
											style={{ backgroundColor: '#3CB371', borderRadius: 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }} >
											<Text style={{ fontSize: 22, color: 'white', textAlign: 'center' }} > Voye MonCash  </Text>
										</TouchableOpacity>

										<TouchableOpacity
											onPress={() => this.recarregar(!this.state.recarregar)}
											style={{ backgroundColor: '#2E8B57', borderRadius: 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }} >
											<Text style={{ fontSize: 22, color: 'white' }} > Rechaje kont </Text>
										</TouchableOpacity>

										<TouchableOpacity
											onPress={() => this.verHistory()}
											style={{ backgroundColor: '#2E8B57', borderRadius: 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }} >
											<Text style={{ fontSize: 22, color: 'white', textAlign: 'center' }} > Istorik </Text>
										</TouchableOpacity>
									</View>
								) : null
							} */}


							{
								this.state.recarregargeral ? (
									<View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>

										<View style={{ alignItems: 'center', borderRadius: 4, marginTop: 10, width: 80, height: 40, }}>
											<TouchableOpacity
												onPress={() => this.showBottunsValues(!this.state.showBottunsValue)}
												style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight, styles.ColorBackGround]}>
												<Image source={Images.prepaidRecharge} style={{ width: 40, height: 40 }} />
											</TouchableOpacity>
											<Text style={{ fontSize: 12, color: 'black', textAlign: 'center' }} > Recarga Internacional </Text>
										</View>

										{/* <View style={{ alignItems: 'center', borderRadius: 4, marginTop: 10, width: 80, height: 40, }}>
											<TouchableOpacity
												onPress={() => this.enviarMinuto(!this.state.enviarMinuto)}
												style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight, styles.ColorBackGround]}>
												<Image source={Images.prepaidRecharge} style={{ width: 40, height: 40 }} />
											</TouchableOpacity>
											<Text style={{ fontSize: 12, color: 'black', textAlign: 'center' }} > Recarga Internacional </Text>
										</View> */}

										<View style={{ alignItems: 'center', borderRadius: 4, marginTop: 10, width: 80, height: 40, }}>
											<TouchableOpacity
												onPress={() => this.enviarRecarga(!this.state.enviarRecarga)}
												style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight, styles.ColorBackGround]}>
												<Image source={Images.moneyTransfer} style={{ width: 40, height: 40 }} />
											</TouchableOpacity>

											<Text style={{ fontSize: 12, color: 'black', textAlign: 'center' }} > Transferência MonCach </Text>
										</View>

										<View style={{ alignItems: 'center', borderRadius: 4, marginTop: 10, width: 80, height: 40, }}>
											<TouchableOpacity
												onPress={() => this.recarregar(!this.state.recarregar)}
												style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight, styles.ColorBackGround]}>
												<Image source={Images.moneyDeposit} style={{ width: 40, height: 40 }} />
											</TouchableOpacity>
											<Text style={{ fontSize: 12, color: 'black', textAlign: 'center' }} > Deposito </Text>
										</View>

										<View style={{ alignItems: 'center', borderRadius: 4, marginTop: 10, width: 80, height: 40, }}>
											<TouchableOpacity
												onPress={() => this.verHistory()}
												style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight, styles.ColorBackGround]}>
												<Image source={Images.TransactionList} style={{ width: 40, height: 40 }} />
											</TouchableOpacity>

											<Text style={{ fontSize: 12, color: 'black', textAlign: 'center' }} > Extrato </Text>
										</View>
									</View>
								) : null
							}
							{
								this.state.recarregargeral ? (
									<View style={{ alignSelf: 'flex-start', backgroundColor: '#a5a3a2', marginTop: 60, height: 50, width: 150, justifyContent: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
										<Text style={{ fontSize: 14, color: 'black', textAlign: 'left', fontWeight: 'bold' }} > Serviço adicional </Text>
									</View>
								) : null
							}

							{
								this.state.recarregargeral ? (


									<ScrollView style={{ height: 250, marginTop: 1, flexDirection: 'row', width: '100%' }} horizontal={true}>


										<View style={{ alignItems: 'center', marginLeft: 25, borderRadius: 4, marginTop: 10, width: 250, height: 250, flexDirection: 'column' }}>
											<View>
												<TouchableOpacity
													onPress={() => this.showBottunsValues(!this.state.showBottunsValue)}>

													<Image source={Images.cam} style={{ width: 250, height: 150, resizeMode: 'stretch', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
												</TouchableOpacity>
											</View>
											<View>
												<Text style={{ fontSize: 14, margin: 10, color: 'black', textAlign: 'center' }} > Serviço de transferir dinheiro para Internacional </Text>
											</View>
										</View>

										<View style={{ alignItems: 'center', marginLeft: 25, borderRadius: 4, marginTop: 10, width: 250, height: 250, flexDirection: 'column' }}>
											<View>
												<TouchableOpacity
													onPress={() => this.showBottunsValues(!this.state.showBottunsValue)}>

													<Image source={Images.caribe} style={{ width: 250, height: 150, resizeMode: 'stretch', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
												</TouchableOpacity>
											</View>
											<View>
												<Text style={{ fontSize: 14, margin: 10, color: 'black', textAlign: 'center' }} > Serviço de transferir dinheiro para Internacional </Text>
											</View>
										</View>


										<View style={{ alignItems: 'center', marginLeft: 25, borderRadius: 4, marginTop: 10, width: 250, height: 250, flexDirection: 'column' }}>
											<View>
												<TouchableOpacity
													onPress={() => this.showBottunsValues(!this.state.showBottunsValue)}>

													<Image source={Images.uni} style={{ width: 250, height: 150, resizeMode: 'stretch', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
												</TouchableOpacity>
											</View>
											<View>
												<Text style={{ fontSize: 14, margin: 10, color: 'black', textAlign: 'center' }} > Serviço de transferir dinheiro para Internacional </Text>
											</View>
										</View>

									</ScrollView>

								) : null
							}

							{this.state.enviarRecarga ? (

								<View style={{  borderRadius: 4, marginTop: 10, width: '100%' }}>
									<View style={[styles.titleBar, { alignItems: 'center' }]}>
										<Text style={{ fontSize: 22, color: 'white', textAlign: 'center' }} > Transferência MonCach  </Text>
									</View>

									<TextInput
										label='Nimewo Telefòn'
										value={this.state.telefone}
										onChangeText={telefone => this.setState({ telefone })}
										keyboardType={'numeric'}
									/>

									<TextInput
										label='Montan'
										//value={this.state.favNumber}
										onChangeText={favNumber => this.calularTaxa(favNumber)}
										keyboardType={'numeric'}
									/>

									<TextInput
										label='Montan en Goud'
										value={this.state.ValorEnGourdes}
										keyboardType={'numeric'}
										editable={false}
									/>

									{/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

										<TouchableOpacity
											onPress={() => this.cancelar()}
											style={{ backgroundColor: 'red', borderRadius: 4, marginTop: 10, padding: 5 }} >
											<Text style={{ fontSize: 22, color: 'white' }} >Cancelar</Text>
										</TouchableOpacity>

										<TouchableOpacity
											onPress={() => this.confirmarE()}
											style={{ backgroundColor: 'green', borderRadius: 4, marginTop: 10, padding: 5 }} >
											<Text style={{ fontSize: 22, color: 'white' }} > Confirmar</Text>
										</TouchableOpacity>

									</View> */}
									<View style={[styles.titleBar, { height: 200 }]}>

										<TouchableOpacity onPress={() => this.confirmarE()}>
											<View style={styles.buttonView}>
												<Text style={{ fontWeight: 'bold' }}>FINALIZAR</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity onPress={() => this.cancelar()}>
											<View style={styles.buttonView}>
												<Text style={{ fontWeight: 'bold' }}>CANCELAR</Text>
											</View>
										</TouchableOpacity>

									</View>
								</View>


							) : null}

							{this.state.enviarMinuto ? (

								<View style={{ borderRadius: 4, marginTop: 10, width: '100%' }}>
									<View style={[styles.titleBar, { alignItems: 'center' }]}>
										<Text style={{ fontSize: 22, color: 'white', textAlign: 'center' }} > Recarga Internacional </Text>
									</View>

									<TextInput
										label='Nimewo Telefòn'
										value={this.state.telefone}
										onChangeText={telefone => this.setState({ telefone })}
										keyboardType={'numeric'}
									/>

									<TextInput
										label='Montan'
										value={this.state.favNumber.toString()}
										onChangeText={favNumber => this.calularTaxaMinuto(favNumber)}
										keyboardType={'numeric'}
										editable={false}
									/>

									<TextInput
										label='Montan en Goud'
										value={this.state.ValorEnGourdes}
										keyboardType={'numeric'}
										editable={false}
									/>

									{/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

										<TouchableOpacity
											onPress={() => this.cancelar()}
											style={{ backgroundColor: 'red', borderRadius: 4, marginTop: 10, padding: 5 }} >
											<Text style={{ fontSize: 22, color: 'white' }} >Cancelar</Text>
										</TouchableOpacity>

										<TouchableOpacity
											onPress={() => this.confirmarEMinuto()}
											style={{ backgroundColor: 'green', borderRadius: 4, marginTop: 10, padding: 5 }} >
											<Text style={{ fontSize: 22, color: 'white' }} >Confimar</Text>
										</TouchableOpacity>

									</View> */}
									<View style={[styles.titleBar, { height: 200 }]}>

										<TouchableOpacity onPress={() => this.confirmarEMinuto()}>
											<View style={styles.buttonView}>
												<Text style={{ fontWeight: 'bold' }}>FINALIZAR</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity onPress={() => this.cancelar()}>
											<View style={styles.buttonView}>
												<Text style={{ fontWeight: 'bold' }}>CANCELAR</Text>
											</View>
										</TouchableOpacity>

									</View>
								</View>


							) : null}

							{this.state.recarregar ? (
								<View style={{ backgroundColor: '#91c8ff', borderRadius: 4, marginTop: 10, width: '100%' }}>
									<View style={[styles.titleBar, { alignItems: 'center' }]}>
										<Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }} >Digite o valor</Text>
									</View>

									<TextInput
										label='Valor em Reais'
										//value={this.state.favNumber}
										onChangeText={favNumber => this.setState({ favNumber })}
										keyboardType={'numeric'}
									/>
									{/* {this.selectRNU()} */}


									<View style={{ backgroundColor: '#fff8dc' }}>
										<View style={{ flexDirection: "row", alignItems: 'center', marginLeft: 15, width: 100, justifyContent: 'space-between' }}>
											<Text>Boleto</Text>
											<RadioButton
												value="Boleto"
												status={this.state.checked === 'Boleto' ? 'checked' : 'unchecked'}
												onPress={() => this.setChecked('Boleto')}
											/>
										</View>
										<View style={{ flexDirection: "row", alignItems: 'center', marginLeft: 15, width: 100, justifyContent: 'space-between' }}>
											<Text>Pix</Text>
											<RadioButton
												value="Pix"
												status={this.state.checked === 'Pix' ? 'checked' : 'unchecked'}
												onPress={() => this.setChecked('Pix')}
											/>
										</View>
										<View style={{ flexDirection: "row", alignItems: 'center', marginLeft: 15, width: 100, justifyContent: 'space-between' }}>
											<Text>Deposito</Text>
											<RadioButton
												value="Deposito"
												status={this.state.checked === 'Deposito' ? 'checked' : 'unchecked'}
												onPress={() => this.setChecked('Deposito')}
											/>
										</View>
									</View>
									{/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

										<TouchableOpacity
											onPress={() => this.cancelar()}
											style={{ backgroundColor: 'red', borderRadius: 4, marginTop: 10, padding: 5 }} >
											<Text style={{ fontSize: 22, color: 'white' }} > Cancelar</Text>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => this.confirmar()}
											style={{ backgroundColor: 'green', borderRadius: 4, marginTop: 10, padding: 5 }} >
											<Text style={{ fontSize: 22, color: 'white' }} > Confirmar</Text>
										</TouchableOpacity>
									</View> */}

									<View style={[styles.titleBar, { height: 200 }]}>

										<TouchableOpacity onPress={() => this.confirmar()}>
											<View style={styles.buttonView}>
												<Text style={{ fontWeight: 'bold' }}>FINALIZAR</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity onPress={() => this.cancelar()}>
											<View style={styles.buttonView}>
												<Text style={{ fontWeight: 'bold' }}>CANCELAR</Text>
											</View>
										</TouchableOpacity>

									</View>
								</View>
							) : null}

						</View>
					</View>
				) : (<ScrollView>

					<View style={{ alignItems: 'center', justifyContent: 'center', padding: '4%' }}>

						<View style={styles.headerView}>
							{this.modalPayment()}
							{this.modalBoleto()}
							{/* {this.modalPaymentSalesman()} */}
							<Text style={styles.textValue}> Byenveni nan Monkach </Text>
							<Text style={styles.textValue}>Balans : 00,00 R$</Text>
						</View>

						<Text style={styles.textValue}>Kont dezaktive </Text>

						<View style={{ backgroundColor: '#4ebdad', width: 250, marginBottom: 20, marginTop: 20, borderRadius: 10 }}>
							<Text style={{ textAlign: 'center' }}>Pou ou aktive kont ou, fòk ou fè yon rechaj.</Text>
						</View>
						{
							this.state.ativarContar ? (
								<View style={{ backgroundColor: '#91c8ff', borderRadius: 4, marginTop: 10, width: '80%' }}>

									<View style={{ backgroundColor: '#0205E1', borderRadius: 4, marginTop: 10 }}>
										{/* <TouchableOpacity
											onPress={() => this.escolherPais("ht")}
											style={{ backgroundColor: '#0205E1', borderRadius: 4, marginTop: 10 }} >
											<Text style={{ fontSize: 22, color: 'white' }} > Ativa sua Conta </Text>
										</TouchableOpacity> */}
										<Text style={{ fontSize: 22, color: 'white' }} > Ative  </Text>
									</View>

									<TextInput
										label='Numero do telefone'
										value={this.state.telefone}
										onChangeText={telefone => this.setState({ telefone })}
										keyboardType={'numeric'}
									/>

									<TextInput
										label='Montan'
										//value={this.state.favNumber}
										onChangeText={favNumber => this.setState({ favNumber })}
										keyboardType={'numeric'}
									/>

									{this.selectRNU()}

									<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

										<TouchableOpacity
											onPress={() => this.ativarContar(!this.state.ativarContar)}
											style={{ backgroundColor: 'red', borderRadius: 4, marginTop: 10, padding: 5 }} >
											<Text style={{ fontSize: 22, color: 'white' }} > Anile</Text>
										</TouchableOpacity>

										<TouchableOpacity
											onPress={() => this.confirmarCtiva()}
											style={{ backgroundColor: 'green', borderRadius: 4, marginTop: 10, padding: 5 }} >
											<Text style={{ fontSize: 22, color: 'white' }} > Kofime</Text>
										</TouchableOpacity>
									</View>

								</View>
							) : (
								<View>
									{
										this.state.conta.saldo > 0 && (
											<View><Text style={{ fontWeight: 'bold', color: 'green' }}>Ativação pendente ... </Text>
											</View>
										)
									}
									{
										this.state.conta.saldo <= 0 && (
											<View>
												<TouchableOpacity onPress={() => this.ativarContar(!this.state.ativarContar)}>
													<Text style={{ marginBottom: '20%' }} >
														<Text style={{ fontWeight: 'bold', color: 'green' }}>Ative kont ou</Text>
													</Text>
												</TouchableOpacity>
											</View>
										)
									}
								</View>
							)
						}
					</View>
				</ScrollView>
				)}
			</ScrollView>
		);
	}
}

// https://blog.logrocket.com/implementing-in-app-purchases-in-react-native/

