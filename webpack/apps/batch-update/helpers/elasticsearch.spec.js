import { buildElasticsearchQuery } from './elasticsearch'

describe('buildElasticsearchQuery', () => {
  let genes,
    createdAfterDate,
    createdBeforeDate,
    tags,
    partner,
    fair,
    publishedFilter,
    genomedFilter

  beforeEach(() => {
    createdAfterDate = null
    createdBeforeDate = null
    genes = []
    tags = []
    partner = null
    fair = null
    publishedFilter = null
    genomedFilter = null
  })

  describe('main search criteria', () => {
    it('builds a query from the supplied genes', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
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

    it('builds a query from the supplied partner', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
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
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, genomedFilter, size })
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('builds a query requesting the specified offset', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
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
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, genomedFilter, from })
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with a createdAfterDate', () => {
      createdAfterDate = 'a-real-date'

      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
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
