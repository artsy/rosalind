import React from 'react'
import PropTypes from 'prop-types'
import GenericAutosuggest from './GenericAutosuggest'
import { getSuggestionValue, renderSuggestion } from './helpers'

const attributionClasses = [
  { name: 'Editioned multiple', value: 'editioned multiple' },
  { name: 'Ephemera', value: 'ephemera' },
  { name: 'Limited edition', value: 'limited edition' },
  { name: 'Made-to-order', value: 'made-to-order' },
  { name: 'Non-editioned multiple', value: 'non-editioned multiple' },
  { name: 'Reproduction', value: 'reproduction' },
  { name: 'Unique', value: 'unique' },
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
