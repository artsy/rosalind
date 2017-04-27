import React from 'react'
import chrono from 'chrono-node'
import '../Styles/Input.css'

export default class DateInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      suggestion: null,
      input: '',
      showSuggestion: true
    }
  }

  handleChange (event) {
    this.setState({
      input: event.target.value,
      suggestion: parseDate(event.target.value),
      showSuggestion: true
    })
  }

  handleClick (event) {
    event.preventDefault()
    this.props.selectDate(this.state.suggestion)
    this.setState({
      input: this.state.suggestion,
      showSuggestion: false
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
  const result = chrono.parse(raw)
  if (result.length > 0) {
    return result[0].start.date().toString()
  } else {
    return null
  }
}
