import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { SelectedArtist } from './SelectedArtist'

let props

beforeEach(() => {
  props = {
    name: 'Pablo',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedArtist {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
