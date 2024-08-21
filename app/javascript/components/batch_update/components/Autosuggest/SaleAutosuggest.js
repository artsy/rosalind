import React from 'react'
import PropTypes from 'prop-types'
import GenericAutosuggest from './GenericAutosuggest'
import { matchSales } from 'lib/rosalind-api'
import { getSuggestionValue, renderSuggestion } from './helpers'

function SaleAutosuggest(props) {
  return (
    <GenericAutosuggest
      id="sale-autosuggest"
      placeholder={props.placeholder}
      fetchSuggestions={matchSales}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      selectSuggestion={sale => {
        props.updateState('sale', sale)
      }}
    />
  )
}

SaleAutosuggest.propTypes = {
  updateState: PropTypes.func,
}

SaleAutosuggest.defaultProps = {
  placeholder: 'Select a sale',
}

export { SaleAutosuggest }
