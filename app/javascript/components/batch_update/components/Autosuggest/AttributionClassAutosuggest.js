import React from 'react'
import PropTypes from 'prop-types'
import GenericAutosuggest from './GenericAutosuggest'
import { getSuggestionValue, renderSuggestion } from './helpers'

const attributionClasses = [
  { name: 'Unique', value: 'unique' },
  { name: 'Limited edition', value: 'limited edition' },
  { name: 'Open edition', value: 'open edition' },
  { name: 'Unknown edition', value: 'unknown edition' },
]

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  const results =
    inputLength === 0
      ? attributionClasses
      : attributionClasses.filter(attr =>
          attr.name.toLowerCase().includes(inputValue)
        )
  return Promise.resolve(results)
}

function AttributionClassAutosuggest(props) {
  return (
    <GenericAutosuggest
      id="attribution-class-autosuggest"
      placeholder={props.placeholder}
      fetchSuggestions={getSuggestions}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      selectSuggestion={attributionClass => {
        props.updateState('attributionClass', attributionClass)
      }}
      shouldRenderSuggestions={() => true}
    />
  )
}

AttributionClassAutosuggest.propTypes = {
  updateState: PropTypes.func,
  placeholder: PropTypes.string,
}

AttributionClassAutosuggest.defaultProps = {
  placeholder: 'Select an attribution class',
}

export { AttributionClassAutosuggest }
