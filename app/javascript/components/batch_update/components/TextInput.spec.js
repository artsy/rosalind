import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TextInput } from './TextInput'

it('renders an input with the default placeholder', () => {
  render(<TextInput />)
  expect(screen.getByPlaceholderText('Add some text')).toBeInTheDocument()
})

it('submits the text upon pressing Enter', () => {
  const mockOnEnter = jest.fn()
  render(<TextInput onEnter={mockOnEnter} />)

  const input = screen.getByPlaceholderText('Add some text')
  fireEvent.change(input, { target: { value: 'soup' } })
  fireEvent.keyUp(input, { key: 'Enter' })

  expect(mockOnEnter).toHaveBeenCalledTimes(1)
})

describe('numeric', () => {
  let onEnter

  beforeEach(() => {
    onEnter = jest.fn()
  })

  it('converts values to integers onEnter', () => {
    render(<TextInput onEnter={onEnter} placeholder="foo" numeric />)
    const input = screen.getByPlaceholderText('foo')

    fireEvent.keyUp(input, { key: 'Enter', target: { value: '123' } })
    expect(onEnter).toHaveBeenCalledWith(123)

    onEnter.mockClear()
    fireEvent.keyUp(input, { key: 'Enter', target: { value: '123.9' } })
    expect(onEnter).toHaveBeenCalledWith(123)

    onEnter.mockClear()
    fireEvent.keyUp(input, { key: 'Enter', target: { value: '123ABC' } })
    expect(onEnter).toHaveBeenCalledWith(123)
  })

  it('will not submit non-numeric values', () => {
    render(<TextInput onEnter={onEnter} placeholder="foo" numeric />)
    const input = screen.getByPlaceholderText('foo')

    fireEvent.keyUp(input, { key: 'Enter', target: { value: 'abc123' } })
    fireEvent.keyUp(input, { key: 'Enter', target: { value: '$123' } })
    fireEvent.keyUp(input, { key: 'Enter', target: { value: 'Four score' } })

    expect(onEnter).not.toHaveBeenCalled()
  })
})
