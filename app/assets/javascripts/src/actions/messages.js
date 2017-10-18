import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  getMessages(chatUserId) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.MESSAGES}/${chatUserId}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  saveMessage(content, chatUserId) {
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.MESSAGES)
      .set('X-CSRF-Token', CSRFToken())
      .send({content, to_id: chatUserId})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_MESSAGE,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  saveImageChat(file, chatUserId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}/upload_image`)
      .set('X-CSRF-Token', CSRFToken())
      .attach('image', file, file.name)
      .field('to_id', chatUserId)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_IMAGE_CHAT,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  // これはむしろsetChatUserIdかな？
  getChatUserId(chatUserId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.GET_CHAT_USER_ID,
      userID: chatUserId,
    })
  },
}
