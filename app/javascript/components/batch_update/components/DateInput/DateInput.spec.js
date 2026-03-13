import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DateInput } from './DateInput'

describe('DateInput', () => {
  it('renders an input with default placeholder', () => {
    render(<DateInput />)
    expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument()
  })

  it('displays a formatted date suggestion when the user types a date', () => {
    render(<DateInput />)
    const input = screen.getByPlaceholderText('Select a date')
    fireEvent.change(input, { target: { value: 'today' } })
    const link = screen.getByRole('link')
    expect(link.textContent.length).toBeGreaterThan(0)
  })

  it('pressing the Enter key submits a date', () => {
    const mockOnSelectDate = jest.fn()
    render(<DateInput onSelectDate={mockOnSelectDate} />)

    const input = screen.getByPlaceholderText('Select a date')
    fireEvent.change(input, { target: { value: 'today' } })
    fireEvent.keyPress(input, { charCode: 13 })

    expect(mockOnSelectDate).toHaveBeenCalledTimes(1)
  })

  it('onClick submits a date', () => {
    const mockOnSelectDate = jest.fn()
    render(<DateInput onSelectDate={mockOnSelectDate} />)

    const input = screen.getByPlaceholderText('Select a date')
    fireEvent.change(input, { target: { value: 'today' } })
    fireEvent.click(screen.getByRole('link'))

    expect(mockOnSelectDate).toHaveBeenCalledTimes(1)
  })
})
