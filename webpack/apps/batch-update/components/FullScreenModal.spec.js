import React from 'react'
import renderer from 'react-test-renderer'
import FullScreenModal from './FullScreenModal'

it('renders correctly when closed', () => {
  const rendered = renderer.create(
    <FullScreenModal>
      I am closed
    </FullScreenModal>
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly when open', () => {
  const rendered = renderer.create(
    <FullScreenModal isOpen>
      I am open
    </FullScreenModal>
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
