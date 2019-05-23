import React from 'react'

import { storiesOf } from '@storybook/react'

import BatchUpdateForm from './BatchUpdateForm'

let props = {
  getCommonGenes: () => {},
  onAddNotice: () => {},
  onCancel: () => {},
  selectedArtworkIds: [],
}

storiesOf('BatchUpdateForm', module).add('default', () => {
  return <BatchUpdateForm {...props} />
})
