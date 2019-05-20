import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedTag = props => {
  const toAdd = props.toAdd
  const toRemove = props.toRemove
  const styleOverrides = {}
  let name = props.name
  if (toAdd) {
    styleOverrides.color = 'green'
    name = `+${name}`
  }

  if (toRemove) {
    styleOverrides.red = 'red'
    name = `-${name}`
  }

  return (
    <SelectedComponent
      style={styleOverrides}
      name={name}
      onRemove={props.onRemove}
    />
  )
}

export { SelectedTag }
