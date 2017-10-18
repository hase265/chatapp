import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class MessagesStore extends BaseStore {

  getMessages() {
    if (!this.get('userMessages')) this.setMessages([])
    return this.get('userMessages')
  }
  setMessages(array) {
    this.set('userMessages', array)
  }

  getChatUserId() {
    if (!this.get('chatUserId')) this.setChatUserId(0)
    return this.get('chatUserId')
  }
  setChatUserId(id) {
    this.set('chatUserId', id)
  }
}

const messagesStore = new MessagesStore()

messagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      messagesStore.setMessages(action.json)
      messagesStore.emitChange()
      break

    case ActionTypes.SAVE_MESSAGE:
      const messages = messagesStore.getMessages()
      messages.push(
        action.json.message
      )
      messagesStore.emitChange()
      break

    case ActionTypes.GET_CHAT_USER_ID:
      messagesStore.setChatUserId(action.userID)
      messagesStore.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      const chats = messagesStore.getMessages()
      chats.push(
        action.json.message
      )
      messagesStore.emitChange()
      break
  }
  return true
})

export default messagesStore
