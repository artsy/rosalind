import React from 'react'
import renderer from 'react-test-renderer'
import { SelectedTag } from './SelectedTag'

let props

beforeEach(() => {
  props = {
    name: 'Clown',
    onRemove: jest.fn()
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedTag {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
