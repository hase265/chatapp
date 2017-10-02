import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  loadMessagesLog(openUserID) {
    return new Promise((resolve, reject) => {
      request
      .get(`/api/messages/${openUserID}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_MESSAGES_LOG,
            openUserID,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  saveMessage(content, to_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({content, to_id})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_MESSAGE,
            content,
            to_id,
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
      .get('/api/friendships')
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
  changeChat(openUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CHANGE_OPEN_CHAT,
      userID: openUserID,
    })
  },
}
