import request from 'superagent'
import Dispatcher from '../dispatcher'
import {APIEndpoints, ActionTypes, CSRFToken} from '../constants/app'

export default{
  loadSearchUsers(searchString) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}/search`)
      .query({searchString})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_SEARCH_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  makeFriendships(toUserId) {
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.FRIENDSHIPS)
      .set('X-CSRF-Token', CSRFToken())
      .send({toUserId})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.MAKE_FRIENDSHIPS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  destroyFriendship(friendId) {
    return new Promise((resolve, reject) => {
      request
      .delete(`${APIEndpoints.FRIENDSHIPS}/${friendId}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({friendId})
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

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.CURRENT_USER)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_CURRENT_USER,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
