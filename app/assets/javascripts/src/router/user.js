import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import SearchUser from '../components/users/searchUser'

export default class SearchRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateSearchUser)
  }

  decorateSearchUser(ctx, next) {
    (new ReactDecorator()).decorate('react-main', SearchUser)
    next()
  }
}
