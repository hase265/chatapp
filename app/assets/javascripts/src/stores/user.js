import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UsersStore extends BaseStore {
  getUsers() {
    if (!this.get('users')) this.setUsers({})
    return this.get('users')
  }
  setUsers(array) {
    this.set('users', array)
  }
}

const UserStore = new UsersStore()

UserStore.dispatchToken = Dispatcher.register(payload => {
    const action = payload.action

    switch (action.type) {
      case ActionTypes.LOAD_SEARCH_USERS:
        UserStore.setUsers(action.json)
        UserStore.emitChange()
        break
    }
    return true
  })
export default UserStore
