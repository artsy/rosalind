import React from 'react'
import renderer from 'react-test-renderer'
// import { mount } from 'enzyme'
import GeneInput from './GeneInput'

it('renders a null gene correctly', () => {
  const rendered = renderer.create(<GeneInput name='Kawaii' value={null} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
