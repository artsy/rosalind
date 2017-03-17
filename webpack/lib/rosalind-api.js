export const matchTags = function (term) {
  const uri = `/match/tags?term=${term}`
  return window.fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(tags => tags.map(({ id, name }) => ({ id, name })))
    .catch((err) => {
      console.error(err)
    })
}

export const matchGenes = function (term) {
  const uri = `/match/genes?term=${term}`
  return window.fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(genes => genes.map(({ id, name }) => ({ id, name })))
    .catch((err) => {
      console.error(err)
    })
}

export const matchPartners = function (term) {
  const uri = `/match/partners?term=${term}`
  return window.fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(partners => partners.map(({ id: slug, _id: id, name }) => ({ id, slug, name })))
    .catch((err) => {
      console.error(err)
    })
}

export const matchFairs = function (term) {
  const uri = `/match/fairs?term=${term}`
  return window.fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(fairs => fairs.map(({ id: slug, _id: id, name }) => ({ id, slug, name })))
    .catch((err) => {
      console.error(err)
    })
}

export const matchArtworks = function (esQuery) {
  const queryJSON = JSON.stringify(esQuery)
  // console.log(`fetching: ${queryJSON}`)
  const uri = `/match/artworks?query=${encodeURIComponent(queryJSON)}`
  return window.fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(esResponse => esResponse.hits.hits.map(hit => hit._source))
    .catch((err) => {
      console.error(err)
    })
}
