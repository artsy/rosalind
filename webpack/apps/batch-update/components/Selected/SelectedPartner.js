import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedPartner = (props) => {
  return (
    <div>
      <h2>Partner</h2>
      <SelectedComponent
        name={props.name}
        onRemove={props.onRemove}
      />
    </div>
  )
}

export { SelectedPartner }
