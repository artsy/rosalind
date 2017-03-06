import React from 'react'
import renderer from 'react-test-renderer'
import { GeneAutosuggest } from '../../Autosuggest'

describe('GeneAutosuggest', () => {
  it('renders correctly', () => {
    const mockHandler = jest.fn()
    const rendered = renderer.create(<GeneAutosuggest onSelectGene={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
