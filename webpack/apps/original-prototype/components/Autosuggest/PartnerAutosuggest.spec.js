import React from 'react'
import renderer from 'react-test-renderer'
import { PartnerAutosuggest } from './PartnerAutosuggest'

const mockHandler = jest.fn()

describe('PartnerAutosuggest', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<PartnerAutosuggest onSelectPartner={mockHandler} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
