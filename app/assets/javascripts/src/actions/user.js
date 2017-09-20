import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes} from '../constants/app'

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
}
