import React from 'react'
import DateInput from './DateInput'

const CreatedBeforeDateInput = (props) => {
  return (
    <DateInput
      onSelectDate={props.onSelectDate}
      date={props.createdBeforeDate}
      placeholder='Created before date'
    />
  )
}

export default CreatedBeforeDateInput
