import React from 'react'
import missingImage from 'file-loader!./missing_image.png'
import ArtworkPreviewModal from './ArtworkPreviewModal'
import Spinner from './Spinner'

export default function SearchResults (props) {
  const { artworks, isLoading, previewedArtwork, onPreviewArtwork, onPreviewPrevious, onPreviewNext } = props
  return (
    <div className='SearchResults'>
      { isLoading && <Spinner /> }
      {
        previewedArtwork && <ArtworkPreviewModal
          artwork={previewedArtwork}
          onPreviewArtwork={onPreviewArtwork}
          onPreviewPrevious={onPreviewPrevious}
          onPreviewNext={onPreviewNext}
          />
      }
      {
        artworks.map((artwork) =>
          <ArtworkResult key={artwork.id}
            artwork={artwork}
            onPreviewArtwork={onPreviewArtwork}
            />
        )
      }
    </div>
  )
}

SearchResults.propTypes = {
  artworks: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool,
  previewedArtwork: React.PropTypes.object,
  onPreviewArtwork: React.PropTypes.func,
  onPreviewPrevious: React.PropTypes.func,
  onPreviewNext: React.PropTypes.func
}

const ArtworkResult = ({artwork, onPreviewArtwork}) => {
  const { name, image_url: imageUrl } = artwork
  return (
    <div className='ArtworkResult' onClick={() => { onPreviewArtwork(artwork) }}>
      <img src={imageUrl || missingImage} alt={name} />
      <figcaption>{name}</figcaption>
    </div>
  )
}
