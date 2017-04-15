import React from 'react'
import missingImage from 'file-loader!./missing_image.png'
import ArtworkPreviewModal from './ArtworkPreviewModal'
import Spinner from './Spinner'

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
    const { className, artworks, onPreviewArtwork } = this.props
    return (
      <div className={className}>
        {this.maybeRenderSpinner()}
        {this.maybeRenderModal()}
        {this.maybeRenderCounts()}
        <ArtworkResultList artworks={artworks} onPreviewArtwork={onPreviewArtwork} />
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

const ArtworkResultList = ({artworks, onPreviewArtwork}) => {
  return (
    <div className='results'>
      {artworks.map(artwork => <ArtworkResult key={artwork.id} artwork={artwork} onPreviewArtwork={onPreviewArtwork} />)}
    </div>
  )
}

const ArtworkResult = ({artwork, onPreviewArtwork}) => {
  const { name, image_url: imageUrl } = artwork
  return (
    <div className='result' onClick={() => { onPreviewArtwork(artwork) }}>
      <img src={imageUrl || missingImage} alt={name} />
      <figcaption>{name}</figcaption>
    </div>
  )
}

const LoadMore = ({onLoadMore}) => (
  <a href='#' onClick={e => { e.preventDefault(); onLoadMore() }}>
    Load more
  </a>
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

    .result {
      min-width: 115px;
      max-width: calc(20% - 1.5em);
      margin: 0.75em;
      flex: 1 1 calc(20% - 1.5em);

      img {
        width: 100%;
      }

      figcaption {
        position: relative;
        font-size: 80%;
        max-height: 3.75em;
        line-height: 1.25em;
        overflow: hidden;
      }
    }
  }
`

export default StyledSearchResults
