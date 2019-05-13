import 'whatwg-fetch'

export const matchTags = function(term) {
  const uri = `/match/tags?term=${term}`
  return window
    .fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(tags => tags.map(({ id, name }) => ({ id, name })))
    .catch(err => {
      console.error(err)
    })
}

export const matchGenes = function(term) {
  const uri = `/match/genes?term=${term}`
  return window
    .fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(genes => genes.map(({ id, name }) => ({ id, name })))
    .catch(err => {
      console.error(err)
    })
}

export const matchPartners = function(term) {
  const uri = `/match/partners?term=${term}`
  return window
    .fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(partners =>
      partners.map(({ id: slug, _id: id, name }) => ({ id, slug, name }))
    )
    .catch(err => {
      console.error(err)
    })
}

export const matchFairs = function(term) {
  const uri = `/match/fairs?term=${term}`
  return window
    .fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(fairs =>
      fairs.map(({ id: slug, _id: id, name }) => ({ id, slug, name }))
    )
    .catch(err => {
      console.error(err)
    })
}

export const matchArtists = function(term) {
  const uri = `/match/artists?term=${term}`
  return window
    .fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(artists =>
      artists.map(({ id: slug, _id: id, name }) => ({ id, slug, name }))
    )
    .catch(err => {
      console.error(err)
    })
}

export const matchArtworks = function(esQuery) {
  const queryJSON = JSON.stringify(esQuery)
  const uri = `/match/artworks?query=${encodeURIComponent(queryJSON)}`
  return window
    .fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(esResponse => {
      return esResponse.hits
    })
    .catch(err => {
      console.error(err)
    })
}

export const submitBatchUpdate = function(artworkIds, genes, csrfToken) {
  const uri = '/batch_updates'
  const payload = JSON.stringify({
    batch_update: {
      artworks: artworkIds,
      genes: genes,
    },
  })
  const headers = {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json',
  }
  const options = {
    method: 'POST',
    headers: headers,
    body: payload,
    credentials: 'same-origin',
  }
  return window.fetch(uri, options)
}

export const fetchArtwork = function(artworkId) {
  const uri = `/artworks/${artworkId}`
  return window
    .fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .catch(err => {
      console.error(err)
    })
}
