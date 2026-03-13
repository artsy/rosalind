import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import 'jest-styled-components'
import TagInput, { PENDING } from './TagInput'

it('renders a to-ignore tag correctly', () => {
  const { asFragment } = render(
    <TagInput name="Hot Dog" pendingAction={null} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders a to-remove tag correctly', () => {
  const { asFragment } = render(
    <TagInput name="Hot Dog" pendingAction={PENDING.REMOVE} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders a to-add tag correctly', () => {
  const { asFragment } = render(
    <TagInput name="Hot Dog" pendingAction={PENDING.ADD} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('accepts changes to the pending action via click events', () => {
  const changeHandler = jest.fn()
  const { container } = render(
    <TagInput name="Hot Dog" pendingAction={null} onClick={changeHandler} />
  )
  fireEvent.click(container.firstChild)
  expect(changeHandler).toHaveBeenCalledTimes(1)
})
