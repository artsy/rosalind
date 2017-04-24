import React from 'react'
import renderer from 'react-test-renderer'
import Spinner from './Spinner'

it('renders correctly', () => {
  const rendered = renderer.create(<Spinner />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
