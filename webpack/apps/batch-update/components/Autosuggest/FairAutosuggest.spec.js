import React from 'react'
import renderer from 'react-test-renderer'
import { FairAutosuggest } from './FairAutosuggest'

const mockHandler = jest.fn()

it('renders correctly', () => {
  const rendered = renderer.create(<FairAutosuggest onSelectFair={mockHandler} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
