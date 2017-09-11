import React from 'react'
import Header from './header'
import MessagesBox from './messagesBox'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <Header />
          <MessagesBox />
        </div>
      )
  }
}

export default App
