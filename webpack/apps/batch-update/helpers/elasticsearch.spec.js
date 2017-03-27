import { buildElasticsearchQuery } from './elasticsearch'

describe('buildElasticsearchQuery', () => {
  let genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter

  beforeEach(() => {
    genes = []
    tags = []
    partner = null
    fair = null
    publishedFilter = null
    deletedFilter = null
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
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      genes = [
        {id: 'gene1', name: 'Gene 1'},
        {id: 'gene2', name: 'Gene 2'}
      ]
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter })
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
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      tags = [
        {id: 'tag1', name: 'Tag 1'},
        {id: 'tag2', name: 'Tag 2'}
      ]
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter })
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
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      partner = {id: 'some-partner', name: 'Some Partner'}
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter })
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
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      fair = {id: 'some-fair', name: 'Some Fair'}
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter })
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
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      publishedFilter = 'SHOW_PUBLISHED'
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter })
      expect(actualQuery).toEqual(expectedQuery)
    })

    it('modifies a query with the value of the "deleted" filter', () => {
      const expectedQuery = {
        'query': {
          'bool': {
            'must': [
              {'match': {'genes': 'Gene 1'}},
              {'match': {'deleted': true}}
            ]
          }
        },
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      deletedFilter = 'SHOW_DELETED'
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter })
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
        'size': 100,
        'sort': [{'published_at': 'desc'}, {'id': 'desc'}]
      }
      genomedFilter = 'SHOW_GENOMED'
      const actualQuery = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter })
      expect(actualQuery).toEqual(expectedQuery)
    })
  })
})
