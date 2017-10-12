import React from 'react'
import UsersAction from '../../actions/user'
import MessagesAction from '../../actions/messages'
import UserList from './userList'

class SearchUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      username: '',
    }
  }

  handleChange(e) {
    const username = e.target.value
    this.setState({
      username,
    })
    UsersAction.loadSearchUsers(username)
    UsersAction.getCurrentUser()
    MessagesAction.loadFriends()
  }

  render() {
    const{username} = this.state

    return (
      <div className='search-box'>
        <input
          value={username}
          onChange={ this.handleChange.bind(this) }
          className='search-box__input'
          placeholder='ユーザーを検索'
        />
        <UserList {...this.state} />
      </div>
    )
  }
}

export default SearchUser
