import React from 'react'
import SelectedComponent from './SelectedComponent'
import dateFormats from 'lib/date-formats'

const SelectedCreatedBeforeDate = (props) => {
  return (
    <SelectedComponent
      name={dateFormats.long(props.name)}
      onRemove={props.onRemove}
    />
  )
}

export { SelectedCreatedBeforeDate }
