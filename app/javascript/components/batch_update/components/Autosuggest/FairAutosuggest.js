import React from 'react'
import PropTypes from 'prop-types'
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
      selectSuggestion={fair => { props.updateState('fair', fair) }}
    />
  )
}

FairAutosuggest.propTypes = {
  updateState: PropTypes.func
}

FairAutosuggest.defaultProps = {
  placeholder: 'Select a fair'
}

export { FairAutosuggest }
