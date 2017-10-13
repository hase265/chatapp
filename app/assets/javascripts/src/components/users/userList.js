import React from 'react'
import UserStore from '../../stores/user'
import MessagesStore from '../../stores/messages'
import UsersAction from '../../actions/user'
import _ from 'lodash'

export default class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  static get PropTypes(){
    return{
      friends: React.PropTypes.object,
      currentUser: React.PropTypes.object,
      searchUsers: React.PropTypes.string,
    }
  }

  get initialState() {
    return {
      flash: ''
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
