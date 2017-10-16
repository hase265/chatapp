import React from 'react'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  static get propTypes() {
    return {
      toId: React.PropTypes.number,
    }
  }

  constructor(props) {
    super(props)
    this.state = {value: ''}
  }

  handleKeyDown(e) {
    const {value} = this.state
    const {toId} = this.props
    if (e.keyCode === 13 && value !== '') {
      MessagesAction.saveMessage(value, toId)
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

  loadImages(e) {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    MessagesAction.saveImageChat(file, this.props.toId)
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
        <input
          type='file'
          ref='image'
          onChange={this.loadImages.bind(this)}
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
