import React from 'react'
import chrono from 'chrono-node'
import moment from 'moment'
import '../Styles/Input.css'

export default class DateInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selected: null,
      suggestion: null,
      input: '',
      showSuggestion: true
    }
  }

  handleChange (event) {
    const date = parseDate(event.target.value)

    const suggestion = date !== null ? date.toString() : null

    this.setState({
      input: event.target.value,
      suggestion: suggestion,
      showSuggestion: true
    })
  }

  handleClick (event) {
    event.preventDefault()

    this.setState({
      input: moment(this.state.suggestion).format('MMMM Do YYYY, h:mm:ss a'),
      selected: moment(this.state.suggestion).format(),
      showSuggestion: false
    })

    this.props.selectDate({
      gt: this.state.selected
    })
  }

  render () {
    const suggestion = (
      <div className='parsed'>
        <a href='#' onClick={this.handleClick}>
          {this.state.suggestion}
        </a>
      </div>
    )

    return (
      <div>
        <input
          type='text'
          value={this.state.input}
          onChange={this.handleChange}
          placeholder={this.props.placeholder || 'Select a date'}
          />
        {this.state.showSuggestion && suggestion}
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
