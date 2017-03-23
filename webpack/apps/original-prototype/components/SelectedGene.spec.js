import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import SelectedGene from './SelectedGene'

let props

beforeEach(() => {
  props = {
    name: 'Kawaii',
    onRemoveGene: jest.fn()
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SelectedGene {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('fires the remove handler on click', () => {
  const wrapper = shallow(<SelectedGene {...props} />)
  const mockClickEvent = { preventDefault: jest.fn() }
  wrapper.find('a').simulate('click', mockClickEvent)
  expect(props.onRemoveGene.mock.calls.length).toEqual(1)
})
