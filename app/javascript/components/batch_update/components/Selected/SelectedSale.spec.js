import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedSale } from './SelectedSale'

let props

beforeEach(() => {
  props = {
    name: 'Phillips',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedSale {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
