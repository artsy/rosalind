import React from 'react'
import PropTypes from 'prop-types'
import GenericAutosuggest from './GenericAutosuggest'
import { matchGenes } from 'lib/rosalind-api'
import { getSuggestionValue, renderSuggestion } from './helpers'

function GeneAutosuggest(props) {
  return (
    <GenericAutosuggest
      id="gene-autosuggest"
      placeholder={props.placeholder}
      fetchSuggestions={matchGenes}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      selectSuggestion={gene => {
        props.onSelectGene(gene)
      }}
    />
  )
}

GeneAutosuggest.propTypes = {
  onSelectGene: PropTypes.func.isRequired,
}

GeneAutosuggest.defaultProps = {
  placeholder: 'Select a gene',
}

export { GeneAutosuggest }
