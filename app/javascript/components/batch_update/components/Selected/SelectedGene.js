import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedGene = props => {
  return <SelectedComponent name={props.name} onRemove={props.onRemove} />
}

export { SelectedGene }
