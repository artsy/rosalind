import React from 'react'
import renderer from 'react-test-renderer'
// import { mount } from 'enzyme'
import GeneInput from './GeneInput'

it('renders a null gene correctly', () => {
  const rendered = renderer.create(<GeneInput name='Kawaii' value={null} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders a zero-valued gene correctly', () => {
  const rendered = renderer.create(<GeneInput name='Kawaii' value={0} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders a positive-valued gene correctly', () => {
  const rendered = renderer.create(<GeneInput name='Kawaii' value={70} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
