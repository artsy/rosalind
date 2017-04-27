import React from 'react'
import chrono from 'chrono-node'
import '../Styles/Input.css'

export default class DateInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      date: null
    }
  }

  handleChange (event) {
    const parsed = parseDate(event.target.value)
    this.props.selectDate(parsed)
    this.setState({
      date: parsed
    })
  }

  render () {
    return (
      <div>
        <input
          type='text'
          onChange={this.handleChange}
          />
        <div className='parsed'>{this.state.date}</div>
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
