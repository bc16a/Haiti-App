export class Usuario {
  constructor(attributes) {
    Object.assign(this, attributes)
  }

  static newFromAPI(attributes) {
    let usuario = new Usuario(attributes)
    usuario.sync()
    return usuario
  }

  sync() {
    this.is_sync = true
  }
}
