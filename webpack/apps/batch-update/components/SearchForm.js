import React from 'react'
import CurrentCriteria from './CurrentCriteria'
import PublishedDateInput from './DateInput/PublishedDateInput'
import { GeneAutosuggest, TagAutosuggest, PartnerAutosuggest, FairAutosuggest } from './Autosuggest'
import FilterOptions from './FilterOptions'
import { Button } from './Buttons'

class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.maybeRenderEditButton = this.maybeRenderEditButton.bind(this)
  }

  maybeRenderEditButton () {
    const { artworksCount, selectedArtworksCount } = this.props
    if (artworksCount === 0) {
      return null
    } else if (selectedArtworksCount === 0) {
      return <Button fullWidth disabled>Edit Artworks</Button>
    } else {
      return <Button fullWidth primary onClick={(e) => { console.log('click!') }}> Edit Artworks </Button>
    }
  }

  render () {
    const { genes, tags, partner, fair, onRemoveGene, onRemoveTag, onClearPartner, onClearFair } = this.props
    const { onAddGene, onAddTag, onSetPartner, onSetFair, onSetPublishedDate } = this.props
    const { publishedFilter, deletedFilter, genomedFilter, onSetPublishedFilter, onSetDeletedFilter, onSetGenomedFilter } = this.props
    return (
      <div className={this.props.className}>
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
        {partner === null && <PartnerAutosuggest onSelectPartner={onSetPartner} />}
        {fair === null && <FairAutosuggest onSelectFair={onSetFair} />}
        <PublishedDateInput onSelectPublishedDate={onSetPublishedDate} />

        <FilterOptions
          publishedFilter={publishedFilter}
          deletedFilter={deletedFilter}
          genomedFilter={genomedFilter}
          onSetPublishedFilter={onSetPublishedFilter}
          onSetDeletedFilter={onSetDeletedFilter}
          onSetGenomedFilter={onSetGenomedFilter}
        />

        { this.maybeRenderEditButton() }
      </div>
    )
  }
}

/* default styled component */

import styled from 'styled-components'

const StyledSearchForm = styled(SearchForm)`
`

export default StyledSearchForm
