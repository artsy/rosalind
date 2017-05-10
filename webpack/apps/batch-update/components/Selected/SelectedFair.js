import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedFair = (props) => {
  return (
    <SelectedComponent
      name={props.name}
      onRemove={props.onRemove}
    />
  )
}

export { SelectedFair }
