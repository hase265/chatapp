import React from 'react'
import UsersAction from '../../actions/user'
import _ from 'lodash'

export default class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {flash: ''}
  }

  static get propTypes() {
    return {
      friends: React.PropTypes.array,
      currentUser: React.PropTypes.number,
      searchUsers: React.PropTypes.array,
    }
  }

  onHandleChange(toUserId) {
    const {friends, currentUser} = this.props
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].id === toUserId) {
        this.setState({flash: 'Already you\'re friends!'})
        return
      }
    }
    if (toUserId === currentUser.id) {
      this.setState({flash: 'This is You!'})
      return
    }
    this.setState({flash: 'Congratulations! Let\'s Start Chat!'})
    UsersAction.makeFriendships(toUserId)
  }

  render() {
    const {flash} = this.state
    const {searchUsers} = this.props
    return (
      <div>
        <ul className='search_user_list'>
          {
            _.map(searchUsers, (searchUser) => {
              return (
                <li className='search_user_list_item' key={searchUser.id}>
                  <div className='search_user_list_result' onClick={this.onHandleChange.bind(this, searchUser.id)}>
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
