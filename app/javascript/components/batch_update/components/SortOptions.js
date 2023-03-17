import React from 'react'
import { Select, Box } from '@artsy/palette'

export const SortOptions = props => {
  const { sort, updateState } = props

  return (
    <Box mt={2}>
      <Select
        variant="inline"
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
