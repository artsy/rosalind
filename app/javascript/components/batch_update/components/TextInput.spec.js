import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { TextInput } from './TextInput'
import { mount } from 'enzyme'

it('renders correctly', () => {
  const rendered = renderer.create(<TextInput />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('submits the text upon pressing Enter', () => {
  const mockOnEnter = jest.fn()
  const wrapper = mount(<TextInput onEnter={mockOnEnter} />)

  wrapper.find('input').simulate('change', { target: { value: 'soup' } })
  wrapper.find('input').simulate('keyup', { key: 'Enter' })

  expect(mockOnEnter).toHaveBeenCalledTimes(1)
})

describe('numeric', () => {
  let component, onEnter, wrapper, input, tree
  beforeEach(() => {
    onEnter = jest.fn()
    component = <TextInput onEnter={onEnter} placeholder="foo" numeric />
    wrapper = mount(component)
    input = wrapper.find('input')
    tree = renderer.create(component).toJSON()
  })
  it('adds a keydown handler if a numeric prop is passed in', () => {
    expect(tree).toMatchSnapshot()
  })
  it('converts values to integers onEnter', () => {
    input.simulate('keyup', { key: 'Enter', target: { value: '123' } })
    expect(onEnter).toHaveBeenCalledWith(123)

    onEnter.mockClear()
    input.simulate('keyup', { key: 'Enter', target: { value: '123.9' } })
    expect(onEnter).toHaveBeenCalledWith(123)

    onEnter.mockClear()
    input.simulate('keyup', { key: 'Enter', target: { value: '123ABC' } })
    expect(onEnter).toHaveBeenCalledWith(123)
  })
  it('will not submit non-numeric values', () => {
    input.simulate('keyup', { key: 'Enter', target: { value: 'abc123' } })
    input.simulate('keyup', { key: 'Enter', target: { value: '$123' } })
    input.simulate('keyup', { key: 'Enter', target: { value: 'Four score' } })

    expect(onEnter).not.toHaveBeenCalled()
  })
})
