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
      userID: UserStore.getSearchID(),
      friends: UserStore.getFriends(),
      currentUser: UserStore.getCurrentUser().id,
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
    const{username, userID, currentUser, friends} = this.state
    // UserStore.getFriendsの中から、userIDを探し出し、合致したら
    // Already you're friends, なかったら、Congraturationのフラッシュを
    // 出したい
    return (
      const friends = _.map(friends, (friend) => {
        if (friend.id == userID){
          document.write("既に友達です！")
        }else if(currentUser == userID){
          document.write("あなたです！")
        }else{
          document.write("友達になりました！")
        }
      })

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
