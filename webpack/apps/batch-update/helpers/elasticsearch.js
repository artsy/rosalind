const defaultPageSize = 100

export function buildElasticsearchQuery (args) {
  const {
    createdAfterDate,
    createdBeforeDate,
    fair,
    from,
    genes,
    genomedFilter,
    partner,
    publishedFilter,
    size,
    tags
  } = args

  const geneMatches = genes.map(g => { return { 'match': { 'genes': g.name } } })
  const tagMatches = tags.map(t => { return { 'match': { 'tags': t.name } } })
  const filterMatches = buildFilterMatches({ publishedFilter, genomedFilter })
  const partnerMatch = partner ? { 'match': { 'partner_id': partner.id } } : null
  const fairMatch = fair ? { 'match': { 'fair_ids': fair.id } } : null
  const createdDateRange = buildCreatedDateRange({createdAfterDate, createdBeforeDate})

  return {
    'query': {
      'bool': {
        'must': [
          { 'match': { 'deleted': false } },
          ...geneMatches,
          ...tagMatches,
          ...filterMatches,
          partnerMatch,
          fairMatch,
          createdDateRange
        ].filter(m => m !== null)
      }
    },
    'sort': [
      { 'published_at': 'desc' },
      { 'id': 'desc' }
    ],
    'from': from || 0,
    'size': size || defaultPageSize
  }
}

const buildCreatedDateRange = ({createdAfterDate, createdBeforeDate}) => {
  if (!createdAfterDate && !createdBeforeDate) {
    return null
  }

  const query = {
    'range': {
      'created_at': { }
    }
  }

  if (createdBeforeDate) {
    query.range.created_at.lte = createdBeforeDate
  }

  if (createdAfterDate) {
    query.range.created_at.gte = createdAfterDate
  }

  return query
}

const buildFilterMatches = ({ publishedFilter, genomedFilter }) => (
  [
    publishedMatcher(publishedFilter),
    genomedMatcher(genomedFilter)
  ]
)

const publishedMatcher = (publishedFilter) => {
  switch (publishedFilter) {
    case 'SHOW_PUBLISHED':
      return { 'match': { 'published': true } }
    case 'SHOW_NOT_PUBLISHED':
      return { 'match': { 'published': false } }
    default:
      return null
  }
}

const genomedMatcher = (genomedFilter) => {
  switch (genomedFilter) {
    case 'SHOW_GENOMED':
      return { 'match': { 'genomed': true } }
    case 'SHOW_NOT_GENOMED':
      return { 'match': { 'genomed': false } }
    default:
      return null
  }
}
