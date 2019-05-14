import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { SelectedPartner } from './SelectedPartner'

let props

beforeEach(() => {
  props = {
    name: 'Gagosian',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedPartner {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
