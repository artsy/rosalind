import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import 'jest-styled-components'
import { AttributionClassAutosuggest } from './AttributionClassAutosuggest'

const mockUpdater = jest.fn()

it('renders the attribution class autosuggest input', () => {
  render(<AttributionClassAutosuggest updateState={mockUpdater} />)
  expect(
    screen.getByPlaceholderText('Select an attribution class')
  ).toBeInTheDocument()
})

it('displays all options upon focus', async () => {
  render(<AttributionClassAutosuggest updateState={mockUpdater} />)
  expect(screen.queryAllByRole('option')).toHaveLength(0)

  const input = screen.getByPlaceholderText('Select an attribution class')
  fireEvent.focus(input)
  await waitFor(() => {
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })
})

it('filters as you type', async () => {
  render(<AttributionClassAutosuggest updateState={mockUpdater} />)
  expect(screen.queryAllByRole('option')).toHaveLength(0)

  const input = screen.getByPlaceholderText('Select an attribution class')
  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: 'editio' } })
  await waitFor(() => {
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })
})
