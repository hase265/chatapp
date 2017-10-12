import React from 'react'
import UserStore from '../../stores/user'
import MessagesStore from '../../stores/messages'
import UsersAction from '../../actions/user'
import _ from 'lodash'

export default class UserList extends React.Component {
  static get propTypes() {
    return {
      searchString: React.PropTypes.string,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {
      users: UserStore.getUsers(),
      friends: MessagesStore.getFriends(),
      currentUser: UserStore.getCurrentUser(),
      flash: "",
    }
  }

  componentDidMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  onHandleChange(toUserId) {
    const { friends, flash, currentUser }  = this.state
    {_.map(friends, (friend) => {
      if (friend.id == toUserId){
        this.setState({flash: "Already you're friends!"})
      } else if(friend.id == currentUser.id) {
        this.setState({flash: "This is You!"})
      } else {
        this.setState({flash: "Congratulation! Let's Start Chat!"})
      }
    })}
    UsersAction.makeFriendships(toUserId)
  }

  render() {
    const searchUsers = this.state.users

    return (
      <ul className='search_user_list'>
        {
          _.map(searchUsers, (user) => {
            return (
              <li className='search_user_list_item' key={user.id}>
                <div className='search_user_list_result' onClick={this.onHandleChange.bind(this, user.id)}>
                  {user.username}
                </div>
              </li>
            )
          })
        }
      </ul>
    )
    return(
      <p>{flash}</p>
    )
  }
}
