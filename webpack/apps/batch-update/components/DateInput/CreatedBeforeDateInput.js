import React from 'react'
import DateInput from './DateInput'

const CreatedBeforeDateInput = (props) => {
  return (
    <DateInput
      stateKey='createdBeforeDate'
      onSelectDate={props.updateState}
      date={props.createdBeforeDate}
      placeholder='Created before date'
    />
  )
}

export { CreatedBeforeDateInput }
