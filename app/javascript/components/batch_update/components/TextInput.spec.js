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
  wrapper.find('input').simulate('keyup', { key: "Enter" })

  expect(mockOnEnter).toHaveBeenCalledTimes(1)
})
