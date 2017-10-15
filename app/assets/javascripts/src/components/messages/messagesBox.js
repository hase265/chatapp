import React from 'react'
import classNames from 'classNames'
import ReplyBox from './replyBox'
import _ from 'lodash'

class MessagesBox extends React.Component {

  static get PropTypes() {
    return {
      toId: React.PropTypes.integer,
      currentUser: React.PropTypes.object,
      messages: React.PropTypes.array,
    }
  }

  render() {
    const {messages, toId, currentUser} = this.props
    const userMessages = _.map(messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id === currentUser.id,
        'clear': true,
      })
      return (
        <li key={message.id} className={messageClasses}>
          <div className='message-box__item__contents'>
            {message.image ? <img className='image-message' src={`/message_images/${message.image}`} /> : message.content}
          </div>
        </li>
      )
    })
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          {userMessages}
        </ul>
          {toId ? <ReplyBox /> : null}
      </div>
      )
  }
}

export default MessagesBox
