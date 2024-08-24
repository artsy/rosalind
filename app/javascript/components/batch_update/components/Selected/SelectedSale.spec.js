import React from 'react'
import renderer from 'react-test-renderer'
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
  const rendered = renderer.create(<SelectedSale {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
