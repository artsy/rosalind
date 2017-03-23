import React from 'react'

export default class SelectedTag extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onRemoveTag(this.props.name)
  }

  render () {
    return (
      <div className='SelectedTag'>
        {this.props.name}
        <a href='#' className='SelectedTag-remove'
          onClick={this.handleRemove}>✕</a>
      </div>
    )
  }
}

SelectedTag.propTypes = {
  name: React.PropTypes.string.isRequired,
  onRemoveTag: React.PropTypes.func.isRequired
}
