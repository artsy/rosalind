import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { SelectedGene } from './SelectedGene'

let props

beforeEach(() => {
  props = {
    name: 'Kawaii',
    onRemove: jest.fn()
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedGene {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
