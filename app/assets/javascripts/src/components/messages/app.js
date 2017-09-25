import React from 'react'
import MessagesBox from './messagesBox'
import UserList from './userList'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}

export default App
