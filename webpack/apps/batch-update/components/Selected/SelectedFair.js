import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedFair = (props) => {
  return (
    <div>
      <h2>Fair</h2>
      <SelectedComponent
        name={props.name}
        onRemove={props.onRemove}
      />
    </div>
  )
}

export { SelectedFair }
