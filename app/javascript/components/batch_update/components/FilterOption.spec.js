import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterOption from './FilterOption'

describe('FilterOption', () => {
  const props = {
    name: 'edible',
    current: 'SHOW_ALL',
    updateState: jest.fn(),
  }

  beforeEach(() => {
    props.updateState.mockClear()
  })

  describe('display name', () => {
    it('generates a display name from the provided `name` prop', () => {
      render(<FilterOption {...props} />)
      expect(screen.getByText('Edible?')).toBeInTheDocument()
    })
  })

  describe('filter links', () => {
    it('generates 3 links', () => {
      render(<FilterOption {...props} />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(3)
    })

    it('generates a link to show all works, ignoring the predicate', () => {
      render(<FilterOption {...props} />)
      expect(screen.getByRole('link', { name: 'All' })).toBeInTheDocument()
    })

    it('generates a link to show only works where the predicate is true', () => {
      render(<FilterOption {...props} />)
      expect(screen.getByRole('link', { name: 'True' })).toBeInTheDocument()
    })

    it('generates a link to show only works where the predicate is false', () => {
      render(<FilterOption {...props} />)
      expect(screen.getByRole('link', { name: 'False' })).toBeInTheDocument()
    })

    it('highlights the filter link with the currently active value', () => {
      render(<FilterOption {...props} />)
      const allLink = screen.getByRole('link', { name: 'All' })
      expect(allLink).toHaveClass('active')
    })
  })

  describe('state updates', () => {
    it('calls a state updater fn when a filter link is clicked', () => {
      render(<FilterOption {...props} />)
      const links = screen.getAllByRole('link')
      links.forEach(link => fireEvent.click(link))
      expect(props.updateState).toHaveBeenCalledTimes(3)
    })
  })

  describe('with multi-word `name` prop', () => {
    it('generates readable display name and values', () => {
      render(
        <FilterOption
          name="acquireableOrOfferable"
          current="SHOW_ALL"
          updateState={jest.fn()}
        />
      )

      expect(screen.getByText('Acquireable Or Offerable?')).toBeInTheDocument()
    })
  })
})
