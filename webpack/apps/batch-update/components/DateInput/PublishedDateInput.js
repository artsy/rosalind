import React from 'react'
import DateInput from './DateInput'

const PublishedDateInput = (props) => {
  return (
    <div>
      <DateInput
        selectDate={props.onSelectPublishedDate}
        />
    </div>
  )
}

export default PublishedDateInput
