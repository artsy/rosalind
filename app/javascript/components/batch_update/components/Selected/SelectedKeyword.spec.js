import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { SelectedKeyword } from './SelectedKeyword'

let props

beforeEach(() => {
  props = {
    text: 'soup',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedKeyword {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
