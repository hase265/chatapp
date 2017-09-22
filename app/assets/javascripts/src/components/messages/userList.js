import React from 'react'
import UserStore from '../../stores/user'
import _ from 'lodash'

class UserList extends React.component {

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
    }
  }

  componentDidMount() {
    UserStore.onchange(this.onStoreChange.bind(this))
    UsersAction.loadFriends(to_user_id)
  }

  componentWillUnmount() {
    UserStore.offChange(this.onChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    const userList = this.state.user

    return (
      <ul className="friends_list">{

         _.map(userList, (user) => {
           return (
             <li className="friend" key={user.id}>
              <div className="friend_item">
                {user.username}
              </div>
             </li>
           )
         })
      }</ul>
    )
  }
}
