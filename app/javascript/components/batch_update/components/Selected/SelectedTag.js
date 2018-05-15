import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedTag = (props) => {
  return (
    <SelectedComponent
      name={props.name}
      onRemove={props.onRemove}
    />
  )
}

export { SelectedTag }
