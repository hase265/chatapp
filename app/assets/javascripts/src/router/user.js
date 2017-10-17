import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import SearchUser from '../components/users/searchUser'
import UsersAction from '../actions/users'

export default class SearchRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateSearchUser, this.getFriends, this.getCurrentUser)
  }

  getFriends(ctx, next) {
    UsersAction.getFriends()
    next()
  }

  getCurrentUser(ctx, next) {
    UsersAction.getCurrentUser()
    next()
  }

  decorateSearchUser(ctx, next) {
    (new ReactDecorator()).decorate('react-main', SearchUser)
    next()
  }
}
