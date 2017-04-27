import React from 'react'
import renderer from 'react-test-renderer'
import { DateAutosuggest } from './DateAutosuggest'

it('renders correctly', () => {
  const rendered = renderer.create(<DateAutosuggest {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
