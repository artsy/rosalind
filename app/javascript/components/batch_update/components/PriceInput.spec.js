import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PriceInput from './PriceInput'

describe('PriceInput', () => {
  let updateState

  const init = (options = {}) => {
    const { minPrice, maxPrice } = options
    updateState = jest.fn()
    return render(
      <PriceInput
        updateState={updateState}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    )
  }

  it('renders both price inputs by default', () => {
    init()
    expect(screen.getByPlaceholderText('Minimum Price')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Maximum Price')).toBeInTheDocument()
  })

  it('correctly sets the min price', () => {
    init()
    const input = screen.getByPlaceholderText('Minimum Price')
    fireEvent.keyUp(input, { key: 'Enter', target: { value: '123' } })
    expect(updateState).toHaveBeenCalledWith('minPrice', 123)
  })

  it('correctly sets the max price', () => {
    init()
    const input = screen.getByPlaceholderText('Maximum Price')
    fireEvent.keyUp(input, { key: 'Enter', target: { value: '123' } })
    expect(updateState).toHaveBeenCalledWith('maxPrice', 123)
  })

  it('ignores attempts to set a non-numeric value', () => {
    init()
    const minInput = screen.getByPlaceholderText('Minimum Price')
    const maxInput = screen.getByPlaceholderText('Maximum Price')
    fireEvent.keyUp(minInput, { key: 'Enter', target: { value: 'abc' } })
    fireEvent.keyUp(maxInput, { key: 'Enter', target: { value: 'xyz' } })
    expect(updateState).not.toHaveBeenCalled()
  })

  it('does not display minPriceInput if minPrice is already set', () => {
    init({ minPrice: 1000 })
    expect(
      screen.queryByPlaceholderText('Minimum Price')
    ).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Maximum Price')).toBeInTheDocument()
  })

  it('does not display maxPriceInput if maxPrice is already set', () => {
    init({ maxPrice: 1000 })
    expect(screen.getByPlaceholderText('Minimum Price')).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText('Maximum Price')
    ).not.toBeInTheDocument()
  })

  it('does not display anything if both values are set', () => {
    init({ minPrice: 500, maxPrice: 1000 })
    expect(
      screen.queryByPlaceholderText('Minimum Price')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText('Maximum Price')
    ).not.toBeInTheDocument()
  })
})
