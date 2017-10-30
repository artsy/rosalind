import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { SelectedFair } from './SelectedFair'

let props

beforeEach(() => {
  props = {
    name: 'Frieze',
    onRemove: jest.fn()
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedFair {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
