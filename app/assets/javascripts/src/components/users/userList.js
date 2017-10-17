import React from 'react'
import UsersAction from '../../actions/user'
import classNames from 'classnames'
import _ from 'lodash'

export default class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {flash: '', toUserId: 0}
  }

  static get propTypes() {
    return {
      friends: React.PropTypes.array,
      currentUserId: React.PropTypes.number,
      searchUsers: React.PropTypes.array,
    }
  }

  onHandleChange(toUserId) {
    const {friends, currentUserId} = this.props
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].id === toUserId) {
        this.setState({flash: 'Already you\'re friends!'})
        return
      }
    }
    if (toUserId === currentUserId) {
      this.setState({flash: 'This is You!'})
      return
    }
    this.setState({flash: 'Congratulations! Let\'s Start Chat!'})
    UsersAction.makeFriendships(toUserId)
  }

  render() {
    const {flash, toUserId} = this.state
    const {searchUsers} = this.props
    return (
      <div className='search-user-list'>
        <ul className='search-user-list__item'>
          {
            _.map(searchUsers, (searchUser) => {
              const itemClasses = classNames({
                'search-user-list__item': true,
                'clear': true,
                'search-user-list__item--active': searchUser.id === toUserId,
              })
              return (
                <li className={itemClasses} key={searchUser.id}>
                  <div className='search-user-list__item__name' onClick={this.onHandleChange.bind(this, searchUser.id)}>
                    {searchUser.username}
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
