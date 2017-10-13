import React from 'react'
import UsersAction from '../../actions/user'
import UserList from './userList'

class SearchUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      searchString: '',
    }
  }

  handleChange(e) {
    const searchString = e.target.value
    this.setState({
      searchString,
    })
    UsersAction.loadSearchUsers(searchString)
  }

  render() {
    const{searchString} = this.state

    return (
      <div className='search-box'>
        <input
          value={searchString}
          onChange={ this.handleChange.bind(this) }
          className='search-box__input'
          placeholder='ユーザーを検索'
        />
        <UserList searchString={this.state.searchString} />
      </div>
    )
  }
}

export default SearchUser
