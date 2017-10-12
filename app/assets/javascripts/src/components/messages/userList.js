import React from 'react'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/user'
import classNames from 'classnames'
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
      toId: MessagesStore.getChangeChat(),
      currentUser: UserStore.getCurrentUser().id,
      messages: MessagesStore.getMessages(),
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

  onHandleChange(friendId) {
    UsersAction.destroyFriendship(friendId)
  }

  changeOpenChat(toId) {
    MessagesAction.loadMessagesLog(toId)
    MessagesAction.changeChat(toId)
    UsersAction.getCurrentUser()
  }

  render() {
    const {friends, toId} = this.state

    return (
      <div className='user-list'>
        <ul className='user-list__item'>
          {_.map(friends, (friend) => {
            const itemClasses = classNames({
              'user-list__item': true,
              'clear': true,
              'user-list__item--active': toId === friend.id,
            })

            return (
              <li key={friend.id} onClick={this.changeOpenChat.bind(this, friend.id)} className={itemClasses}>
                <div className='user-list__item'>{friend.username} <span onClick={this.onHandleChange.bind(this, friend.id)}>削除</span></div>
              </li>
            )
          })}
        </ul>
     </div>
    )
  }
}

export default UserList
