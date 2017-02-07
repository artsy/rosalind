function matchTags (term) {
  const uri = `/match/tags?term=${term}`
  return window.fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(tags => tags.map(({ id, name }) => ({ id, name })))
    .catch((err) => {
      console.error(err)
    })
}

function matchGenes (term) {
  const uri = `/match/genes?term=${term}`
  return window.fetch(uri, { credentials: 'include' })
    .then(resp => resp.json())
    .then(genes => genes.map(({ id, name }) => ({ id, name })))
    .catch((err) => {
      console.error(err)
    })
}

export { matchTags, matchGenes }
