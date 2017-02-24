import React from 'react'
import Autosuggest from 'react-autosuggest'
import './GenericAutosuggest.css'

export default class GenericAutosuggest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      suggestions: []
    }
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  onSuggestionsFetchRequested ({value}) {
    this.props.fetchSuggestions(value).then(suggestions => {
      this.setState({ suggestions })
    })
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }

  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  onSuggestionSelected (event, { suggestion }) {
    this.props.selectSuggestion(suggestion)
    this.setState({value: ''})
  }

  render () {
    const inputElementProps = {
      placeholder: this.props.placeholder,
      value: this.state.value,
      onChange: this.onChange
    }

    return (
      <Autosuggest
        id={this.props.id}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.props.getSuggestionValue}
        renderSuggestion={this.props.renderSuggestion}
        inputProps={inputElementProps}
        onSuggestionSelected={this.onSuggestionSelected}
        />
    )
  }
}
