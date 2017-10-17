import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UsersStore extends BaseStore {

  getSearchUsers() {
    if (!this.get('users')) this.setSearchUsers([])
    return this.get('users')
  }
  setSearchUsers(array) {
    this.set('users', array)
  }

  getCurrentUser() {
    if (!this.get('currentUser')) this.setCurrentUser({})
    return this.get('currentUser')
  }
  setCurrentUser(obj) {
    this.set('currentUser', obj)
  }

  getFriends() {
    if (!this.get('friends')) this.setFriends([])
    return this.get('friends')
  }
  setFriends(array) {
    this.set('friends', array)
  }

}

const User = new UsersStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_SEARCH_USERS:
      User.setSearchUsers(action.json)
      User.emitChange()
      break

    case ActionTypes.GET_CURRENT_USER:
      User.setCurrentUser(action.json)
      User.emitChange()
      break

    case ActionTypes.GET_FRIENDS:
      User.setFriends(action.json)
      User.emitChange()
      break

  }
  return true
})
export default User
