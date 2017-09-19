import React from 'react'
import styled from 'styled-components'
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
    const { artworksCount, selectedArtworksCount, onOpenBatchUpdate } = this.props
    if (artworksCount === 0) {
      return null
    } else if (selectedArtworksCount === 0) {
      return <Button fullWidth disabled>Edit Artworks</Button>
    } else {
      return <Button fullWidth primary onClick={onOpenBatchUpdate}> Edit Artworks </Button>
    }
  }

  render () {
    const {
      clearState,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      onRemoveGene,
      onRemoveTag,
      partner,
      tags
    } = this.props

    const {
      onAddGene,
      onAddTag,
      updateState
    } = this.props

    const {
      genomedFilter,
      publishedFilter
    } = this.props

    return (
      <div className={this.props.className}>
        <CurrentCriteria
          clearState={clearState}
          createdAfterDate={createdAfterDate}
          createdBeforeDate={createdBeforeDate}
          fair={fair}
          genes={genes}
          onRemoveGene={onRemoveGene}
          onRemoveTag={onRemoveTag}
          partner={partner}
          tags={tags}
          updateState={updateState}
          />

        <GeneAutosuggest placeholder='Add a gene' onSelectGene={onAddGene} />
        <TagAutosuggest placeholder='Add a tag' onSelectTag={onAddTag} />
        {partner === null && <PartnerAutosuggest updateState={updateState} />}
        {fair === null && <FairAutosuggest updateState={updateState} />}
        {
          createdAfterDate === null &&
            <CreatedAfterDateInput
              updateState={updateState}
              createdAfterDate={createdAfterDate}
              />
        }
        {
          createdBeforeDate === null &&
            <CreatedBeforeDateInput
              updateState={updateState}
              createdBeforeDate={createdBeforeDate}
              />
        }

        <FilterOptions
          genomedFilter={genomedFilter}
          publishedFilter={publishedFilter}
          updateState={updateState}
          />

        {this.maybeRenderEditButton()}
      </div>
    )
  }
}

/* default styled component */

const StyledSearchForm = styled(SearchForm)`
`

export default StyledSearchForm
