import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArtworkPreviewModal from './ArtworkPreviewModal'
import ArtworkSearchResult from './ArtworkSearchResult'
import Spinner from './Spinner'
import { Button } from '@artsy/palette'
import { Link } from './Links'

class SearchResults extends React.Component {
  maybeRenderSpinner() {
    const { isLoading } = this.props
    if (isLoading) {
      return <Spinner />
    } else {
      return null
    }
  }

  maybeRenderModal() {
    const {
      previewedArtwork,
      onPreviewArtwork,
      onPreviewPrevious,
      onPreviewNext,
    } = this.props
    if (previewedArtwork) {
      return (
        previewedArtwork && (
          <ArtworkPreviewModal
            artwork={previewedArtwork}
            onPreviewArtwork={onPreviewArtwork}
            onPreviewPrevious={onPreviewPrevious}
            onPreviewNext={onPreviewNext}
          />
        )
      )
    } else {
      return null
    }
  }

  maybeRenderControls() {
    const {
      artworks,
      totalHits,
      onSelectAllArtworks,
      onDeselectAllArtworks,
    } = this.props
    if (totalHits.value && artworks && artworks.length > 0) {
      return (
        <Controls
          displayed={artworks.length}
          total={totalHits}
          onSelectAllArtworks={onSelectAllArtworks}
          onDeselectAllArtworks={onDeselectAllArtworks}
        />
      )
    } else {
      return null
    }
  }

  maybeRenderMoreButton() {
    const { artworks, totalHits, onLoadMore } = this.props
    if (totalHits.value > artworks.length) {
      return <LoadMore onLoadMore={onLoadMore} />
    } else {
      return null
    }
  }

  render() {
    const {
      className,
      artworks,
      selectedArtworkIds,
      onPreviewArtwork,
      onToggleArtwork,
    } = this.props
    return (
      <div className={className}>
        {this.maybeRenderSpinner()}
        {this.maybeRenderModal()}
        {this.maybeRenderControls()}
        <ArtworkResultList
          artworks={artworks}
          selectedArtworkIds={selectedArtworkIds}
          onPreviewArtwork={onPreviewArtwork}
          onToggleArtwork={onToggleArtwork}
        />
        {this.maybeRenderControls()}
        {this.maybeRenderMoreButton()}
      </div>
    )
  }
}

SearchResults.propTypes = {
  artworks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  onDeselectAllArtworks: PropTypes.func,
  onLoadMore: PropTypes.func,
  onPreviewArtwork: PropTypes.func,
  onPreviewNext: PropTypes.func,
  onPreviewPrevious: PropTypes.func,
  onSelectAllArtworks: PropTypes.func,
  onToggleArtwork: PropTypes.func,
  previewedArtwork: PropTypes.object,
  selectedArtworkIds: PropTypes.arrayOf(PropTypes.string),
  totalHits: PropTypes.shape({
    value: PropTypes.string,
    relation: PropTypes.string,
  }),
}

const Controls = ({
  displayed,
  total,
  onSelectAllArtworks,
  onDeselectAllArtworks,
}) => (
  <div>
    <Counts displayed={displayed} total={total} />
    <div className="select">
      Select:
      <Link
        href="#"
        onClick={e => {
          e.preventDefault()
          onSelectAllArtworks()
        }}
      >
        all
      </Link>
      /
      <Link
        href="#"
        onClick={e => {
          e.preventDefault()
          onDeselectAllArtworks()
        }}
      >
        none
      </Link>
    </div>
  </div>
)

const Counts = ({ displayed, total }) => {
  const totalCount = total.value.toLocaleString()
  const hasMore = total.relation === 'gte'

  return (
    <div className="counts">
      Displaying {displayed.toLocaleString()} of {totalCount.toLocaleString()}
      {hasMore ? '+' : ''} matching artworks
    </div>
  )
}

const ArtworkResultList = ({
  artworks,
  selectedArtworkIds,
  onPreviewArtwork,
  onToggleArtwork,
}) => {
  return (
    <div className="results">
      {artworks.map(artwork => (
        <ArtworkSearchResult
          key={artwork.id}
          artwork={artwork}
          onPreviewArtwork={onPreviewArtwork}
          onToggleArtwork={onToggleArtwork}
          selected={selectedArtworkIds.indexOf(artwork.id) > -1}
        />
      ))}
    </div>
  )
}

const LoadMore = ({ onLoadMore }) => (
  <Button onClick={onLoadMore}>Load more</Button>
)

/* default styled component */

const StyledSearchResults = styled(SearchResults)`
  display: flex;
  flex-direction: column;

  .counts {
    display: inline-block;
    width: 75%;
    padding: 0.75em;
  }

  .select {
    display: inline-block;
    width: 25%;
    padding: 0.75em;
    text-align: right;

    a {
      margin: 0 0.25em;
    }
  }

  .results {
    display: flex;
    flex-flow: row wrap;
  }
`

export default StyledSearchResults
