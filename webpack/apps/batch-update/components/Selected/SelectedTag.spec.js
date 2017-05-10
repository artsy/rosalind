import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { SelectedTag } from './SelectedTag'

let props

beforeEach(() => {
  props = {
    name: 'Clown',
    onRemove: jest.fn()
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedTag {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('fires the remove handler on click', () => {
  const wrapper = mount(<SelectedTag {...props} />)
  const mockClickEvent = { preventDefault: jest.fn() }
  wrapper.find('a').simulate('click', mockClickEvent)
  expect(props.onRemove.mock.calls.length).toEqual(1)
})
