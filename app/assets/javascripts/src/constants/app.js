import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  GET_MESSAGES: null,
  SAVE_MESSAGE: null,
  LOAD_USERS: null,
  GET_SEARCH_USERS: null,
  MAKE_FRIENDSHIPS: null,
  GET_FRIENDS: null,
  DESTROY_FRIENDSHIP: null,
  GET_CURRENT_USER: null,
  GET_CHAT_USER_ID: null,
  SAVE_IMAGE_CHAT: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  FRIENDSHIPS: APIRoot + '/friendships',
  CURRENT_USER: APIRoot + '/current_user',
}
