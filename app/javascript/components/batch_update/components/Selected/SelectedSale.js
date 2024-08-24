import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedSale = props => {
  return (
    <div>
      <h2>Sale</h2>
      <SelectedComponent
        stateKey="sale"
        name={props.name}
        onRemove={props.clearState}
      />
    </div>
  )
}

export { SelectedSale }
