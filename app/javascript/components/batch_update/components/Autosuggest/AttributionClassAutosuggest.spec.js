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

it('displays all options upon focus', async () => {
  const wrapper = mount(
    <AttributionClassAutosuggest updateState={mockUpdater} />
  )
  expect(wrapper.find('li[role="option"]')).toHaveLength(0)

  const input = wrapper.find('input[type="text"]')
  input.simulate('focus')
  await new Promise(resolve => setTimeout(resolve, 0))
  wrapper.update()
  expect(wrapper.find('li[role="option"]')).toHaveLength(4)
})

it('filters as you type', async () => {
  const wrapper = mount(
    <AttributionClassAutosuggest updateState={mockUpdater} />
  )
  expect(wrapper.find('li[role="option"]')).toHaveLength(0)

  const input = wrapper.find('input[type="text"]')
  input.simulate('focus')
  input.simulate('change', { target: { value: 'editio' } })
  await new Promise(resolve => setTimeout(resolve, 0))
  wrapper.update()
  expect(wrapper.find('li[role="option"]')).toHaveLength(3)
})
