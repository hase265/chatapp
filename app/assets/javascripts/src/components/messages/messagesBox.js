import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import ReplyBox from './replyBox'
import userList from './userList'
import _ from 'lodash'

class MessagesBox extends React.Component {

  static get propTypes(){
    return {
      value: React.propTypes.string,
      toId: React.propTypes.integer,
      currentUser: React.propTypes.object
      messages: React.propTypes.array
    }
  }

  constructor(props) {
    super(props)
    this.onChangeHandler = this.onStoreChange.bind(this)
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
    const {messages, value, toId, currentUser} = this.props
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
            <userList />
            {toId ? <ReplyBox /> : null}
        </div>
      )
  }
}

export default MessagesBox
