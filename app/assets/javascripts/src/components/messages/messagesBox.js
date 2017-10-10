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
      toId: MessagesStore.getChangeChat(),
      currentUser: UserStore.getCurrentUser(),
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
    const {messages, toId, currentUser} = this.state
    const userMessages = _.map(messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id === currentUser.id,
        'clear': true,
      })
      return (
          <li key={message.id} className={messageClasses}>
            <div className='message-box__item__contents'>
              { message.image ? <img className='image-message' src={`/message_images/${message.image}`} /> : message.content }
            </div>
          </li>
      )
    })
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { userMessages }
          </ul>
            {toId ? <ReplyBox /> : null}
        </div>
      )
  }
}

export default MessagesBox
