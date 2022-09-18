import Storage from '../../../Support/AsyncStorage'

export default class ProjetoRepository {

  static KEY = 'projetos'

  list () {
    return this.getProjetosFromStorage()
  }

  saveInStorage (projeto) {
    const projetos = this.getProjetosFromStorage()
    projetos.push(projeto)
    this.setProjetosToStorage(projeto)
  }

  getProjetosFromStorage () {
    return JSON.parse(Storage.get(ProjetoRepository.KEY))
  }
  
  setProjetosToStorage (projetos) {
    Storage.set(ProjetoRepository.KEY, JSON.stringify(projetos))
  }

  getContainer () {
    let projetos = {}
  }
}
