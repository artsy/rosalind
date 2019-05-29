import React from 'react'

import { storiesOf } from '@storybook/react'

import GeneInput from './GeneInput'

class GeneInputWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.initialValue,
    }
  }

  render() {
    let props = {
      name: 'Fungible',
      value: this.state.value,
      onChangeValue: ({ name, value }) => {
        console.log('yeah', name, value)
        this.setState({ value })
      },
    }
    return <GeneInput {...props} />
  }
}

storiesOf('GeneInput', module)
  .add('with a null value', () => {
    return <GeneInput name="Fungible" value={null} />
  })
  .add('with a non-zero value', () => {
    return <GeneInput name="Fungible" value={70} />
  })
  .add('with a zero value', () => {
    return <GeneInput name="Fungible" value={0} />
  })
  .add('interactive', () => {
    return <GeneInputWrapper initialValue={42} />
  })
