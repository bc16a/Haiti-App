import { Empresa } from '../../models/Empresa'
import { BaseService } from './BaseService'
//import console = require('console');

export class HistoricoService extends BaseService {

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

  buscaHistorico(data) {
    return this.getHistorico(data).then(res => res.json()).then(dado => {
      return dado
    })

  }


  criarHistorico(data) {
    return this.createHistorico(data).then(res => res.json()).then(dado => {
      return dado
    })

  }

  syncToServer() {
  }

}
