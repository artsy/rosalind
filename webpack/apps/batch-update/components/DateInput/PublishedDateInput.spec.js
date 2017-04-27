import React from 'react'
import renderer from 'react-test-renderer'
import PublishedDateInput from './PublishedDateInput'

it('renders correctly', () => {
  const rendered = renderer.create(<PublishedDateInput />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
