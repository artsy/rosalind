import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { AttributionClassAutosuggest } from './AttributionClassAutosuggest'

const mockHandler = jest.fn()

it('renders correctly', () => {
  const rendered = renderer.create(<AttributionClassAutosuggest onSelectTag={mockHandler} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
