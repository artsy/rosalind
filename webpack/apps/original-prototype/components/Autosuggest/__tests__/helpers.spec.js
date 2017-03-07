import React from 'react'
import { getGeneSuggestionValue, renderGeneSuggestion, getTagSuggestionValue, renderTagSuggestion, getPartnerSuggestionValue, renderPartnerSuggestion, getFairSuggestionValue, renderFairSuggestion } from '../helpers'

const geneSuggestion = {id: 'kawaii', name: 'Kawaii'}
const tagSuggestion = {id: 'clown', name: 'Clown'}
const partnerSuggestion = {id: 'gagosian', name: 'Gagosian'}
const fairSuggestion = {id: 'frieze', name: 'Frieze'}

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

describe('getTagSuggestionValue', () => {
  it('returns the tag name', () => {
    const expected = 'Clown'
    const actual = getTagSuggestionValue(tagSuggestion)
    expect(actual).toEqual(expected)
  })
})

describe('renderTagSuggestion', () => {
  it('returns markup containing the tag name', () => {
    const expected = <div>Clown</div>
    const actual = renderTagSuggestion(tagSuggestion)
    expect(actual).toEqual(expected)
  })
})

describe('getPartnerSuggestionValue', () => {
  it('returns the partner name', () => {
    const expected = 'Gagosian'
    const actual = getPartnerSuggestionValue(partnerSuggestion)
    expect(actual).toEqual(expected)
  })
})

describe('renderPartnerSuggestion', () => {
  it('returns markup containing the partner name', () => {
    const expected = <div>Gagosian</div>
    const actual = renderPartnerSuggestion(partnerSuggestion)
    expect(actual).toEqual(expected)
  })
})

describe('getFairSuggestionValue', () => {
  it('returns the fair name', () => {
    const expected = 'Frieze'
    const actual = getFairSuggestionValue(fairSuggestion)
    expect(actual).toEqual(expected)
  })
})

describe('renderFairSuggestion', () => {
  it('returns markup containing the fair name', () => {
    const expected = <div>Frieze</div>
    const actual = renderFairSuggestion(fairSuggestion)
    expect(actual).toEqual(expected)
  })
})
