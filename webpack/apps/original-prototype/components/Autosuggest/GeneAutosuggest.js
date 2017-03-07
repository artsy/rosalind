import React from 'react'
import GenericAutosuggest from './GenericAutosuggest'
import { matchGenes } from 'lib/rosalind-api'
import { getGeneSuggestionValue, renderGeneSuggestion } from './helpers'

function GeneAutosuggest (props) {
  return (
    <GenericAutosuggest
      id='gene-autosuggest'
      placeholder={props.placeholder}
      fetchSuggestions={matchGenes}
      getSuggestionValue={getGeneSuggestionValue}
      renderSuggestion={renderGeneSuggestion}
      selectSuggestion={gene => { props.onSelectGene(gene) }}
      />
  )
}

GeneAutosuggest.propTypes = {
  onSelectGene: React.PropTypes.func.isRequired
}

GeneAutosuggest.defaultProps = {
  placeholder: 'Select a gene'
}

export { GeneAutosuggest }
