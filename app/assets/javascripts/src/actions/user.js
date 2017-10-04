import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, CSRFToken} from '../constants/app'

export default{
  loadSearchUsers(username) {
    return new Promise((resolve, reject) => {
      request
      .get('/api/users/search')
      .query({username})
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

  makeFriendships(to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post('/api/friendships')
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id})
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
      .delete(`/api/friendships/${friendId}`)
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
      .get('/api/current_user')
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
