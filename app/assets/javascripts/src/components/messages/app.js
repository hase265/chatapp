import React from 'react'
import MessagesBox from './messagesBox'
import UserList from './userList'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/users'

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
      friends: UsersStore.getFriends(),
      chatUserId: MessagesStore.getChatUserId(),
      currentUserId: UsersStore.getCurrentUser().id,
      messages: MessagesStore.getMessages(),
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    UsersStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    UsersStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    const {friends, chatUserId, currentUserId, messages} = this.state
    return (
      <div className='app'>
        <UserList friends={friends} chatUserId={chatUserId} />
        <MessagesBox chatUserId={chatUserId} currentUserId={currentUserId} messages={messages} />
      </div>
    )
  }
}

export default App
