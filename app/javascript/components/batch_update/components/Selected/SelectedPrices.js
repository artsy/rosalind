import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedPrices = props => {
  const { minPrice, maxPrice, clearState } = props
  return (
    <div>
      <h2>Price</h2>
      {minPrice !== null && (
        <SelectedComponent
          stateKey="minPrice"
          name={'Min Price: ' + minPrice + ' USD'}
          onRemove={clearState}
        />
      )}
      {maxPrice !== null && (
        <SelectedComponent
          stateKey="maxPrice"
          name={'Max Price: ' + maxPrice + ' USD'}
          onRemove={clearState}
        />
      )}
    </div>
  )
}

export { SelectedPrices }
