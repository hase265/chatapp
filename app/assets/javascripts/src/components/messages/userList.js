import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import _ from 'lodash'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {
      friends: MessagesStore.getFriends(),
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    MessagesAction.loadFriends()
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    const {friends} = this.state
    console.log(friends)
    return (
      <div>
        {_.map(friends, (friend) => {
          return (
            <ul>
              <li key={friend.id}>
                <div>
                  {friend.username}
                </div>
              </li>
            </ul>
          )
        })}
     </div>
    )
  }
}

export default UserList
