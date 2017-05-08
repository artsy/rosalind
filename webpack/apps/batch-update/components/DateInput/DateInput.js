import React from 'react'
import chrono from 'chrono-node'
import moment from 'moment'
import { RETURN } from 'lib/keycodes'
import '../Styles/Input.css'

export default class DateInput extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

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
    if (this.state.suggestion !== null) {
      const date = new Date(this.state.suggestion)
      this.props.onSelectDate(moment(date).format())
      this.setState({
        input: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        suggestion: null
      })
    }
  }

  handleKeyPress (event) {
    if (event.charCode === RETURN) {
      this.handleClick(event)
    }
  }

  formatDate (date) {
    if (date !== null) {
      return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')
    }
  }

  render () {
    return (
      <div>
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
