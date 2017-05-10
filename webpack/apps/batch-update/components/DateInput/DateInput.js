import React from 'react'
import chrono from 'chrono-node'
import dateFormats from 'lib/date-formats'
import { RETURN } from 'lib/keycodes'

class DateInput extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.submitDate = this.submitDate.bind(this)

    this.state = {
      input: '',
      selected: null,
      suggestion: null
    }
  }

  handleChange (event) {
    const date = parseDate(event.target.value)
    const suggestion = date !== null ? date.toString() : null

    this.setState({
      input: event.target.value,
      suggestion: suggestion
    })
  }

  handleClick (event) {
    event.preventDefault()
    this.submitDate()
  }

  handleKeyPress (event) {
    if (event.charCode === RETURN) {
      this.submitDate()
    }
  }

  submitDate () {
    if (this.state.suggestion !== null) {
      const date = new Date(this.state.suggestion)
      this.props.onSelectDate(dateFormats.default(date))
      this.setState({
        input: dateFormats.long(date),
        suggestion: null
      })
    }
  }

  formatDate (date) {
    if (date !== null) {
      return dateFormats.long(date)
    }
  }

  render () {
    return (
      <div className={this.props.className}>
        <input
          type='text'
          value={this.state.input}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder={this.props.placeholder || 'Select a date'}
        />
        <div className='parsed'>
          <a href='#' onClick={this.handleClick}>
            {this.formatDate(this.state.suggestion)}
          </a>
        </div>
      </div>
    )
  }
}

function parseDate (raw) {
  const result = chrono.parse(raw) || null
  if (result.length > 0) {
    return result[0].start.date()
  } else {
    return null
  }
}

/* default styled component */

import styled from 'styled-components'

const StyledDateInput = styled(DateInput)`
  input {
    width: 100%;
    margin: 1em 0 0 0;
    line-height: 2em;
    font-size: 1em;
    border: none;
    border-bottom: solid 1px #ddd;
    background: none;
  }

  input:focus {
    outline: none;
  }
`

export { StyledDateInput as default, DateInput }
