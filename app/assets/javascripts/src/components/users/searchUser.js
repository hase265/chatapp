import React from 'react'
import UsersAction from '../../actions/user'
import UserList from './userList'

class SearchUser extends React.Component {
  static get propTypes() {
    return {
      username: React.PropTypes.string,
    }
  }

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
