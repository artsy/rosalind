import React from 'react'
import { SelectSmall, Box } from '@artsy/palette'

export const SortOptions = props => {
  const { sort, updateState } = props

  return (
    <Box mt={2}>
      <SelectSmall
        title="Sort"
        options={[
          {
            text: 'Merchandisability',
            value: 'MERCHANDISABILITY',
          },
          { text: 'Recently published', value: 'RECENTLY_PUBLISHED' },
        ]}
        selected={sort}
        onSelect={value => {
          updateState('sort', value)
        }}
      />
    </Box>
  )
}
