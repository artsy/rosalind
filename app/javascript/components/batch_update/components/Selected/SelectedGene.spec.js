import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedGene } from './SelectedGene'

let props

beforeEach(() => {
  props = {
    name: 'Kawaii',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedGene {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
