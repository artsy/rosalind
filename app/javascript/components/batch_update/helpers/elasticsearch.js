const defaultPageSize = 100
const DEBUG = false

export function buildElasticsearchQuery(args) {
  const {
    artists,
    attributionClass,
    createdAfterDate,
    createdBeforeDate,
    fair,
    from,
    genes,
    genomedFilter,
    keywords,
    partner,
    publishedFilter,
    size,
    tags,
  } = args

  const geneMatches = genes.map(g => {
    return { match: { genes: g.name } }
  })
  const tagMatches = tags.map(t => {
    return { match: { tags: t.name } }
  })
  const artistMatches = artists.map(a => {
    return { match: { artist_id: a.id } }
  })
  const filterMatches = buildFilterMatches({ publishedFilter, genomedFilter })
  const partnerMatch = partner ? { match: { partner_id: partner.id } } : null
  const fairMatch = fair ? { match: { fair_ids: fair.id } } : null
  const attributionClassMatch = attributionClass
    ? { match: { attribution: attributionClass.value } }
    : null
  const createdDateRange = buildCreatedDateRange({
    createdAfterDate,
    createdBeforeDate,
  })

  // Modeled after Gravity's keyword query in
  // https://github.com/artsy/gravity/blob/56d10ed6084065ab8ed4838a72203f8d45368fd9/app/models/search/queries/artwork_filtered_query.rb#L82-L86
  const keywordMatches = keywords.map(k => {
    return {
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
        query: k,
        operator: 'and',
      },
    }
  })

  const query = {
    query: {
      bool: {
        must: [
          { match: { deleted: false } },
          ...keywordMatches,
          ...geneMatches,
          ...tagMatches,
          ...artistMatches,
          ...filterMatches,
          partnerMatch,
          fairMatch,
          attributionClassMatch,
          createdDateRange,
        ].filter(m => m !== null),
      },
    },
    sort: [{ published_at: 'desc' }, { id: 'desc' }],
    from: from || 0,
    size: size || defaultPageSize,
  }

  if (DEBUG) {
    console.log(JSON.stringify(query, null, 2))
  }
  return query
}

const buildCreatedDateRange = ({ createdAfterDate, createdBeforeDate }) => {
  if (!createdAfterDate && !createdBeforeDate) {
    return null
  }

  const query = {
    range: {
      created_at: {},
    },
  }

  if (createdBeforeDate) {
    query.range.created_at.lte = createdBeforeDate
  }

  if (createdAfterDate) {
    query.range.created_at.gte = createdAfterDate
  }

  return query
}

const buildFilterMatches = ({ publishedFilter, genomedFilter }) => [
  publishedMatcher(publishedFilter),
  genomedMatcher(genomedFilter),
]

const publishedMatcher = publishedFilter => {
  switch (publishedFilter) {
    case 'SHOW_PUBLISHED':
      return { match: { published: true } }
    case 'SHOW_NOT_PUBLISHED':
      return { match: { published: false } }
    default:
      return null
  }
}

const genomedMatcher = genomedFilter => {
  switch (genomedFilter) {
    case 'SHOW_GENOMED':
      return { match: { genomed: true } }
    case 'SHOW_NOT_GENOMED':
      return { match: { genomed: false } }
    default:
      return null
  }
}
