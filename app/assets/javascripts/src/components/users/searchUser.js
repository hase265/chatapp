import React from 'react'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/users'
import UsersAction from '../../actions/users'
import UserList from './userList'

class SearchUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return Object.assign({searchString: ''}, this.getStateFromStores())
  }

  getStateFromStores() {
    return {
      friends: UsersStore.getFriends(),
      currentUserId: UsersStore.getCurrentUser().id,
      searchUsers: UsersStore.getSearchUsers(),
    }
  }

  componentDidMount() {
    UsersStore.onChange(this.onChangeHandler)
    MessagesStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    UsersStore.offChange(this.onChangeHandler)
    MessagesStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  // handleChangeだと何のためのメソッドかわかりづらいかな
  handleChange(e) {
    const searchString = e.target.value
    this.setState({
      searchString,
    })
    UsersAction.getSearchUsers(searchString)
  }

  render() {
    const{searchString, friends, currentUserId, searchUsers} = this.state

    return (
      <div className='search-box'>
        <input
          value={searchString}
          onChange={this.handleChange.bind(this)}
          className='search-box__input'
          placeholder='ユーザーを検索'
        />
        <UserList friends={friends} currentUserId={currentUserId} searchUsers={searchUsers}/>
      </div>
    )
  }
}

export default SearchUser
