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

const usersStore = new UsersStore()

usersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_SEARCH_USERS:
      usersStore.setSearchUsers(action.json)
      usersStore.emitChange()
      break

    case ActionTypes.GET_CURRENT_USER:
      usersStore.setCurrentUser(action.json)
      usersStore.emitChange()
      break

    case ActionTypes.GET_FRIENDS:
      usersStore.setFriends(action.json)
      usersStore.emitChange()
      break

  }
  return true
})
export default usersStore
