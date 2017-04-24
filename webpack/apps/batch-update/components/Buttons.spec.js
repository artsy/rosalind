import React from 'react'
import renderer from 'react-test-renderer'
import { Button, LinkButton } from './Buttons'

describe('Button', () => {
  it('renders a basic button', () => {
    const rendered = renderer.create(<Button>Click me</Button>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a primary button', () => {
    const rendered = renderer.create(<Button primary>Click me</Button>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a secondary button', () => {
    const rendered = renderer.create(<Button secondary>Click me</Button>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a full width button', () => {
    const rendered = renderer.create(<Button fullWidth>Click me</Button>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('LinkButton', () => {
  it('renders a basic button', () => {
    const rendered = renderer.create(<LinkButton>Click me</LinkButton>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a primary button', () => {
    const rendered = renderer.create(<LinkButton primary>Click me</LinkButton>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a secondary button', () => {
    const rendered = renderer.create(<LinkButton secondary>Click me</LinkButton>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a full width button', () => {
    const rendered = renderer.create(<LinkButton fullWidth>Click me</LinkButton>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
