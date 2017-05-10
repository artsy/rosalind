import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedPartner = (props) => {
  return (
    <SelectedComponent
      name={props.name}
      onRemove={props.onRemove}
    />
  )
}

export { SelectedPartner }
