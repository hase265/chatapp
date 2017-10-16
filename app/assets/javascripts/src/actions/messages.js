import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  loadMessagesLog(toId) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.MESSAGES}/${toId}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_MESSAGES_LOG,
            toId,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  saveMessage(content, toId) {
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.MESSAGES)
      .set('X-CSRF-Token', CSRFToken())
      .send({content, toId})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_MESSAGE,
            content,
            toId,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  loadFriends() {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.FRIENDSHIPS)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_FRIENDS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  saveImageChat(file, toId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}/upload_image`)
      .set('X-CSRF-Token', CSRFToken())
      .attach('image', file, file.name)
      .field('to_id', toId)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_IMAGE_CHAT,
            image: file.name,
            to_id: toId,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  changeChat(toId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CHANGE_OPEN_CHAT,
      userID: toId,
    })
  },
}
