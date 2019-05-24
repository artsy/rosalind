import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
import TagInput, { PENDING } from './TagInput'

it('renders a to-ignore tag correctly', () => {
  const rendered = renderer.create(
    <TagInput name="Hot Dog" pendingAction={null} />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders a to-remove tag correctly', () => {
  const rendered = renderer.create(
    <TagInput name="Hot Dog" pendingAction={PENDING.REMOVE} />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders a to-add tag correctly', () => {
  const rendered = renderer.create(
    <TagInput name="Hot Dog" pendingAction={PENDING.ADD} />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('accepts changes to the pending action via click events', () => {
  const changeHandler = jest.fn()
  const wrapper = mount(
    <TagInput name="Hot Dog" pendingAction={null} onClick={changeHandler} />
  )
  wrapper.find('div').simulate('click')
  expect(changeHandler.mock.calls.length).toEqual(1)
})
