import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { SelectedCreatedBeforeDate } from './SelectedCreatedBeforeDate'

let props

beforeEach(() => {
  props = {
    name: 'Some date',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedCreatedBeforeDate {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
