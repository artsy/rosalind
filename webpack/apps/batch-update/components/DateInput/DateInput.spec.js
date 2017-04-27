import React from 'react'
import renderer from 'react-test-renderer'
import DateInput from './DateInput'

it('renders correctly', () => {
  const rendered = renderer.create(<DateInput />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
