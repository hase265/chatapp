import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/user'
import _ from 'lodash'

class UserList extends React.Component {

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
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    MessagesAction.loadFriends()
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  onHandleChange(friend_id) {
    UsersAction.destroyFriendship(friend_id)
  }

  render() {
    const {friends} = this.state
    return (
      <div>
        {_.map(friends, (friend) => {
          return (
            <ul>
              <li key={friend.id} onClick={this.onHandleChange.bind(this, friend.id)}>
                <div>{friend.username}</div>
              </li>
            </ul>
          )
        })}
     </div>
    )
  }
}

export default UserList
