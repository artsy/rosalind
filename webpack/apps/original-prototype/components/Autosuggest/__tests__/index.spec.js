import React from 'react'
import renderer from 'react-test-renderer'
import { GeneAutosuggest, TagAutosuggest, PartnerAutosuggest, FairAutosuggest } from '../../Autosuggest'

const mockHandler = jest.fn()

describe('GeneAutosuggest', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<GeneAutosuggest onSelectGene={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('TagAutosuggest', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<TagAutosuggest onSelectTag={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('PartnerAutosuggest', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<PartnerAutosuggest onSelectPartner={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('FairAutosuggest', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<FairAutosuggest onSelectFair={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
