import React from 'react'
import GenericAutosuggest from './GenericAutosuggest'
import { matchGenes, matchTags, matchPartners } from 'lib/rosalind-api'
import { getGeneSuggestionValue, renderGeneSuggestion, getTagSuggestionValue, renderTagSuggestion, getPartnerSuggestionValue, renderPartnerSuggestion } from './helpers'

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

function TagAutosuggest (props) {
  return (
    <GenericAutosuggest
      id='tag-autosuggest'
      placeholder={props.placeholder}
      fetchSuggestions={matchTags}
      getSuggestionValue={getTagSuggestionValue}
      renderSuggestion={renderTagSuggestion}
      selectSuggestion={tag => { props.onSelectTag(tag) }}
      />
  )
}

TagAutosuggest.propTypes = {
  onSelectTag: React.PropTypes.func.isRequired
}

TagAutosuggest.defaultProps = {
  placeholder: 'Select a tag'
}

function PartnerAutosuggest (props) {
  return (
    <GenericAutosuggest
      id='partner-autosuggest'
      placeholder={props.placeholder}
      fetchSuggestions={matchPartners}
      getSuggestionValue={getPartnerSuggestionValue}
      renderSuggestion={renderPartnerSuggestion}
      selectSuggestion={partner => { props.onSelectPartner(partner) }}
      />
  )
}

PartnerAutosuggest.propTypes = {
  onSelectPartner: React.PropTypes.func.isRequired
}

PartnerAutosuggest.defaultProps = {
  placeholder: 'Select a partner'
}

export { GeneAutosuggest, TagAutosuggest, PartnerAutosuggest }
