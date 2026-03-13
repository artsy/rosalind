import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import FullScreenModal from './FullScreenModal'

it('renders correctly when closed', () => {
  const { asFragment } = render(<FullScreenModal>I am closed</FullScreenModal>)
  expect(asFragment()).toMatchSnapshot()
})

it('renders correctly when open', () => {
  const { asFragment } = render(
    <FullScreenModal isOpen>I am open</FullScreenModal>
  )
  expect(asFragment()).toMatchSnapshot()
})

describe('body scrolling', () => {
  let addSpy, removeSpy

  beforeEach(() => {
    addSpy = jest.spyOn(document.body.classList, 'add')
    removeSpy = jest.spyOn(document.body.classList, 'remove')
  })

  afterEach(() => {
    addSpy.mockRestore()
    removeSpy.mockRestore()
  })

  it('temporarily assigns a no-scroll css selector to the <body> element', () => {
    const { rerender } = render(
      <FullScreenModal>No scrolling, not in my house.</FullScreenModal>
    )

    rerender(
      <FullScreenModal isOpen>No scrolling, not in my house.</FullScreenModal>
    )
    expect(addSpy).toHaveBeenCalledWith('FullScreenModal--open')

    rerender(<FullScreenModal>No scrolling, not in my house.</FullScreenModal>)
    expect(removeSpy).toHaveBeenCalledWith('FullScreenModal--open')
  })
})
