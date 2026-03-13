import React from 'react'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { GeneAutosuggest } from './GeneAutosuggest'

const mockHandler = jest.fn()

it('renders the gene autosuggest input', () => {
  render(<GeneAutosuggest onSelectGene={mockHandler} />)
  expect(screen.getByPlaceholderText('Select a gene')).toBeInTheDocument()
})
