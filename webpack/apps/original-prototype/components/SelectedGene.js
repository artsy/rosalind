import React from 'react'

export default class SelectedGene extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onRemoveGene(this.props.name)
  }

  render () {
    return (
      <div className='SelectedGene'>
        {this.props.name}
        <a href='#' className='SelectedGene-remove'
          onClick={this.handleRemove}>✕</a>
      </div>
    )
  }
}
