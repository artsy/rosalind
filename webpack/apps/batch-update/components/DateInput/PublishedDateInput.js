import React from 'react'
import DateInput from './DateInput'

const PublishedDateInput = (props) => {
  return (
    <div>
      <DateInput
        selectDate={props.onSelectPublishedDate}
        placeholder='Select a published-after date'
      />
    </div>
  )
}

export default PublishedDateInput
