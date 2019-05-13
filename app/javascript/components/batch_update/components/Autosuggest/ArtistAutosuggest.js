import React from 'react'
import PropTypes from 'prop-types'
import GenericAutosuggest from './GenericAutosuggest'
import { matchArtists } from 'lib/rosalind-api'
import { getSuggestionValue, renderSuggestion } from './helpers'

function ArtistAutosuggest(props) {
  return (
    <GenericAutosuggest
      id="artist-autosuggest"
      placeholder={props.placeholder}
      fetchSuggestions={matchArtists}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      selectSuggestion={artist => {
        props.onSelectArtist(artist)
      }}
    />
  )
}

ArtistAutosuggest.propTypes = {
  onSelectArtist: PropTypes.func,
}

ArtistAutosuggest.defaultProps = {
  placeholder: 'Select an artist',
}

export { ArtistAutosuggest }
