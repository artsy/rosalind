import React from 'react'
import renderer from 'react-test-renderer'
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
  const rendered = renderer.create(<SelectedPrices {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly when only min price is set', () => {
  props.maxPrice = null
  const rendered = renderer.create(<SelectedPrices {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly when only max price is set', () => {
  props.minPrice = null
  const rendered = renderer.create(<SelectedPrices {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
