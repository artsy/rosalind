import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedFair } from './SelectedFair'

let props

beforeEach(() => {
  props = {
    name: 'Frieze',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedFair {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
