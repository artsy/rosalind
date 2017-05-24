import 'whatwg-fetch'
import {
  matchGenes,
  matchTags,
  matchPartners,
  matchFairs,
  matchArtworks,
  submitBatchUpdate
} from './rosalind-api'

beforeEach(() => {
  const p = new Promise(() => {})
  window.fetch = jest.fn(() => p)
})

describe('matchGenes', () => {
  it('fetches the expected url', () => {
    const term = 'kawaii'

    matchGenes(term)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch(`/match/genes?term=kawaii`)
  })
})

describe('matchTags', () => {
  it('fetches the expected url', () => {
    const term = 'animal'

    matchTags(term)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch(`/match/tags?term=animal`)
  })
})

describe('matchPartners', () => {
  it('fetches the expected url', () => {
    const term = 'gagosian'

    matchPartners(term)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch(`/match/partners?term=gagosian`)
  })
})

describe('matchFairs', () => {
  it('fetches the expected url', () => {
    const term = 'frieze'

    matchFairs(term)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch(`/match/fairs?term=frieze`)
  })
})

describe('matchArtworks', () => {
  it('fetches the expected url', () => {
    const query = {'query': {'bool': {'must': [{'match': {'genes': 'Kawaii'}}]}}}
    const encodedQuery = encodeURIComponent(JSON.stringify(query))

    matchArtworks(query)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch(`/match/artworks?query=${encodedQuery}`)
  })
})

describe('submitBatchUpdate', () => {
  let artworkIds, geneValues

  beforeEach(() => {
    artworkIds = [ 'a', 'b', 'c' ]
    geneValues = { 'Kawaii': 70, 'Animals': 0 }

    submitBatchUpdate(artworkIds, geneValues)
  })

  it('fetches the expected url', () => {
    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch('/batch_updates')
  })

  it('makes a POST request', () => {
    const fetchOptions = window.fetch.mock.calls[0][1]
    const method = fetchOptions.method
    expect(method).toMatch(/post/i)
  })

  it('sends the expected payload', () => {
    const expectedPayload = JSON.stringify({
      batch_update: {
        artworks: artworkIds,
        genes: geneValues
      }
    })
    const fetchOptions = window.fetch.mock.calls[0][1]
    const actualPayload = fetchOptions.body
    expect(actualPayload).toEqual(expectedPayload)
  })
})
