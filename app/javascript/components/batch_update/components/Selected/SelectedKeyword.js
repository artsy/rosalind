import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedKeyword = props => {
  return <SelectedComponent name={props.text} onRemove={props.onRemove} />
}

export { SelectedKeyword }
