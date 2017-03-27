import React from 'react'
import renderer from 'react-test-renderer'
import { TagAutosuggest } from './TagAutosuggest'

const mockHandler = jest.fn()

it('renders correctly', () => {
  const rendered = renderer.create(<TagAutosuggest onSelectTag={mockHandler} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
