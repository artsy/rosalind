import React from 'react'
import styled from 'styled-components'
import CurrentCriteria from './CurrentCriteria'
import { CreatedAfterDateInput, CreatedBeforeDateInput } from './DateInput'
import TextInput from './TextInput'
import {
  ArtistAutosuggest,
  AttributionClassAutosuggest,
  FairAutosuggest,
  GeneAutosuggest,
  PartnerAutosuggest,
  TagAutosuggest
} from './Autosuggest'
import FilterOptions from './FilterOptions'
import Button from '@artsy/reaction/dist/Components/Buttons/Default'
import InvertedButton from '@artsy/reaction/dist/Components/Buttons/Inverted'
import { Link } from './Links'
import { SitesConsumer } from '../SitesContext'

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
  constructor (props) {
    super(props)
    this.maybeRenderEditButton = this.maybeRenderEditButton.bind(this)
  }

  maybeRenderEditButton () {
    const {
      artworksCount,
      selectedArtworksCount,
      selectedArtworkIds,
      onOpenBatchUpdate
    } = this.props
    if (artworksCount === 0) {
      return null
    } else if (selectedArtworksCount === 0) {
      return <FullWidthButton disabled>Edit Artworks</FullWidthButton>
    } else {
      return (
        <React.Fragment>
          <FullWidthInvertedButton onClick={onOpenBatchUpdate}>
            Edit Artworks
          </FullWidthInvertedButton>
          <HelixLink selectedArtworkIds={selectedArtworkIds} />
        </React.Fragment>

      )
    }
  }

  render () {
    const {
      artists,
      attributionClass,
      clearState,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      keywords,
      onRemoveKeyword,
      onRemoveGene,
      onRemoveTag,
      onRemoveArtist,
      partner,
      tags
    } = this.props

    const { onAddKeyword, onAddGene, onAddTag, onAddArtist, updateState } = this.props

    const { genomedFilter, publishedFilter } = this.props

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
          onRemoveKeyword={onRemoveKeyword}
          onRemoveGene={onRemoveGene}
          onRemoveTag={onRemoveTag}
          onRemoveArtist={onRemoveArtist}
          partner={partner}
          tags={tags}
          updateState={updateState}
        />

        <TextInput placeholder='Add a keyword' onEnter={onAddKeyword} />
        <GeneAutosuggest placeholder='Add a gene' onSelectGene={onAddGene} />
        <TagAutosuggest placeholder='Add a tag' onSelectTag={onAddTag} />
        <ArtistAutosuggest
          placeholder='Add an artist'
          onSelectArtist={onAddArtist}
        />
        {partner === null && <PartnerAutosuggest updateState={updateState} />}
        {fair === null && <FairAutosuggest updateState={updateState} />}
        {attributionClass === null && <AttributionClassAutosuggest updateState={updateState} />}
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

const HelixLink = ({selectedArtworkIds}) => {
  return (
    <SitesConsumer>
      {
        sites => {
          const href = `${sites.helix}/genome/artworks?artwork_ids=${selectedArtworkIds.join(',')}`
          return (
            <_Link target='_blank' href={href}>
              Open selected works in Helix
            </_Link>
          )
        }
      }
    </SitesConsumer>
  )
}

const _Link = styled(Link)`
  display: block;
  margin-top: 1em;
`

/* default styled component */

const StyledSearchForm = styled(SearchForm)``

export default StyledSearchForm
