import React from 'react'
import renderer from 'react-test-renderer'
import { GeneAutosuggest2 } from '../../Autosuggest'

describe('GeneAutosuggest2', () => {
  it('renders correctly', () => {
    const mockHandler = jest.fn()
    const rendered = renderer.create(<GeneAutosuggest2 onSelectGene={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
