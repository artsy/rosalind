import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedPrices } from './SelectedPrices'

let props

beforeEach(() => {
  props = {
    minPrice: 1000,
    maxPrice: 2000,
    clearState: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedPrices {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders correctly when only min price is set', () => {
  props.maxPrice = null
  const { asFragment } = render(<SelectedPrices {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders correctly when only max price is set', () => {
  props.minPrice = null
  const { asFragment } = render(<SelectedPrices {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
