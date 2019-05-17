import React from 'react'
import TextInput from './TextInput'

const PriceInput = ({ minPrice, maxPrice, updateState }) => {
  const onSetMin = value => updateState('minPrice', value)
  const onSetMax = value => updateState('maxPrice', value)

  return (
    <div>
      {minPrice == null && (
        <TextInput
          className="minPriceInput"
          placeholder="Minimum Price"
          onEnter={onSetMin}
          numeric
        />
      )}
      {maxPrice == null && (
        <TextInput
          className="maxPriceInput"
          placeholder="Maximum Price"
          onEnter={onSetMax}
          numeric
        />
      )}
    </div>
  )
}

export default PriceInput
