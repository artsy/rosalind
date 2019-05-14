import React from 'react'
import SelectedComponent from './SelectedComponent'
import dateFormats from 'lib/date-formats'

const SelectedCreatedBeforeDate = props => {
  return (
    <div>
      <h2>Created Before</h2>
      <SelectedComponent
        stateKey="createdBeforeDate"
        name={dateFormats.long(props.name)}
        onRemove={props.clearState}
      />
    </div>
  )
}

export { SelectedCreatedBeforeDate }
