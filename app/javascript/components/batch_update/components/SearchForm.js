import React from 'react'
import styled from 'styled-components'
import CurrentCriteria from './CurrentCriteria'
import { CreatedAfterDateInput, CreatedBeforeDateInput } from './DateInput'
import {
  ArtistAutosuggest,
  FairAutosuggest,
  GeneAutosuggest,
  PartnerAutosuggest,
  TagAutosuggest
} from './Autosuggest'
import FilterOptions from './FilterOptions'
import Button from '@artsy/reaction/dist/Components/Buttons/Default'
import InvertedButton from '@artsy/reaction/dist/Components/Buttons/Inverted'

const fullWidth = `
  margin: 0;
  width: 100%;
`
const FullWidthButton = styled(Button)`
  ${fullWidth}
`

const FullWidthInvertedButton = styled(InvertedButton)`
  ${fullWidth}
`

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.maybeRenderEditButton = this.maybeRenderEditButton.bind(this)
  }

  maybeRenderEditButton() {
    const {
      artworksCount,
      selectedArtworksCount,
      onOpenBatchUpdate
    } = this.props
    if (artworksCount === 0) {
      return null
    } else if (selectedArtworksCount === 0) {
      return <FullWidthButton disabled>Edit Artworks</FullWidthButton>
    } else {
      return (
        <FullWidthInvertedButton onClick={onOpenBatchUpdate}>
          Edit Artworks
        </FullWidthInvertedButton>
      )
    }
  }

  render() {
    const {
      artists,
      clearState,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      onRemoveGene,
      onRemoveTag,
      onRemoveArtist,
      partner,
      tags
    } = this.props

    const { onAddGene, onAddTag, onAddArtist, updateState } = this.props

    const { genomedFilter, publishedFilter } = this.props

    return (
      <div className={this.props.className}>
        <CurrentCriteria
          artists={artists}
          clearState={clearState}
          createdAfterDate={createdAfterDate}
          createdBeforeDate={createdBeforeDate}
          fair={fair}
          genes={genes}
          onRemoveGene={onRemoveGene}
          onRemoveTag={onRemoveTag}
          onRemoveArtist={onRemoveArtist}
          partner={partner}
          tags={tags}
          updateState={updateState}
        />

        <GeneAutosuggest placeholder="Add a gene" onSelectGene={onAddGene} />
        <TagAutosuggest placeholder="Add a tag" onSelectTag={onAddTag} />
        <ArtistAutosuggest
          placeholder="Add an artist"
          onSelectArtist={onAddArtist}
        />{' '}
        {partner === null && <PartnerAutosuggest updateState={updateState} />}
        {fair === null && <FairAutosuggest updateState={updateState} />}
        {createdAfterDate === null && (
          <CreatedAfterDateInput
            updateState={updateState}
            createdAfterDate={createdAfterDate}
          />
        )}
        {createdBeforeDate === null && (
          <CreatedBeforeDateInput
            updateState={updateState}
            createdBeforeDate={createdBeforeDate}
          />
        )}

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

const StyledSearchForm = styled(SearchForm)``

export default StyledSearchForm
