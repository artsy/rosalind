import React from 'react'

import { storiesOf } from '@storybook/react'

import BatchUpdateForm from './BatchUpdateForm'

let props = {
  getCommonGenes: () => {},
  onAddNotice: () => {},
  onCancel: () => {},
  selectedArtworkIds: [],
}

storiesOf('BatchUpdateForm', module)
  .add('with no common genes', () => {
    return <BatchUpdateForm {...props} />
  })
  .add('with two common genes', () => {
    props = {
      ...props,
      getCommonGenes: () => {
        return ['Spray Paint', 'Kawaii']
      },
    }
    return (
      <>
        <div
          style={{
            width: '100%',
            background: 'lightGray',
            color: 'white',
            textAlign: 'center',
            padding: '0.5em',
          }}
        >
          (First, click on <u>Cancel</u> to trigger a state update)
        </div>
        <BatchUpdateForm {...props} />
      </>
    )
  })
