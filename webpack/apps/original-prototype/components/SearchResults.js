import React from 'react'
import missingImage from 'file-loader!./missing_image.png'

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

class ArtworkPreview extends React.Component {
  constructor (props) {
    super(props)
    this.dismiss = this.dismiss.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  dismiss () {
    this.props.onPreviewArtwork(null)
  }

  prev () {
    this.props.onPreviewPrevious()
  }

  next () {
    this.props.onPreviewNext()
  }

  handleKeyUp (e) {
    e.keyCode === 27 && this.dismiss()
    e.keyCode === 37 && this.prev()
    e.keyCode === 39 && this.next()
  }

  componentDidMount () {
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  render () {
    const { id, artist_id: artistId, partner_id: partnerId, name, image_url: imageUrl, published, genomed, deleted } = this.props.artwork
    return (
      <div className='ArtworkPreview-Overlay' onClick={this.dismiss}>
        <div className='ArtworkPreview' ref={(el) => { this.modal = el }}>
          <div className='ArtworkPreview-Image'>
            <img src={imageUrl || missingImage} alt={name} />
          </div>
          <div className='ArtworkPreview-Details'>
            <p style={{fontWeight: 'bold'}}>{name}</p>
            <p style={{fontSize: '0.9em', lineHeight: '125%', margin: '1em 0'}}>
              Deleted: {deleted.toString()} <br />
              Published: {published.toString()} <br />
              Genomed: {genomed.toString()}
            </p>
            <p>
              View artwork in:
              <a style={{margin: '0 0.25em'}} href={`https://helix.artsy.net/genome/artworks?artwork_ids=${id}`}>Helix</a>|
              <a style={{margin: '0 0.25em'}} href={`https://cms.artsy.net/artworks/${id}/edit?current_partner_id=${partnerId}`}>CMS</a>|
              <a style={{margin: '0 0.25em'}} href={`https://www.artsy.net/artwork/${id}`}>Artsy.net</a>
            </p>
            <p>
              View artist in:
              <a style={{margin: '0 0.25em'}} href={`https://helix.artsy.net/genome/artist?search[genome_artist_id]=${artistId}`}>Helix</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResults
