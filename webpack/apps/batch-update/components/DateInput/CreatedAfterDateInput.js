import React from 'react'
import DateInput from './DateInput'

const CreatedAfterDateInput = (props) => {
  return (
    <DateInput
      stateKey='createdAfterDate'
      onSelectDate={props.updateState}
      date={props.createdAfterDate}
      placeholder='Created after date'
    />
  )
}

export { CreatedAfterDateInput }
