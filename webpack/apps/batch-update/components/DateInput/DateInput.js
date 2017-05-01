import React from 'react'
import chrono from 'chrono-node'
import moment from 'moment'
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
      showComponent: true,
      suggestion: null
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      showComponent: !nextProps.date,
      input: ''
    })
  }

  handleChange (event) {
    const date = parseDate(event.target.value)

    const suggestion = date !== null ? date.toString() : null

    this.setState({
      input: event.target.value,
      showComponent: true,
      suggestion: suggestion
    })
  }

  handleClick (event) {
    event.preventDefault()
    if (this.state.suggestion !== null) {
      this.props.onSelectDate(moment(this.state.suggestion).format())
      this.setState({
        input: moment(this.state.suggestion).format('MMMM Do YYYY, h:mm:ss a'),
        showComponent: false,
        suggestion: null
      })
    }
  }

  handleKeyPress (event) {
    if (event.charCode === 13) {
      this.handleClick(event)
    }
  }

  render () {
    return (
      <div style={{display: this.state.showComponent ? 'block' : 'none'}}>
        <input
          type='text'
          value={this.state.input}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder={this.props.placeholder || 'Select a date'}
            />
        <div className='parsed'>
          <a href='#' onClick={this.handleClick}>
            {this.state.suggestion}
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
