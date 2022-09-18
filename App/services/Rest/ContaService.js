import { Empresa } from '../../models/Empresa'
import { BaseService } from './BaseService'
//import console = require('console');

export class ContaService extends BaseService {

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

  buscaConta(data) {
    return this.getConta(data).then(res => res.json()).then(dado => {
      return dado
    })

  }


  criarConta(data) {
    return this.createConta(data).then(res => res.json()).then(dado => {
      return dado
    })
  }

  buscaMoney(data) {
    return this.getMoney(data).then(res => res.json()).then(dado => {
      return dado
    })

  }



  syncToServer() {
  }

}
