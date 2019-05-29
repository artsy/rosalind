import React from 'react'

import { storiesOf } from '@storybook/react'

import BatchUpdateForm from './BatchUpdateForm'

let props = {
  getCommonGenes: () => [],
  getCommonTags: () => [],
  onAddNotice: () => {},
  onCancel: () => {},
  selectedArtworkIds: [],
}

storiesOf('BatchUpdateForm', module)
  .add('with no common genes or tags', () => {
    return <BatchUpdateForm {...props} />
  })
  .add('with common genes and tags', () => {
    props = {
      ...props,
      getCommonGenes: () => {
        return ['Spray Paint', 'Kawaii']
      },
      getCommonTags: () => {
        return ['Football', 'Hot Dog']
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
