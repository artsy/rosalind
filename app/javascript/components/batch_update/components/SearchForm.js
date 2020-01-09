import React from 'react'
import copy from 'copy-to-clipboard'
import styled from 'styled-components'
import CurrentCriteria from './CurrentCriteria'
import { CreatedAfterDateInput, CreatedBeforeDateInput } from './DateInput'
import TextInput from './TextInput'
import PriceInput from './PriceInput'
import {
  ArtistAutosuggest,
  AttributionClassAutosuggest,
  FairAutosuggest,
  GeneAutosuggest,
  PartnerAutosuggest,
  TagAutosuggest,
} from './Autosuggest'
import FilterOptions from './FilterOptions'
import { Button } from '@artsy/palette'
import { Link } from './Links'
import { SitesConsumer } from '../SitesContext'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.maybeRenderEditButton = this.maybeRenderEditButton.bind(this)
  }

  maybeRenderEditButton() {
    const {
      artworksCount,
      selectedArtworksCount,
      selectedArtworkIds,
      onOpenBatchUpdate,
    } = this.props
    if (artworksCount === 0) {
      return null
    } else if (selectedArtworksCount === 0) {
      return (
        <Button width={1} disabled>
          Edit Artworks
        </Button>
      )
    } else {
      return (
        <>
          <Button width={1} onClick={onOpenBatchUpdate}>
            Edit Artworks
          </Button>
          <HelixLink selectedArtworkIds={selectedArtworkIds} />
          <CopyIdsToClipboard mt={1} selectedArtworkIds={selectedArtworkIds} />
        </>
      )
    }
  }

  render() {
    const {
      artists,
      attributionClass,
      clearState,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      keywords,
      maxPrice,
      minPrice,
      onRemoveKeyword,
      onRemoveGene,
      onRemoveTag,
      onRemoveArtist,
      partner,
      tags,
    } = this.props

    const {
      onAddKeyword,
      onAddGene,
      onAddTag,
      onAddArtist,
      updateState,
    } = this.props

    const {
      acquireableOrOfferableFilter,
      publishedFilter,
      forSaleFilter,
    } = this.props

    return (
      <div className={this.props.className}>
        <CurrentCriteria
          artists={artists}
          attributionClass={attributionClass}
          clearState={clearState}
          createdAfterDate={createdAfterDate}
          createdBeforeDate={createdBeforeDate}
          fair={fair}
          genes={genes}
          keywords={keywords}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onRemoveKeyword={onRemoveKeyword}
          onRemoveGene={onRemoveGene}
          onRemoveTag={onRemoveTag}
          onRemoveArtist={onRemoveArtist}
          partner={partner}
          tags={tags}
          updateState={updateState}
        />

        <TextInput placeholder="Add a keyword" onEnter={onAddKeyword} />
        <GeneAutosuggest placeholder="Add a gene" onSelectGene={onAddGene} />
        <TagAutosuggest placeholder="Add a tag" onSelectTag={onAddTag} />
        <ArtistAutosuggest
          placeholder="Add an artist"
          onSelectArtist={onAddArtist}
        />
        {partner === null && <PartnerAutosuggest updateState={updateState} />}
        {fair === null && <FairAutosuggest updateState={updateState} />}
        {attributionClass === null && (
          <AttributionClassAutosuggest updateState={updateState} />
        )}
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
        <PriceInput
          minPrice={minPrice}
          maxPrice={maxPrice}
          updateState={updateState}
        />
        <FilterOptions
          acquireableOrOfferableFilter={acquireableOrOfferableFilter}
          forSaleFilter={forSaleFilter}
          publishedFilter={publishedFilter}
          updateState={updateState}
        />

        {this.maybeRenderEditButton()}
      </div>
    )
  }
}

const HelixLink = ({ selectedArtworkIds }) => {
  return (
    <SitesConsumer>
      {sites => {
        const href = `${
          sites.helix
        }/genome/artworks?artwork_ids=${selectedArtworkIds.join(',')}`
        return (
          <StyledLink target="_blank" rel="noopener noreferrer" href={href}>
            Open selected works in Helix
          </StyledLink>
        )
      }}
    </SitesConsumer>
  )
}

const CopyIdsToClipboard = ({ selectedArtworkIds, ...props }) => {
  return (
    <Button
      variant="secondaryGray"
      onClick={() => {
        event.preventDefault()
        copy(selectedArtworkIds)
        return false
      }}
      {...props}
    >
      Copy selected works to clipboard
    </Button>
  )
}

const StyledLink = styled(Link)`
  display: block;
  margin-top: 1em;
`

/* default styled component */

const StyledSearchForm = styled(SearchForm)``

export default StyledSearchForm
