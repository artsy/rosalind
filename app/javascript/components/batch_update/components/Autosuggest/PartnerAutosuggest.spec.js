import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { PartnerAutosuggest } from './PartnerAutosuggest'

const mockHandler = jest.fn()

it('renders correctly', () => {
  const rendered = renderer.create(<PartnerAutosuggest onSelectPartner={mockHandler} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
