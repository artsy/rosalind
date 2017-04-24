import React from 'react'
import GenericAutosuggest from './GenericAutosuggest'
import { matchFairs } from 'lib/rosalind-api'
import { getSuggestionValue, renderSuggestion } from './helpers'

function FairAutosuggest (props) {
  return (
    <GenericAutosuggest
      id='fair-autosuggest'
      placeholder={props.placeholder}
      fetchSuggestions={matchFairs}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      selectSuggestion={fair => { props.onSelectFair(fair) }}
      />
  )
}

FairAutosuggest.propTypes = {
  onSelectFair: React.PropTypes.func.isRequired
}

FairAutosuggest.defaultProps = {
  placeholder: 'Select a fair'
}

export { FairAutosuggest }
