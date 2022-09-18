import { Usuario } from '../../models/Usuario'
import { BaseService } from './BaseService'
//import console = require('console');

export class UsuarioService extends BaseService {

  // resource () {
  //   return 'projeto'
  // }

  // buscarTodos () {
  //   return this.findAll().then(res => res.json()).then(data => {
  //     if (data) {
  //       return data.map(projeto => Projeto.newFromAPI(projeto))
  //     }
  //     return []
  //   })
  // }

  // buscarPorId (id) {
  //   return this.find(id).then(res => res.json()).then(data => {
  //     return Projeto.newFromAPI(data)
  //   })
  // }

  // saveProjeto(projeto){

  //   return this.save(projeto).then(res => res.json()).then(data => {
  //     return Projeto.newFromAPI(data)
  //   })
  // }

  fazerLogin(data) {

    return this.login(data).then(res => res.json()).then(dado => {
      return Usuario.newFromAPI(dado)
    })

  }

  fazerCadastro(data) {

    return this.register(data).then(res => res.json()).then(dado => {
      return Usuario.newFromAPI(dado)
    })

  }

  syncToServer() {
  }

}
