import { API_URL } from '../../config'

export class BaseService {
  find(id) {
    return fetch(`${API_URL}/${this.resource()}/${id}`, {
      headers: this.getHeaderParams()
    }).catch(error => {
      console.error(error)
    })
  }

  findAll() {
    return fetch(`${API_URL}/${this.resource()}`, {
      headers: this.getHeaderParams()
    })
  }

  save(data) {

    return fetch(`${API_URL}/${this.resource()}`, {
      method: 'POST',
      body: JSON.stringify(data),
      // headers: this.getHeaderParams()
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  login(data) {
    return fetch("https://backhtplus.herokuapp.com/api/login", {
      method: 'POST',
      body: JSON.stringify(data),
      // headers: this.getHeaderParams()
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  register(data) {
    return fetch("https://backhtplus.herokuapp.com/api/register", {
      method: 'POST',
      body: JSON.stringify(data),
      // headers: this.getHeaderParams()
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  getConta(data) {

    console.log("vc estar aqui", data)

    return fetch("https://backhtplus.herokuapp.com/api/mostraUmaConta", {
      method: 'POST',

      body: JSON.stringify(data.dado),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + " " + data.token
      },
    })
  }

  createConta(data){

    //console.log("vc estar aqui", data)

    return fetch("https://backhtplus.herokuapp.com/api/createConta", {
      method: 'POST',

      body: JSON.stringify(data.dado),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + " " + data.token
      },
    })
  }

  getHistorico(data) {

    console.log("vc estar aqui", data)

    return fetch("https://backhtplus.herokuapp.com/api/mostraTodoHistorico", {
      method: 'POST',

      body: JSON.stringify(data.dado),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + " " + data.token
      },
    })
  }

  createHistorico(data){

    console.log("vc estar aqui", data)

    return fetch("https://backhtplus.herokuapp.com/api/createHistorico", {
      method: 'POST',

      body: JSON.stringify(data.dado),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + " " + data.token
      },
    })
  }

  // getAllHistorico(data){

  //   console.log("vc estar aqui", data)

  //   return fetch("https://monkach.herokuapp.com/api/mostraTodoHistorico", {
  //     method: 'POST',

  //     body: JSON.stringify(data.dado),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer' + " " + data.token
  //     },
  //   })
  // }

  update(data) {

    //alert(JSON.stringify(data.id))
    //alert(JSON.stringify(data.titulo))
    //alert(JSON.stringify(data.texto))

    //return fetch(`${API_URL}/${this.resource()}/${data[this.getPrimaryKey()]}`, {
    return fetch(`${API_URL}/${this.resource()}/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      //headers: this.getHeaderParams(),
      /*  headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },*/
      headers: {
        'Content-Type': 'application/json'
      },

      //headers: this.getHeaderParams()
    })
  }

  getHeaderParams() {
    return {
      ContentType: 'application/json'

    }
  }

  resource() {
    return ''
  }

  getPrimaryKey() {
    return 'id'
  }


  getMoney(data) {
    console.log("vc estar aqui", data)
    return fetch("https://backhtplus.herokuapp.com/api/umMoney", {
      method: 'POST',
      body: JSON.stringify(data.dado),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + " " + data.token
      },
    })
  }

}
