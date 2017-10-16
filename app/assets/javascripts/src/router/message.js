import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/user'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadFriends, this.getCurrentUser)
  }

  getCurrentUser(ctx, next) {
    UsersAction.getCurrentUser()
    next()
  }

  loadFriends(ctx, next) {
    MessagesAction.loadFriends()
    next()
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
