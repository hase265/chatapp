import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  getMessages() {
    if (!this.get('userMessages')) this.setMessages([])
    return this.get('userMessages')
  }
  setMessages(array) {
    this.set('userMessages', array)
  }

  getFriends() {
    if (!this.get('friends')) this.setFriends([])
    return this.get('friends')
  }
  setFriends(array) {
    this.set('friends', array)
  }

  getOpenUserID() {
    if (!this.get('openUserID')) this.setOpenUserID([])
    return this.get('openUserID')
  }
  setOpenUserID(obj) {
    this.set('openUserID', obj)
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.LOAD_MESSAGES_LOG:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_MESSAGE:
      const messages = MessagesStore.getMessages()
      messages.push(
        action.json.message
      )
      MessagesStore.emitChange()
      break

    case ActionTypes.LOAD_FRIENDS:
      MessagesStore.setFriends(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.CHANGE_OPEN_CHAT:
      MessagesStore.setOpenUserID(action.userID)
      MessagesStore.emitChange()
      break
  }
  console.log(action.json)
  console.log(action.userID)
  return true
})

window.MS = MessagesStore
export default MessagesStore
