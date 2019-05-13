import React from 'react'
import PropTypes from 'prop-types'
import GenericAutosuggest from './GenericAutosuggest'
import { matchTags } from 'lib/rosalind-api'
import { getSuggestionValue, renderSuggestion } from './helpers'

function TagAutosuggest(props) {
  return (
    <GenericAutosuggest
      id="tag-autosuggest"
      placeholder={props.placeholder}
      fetchSuggestions={matchTags}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      selectSuggestion={tag => {
        props.onSelectTag(tag)
      }}
    />
  )
}

TagAutosuggest.propTypes = {
  onSelectTag: PropTypes.func.isRequired,
}

TagAutosuggest.defaultProps = {
  placeholder: 'Select a tag',
}

export { TagAutosuggest }
