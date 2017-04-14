import React from 'react'
import missingImage from 'file-loader!./missing_image.png'
import { ESC, LEFT, RIGHT } from 'lib/keycodes.js'
import Overlay from './Overlay'

class ArtworkPreviewModal extends React.Component {
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
      <Overlay onClick={this.dismiss}>
        <div className={this.props.className} ref={(el) => { this.modal = el }} onClickCapture={e => e.stopPropagation()}>
          <div className='image'>
            <img src={imageUrl || missingImage} alt={name} />
          </div>
          <div className='details'>
            <p className='name'>{name}</p>
            <p className='status'>
              Deleted: {deleted.toString()} <br />
              Published: {published.toString()} <br />
              Genomed: {genomed.toString()}
            </p>
            <p className='links'>
              View artwork in:
              <a href={`https://helix.artsy.net/genome/artworks?artwork_ids=${id}`}>Helix</a>|
              <a href={`https://cms.artsy.net/artworks/${id}/edit?current_partner_id=${partnerId}`}>CMS</a>|
              <a href={`https://www.artsy.net/artwork/${id}`}>Artsy.net</a>
            </p>
            <p className='links'>
              View artist in:
              <a href={`https://helix.artsy.net/genome/artist?search[genome_artist_id]=${artistId}`}>Helix</a>
            </p>
          </div>
        </div>
      </Overlay>
    )
  }
}

ArtworkPreviewModal.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  onPreviewArtwork: React.PropTypes.func,
  onPreviewPrevious: React.PropTypes.func,
  onPreviewNext: React.PropTypes.func
}

/* default styled component */

import styled from 'styled-components'

const StyledArtworkPreviewModal = styled(ArtworkPreviewModal)`
  box-sizing: border-box;
  padding: 2em;
  max-height: 90%;
  z-index: 2;
  background: white;
  box-shadow: 0 0 20px hsla(0, 0%, 0%, 0.5);

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .image {
    flex: 0 1 40%;
  }

  .details {
    max-width: 20em;
    margin-left: 1em;
    flex: 0 1 60%;
  }

  .name {
    font-weight: bold;
  }

  .status {
    font-size: 0.9em;
    line-height: 125%;
    margin: 1em 0;
  }

  .links a {
    margin: 0 0.25em;
  }
`

export default StyledArtworkPreviewModal
