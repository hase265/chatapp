import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.getFriends, this.getCurrentUser)
  }

  getCurrentUser(ctx, next) {
    UsersAction.getCurrentUser()
    next()
  }

  getFriends(ctx, next) {
    UsersAction.getFriends()
    next()
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
