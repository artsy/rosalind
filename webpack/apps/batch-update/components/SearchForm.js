import React from 'react'
import CurrentCriteria from './CurrentCriteria'
import { GeneAutosuggest, TagAutosuggest, PartnerAutosuggest, FairAutosuggest } from './Autosuggest'
import FilterOptions from './FilterOptions'

export default class SearchForm extends React.Component {
  render () {
    const { genes, tags, partner, fair, onRemoveGene, onRemoveTag, onClearPartner, onClearFair } = this.props
    const { onAddGene, onAddTag, onSetPartner, onSetFair } = this.props
    const { publishedFilter, deletedFilter, genomedFilter, onSetPublishedFilter, onSetDeletedFilter, onSetGenomedFilter } = this.props
    return (
      <div className='SearchForm'>
        <CurrentCriteria
          genes={genes}
          tags={tags}
          partner={partner}
          fair={fair}
          onRemoveGene={onRemoveGene}
          onRemoveTag={onRemoveTag}
          onClearPartner={onClearPartner}
          onClearFair={onClearFair}
          />

        <GeneAutosuggest placeholder='Add a gene' onSelectGene={onAddGene} />
        <TagAutosuggest placeholder='Add a tag' onSelectTag={onAddTag} />
        { partner === null && <PartnerAutosuggest onSelectPartner={onSetPartner} /> }
        { fair === null && <FairAutosuggest onSelectFair={onSetFair} /> }

        <FilterOptions
          publishedFilter={publishedFilter}
          deletedFilter={deletedFilter}
          genomedFilter={genomedFilter}
          onSetPublishedFilter={onSetPublishedFilter}
          onSetDeletedFilter={onSetDeletedFilter}
          onSetGenomedFilter={onSetGenomedFilter}
          />
      </div>
    )
  }
}
