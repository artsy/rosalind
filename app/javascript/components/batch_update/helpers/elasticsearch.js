const defaultPageSize = 100
const DEBUG = false

const SORT_CLAUSES = {
  MERCHANDISABILITY: { merchandisability: 'desc' },
  RECENTLY_PUBLISHED: { published_at: 'desc' },
}

export function buildElasticsearchQuery(args) {
  const {
    acquireableOrOfferableFilter,
    artists,
    attributionClass,
    createdAfterDate,
    createdBeforeDate,
    fair,
    forSaleFilter,
    from,
    genes,
    keywords,
    maxPrice,
    minPrice,
    partner,
    publishedFilter,
    restrictedArtworkIDs,
    size,
    sort,
    tags,
  } = args

  const geneMatches = genes.map(g => {
    return { match: { 'genes.raw': g.name } }
  })

  const tagMatches = tags.map(t => {
    return { match: { 'tags.raw': t.name } }
  })

  const artistMatches = artists.map(a => {
    return { match: { artist_id: a.id } }
  })

  const filterMatches = buildFilterMatches({
    publishedFilter,
    acquireableOrOfferableFilter,
    forSaleFilter,
  })

  const partnerMatch = partner ? { match: { partner_id: partner.id } } : null

  const fairMatch = fair ? { match: { fair_ids: fair.id } } : null

  const attributionClassMatch = attributionClass
    ? { match: { attribution: attributionClass.value } }
    : null

  const priceMatch =
    minPrice || maxPrice ? buildPriceMatch({ minPrice, maxPrice }) : null

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

  const artworkIDsRestrictionFilter =
    restrictedArtworkIDs && restrictedArtworkIDs.length > 0
      ? {
          filter: {
            terms: { id: restrictedArtworkIDs },
          },
        }
      : undefined

  const sortClause = buildSort(sort)

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
          priceMatch,
          createdDateRange,
        ].filter(m => m !== null),
        ...artworkIDsRestrictionFilter,
      },
    },
    sort: sortClause,
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

const buildSort = sort => {
  return [SORT_CLAUSES[sort], { id: 'desc' }]
}

const buildFilterMatches = ({
  publishedFilter,
  acquireableOrOfferableFilter,
  forSaleFilter,
}) => [
  publishedMatcher(publishedFilter),
  acquireableOrOfferableMatcher(acquireableOrOfferableFilter),
  forSaleMatcher(forSaleFilter),
]

const buildPriceMatch = ({ minPrice, maxPrice }) => ({
  range: {
    prices: {
      gte: minPrice,
      lte: maxPrice,
    },
  },
})

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

const acquireableOrOfferableMatcher = acquireableOrOfferableFilter => {
  switch (acquireableOrOfferableFilter) {
    case 'SHOW_ACQUIREABLE_OR_OFFERABLE':
      return {
        bool: {
          should: [
            { term: { offerable: true } },
            { term: { acquireable: true } },
          ],
        },
      }
    case 'SHOW_NOT_ACQUIREABLE_OR_OFFERABLE':
      return {
        bool: {
          must: [
            { term: { offerable: false } },
            { term: { acquireable: false } },
          ],
        },
      }
    default:
      return null
  }
}

const forSaleMatcher = forSaleFilter => {
  switch (forSaleFilter) {
    case 'SHOW_FOR_SALE':
      return { match: { for_sale: true } }
    case 'SHOW_NOT_FOR_SALE':
      return { match: { for_sale: false } }
    default:
      return null
  }
}
