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

class Artwork extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onPreviewArtwork(this.props.artwork)
  }

  render () {
    const { name, image_url: imageUrl } = this.props.artwork
    // console.log(missingImage, imageUrl)
    return (
      <div className='tmp-artwork' onClick={this.handleClick}>
        <img src={imageUrl || missingImage} alt={name} />
        <figcaption>{name}</figcaption>
      </div>
    )
  }
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
    const { id, artist_id: artistId, name, imageUrl, published, genomed, deleted } = this.props.artwork
    return (
      <div className='ArtworkPreview-Overlay' onClick={this.dismiss}>
        <div className='ArtworkPreview' ref={(el) => { this.modal = el }}>
          <div className='ArtworkPreview-Image'>
            <img src={imageUrl || missingImage} alt={name} />
          </div>
          <div className='ArtworkPreview-Details'>
            <p style={{fontWeight: 'bold'}}>{name}</p>
            <p style={{fontSize: '0.9em', lineHeight: '125%'}}>
              Deleted: {deleted.toString()} <br />
              Published: {published.toString()} <br />
              Genomed: {genomed.toString()}
            </p>
            <p>
              <a href={`https://helix.artsy.net/genome/artworks?artwork_ids=${id}`}>View artwork in Helix</a>
            </p>
            <p>
              <a href={`https://helix.artsy.net/genome/artist?search[genome_artist_id]=${artistId}`}>View artist in Helix</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResults
