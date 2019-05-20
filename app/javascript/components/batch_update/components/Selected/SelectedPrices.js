import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedPrices = props => {
  const { minPrice, maxPrice, clearState } = props
  return (
    <div>
      <h2>Price</h2>
      {minPrice !== null && (
        <SelectedComponent
          className="currentMinPrice"
          stateKey="minPrice"
          name={'Minimum: USD ' + minPrice}
          onRemove={clearState}
        />
      )}
      {maxPrice !== null && (
        <SelectedComponent
          className="currentMaxPrice"
          stateKey="maxPrice"
          name={'Maximum: USD ' + maxPrice}
          onRemove={clearState}
        />
      )}
    </div>
  )
}

export { SelectedPrices }
