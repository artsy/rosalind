import React, { useState } from 'react'
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
import { SortOptions } from './SortOptions'
import { Button, Flex } from '@artsy/palette'
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
          <Flex mt={2} justifyContent="space-between">
            <HelixButton selectedArtworkIds={selectedArtworkIds} />
            <CopyIdsToClipboard selectedArtworkIds={selectedArtworkIds} />
          </Flex>
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
      restrictedArtworkIDs,
      sort,
      tags,
    } = this.props

    const {
      onAddKeyword,
      onAddRestrictedArtworkIDs,
      onAddGene,
      onAddTag,
      onAddArtist,
      updateState,
    } = this.props

    const {
      acquireableOrOfferableFilter,
      publishedFilter,
      listedFilter,
      forSaleFilter,
    } = this.props

    return (
      <div className={this.props.className}>
        <CurrentCriteria
          artists={artists}
          restrictedArtworkIDs={restrictedArtworkIDs}
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

        <TextInput
          placeholder="Restrict to artwork IDs"
          onEnter={onAddRestrictedArtworkIDs}
        />

        <SortOptions sort={sort} updateState={updateState} />

        <FilterOptions
          acquireableOrOfferableFilter={acquireableOrOfferableFilter}
          forSaleFilter={forSaleFilter}
          publishedFilter={publishedFilter}
          listedFilter={listedFilter}
          updateState={updateState}
        />

        {this.maybeRenderEditButton()}
      </div>
    )
  }
}

const HelixButton = ({ selectedArtworkIds }) => {
  return (
    <SitesConsumer>
      {sites => {
        const href = `${
          sites.helix
        }/genome/artworks?artwork_ids=${selectedArtworkIds.join(',')}`
        return (
          <Button
            width="50%"
            mr={1}
            size="small"
            variant="secondaryGray"
            onClick={() => window.open(href)}
          >
            Open in Helix
          </Button>
        )
      }}
    </SitesConsumer>
  )
}

const CopyIdsToClipboard = ({ selectedArtworkIds, ...props }) => {
  const [clicked, setClicked] = useState(false)

  return (
    <Button
      width="50%"
      ml={1}
      size="small"
      variant="secondaryGray"
      onClick={() => {
        setClicked(true)
        setTimeout(() => {
          setClicked(false)
        }, 1000)
        event.preventDefault()
        copy(selectedArtworkIds)
        return false
      }}
      {...props}
    >
      Copy IDs {clicked && '✔'}
    </Button>
  )
}

/* default styled component */

const StyledSearchForm = styled(SearchForm)``

export default StyledSearchForm
