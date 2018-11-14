import { buildElasticsearchQuery } from './elasticsearch'

describe('buildElasticsearchQuery', () => {
  let genes,
    createdAfterDate,
    createdBeforeDate,
    tags,
    artists,
    partner,
    fair,
    publishedFilter,
    genomedFilter

  beforeEach(() => {
    createdAfterDate = null
    createdBeforeDate = null
    genes = []
    tags = []
    artists = []
    partner = null
    fair = null
    publishedFilter = null
    genomedFilter = null
  })

  it('queries only for non-deleted works', () => {
    const expectedQuery = {
      'query': {
        'bool': {
          'must': [
            {'match': {'deleted': false}}
          ]
        }
      },
      'from': 0,
      'size': 100,
      'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
    }

    const params = {
      artists,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      genomedFilter,
      partner,
      publishedFilter,
      tags
    }
    const actualQuery = buildElasticsearchQuery(params)
    expect(actualQuery).toEqual(expectedQuery)
  })

  describe('main search criteria', () => {
    it('builds a query from the supplied genes', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'genes': 'Gene 1'}},
              {'match': {'genes': 'Gene 2'}}
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      genes = [
        {id: 'gene1', name: 'Gene 1'},
        {id: 'gene2', name: 'Gene 2'}
      ]

      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied tags', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'tags': 'Tag 1'}},
              {'match': {'tags': 'Tag 2'}}
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      tags = [
        {id: 'tag1', name: 'Tag 1'},
        {id: 'tag2', name: 'Tag 2'}
      ]

      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied artists', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'artist_id': 'artistId1'}},
              {'match': {'artist_id': 'artistId2'}}
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      artists = [
        {id: 'artistId1', name: 'Artist 1'},
        {id: 'artistId2', name: 'Artist 2'}
      ]

      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        keywords,
        partner,
        publishedFilter,
        tags
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied partner', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'partner_id': 'some-partner'}}
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      partner = {id: 'some-partner', name: 'Some Partner'}
      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query from the supplied fair', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'fair_ids': 'some-fair'}}
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      fair = {id: 'some-fair', name: 'Some Fair'}
      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query requesting the specified page size', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'genes': 'Gene 1'}}
            ]
          }
        },
        'from': 0,
        'size': 11,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      genes = [{id: 'gene1', name: 'Gene 1'}]
      const size = 11
      const actualQuery = buildElasticsearchQuery({
        artists,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        size,
        tags
      })
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query requesting the specified offset', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'genes': 'Gene 1'}}
            ]
          }
        },
        'from': 111,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      genes = [{id: 'gene1', name: 'Gene 1'}]
      const from = 111
      const actualQuery = buildElasticsearchQuery({
        artists,
        fair,
        from,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags,
      })
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdAfterDate', () => {
      createdAfterDate = 'a-real-date'

      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {
                'range': {
                  'created_at': {
                    'gte': createdAfterDate
                  }
                }
              }
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }

      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdBeforeDate', () => {
      createdBeforeDate = 'a-real-date'

      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {
                'range': {
                  'created_at': {
                    'lte': createdBeforeDate
                  }
                }
              }
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }

      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdAfterDate and a createdBeforeDate', () => {
      createdAfterDate = 'a-real-date'
      createdBeforeDate = 'another-real-date'

      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {
                'range': {
                  'created_at': {
                    'gte': createdAfterDate,
                    'lte': createdBeforeDate
                  }
                }
              }
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }

      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }

      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
  })

  describe('status filters', () => {
    beforeEach(() => {
      genes = [{id: 'gene1', name: 'Gene 1'}]
    })

    it('modifies a query with the value of the "published" filter', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'genes': 'Gene 1'}},
              {'match': {'published': true}}
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      publishedFilter = 'SHOW_PUBLISHED'
      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with the value of the "genomed" filter', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'deleted': false}},
              {'match': {'genes': 'Gene 1'}},
              {'match': {'genomed': true}}
            ]
          }
        },
        'from': 0,
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      genomedFilter = 'SHOW_GENOMED'
      const params = {
        artists,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        tags
      }
      const actualQuery = buildElasticsearchQuery(params)
      expect(actualQuery).toEqual(expectedQuery)
    })
  })
})
