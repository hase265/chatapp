import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'

class MessagesBox extends React.Component {

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
      messages: MessagesStore.getMessages(),
      openUserID: MessagesStore.getOpenUserID(),
      currentUser: UserStore.getCurrentUser().id,
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
    this.setState({messages: UserStore.getCurrentUser()})
  }

  render() {
    const {messages} = this.state
    const userMessages = _.map(messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'clear': true,
      })
      return (
          <li key={message.id} className={messageClasses}>
            <div className='message-box__item__contents'>
              { message.content }
            </div>
          </li>
      )
    })
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { userMessages }
          </ul>
          <ReplyBox />
        </div>
      )
  }
}

export default MessagesBox
