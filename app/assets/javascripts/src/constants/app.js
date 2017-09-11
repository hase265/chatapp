import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  LOAD_MESSAGES_LOG: null,
  SAVE_MESSAGE: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
}
