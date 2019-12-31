import React from 'react'
import { storiesOf } from '@storybook/react'
import TagInput, { PENDING } from './TagInput'

class TagInputWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pendingAction: null,
    }
  }

  render() {
    // cycle through states
    const nextState = {
      null: PENDING.REMOVE,
      [PENDING.REMOVE]: PENDING.ADD,
      [PENDING.ADD]: null,
    }

    const props = {
      name: 'Fungible',
      pendingAction: this.state.pendingAction,
      onClick: () => {
        this.setState(prevState => ({
          pendingAction: nextState[prevState.pendingAction],
        }))
      },
    }

    return (
      <>
        <TagInput {...props} />
      </>
    )
  }
}

storiesOf('TagInput', module)
  .add('to be ignored', () => {
    return <TagInput name="Fungible" pendingAction={null} />
  })
  .add('to be added', () => {
    return <TagInput name="Fungible" pendingAction={PENDING.ADD} />
  })
  .add('to be removed', () => {
    return <TagInput name="Fungible" pendingAction={PENDING.REMOVE} />
  })
  .add('interactive', () => {
    return <TagInputWrapper />
  })
