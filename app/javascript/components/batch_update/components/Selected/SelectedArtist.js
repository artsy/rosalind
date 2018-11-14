import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedArtist = props => {
  return (
    <SelectedComponent
      name={props.name}
      onRemove={() => {
        props.onRemove(props.id)
      }}
    />
  )
}

export { SelectedArtist }
