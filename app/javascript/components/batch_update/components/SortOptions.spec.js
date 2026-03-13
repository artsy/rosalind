import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SortOptions } from './SortOptions'

it('defaults to the current sort', () => {
  render(<SortOptions sort="RECENTLY_PUBLISHED" />)
  const select = screen.getByRole('combobox')
  expect(select.value).toEqual('RECENTLY_PUBLISHED')
})

it("updates the app's sort state when a new value is selected", () => {
  const updater = jest.fn()
  render(<SortOptions updateState={updater} />)
  const select = screen.getByRole('combobox')
  fireEvent.change(select, { target: { value: 'RECENTLY_PUBLISHED' } })
  expect(updater).toHaveBeenCalled()
})
