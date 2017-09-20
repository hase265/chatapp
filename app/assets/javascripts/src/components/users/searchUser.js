import React from 'react'
import UsersAction from '../../actions/user'

class SearchUser extends React.Component {
  static get propTypes() {
    return {
      searchString: React.PropTypes.string,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      searchString: '',
    }
  }

  handleChange(e) {
    const searchString = e.target.value
    this.setState({
      searchString,
    })
    UsersAction.loadSearchUsers(searchString)
  }

  render() {
    const{searchString} = this.state

    return (
      <div className='search-box'>
        <input
          value={searchString}
          onChange={ this.handleChange.bind(this) }
          className='search-box__input'
          placeholder='ユーザーを検索'
        />
      </div>
    )
  }
}

export default SearchUser
