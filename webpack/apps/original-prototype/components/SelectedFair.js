import React from 'react'

export default class SelectedFair extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onClearFair()
  }

  render () {
    const { fair } = this.props
    if (fair !== null) {
      return (
        <div className='SelectedFair'>
          {fair.name}
          <a href='#' className='SelectedFair-remove'
            onClick={this.handleRemove}>✕</a>
        </div>
      )
    }
    return null
  }
}
