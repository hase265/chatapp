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
      .post('/api/users/index')
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

  destroyFriendship(friend_id) {
    return new Promise((resolve, reject) => {
      request
      .delete('/api/users/index')
      .set('X-CSRF-Token', CSRFToken())
      .send({friend_id})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.DESTROY_FRIENDSHIP,
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
