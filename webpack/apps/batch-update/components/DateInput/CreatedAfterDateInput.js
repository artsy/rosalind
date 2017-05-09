import React from 'react'
import DateInput from './DateInput'

const CreatedAfterDateInput = (props) => {
  return (
    <DateInput
      onSelectDate={props.onSelectDate}
      date={props.createdAfterDate}
      placeholder='Created after date'
    />
  )
}

export { CreatedAfterDateInput }
