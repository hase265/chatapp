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

  getChangeChat() {
    if (!this.get('chat')) this.setChangeChat(0)
    return this.get('chat')
  }
  setChangeChat(id) {
    this.set('chat', id)
  }

  getImage() {
    if (!this.get('image')) this.setImage({})
    return this.get('image')
  }
  setImage(obj) {
    this.set('image', obj)
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
        action.json.messages
      )
      MessagesStore.emitChange()
      break

    case ActionTypes.LOAD_FRIENDS:
      MessagesStore.setFriends(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.CHANGE_OPEN_CHAT:
      MessagesStore.setChangeChat(action.userID)
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
