import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = { messages: [] }
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    MessagesAction.loadMessagesLog()
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState({messages: MessagesStore.getMessages()})
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
