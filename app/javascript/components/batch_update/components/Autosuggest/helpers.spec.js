import React from 'react'
import { getSuggestionValue, renderSuggestion } from './helpers'

const suggestion = { id: 'kawaii', name: 'Kawaii' }

describe('getSuggestionValue', () => {
  it('returns the gene name', () => {
    const expected = 'Kawaii'
    const actual = getSuggestionValue(suggestion)
    expect(actual).toEqual(expected)
  })
})

describe('renderSuggestion', () => {
  it('returns markup containing the gene name', () => {
    const expected = <div>Kawaii</div>
    const actual = renderSuggestion(suggestion)
    expect(actual).toEqual(expected)
  })
})
