import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedPartner = (props) => {
  return (
    <div>
      <h2>Partner</h2>
      <SelectedComponent
        stateKey='partner'
        name={props.name}
        onRemove={props.clearState}
      />
    </div>
  )
}

export { SelectedPartner }
