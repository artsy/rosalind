import React from 'react'

export default class SelectedPartner extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onClearPartner()
  }

  render () {
    const { partner } = this.props
    if (partner !== null) {
      return (
        <div className='SelectedPartner'>
          {partner.name}
          <a href='#' className='SelectedPartner-remove'
            onClick={this.handleRemove}>✕</a>
        </div>
      )
    }
    return null
  }
}
