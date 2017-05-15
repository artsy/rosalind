import React from 'react'
import GenericAutosuggest from './GenericAutosuggest'
import { matchPartners } from 'lib/rosalind-api'
import { getSuggestionValue, renderSuggestion } from './helpers'

function PartnerAutosuggest (props) {
  return (
    <GenericAutosuggest
      id='partner-autosuggest'
      placeholder={props.placeholder}
      fetchSuggestions={matchPartners}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      selectSuggestion={partner => { props.updateState('partner', partner) }}
      />
  )
}

PartnerAutosuggest.propTypes = {
  updateState: React.PropTypes.func.isRequired
}

PartnerAutosuggest.defaultProps = {
  placeholder: 'Select a partner'
}

export { PartnerAutosuggest }
