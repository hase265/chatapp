import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  LOAD_MESSAGES_LOG: null,
  SAVE_MESSAGE: null,
  LOAD_USERS: null,
  LOAD_SEARCH_USERS: null,
  MAKE_FRIENDSHIPS: null,
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
}
