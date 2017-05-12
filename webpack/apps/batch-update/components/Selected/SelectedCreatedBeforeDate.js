import React from 'react'
import SelectedComponent from './SelectedComponent'
import dateFormats from 'lib/date-formats'

const SelectedCreatedBeforeDate = (props) => {
  return (
    <div>
      <h2>Created Before</h2>
      <SelectedComponent
        name={dateFormats.long(props.name)}
        onRemove={props.onRemove}
      />
    </div>
  )
}

export { SelectedCreatedBeforeDate }
