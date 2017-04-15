import React from 'react'
import missingImage from 'file-loader!./missing_image.png'

class ArtworkSearchResult extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    const { artwork } = this.props
    if (e.metaKey) {
      this.props.onPreviewArtwork(artwork)
    } else {
      console.log('i want to toggle artwork')
    }
  }

  render () {
    const { className, artwork } = this.props
    const { name, image_url: imageUrl } = artwork
    return (
      <div className={className} onClick={this.handleClick}>
        <img src={imageUrl || missingImage} alt={name} />
        <figcaption>{name}</figcaption>
      </div>
    )
  }
}

ArtworkSearchResult.propTypes = {
  artwork: React.PropTypes.object.isRequired,
  onPreviewArtwork: React.PropTypes.func
}

/* default styled component */

import styled from 'styled-components'

const StyledArtworkSearchResult = styled(ArtworkSearchResult)`
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
`

export default StyledArtworkSearchResult
