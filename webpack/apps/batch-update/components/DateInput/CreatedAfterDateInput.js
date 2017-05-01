import React from 'react'
import DateInput from './DateInput'

const CreatedAfterDateInput = (props) => {
  return (
    <div>
      <DateInput
        onSelectDate={props.onSelectDate}
        placeholder='Select a published-after date'
        rangeInequality='gt'
      />
    </div>
  )
}

export default CreatedAfterDateInput
