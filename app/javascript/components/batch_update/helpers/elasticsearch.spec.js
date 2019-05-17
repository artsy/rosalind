import { buildElasticsearchQuery } from './elasticsearch'

describe('buildElasticsearchQuery', () => {
  let genes,
    createdAfterDate,
    createdBeforeDate,
    tags,
    keywords,
    artists,
    acquireableOrOfferableFilter,
    partner,
    fair,
    attributionClass,
    publishedFilter,
    genomedFilter,
    minPrice,
    maxPrice

  beforeEach(() => {
    createdAfterDate = null
    createdBeforeDate = null
    keywords = []
    genes = []
    tags = []
    artists = []
    partner = null
    fair = null
    attributionClass = null
    publishedFilter = null
    genomedFilter = null
    minPrice = null
    maxPrice = null
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

    const params = {
      artists,
      attributionClass,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      genomedFilter,
      keywords,
      partner,
      publishedFilter,
      tags,
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
              { match: { genes: 'Gene 1' } },
              { match: { genes: 'Gene 2' } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }
      genes = [{ id: 'gene1', name: 'Gene 1' }, { id: 'gene2', name: 'Gene 2' }]

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
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
      keywords = ['sherman', 'film still']

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied tags', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { tags: 'Tag 1' } },
              { match: { tags: 'Tag 2' } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }
      tags = [{ id: 'tag1', name: 'Tag 1' }, { id: 'tag2', name: 'Tag 2' }]

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
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
      artists = [
        { id: 'artistId1', name: 'Artist 1' },
        { id: 'artistId2', name: 'Artist 2' },
      ]

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
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
      partner = { id: 'some-partner', name: 'Some Partner' }
      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
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
      fair = { id: 'some-fair', name: 'Some Fair' }
      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
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
      attributionClass = { name: 'Ephemera', value: 'ephemera' }
      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query requesting the specified page size', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { genes: 'Gene 1' } },
            ],
          },
        },
        from: 0,
        size: 11,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }
      genes = [{ id: 'gene1', name: 'Gene 1' }]
      const size = 11
      const actualQuery = buildElasticsearchQuery({
        artists,
        attributionClass,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        size,
        tags,
      })
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query requesting the specified offset', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { genes: 'Gene 1' } },
            ],
          },
        },
        from: 111,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }
      genes = [{ id: 'gene1', name: 'Gene 1' }]
      const from = 111
      const actualQuery = buildElasticsearchQuery({
        artists,
        attributionClass,
        fair,
        from,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      })
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdAfterDate', () => {
      createdAfterDate = 'a-real-date'

      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  created_at: {
                    gte: createdAfterDate,
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

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdBeforeDate', () => {
      createdBeforeDate = 'a-real-date'

      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  created_at: {
                    lte: createdBeforeDate,
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

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdAfterDate and a createdBeforeDate', () => {
      createdAfterDate = 'a-real-date'
      createdBeforeDate = 'another-real-date'

      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  created_at: {
                    gte: createdAfterDate,
                    lte: createdBeforeDate,
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

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
    it('modifies a query with a minPrice', () => {
      minPrice = 1000

      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  prices: {
                    gte: minPrice,
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

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
        minPrice,
        maxPrice,
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
    it('modifies a query with a maxPrice', () => {
      maxPrice = 1000

      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  prices: {
                    gte: null,
                    lte: maxPrice,
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

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
        minPrice,
        maxPrice,
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
    it('modifies a query with both a minPrice and a maxPrice', () => {
      minPrice = 1000
      maxPrice = 2000

      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              {
                range: {
                  prices: {
                    gte: minPrice,
                    lte: maxPrice,
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

      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
        minPrice,
        maxPrice,
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
  })

  describe('status filters', () => {
    beforeEach(() => {
      genes = [{ id: 'gene1', name: 'Gene 1' }]
    })

    it('modifies a query with the value of the "published" filter', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { genes: 'Gene 1' } },
              { match: { published: true } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }
      publishedFilter = 'SHOW_PUBLISHED'
      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with the value of the "genomed" filter', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { genes: 'Gene 1' } },
              { match: { genomed: true } },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }
      genomedFilter = 'SHOW_GENOMED'
      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags,
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with the value of the "acquireable or offerable" filter', () => {
      const expectedQuery = {
        query: {
          bool: {
            must: [
              { match: { deleted: false } },
              { match: { genes: 'Gene 1' } },
              {
                or: [
                  { term: { offerable: true } },
                  { term: { acquireable: true } },
                ],
              },
            ],
          },
        },
        from: 0,
        size: 100,
        sort: [{ published_at: 'desc' }, { id: 'desc' }],
      }
      acquireableOrOfferableFilter = 'SHOW_ACQUIREABLE_OR_OFFERABLE'
      const params = {
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        acquireableOrOfferableFilter,
        partner,
        publishedFilter,
        tags,
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
  })
})
