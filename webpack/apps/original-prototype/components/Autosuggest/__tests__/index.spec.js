import React from 'react'
import renderer from 'react-test-renderer'
import { GeneAutosuggest, TagAutosuggest } from '../../Autosuggest'

describe('GeneAutosuggest', () => {
  it('renders correctly', () => {
    const mockHandler = jest.fn()
    const rendered = renderer.create(<GeneAutosuggest onSelectGene={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('TagAutosuggest', () => {
  it('renders correctly', () => {
    const mockHandler = jest.fn()
    const rendered = renderer.create(<TagAutosuggest onSelectTag={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
