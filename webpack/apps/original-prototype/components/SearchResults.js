import React from 'react'
import missingImage from 'file-loader!./missing_image.png'
import ArtworkPreview from './ArtworkPreview'

function SearchResults (props) {
  const { artworks, previewedArtwork, onPreviewArtwork, onPreviewPrevious, onPreviewNext } = props
  return (
    <div className='SearchResults'>
      {
        previewedArtwork ? <ArtworkPreview
          artwork={previewedArtwork}
          onPreviewArtwork={onPreviewArtwork}
          onPreviewPrevious={onPreviewPrevious}
          onPreviewNext={onPreviewNext}
          /> : null
      }
      {
        artworks.map((artwork) =>
          <Artwork key={artwork.id}
            artwork={artwork}
            onPreviewArtwork={onPreviewArtwork}
            />
        )
      }
    </div>
  )
}

const Artwork = ({artwork, onPreviewArtwork}) => {
  const { name, image_url: imageUrl } = artwork
  return (
    <div className='tmp-artwork' onClick={() => { onPreviewArtwork(artwork) }}>
      <img src={imageUrl || missingImage} alt={name} />
      <figcaption>{name}</figcaption>
    </div>
  )
}

export default SearchResults
