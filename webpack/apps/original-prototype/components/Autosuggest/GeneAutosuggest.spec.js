import React from 'react'
import renderer from 'react-test-renderer'
import { GeneAutosuggest } from './GeneAutosuggest'

const mockHandler = jest.fn()

it('renders correctly', () => {
  const rendered = renderer.create(<GeneAutosuggest onSelectGene={mockHandler} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
