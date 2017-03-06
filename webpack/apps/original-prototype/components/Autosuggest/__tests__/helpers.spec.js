import React from 'react'
import { getGeneSuggestionValue, renderGeneSuggestion } from '../helpers'

const geneSuggestion = {id: 'kawaii', name: 'Kawaii'}

describe('getGeneSuggestionValue', () => {
  it('returns the gene name', () => {
    const expected = 'Kawaii'
    const actual = getGeneSuggestionValue(geneSuggestion)
    expect(actual).toEqual(expected)
  })
})

describe('renderGeneSuggestion', () => {
  it('returns markup containing the gene name', () => {
    const expected = <div>Kawaii</div>
    const actual = renderGeneSuggestion(geneSuggestion)
    expect(actual).toEqual(expected)
  })
})
