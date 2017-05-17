import React from 'react'
import renderer from 'react-test-renderer'
import App from './App'

it('renders correctly', () => {
  const rendered = renderer.create(<App />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
