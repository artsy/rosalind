import React from 'react'
import ArtworkPreviewModal from './ArtworkPreviewModal'
import ArtworkSearchResult from './ArtworkSearchResult'
import Spinner from './Spinner'
import { Button } from './Buttons'
import { Link } from './Links'

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

  maybeRenderControls () {
    const { artworks, totalHits, onSelectAllArtworks, onDeselectAllArtworks } = this.props
    if (totalHits && artworks && artworks.length > 0) {
      return <Controls
        displayed={artworks.length}
        total={totalHits}
        onSelectAllArtworks={onSelectAllArtworks}
        onDeselectAllArtworks={onDeselectAllArtworks}
      />
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
  artworks: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool,
  previewedArtwork: React.PropTypes.object,
  onPreviewArtwork: React.PropTypes.func,
  onPreviewPrevious: React.PropTypes.func,
  onPreviewNext: React.PropTypes.func
}

const Controls = ({displayed, total, onSelectAllArtworks, onDeselectAllArtworks}) => (
  <div>
    <div className='counts'>
      Displaying {displayed.toLocaleString()} of {total.toLocaleString()} matching artworks
    </div>
    <div className='select'>
      Select:
      <Link href='#' onClick={(e) => { e.preventDefault(); onSelectAllArtworks() }}>
        all
      </Link>
      /
      <Link href='#' onClick={(e) => { e.preventDefault(); onDeselectAllArtworks() }}>
        none
      </Link>
    </div>
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
