import React from 'react'
import CurrentCriteria from './CurrentCriteria'
import {
  CreatedAfterDateInput,
  CreatedBeforeDateInput
} from './DateInput'
import {
  FairAutosuggest,
  GeneAutosuggest,
  PartnerAutosuggest,
  TagAutosuggest
} from './Autosuggest'
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
    const {
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      onClearCreatedAfterDate,
      onClearFair,
      onClearPartner,
      onRemoveGene,
      onRemoveTag,
      partner,
      tags
    } = this.props

    const {
      onAddCreatedAfterDate,
      onAddGene,
      onAddTag,
      onSetFair,
      onSetPartner
    } = this.props

    const {
      deletedFilter,
      genomedFilter,
      onSetDeletedFilter,
      onSetGenomedFilter,
      onSetPublishedFilter,
      publishedFilter
    } = this.props

    return (
      <div className={this.props.className}>
        <CurrentCriteria
          createdAfterDate={createdAfterDate}
          fair={fair}
          genes={genes}
          onClearCreatedAfterDate={onClearCreatedAfterDate}
          onClearFair={onClearFair}
          onClearPartner={onClearPartner}
          onRemoveGene={onRemoveGene}
          onRemoveTag={onRemoveTag}
          partner={partner}
          tags={tags}
          />

        <GeneAutosuggest placeholder='Add a gene' onSelectGene={onAddGene} />
        <TagAutosuggest placeholder='Add a tag' onSelectTag={onAddTag} />
        {partner === null && <PartnerAutosuggest onSelectPartner={onSetPartner} />}
        {fair === null && <FairAutosuggest onSelectFair={onSetFair} />}
        {
          createdAfterDate === null &&
          <CreatedAfterDateInput
            onSelectDate={onAddCreatedAfterDate}
            createdAfterDate={this.props.createdAfterDate}
            />
        }
        {
          createdBeforeDate === null &&
          <CreatedBeforeDateInput
            onSelectDate={onAddCreatedAfterDate}
            createdBeforeDate={this.props.createdBeforeDate}
            />
        }

        <FilterOptions
          deletedFilter={deletedFilter}
          genomedFilter={genomedFilter}
          onSetDeletedFilter={onSetDeletedFilter}
          onSetGenomedFilter={onSetGenomedFilter}
          onSetPublishedFilter={onSetPublishedFilter}
          publishedFilter={publishedFilter}
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
