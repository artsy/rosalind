import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import missingImage from './missing_image.png'
import { ESC, LEFT, RIGHT } from 'lib/keycodes'
import Overlay from './Overlay'
import { fetchArtwork } from 'lib/rosalind-api'

class ArtworkPreviewModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fullArtworksById: {}
    }
    this._moreInfoTimer = null
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
    this.fetchMoreInfoAfterDelay()
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleKeyUp)
    clearTimeout(this._moreInfoTimer)
  }

  componentDidUpdate (prevProps, prevState) {
    const isNewArtwork =
      this.props.artwork &&
      prevProps.artwork &&
      this.props.artwork.id !== prevProps.artwork.id

    if (isNewArtwork) {
      clearTimeout(this._moreInfoTimer)
      this.fetchMoreInfoAfterDelay()
    }
  }

  fetchMoreInfoAfterDelay (millis = 500) {
    this._moreInfoTimer = setTimeout(() => {
      fetchArtwork(this.props.artwork.id)
        .then(fullArtwork => {
          console.log('got', fullArtwork)
          if (fullArtwork._id) {
            this.setState((previous) => {
              const updated = Object.assign(previous.fullArtworksById, { [fullArtwork._id]: fullArtwork })
              return { fullArtworksById: updated }
            })
          }
        })
    }, millis)
  }

  render () {
    const { id, artist_id: artistId, partner_id: partnerId, name, image_url: imageUrl, published, genomed, deleted } = this.props.artwork
    const moreInfo = this.state.fullArtworksById[id]
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
              <a target='_blank' href={`https://helix.artsy.net/genome/artworks?artwork_ids=${id}`}>Helix</a>|
              <a target='_blank' href={`https://cms.artsy.net/artworks/${id}/edit?current_partner_id=${partnerId}`}>CMS</a>|
              <a target='_blank' href={`https://www.artsy.net/artwork/${id}`}>Artsy.net</a>
            </p>
            <p className='links'>
              View artist in:
              <a target='_blank' href={`https://helix.artsy.net/genome/artist?search[genome_artist_id]=${artistId}`}>Helix</a>
            </p>
          </div>
        </div>
      </Overlay>
    )
  }
}

ArtworkPreviewModal.propTypes = {
  artwork: PropTypes.object.isRequired,
  onPreviewArtwork: PropTypes.func,
  onPreviewPrevious: PropTypes.func,
  onPreviewNext: PropTypes.func
}

/* default styled component */

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
