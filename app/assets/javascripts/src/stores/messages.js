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

  getChatUserId() {
    if (!this.get('chat')) this.setChatUserId(0)
    return this.get('chat')
  }
  setChatUserId(id) {
    this.set('chat', id)
  }
}

const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_MESSAGE:
      const messages = MessagesStore.getMessages()
      messages.push(
        action.json.messages
      )
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_CHAT_USER_ID:
      MessagesStore.setChatUserId(action.userID)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      const chats = MessagesStore.getMessages()
      chats.push(
        action.json.messages
      )
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
