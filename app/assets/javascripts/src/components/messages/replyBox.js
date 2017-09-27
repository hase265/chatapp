import React from 'react'
import UserStore from '../../stores/user'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {
      value: '',
      from_id: UserStore.getCurrentUser().id,
      to_id: MessagesStore.getOpenUserID(),
    }
  }

  handleKeyDown(e) {
    const {value, from_id, to_id} = this.state
    if (e.keyCode === 13 && value !== '') {
      MessagesAction.saveMessage(value, from_id, to_id)
      this.setState({
        value: '',
      })
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const {value} = this.state
    return (
      <div className='reply-box'>
        <input
          value={value}
          onKeyDown={ this.handleKeyDown.bind(this)}
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
