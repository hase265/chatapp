import React from 'react'
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
    }
  }

  handleKeyDown(e) {
    const{value} = this.state
    if (e.keyCode === 13 && value !== '') {
      MessagesAction.saveMessage(value)
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
