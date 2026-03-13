import React from 'react'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { PartnerAutosuggest } from './PartnerAutosuggest'

const mockHandler = jest.fn()

it('renders the partner autosuggest input', () => {
  render(<PartnerAutosuggest onSelectPartner={mockHandler} />)
  expect(screen.getByPlaceholderText('Select a partner')).toBeInTheDocument()
})
