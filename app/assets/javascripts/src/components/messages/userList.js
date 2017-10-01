import React from 'react'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/user'
import _ from 'lodash'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {
      friends: MessagesStore.getFriends(),
      openUserID: MessagesStore.getOpenUserID(),
      currentUser: UserStore.getCurrentUser().id,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    UserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  onHandleChange(friend_id) {
    UsersAction.destroyFriendship(friend_id)
  }

  changeOpenChat(openUserID) {
    MessagesAction.loadMessagesLog(openUserID)
    UsersAction.getCurrentUser()
  }

  render() {
    const {friends} = this.state
    console.log(MessagesStore.getOpenUserID())
    return (
      <div>
        <ul>
          {_.map(friends, (friend) => {
            return (
              <li key={friend.id} onClick={this.changeOpenChat.bind(this, friend.id)}>
                <div>{friend.username}                <span onClick={this.onHandleChange.bind(this, friend.id)}>削除</span></div>
              </li>
            )
          })}
        </ul>
     </div>
    )
  }
}

export default UserList
