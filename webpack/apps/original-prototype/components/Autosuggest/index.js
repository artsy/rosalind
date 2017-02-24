import React from 'react'
import GenericAutosuggest from './GenericAutosuggest'
import { matchGenes } from 'lib/rosalind-api'

function GeneAutosuggest2 (props) {
  return (
    <div className='GeneAutosuggest2'>
      <GenericAutosuggest
        id='gene'
        placeholder='Add a gene'
        fetchSuggestions={matchGenes}
        getSuggestionValue={gene => gene.name}
        renderSuggestion={gene => <div>{gene.name}</div>}
        selectSuggestion={gene => { props.onSelectGene(gene) }}
        />
    </div>
  )
}

export { GeneAutosuggest2 }
