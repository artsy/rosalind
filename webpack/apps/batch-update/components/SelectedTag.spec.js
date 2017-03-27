import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import SelectedTag from './SelectedTag'

let props

beforeEach(() => {
  props = {
    name: 'Clown',
    onRemoveTag: jest.fn()
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedTag {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('fires the remove handler on click', () => {
  const wrapper = shallow(<SelectedTag {...props} />)
  const mockClickEvent = { preventDefault: jest.fn() }
  wrapper.find('a').simulate('click', mockClickEvent)
  expect(props.onRemoveTag.mock.calls.length).toEqual(1)
})
