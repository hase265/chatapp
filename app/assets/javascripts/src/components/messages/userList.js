import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UsersStore from '../../stores/user'
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
    const currentUser = UsersStore.getCurrentUser()
    return {
      friends: MessagesStore.getFriends(),
      openUserID: MessagesStore.getOpenUserID(),
      currentUserId: currentUser.id,
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

  changeOpenChat(openUserID) {
    MessagesAction.changeChat(openUserID)
  }

  render() {
    const {friends} = this.state
    return (
      <div>
        <ul>
          {_.map(friends, (friend) => {
            return (
              <li key={friend.id} onClick={this.changeOpenChat.bind(this, friend.id)}>
                <div>{friend.username} <span onClick={this.onHandleChange.bind(this, friend.id)}>削除</span></div>
              </li>
            )
          })}
        </ul>
     </div>
    )
  }
}

export default UserList
