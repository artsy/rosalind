import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedRestrictedArtworkIDs = props => {
  const { artworkIDs, onRemove } = props

  const text = `${artworkIDs.length} selected`

  return (
    <div>
      <h2>Artwork IDs</h2>
      <SelectedComponent
        stateKey="restrictedArtworkIDs"
        name={text}
        onRemove={onRemove}
      />
    </div>
  )
}

export { SelectedRestrictedArtworkIDs }
