import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedFair = (props) => {
  return (
    <div>
      <h2>Fair</h2>
      <SelectedComponent
        stateKey='fair'
        name={props.name}
        onRemove={props.clearState}
      />
    </div>
  )
}

export { SelectedFair }
