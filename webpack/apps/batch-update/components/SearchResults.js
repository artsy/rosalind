import React from 'react'
import ArtworkPreviewModal from './ArtworkPreviewModal'
import ArtworkSearchResult from './ArtworkSearchResult'
import Spinner from './Spinner'
import { Button } from './Buttons'

class SearchResults extends React.Component {
  maybeRenderSpinner () {
    const { isLoading } = this.props
    if (isLoading) {
      return <Spinner />
    } else {
      return null
    }
  }

  maybeRenderModal () {
    const { previewedArtwork, onPreviewArtwork, onPreviewPrevious, onPreviewNext } = this.props
    if (previewedArtwork) {
      return previewedArtwork && <ArtworkPreviewModal
        artwork={previewedArtwork}
        onPreviewArtwork={onPreviewArtwork}
        onPreviewPrevious={onPreviewPrevious}
        onPreviewNext={onPreviewNext}
      />
    } else {
      return null
    }
  }

  maybeRenderCounts () {
    const { artworks, totalHits } = this.props
    if (totalHits && artworks && artworks.length > 0) {
      return <Counts displayed={artworks.length} total={totalHits} />
    } else {
      return null
    }
  }

  maybeRenderMoreButton () {
    const { artworks, totalHits, onLoadMore } = this.props
    if (totalHits > artworks.length) {
      return <LoadMore onLoadMore={onLoadMore} />
    } else {
      return null
    }
  }

  render () {
    const { className, artworks, selectedArtworkIds, onPreviewArtwork, onToggleArtwork } = this.props
    return (
      <div className={className}>
        {this.maybeRenderSpinner()}
        {this.maybeRenderModal()}
        {this.maybeRenderCounts()}
        <ArtworkResultList
          artworks={artworks}
          selectedArtworkIds={selectedArtworkIds}
          onPreviewArtwork={onPreviewArtwork}
          onToggleArtwork={onToggleArtwork}
        />
        {this.maybeRenderMoreButton()}
      </div>
    )
  }
}

SearchResults.propTypes = {
  artworks: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool,
  previewedArtwork: React.PropTypes.object,
  onPreviewArtwork: React.PropTypes.func,
  onPreviewPrevious: React.PropTypes.func,
  onPreviewNext: React.PropTypes.func
}

const Counts = ({displayed, total}) => (
  <div className='counts'>
    Displaying {displayed.toLocaleString()} of {total.toLocaleString()} matching artworks
  </div>
)

const ArtworkResultList = ({artworks, selectedArtworkIds, onPreviewArtwork, onToggleArtwork}) => {
  return (
    <div className='results'>
      {artworks.map(artwork =>
        <ArtworkSearchResult key={artwork.id}
          artwork={artwork}
          onPreviewArtwork={onPreviewArtwork}
          onToggleArtwork={onToggleArtwork}
          selected={selectedArtworkIds.includes(artwork.id)}
        />
      )}
    </div>
  )
}

const LoadMore = ({onLoadMore}) => (
  <Button primary fullWidth onClick={onLoadMore}>
    Load more
  </Button>
)

/* default styled component */

import styled from 'styled-components'

const StyledSearchResults = styled(SearchResults)`
  display: flex;
  flex-direction: column;

  .counts {
    padding: 0.75em;
  }

  .results {
    display: flex;
    flex-flow: row wrap;
  }
`

export default StyledSearchResults
