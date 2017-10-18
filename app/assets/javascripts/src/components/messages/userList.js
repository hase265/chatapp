import React from 'react'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'
import classNames from 'classnames'
import _ from 'lodash'

class UserList extends React.Component {

  static get propTypes() {
    return {
      friends: React.PropTypes.array,
      chatUserId: React.PropTypes.number,
    }
  }

  destroyFriendship(friendId) {
    UsersAction.destroyFriendship(friendId)
  }

  changeOpenChat(chatUserId) {
    MessagesAction.getMessages(chatUserId)
    MessagesAction.setChatUserId(chatUserId)
  }

  render() {
    const {friends, chatUserId} = this.props
    return (
      <div className='user-list'>
        <ul className='user-list__item'>
          {_.map(friends, (friend) => {
            const itemClasses = classNames({
              'user-list__item': true,
              'clear': true,
              'user-list__item--active': friend.id === chatUserId,
            })

            return (
              <li key={friend.id} onClick={this.changeOpenChat.bind(this, friend.id)} className={itemClasses}>
                <div className='user-list__item'>
                  {friend.username}<span onClick={this.destroyFriendship.bind(this, friend.id)}> 削除</span>
                </div>
              </li>
            )
          })}
        </ul>
     </div>
    )
  }
}

export default UserList
