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
      <div className='GenericAutosuggest'>
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
      </div>
    )
  }
}

GenericAutosuggest.propTypes = {
  id: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  fetchSuggestions: React.PropTypes.func.isRequired,   // searchTerm => listOfMatchingSuggestionObjects
  getSuggestionValue: React.PropTypes.func.isRequired, // suggestionObject => displayName
  renderSuggestion: React.PropTypes.func.isRequired,   // suggestionObject => stringOrMarkupForSuggestionList
  selectSuggestion: React.PropTypes.func.isRequired     // suggestionObject => { handlerFunction(suggestionObject) }
}
