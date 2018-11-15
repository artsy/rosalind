import React from 'react'
import SelectedComponent from './SelectedComponent'

const SelectedAttributionClass = (props) => {
  return (
    <div>
      <h2>Attribution Class</h2>
      <SelectedComponent
        stateKey='attributionClass'
        name={props.name}
        onRemove={props.clearState}
      />
    </div>
  )
}

export { SelectedAttributionClass }
