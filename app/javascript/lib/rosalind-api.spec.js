import 'whatwg-fetch'
import {
  matchGenes,
  matchTags,
  matchPartners,
  matchFairs,
  matchArtworks,
  submitBatchUpdate,
} from './rosalind-api'

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const p = new Promise(() => {})
  window.fetch = jest.fn(() => p)
})

describe('matchGenes', () => {
  it('fetches the expected url', () => {
    const term = 'kawaii'

    matchGenes(term)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch('/match/genes?term=kawaii')
  })
})

describe('matchTags', () => {
  it('fetches the expected url', () => {
    const term = 'animal'

    matchTags(term)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch('/match/tags?term=animal')
  })
})

describe('matchPartners', () => {
  it('fetches the expected url', () => {
    const term = 'gagosian'

    matchPartners(term)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch('/match/partners?term=gagosian')
  })
})

describe('matchFairs', () => {
  it('fetches the expected url', () => {
    const term = 'frieze'

    matchFairs(term)

    const fetchedURI = window.fetch.mock.calls[0][0]
    expect(fetchedURI).toMatch('/match/fairs?term=frieze')
  })
})

describe('matchArtworks', () => {
  it('fetches the expected url', () => {
    const query = {
      query: { bool: { must: [{ match: { genes: 'Kawaii' } }] } },
    }

    matchArtworks(query)

    const fetchedURI = window.fetch.mock.calls[0][0]
    const postBody = JSON.parse(window.fetch.mock.calls[0][1].body)

    expect(fetchedURI).toMatch(`/match/artworks`)
    expect(postBody.query).toEqual(JSON.stringify(query))
  })
})

describe('submitBatchUpdate', () => {
  let artworkIds, geneValues, tags, csrfToken

  beforeEach(() => {
    artworkIds = ['a', 'b', 'c']
    geneValues = { Kawaii: 70, Animals: 0 }
    tags = { toAdd: ['foo', 'bar'], toRemove: ['baz'] }
    csrfToken =
      'SECRET is a funny looking word after you stare at it for a while'

    submitBatchUpdate(artworkIds, { genes: geneValues, tags: tags }, csrfToken)
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
        genes: geneValues,
        tags: tags,
      },
    })
    const fetchOptions = window.fetch.mock.calls[0][1]
    const actualPayload = fetchOptions.body
    expect(actualPayload).toEqual(expectedPayload)
  })

  it('sends the payload as json', () => {
    const fetchOptions = window.fetch.mock.calls[0][1]
    const headers = fetchOptions.headers
    expect(headers).toMatchObject({
      'Content-Type': 'application/json',
    })
  })

  it('includes a forgery token header', () => {
    const fetchOptions = window.fetch.mock.calls[0][1]
    const headers = fetchOptions.headers
    expect(headers).toMatchObject({
      'X-CSRF-Token': csrfToken,
    })
  })
})
