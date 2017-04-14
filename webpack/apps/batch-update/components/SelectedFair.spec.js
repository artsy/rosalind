import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import SelectedFair from './SelectedFair'

let props

beforeEach(() => {
  props = {
    fair: {
      id: 'frieze',
      name: 'Frieze'
    },
    onClearFair: jest.fn()
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedFair {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('fires the remove handler on click', () => {
  const wrapper = mount(<SelectedFair {...props} />)
  const mockClickEvent = { preventDefault: jest.fn() }
  wrapper.find('a').simulate('click', mockClickEvent)
  expect(props.onClearFair.mock.calls.length).toEqual(1)
})
