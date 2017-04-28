const defaultPageSize = 100

export function buildElasticsearchQuery ({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter, from, publishedDate, size }) {
  const geneMatches = genes.map(g => { return { 'match': { 'genes': g.name } } })
  const tagMatches = tags.map(t => { return { 'match': { 'tags': t.name } } })
  const filterMatches = buildFilterMatches({ publishedFilter, deletedFilter, genomedFilter })
  const partnerMatch = partner ? { 'match': { 'partner_id': partner.id } } : null
  const fairMatch = fair ? { 'match': { 'fair_ids': fair.id } } : null
  const publishedDateRange = publishedDate ? { 'range' : { 'published_at' : publishedDate } } : null
  return {
    'query': {
      'bool': {
        'must': [
          ...geneMatches,
          ...tagMatches,
          ...filterMatches,
          partnerMatch,
          fairMatch,
          publishedDateRange
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

const buildFilterMatches = ({ publishedFilter, deletedFilter, genomedFilter }) => (
  [
    publishedMatcher(publishedFilter),
    deletedMatcher(deletedFilter),
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

const deletedMatcher = (deletedFilter) => {
  switch (deletedFilter) {
    case 'SHOW_DELETED':
      return { 'match': { 'deleted': true } }
    case 'SHOW_NOT_DELETED':
      return { 'match': { 'deleted': false } }
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
