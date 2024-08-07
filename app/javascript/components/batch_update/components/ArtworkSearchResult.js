import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
// import { colors } from './Layout'
import { color } from '@artsy/palette'
import missingImage from './missing_image.png'

class ArtworkSearchResult extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { artwork, onPreviewArtwork, onToggleArtwork } = this.props
    if (e.metaKey) {
      onPreviewArtwork(artwork)
    } else {
      onToggleArtwork(artwork)
    }
  }

  render() {
    const { className, artwork } = this.props
    const { name, image_url: imageUrl } = artwork
    return (
      <div className={className} onClick={this.handleClick}>
        <img src={imageUrl || missingImage} alt={name} />
        <figcaption>
          {name}
          <br />
          {`Visibility level: ${artwork.visibility_level}`}
        </figcaption>
      </div>
    )
  }
}

ArtworkSearchResult.propTypes = {
  artwork: PropTypes.object.isRequired,
  onPreviewArtwork: PropTypes.func,
  onToggleArtwork: PropTypes.func,
}

/* default styled component */

const StyledArtworkSearchResult = styled(ArtworkSearchResult)`
  min-width: 115px;
  max-width: calc(20% - 1.5em);
  margin: 0.75em;
  flex: 1 1 calc(20% - 1.5em);

  img {
    width: 100%;
  }

  ${props =>
    props.selected &&
    css`
      background: ${color('purple100')};
      outline: solid 5px ${color('purple100')};
      color: white;
    `}

  figcaption {
    position: relative;
    font-size: 80%;
    max-height: 3.75em;
    line-height: 1.25em;
    overflow: hidden;
  }
`

export default StyledArtworkSearchResult
