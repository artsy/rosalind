import React from 'react'
import TextInput from './TextInput'

const PriceInput = ({ minPrice, maxPrice, updateState }) => {
  const onSetMin = value => updateState('minPrice', value)
  const onSetMax = value => updateState('maxPrice', value)

  return (
    <div>
      {minPrice == null ? (
        <TextInput
          placeholder="Minimum Price"
          value={minPrice}
          onEnter={onSetMin}
          numeric
        />
      ) : (
        <div />
      )}
      {maxPrice == null ? (
        <TextInput
          placeholder="Maximum Price"
          value={maxPrice}
          onEnter={onSetMax}
          numeric
        />
      ) : (
        <div />
      )}
    </div>
  )
}

export default PriceInput
