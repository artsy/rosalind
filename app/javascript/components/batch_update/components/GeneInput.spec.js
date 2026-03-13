import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'
import GeneInput from './GeneInput'

it('renders a null gene correctly', () => {
  const { asFragment } = render(<GeneInput name="Kawaii" value={null} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders a zero-valued gene correctly', () => {
  const { asFragment } = render(<GeneInput name="Kawaii" value={0} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders a positive-valued gene correctly', () => {
  const { asFragment } = render(<GeneInput name="Kawaii" value={70} />)
  expect(asFragment()).toMatchSnapshot()
})

it('accepts changes to the gene value via its <input> element', () => {
  const changeHandler = jest.fn()
  render(<GeneInput name="Kawaii" value={null} onChangeValue={changeHandler} />)
  const input = screen.getByRole('spinbutton')
  fireEvent.change(input, { target: { value: '70' } })
  expect(changeHandler).toHaveBeenCalledTimes(1)
  expect(changeHandler).toHaveBeenCalledWith({
    name: 'Kawaii',
    value: '70',
  })
})
