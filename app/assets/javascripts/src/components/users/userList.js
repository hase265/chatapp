import React from 'react'
import UserStore from '../../stores/user'
import MessagesStore from '../../stores/messages'
import UsersAction from '../../actions/user'
import _ from 'lodash'

export default class UserList extends React.Component {

  static get propTypes() {
    return {
      searchString: React.propTypes.string,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {
      friends: MessagesStore.getFriends(),
      currentUser: UserStore.getCurrentUser(),
      flash: '',
    }
  }

  componentDidMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  onHandleChange(toUserId) {
    const {friends, currentUser} = this.state
    for (var i = 0; i < friends.length; i++) {
      if (friends[i].id === toUserId) {
        this.setState({flash: 'Already you\'re friends!'})
        return
      }
    }
    if (toUserId === currentUser.id) {
      this.setState({flash: 'This is You!'})
      return
    }
    this.setState({flash: 'Congratulation! Let\'s Start Chat!'})
    UsersAction.makeFriendships(toUserId)
  }

  render() {
    const {searchString} = this.props
    const {flash} = this.state

    return (
      <div>
        <ul className='search_user_list'>
          {
            _.map(searchString, (searchUser) => {
              return (
                <li className='search_user_list_item' key={searchString.id}>
                  <div className='search_user_list_result' onClick={this.onHandleChange.bind(this, searchString.id)}>
                    {searchString.username}
                  </div>
                </li>
              )
            })
          }
        </ul>
          <p>{flash}</p>
      </div>
    )
  }
}
