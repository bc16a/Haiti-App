import Realm from 'realm'

export default class ProjetoRepository {
  list () {
    Realm.open({
      schema: [
        ProjetoSchema
      ]
    }).then(realm => {
      realm.objects(ProjetoSchema.name)
    })
  }

  store (projeto) {
    Realm.open
  }

  getSchema () {
    return null
  }

  openRealm () {
    return Realm.open({
      schema: [
        this.getSchema()
      ]
    })
  }
}
