import React from 'react'
import missingImage from 'file-loader!./missing_image.png'
import { ESC, LEFT, RIGHT } from 'lib/keycodes.js'

export default class ArtworkPreviewModal extends React.Component {
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
    e.keyCode === ESC && this.dismiss()
    e.keyCode === LEFT && this.prev()
    e.keyCode === RIGHT && this.next()
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
            <p className='ArtworkPreview-Name'>{name}</p>
            <p className='ArtworkPreview-Status'>
              Deleted: {deleted.toString()} <br />
              Published: {published.toString()} <br />
              Genomed: {genomed.toString()}
            </p>
            <p className='ArtworkPreview-Links'>
              View artwork in:
              <a href={`https://helix.artsy.net/genome/artworks?artwork_ids=${id}`}>Helix</a>|
              <a href={`https://cms.artsy.net/artworks/${id}/edit?current_partner_id=${partnerId}`}>CMS</a>|
              <a href={`https://www.artsy.net/artwork/${id}`}>Artsy.net</a>
            </p>
            <p className='ArtworkPreview-Links'>
              View artist in:
              <a href={`https://helix.artsy.net/genome/artist?search[genome_artist_id]=${artistId}`}>Helix</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

ArtworkPreviewModal.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  onPreviewArtwork: React.PropTypes.func,
  onPreviewPrevious: React.PropTypes.func,
  onPreviewNext: React.PropTypes.func
}
