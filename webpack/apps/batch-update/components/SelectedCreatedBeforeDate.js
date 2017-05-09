import React from 'react'
import dateFormats from 'lib/date-formats'

class SelectedCreatedBeforeDate extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onClearCreatedBeforeDate()
  }

  render () {
    const { className, createdBeforeDate } = this.props
    if (createdBeforeDate !== null) {
      return (
        <div className={className}>
          {dateFormats.long(createdBeforeDate)}
          <a href='#' className='remove'
            onClick={this.handleRemove}>✕</a>
        </div>
      )
    }
    return null
  }
}

/* default styled component */

import styled from 'styled-components'

const StyledSelectedCreatedBeforeDate = styled(SelectedCreatedBeforeDate)`
  font-weight: bold;
  margin: 0.25em 0;

  a.remove {
    display: inline-block;
    height: 2em;
    width: 2em;
    line-height: 2em;
    text-align: center;
    color: #ddd;
    margin-left: 0.5em;
    border-radius: 1em;
    text-decoration: none;
    &:hover {
      color: #333;
      cursor: pointer;
      background: #eee;
    }
  }
`

export default StyledSelectedCreatedBeforeDate
