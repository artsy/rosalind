import { buildElasticsearchQuery } from './elasticsearch'

describe('buildElasticsearchQuery', () => {
  let params

  beforeEach(() => {
    params = {
      artists: [],
      attributionClass: null,
      createdAfterDate: null,
      createdBeforeDate: null,
      fair: null,
      forSaleFilter: null,
      genes: [],
      keywords: [],
      maxPrice: null,
      minPrice: null,
      partner: null,
      publishedFilter: null,
      tags: [],
    }
  })

  it('queries only for non-deleted works', () => {
    const expectedQuery = {
      query: {
        bool: {
          must: [{ match: { deleted: false } }],
        },
      },
      from: 0,
      size: 100,
      sort: [{ published_at: 'desc' }, { id: 'desc' }],
    }

    const actualQuery = buildElasticsearchQuery(params)
    expect(actualQuery).toEqual(expectedQuery)
  })

  describe('main search criteria', () => {
    it('builds a query from the supplied genes', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { 'genes.raw': 'Gene 1' } },
              { match: { 'genes.raw': 'Gene 2' } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.genes = [
        { id: 'gene1', name: 'Gene 1' },
        { id: 'gene2', name: 'Gene 2' },
      ]

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied keywords', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                multi_match: {
                  type: 'most_fields',
                  fields: [
                    'name.*',
                    'genes.*^4',
                    'tags.*^4',
                    'auto_tags.*^2',
                    'partner_name.*^2',
                    'artist_name.*^2',
                  ],
                  query: 'sherman',
                  operator: 'and',
                },
              },
              {
                multi_match: {
                  type: 'most_fields',
                  fields: [
                    'name.*',
                    'genes.*^4',
                    'tags.*^4',
                    'auto_tags.*^2',
                    'partner_name.*^2',
                    'artist_name.*^2',
                  ],
                  query: 'film still',
                  operator: 'and',
                },
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.keywords = ['sherman', 'film still']

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied tags', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { 'tags.raw': 'Tag 1' } },
              { match: { 'tags.raw': 'Tag 2' } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.tags = [
        { id: 'tag1', name: 'Tag 1' },
        { id: 'tag2', name: 'Tag 2' },
      ]

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied artists', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { artist_id: 'artistId1' } },
              { match: { artist_id: 'artistId2' } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.artists = [
        { id: 'artistId1', name: 'Artist 1' },
        { id: 'artistId2', name: 'Artist 2' },
      ]

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied partner', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { partner_id: 'some-partner' } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.partner = { id: 'some-partner', name: 'Some Partner' }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied fair', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { fair_ids: 'some-fair' } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.fair = { id: 'some-fair', name: 'Some Fair' }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied attribution class', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { attribution: 'ephemera' } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.attributionClass = { name: 'Ephemera', value: 'ephemera' }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query requesting the specified page size', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { 'genes.raw': 'Gene 1' } },
            ],
          },
        },
        from: 0,
        size: 11,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.genes = [{ id: 'gene1', name: 'Gene 1' }]
      params.size = 11
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query requesting the specified offset', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { 'genes.raw': 'Gene 1' } },
            ],
          },
        },
        from: 111,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.genes = [{ id: 'gene1', name: 'Gene 1' }]
      params.from = 111

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdAfterDate', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  created_at: {
                    gte: '2013-01-01',
                  },
                },
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.createdAfterDate = '2013-01-01'

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdBeforeDate', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  created_at: {
                    lte: '2014-01-01',
                  },
                },
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.createdBeforeDate = '2014-01-01'

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdAfterDate and a createdBeforeDate', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  created_at: {
                    gte: '2013-01-01',
                    lte: '2014-01-01',
                  },
                },
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.createdAfterDate = '2013-01-01'
      params.createdBeforeDate = '2014-01-01'

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a minPrice', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  prices: {
                    gte: 1000,
                    lte: null,
                  },
                },
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.minPrice = 1000

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a maxPrice', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  prices: {
                    gte: null,
                    lte: 1000,
                  },
                },
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.maxPrice = 1000

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with both a minPrice and a maxPrice', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  prices: {
                    gte: 1000,
                    lte: 2000,
                  },
                },
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.minPrice = 1000
      params.maxPrice = 2000

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
  })

  describe('status filters', () => {
    beforeEach(() => {
      params.genes = [{ id: 'gene1', name: 'Gene 1' }]
    })

    it('modifies a query with the value of the "published" filter', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { 'genes.raw': 'Gene 1' } },
              { match: { published: true } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.publishedFilter = 'SHOW_PUBLISHED'

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with the value of the "acquireable or offerable" filter', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { 'genes.raw': 'Gene 1' } },
              {
                bool: {
                  should: [
                    { term: { offerable: true } },
                    { term: { acquireable: true } },
                  ],
                },
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }

      params.acquireableOrOfferableFilter = 'SHOW_ACQUIREABLE_OR_OFFERABLE'

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
  })
})
