import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { AttributionClassAutosuggest } from './AttributionClassAutosuggest'
import { mount } from 'enzyme'

const mockUpdater = jest.fn()

it('renders correctly', () => {
  const rendered = renderer.create(
    <AttributionClassAutosuggest updateState={mockUpdater} />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('displays all options upon focus', () => {
  const wrapper = mount(
    <AttributionClassAutosuggest updateState={mockUpdater} />
  )
  expect(wrapper.find('li[role="option"]')).toHaveLength(0)

  const input = wrapper.find('input[type="text"]')
  input.simulate('focus')
  setImmediate(() => {
    // wait for next tick for promised matches
    wrapper.update()
    expect(wrapper.find('li[role="option"]')).toHaveLength(7)
  })
})

it('filters as you type', () => {
  const wrapper = mount(
    <AttributionClassAutosuggest updateState={mockUpdater} />
  )
  expect(wrapper.find('li[role="option"]')).toHaveLength(0)

  const input = wrapper.find('input[type="text"]')
  input.simulate('focus')
  input.simulate('change', { target: { value: 'editio' } })
  setImmediate(() => {
    // wait for next tick for promised matches
    wrapper.update()
    expect(wrapper.find('li[role="option"]')).toHaveLength(3)
  })
})
