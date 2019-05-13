import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { SelectedCreatedAfterDate } from './SelectedCreatedAfterDate'

let props

beforeEach(() => {
  props = {
    name: 'Some date',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedCreatedAfterDate {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
