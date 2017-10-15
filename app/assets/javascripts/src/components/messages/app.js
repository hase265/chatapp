import React from 'react'
import MessagesBox from './messagesBox'
import UserList from './userList'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {
      friends: MessagesStore.getFriends(),
      toId: MessagesStore.getChangeChat(),
      currentUser: UserStore.getCurrentUser().id,
      messages: MessagesStore.getMessages(),
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    UserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    UserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    const {friends, toId, currentUser, messages} = this.state
    return (
        <div className='app'>
          <UserList friends={friends} toId={toId} />
          <MessagesBox toId={toId} currentUser={currentUser} messages={messages} />
        </div>
      )
  }
}

export default App
