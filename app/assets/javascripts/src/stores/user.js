import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UserStore extends BaseStore {
  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }
  setUsers(array) {
    this.set('users', array)
  }

  getCurrentUser() {
    if (!this.get('currentUser')) this.setCurrentUser(0)
    return this.get('currentUser')
  }
  setCurrentUser(id) {
    this.set('currentUser', id)
  }
}

const User = new UserStore()

UserStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.LOAD_SEARCH_USERS:
      User.setUsers(action.json)
      User.emitChange()
      break

    case ActionTypes.GET_CURRENT_USER:
      User.setCurrentUser(action.json)
      User.emitChange()
      break
  }
  return true
})
export default User
