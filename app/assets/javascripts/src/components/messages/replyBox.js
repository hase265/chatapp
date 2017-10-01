import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
  }

  getStateFromStores() {
    return {
      value: '',
      to_id: MessagesStore.getOpenUserID(),
    }
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  handleKeyDown(e) {
    const {value, to_id} = this.state
    if (e.keyCode === 13 && value !== '') {
      MessagesAction.saveMessage(value, to_id)
      this.setState({
        value: '',
        to_id: MessagesStore.getOpenUserID(),
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
