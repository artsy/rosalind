import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { SelectedPartner } from './SelectedPartner'

let props

beforeEach(() => {
  props = {
    name: 'Gagosian',
    onRemove: jest.fn()
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedPartner {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('fires the remove handler on click', () => {
  const wrapper = mount(<SelectedPartner {...props} />)
  const mockClickEvent = { preventDefault: jest.fn() }
  wrapper.find('a').simulate('click', mockClickEvent)
  expect(props.onRemove.mock.calls.length).toEqual(1)
})
