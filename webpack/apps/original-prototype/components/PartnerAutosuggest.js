import React from 'react'
import Autosuggest from 'react-autosuggest'
import './Autosuggest.css'
import { matchPartners } from 'lib/rosalind-api'

// Teach Autosuggest how to calculate the input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div className='PartnerSuggestion'>
    <div className='PartnerSuggestion-name'>{suggestion.name}</div>
  </div>
)

class PartnerAutosuggest extends React.Component {
  constructor (props) {
    super(props)

    // Autosuggest is a controlled component. Provide an input value and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest, and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
  }

  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  onSuggestionSelected (event, { suggestion }) {
    const { id, name } = suggestion
    this.props.onSetPartner({ id, name })
    this.setState({value: ''})
  }

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested ({ value }) {
    matchPartners(value).then(partners => {
      this.setState({
        suggestions: partners
      })
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }

  render () {
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Select a partner',
      value,
      onChange: this.onChange
    }

    return (
      <div className='PartnerAutosuggest'>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

export default PartnerAutosuggest
