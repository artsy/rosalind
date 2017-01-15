import React from 'react'

import SearchForm from './SearchForm.js'
// import SearchResults from './SearchResults.js'
import './App.css'
// import { ELASTICSEARCH_HOST, ELASTICSEARCH_AUTH_HEADER } from './secrets.js'

// const findByName = (items, item) => items.find(i => i.name === item.name)
// const getArtworksFromResponse = (esResponse) => esResponse.hits.hits.map(hit => hit._source)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      genes: [],
      tags: [],
      filters: {
        published: null,
        deleted: null,
        genomed: null
      },
      artworks: [],
      previewedArtwork: null
    }
    // this.onRemoveGene = this.onRemoveGene.bind(this)
    // this.onAddGene = this.onAddGene.bind(this)
    // this.onRemoveTag = this.onRemoveTag.bind(this)
    // this.onAddTag = this.onAddTag.bind(this)
    // this.onUpdateFilter = this.onUpdateFilter.bind(this)
    // this.onPreviewArtwork = this.onPreviewArtwork.bind(this)
    // this.onPreviewPrevious = this.onPreviewPrevious.bind(this)
    // this.onPreviewNext = this.onPreviewNext.bind(this)
  }

  // fetchArtworks() {
  //   if ((this.state.genes.length === 0) && (this.state.tags.length === 0)) {
  //     this.setState({ artworks: [] })
  //   } else {
  //     const query = this.buildElasticSearchQuery()
  //     const uri = `${ELASTICSEARCH_HOST}/gravity_application_production/artwork/_search`
  //     const headers = new Headers({ "Authorization": ELASTICSEARCH_AUTH_HEADER })
  //     const method = 'post'
  //     const body = JSON.stringify(query)
  //     console.log('fetching', query)
  //     fetch(uri, { headers, method, body }).then(response => {
  //       if (response.ok) {
  //         response.json().then(data => {
  //           this.setState({ artworks: getArtworksFromResponse(data) })
  //         })
  //       } else {
  //         console.error('Fetch error', response.statusText)
  //       }
  //     })
  //   }
  // }

  // buildElasticSearchQuery() {
  //   const geneMatches = this.state.genes.map(g => { return { "match" : { "genes" : g.name } } })
  //   const tagMatches = this.state.tags.map(t => { return { "match" : { "tags" : t.name } } })
  //   const { filters } = this.state
  //   let statusFilters = []
  //   if (filters.published !== null) statusFilters = [...statusFilters, { term: { published: filters.published }} ]
  //   if (filters.deleted !== null) statusFilters = [...statusFilters, { term: { deleted: filters.deleted }} ]
  //   if (filters.genomed !== null) statusFilters = [...statusFilters, { term: { genomed: filters.genomed }} ]
  //   return {
  //     "query": {
  //       "bool": {
  //         "must": geneMatches.concat(tagMatches),
  //         "filter": statusFilters
  //       },
  //     },
  //     "sort": { "created_at" : "desc" },
  //     "size": 100
  //   }
  // }

  // componentWillMount() {
  //   if (this.state.genes.length || this.state.tags.length) {
  //     this.fetchArtworks()
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if ((this.state.genes !== prevState.genes) || (this.state.tags !== prevState.tags) || (this.state.filters !== prevState.filters)) {
  //     console.log('gotta fetch')
  //     this.fetchArtworks()
  //   } else {
  //     console.log('no fetch')
  //   }
  // }

  // onRemoveGene(geneName) {
  //   const { genes } = this.state
  //   this.setState({
  //     genes: genes.filter(g => g.name !== geneName)
  //   })
  // }

  // onAddGene(gene) {
  //   const { genes } = this.state
  //   findByName(genes, gene) || this.setState({
  //     genes: genes.concat(gene)
  //   })
  // }

  // onRemoveTag(tagName) {
  //   const { tags } = this.state
  //   this.setState({
  //     tags: tags.filter(t => t.name !== tagName)
  //   })
  // }

  // onAddTag(tag) {
  //   const { tags } = this.state
  //   findByName(tags, tag) || this.setState({
  //     tags: tags.concat(tag)
  //   })
  // }

  // onUpdateFilter(filter) {
  //   console.log(filter)
  //   const current = this.state.filters
  //   this.setState({
  //     filters: Object.assign({}, current, filter)
  //   })
  // }

  // onPreviewArtwork(artwork) {
  //   this.setState({ previewedArtwork: artwork })
  // }

  // onPreviewPrevious() {
  //   const curr = this.state.artworks.indexOf(this.state.previewedArtwork)
  //   const prev = Math.max(0, curr-1)
  //   const artwork = this.state.artworks[prev]
  //   this.setState({ previewedArtwork: artwork })
  // }

  // onPreviewNext() {
  //   const curr = this.state.artworks.indexOf(this.state.previewedArtwork)
  //   const next = Math.min(this.state.artworks.length-1, curr+1)
  //   const artwork = this.state.artworks[next]
  //   this.setState({ previewedArtwork: artwork })
  // }

  render () {
    // const { genes, tags, artworks, previewedArtwork } = this.state
    const { genes, tags } = this.state
    return (
      <div className='App'>
        <SearchForm
          genes={genes}
          tags={tags}
          onRemoveGene={this.onRemoveGene}
          onAddGene={this.onAddGene}
          onRemoveTag={this.onRemoveTag}
          onAddTag={this.onAddTag}
          onUpdateFilter={this.onUpdateFilter}
          />

        {/*
        <SearchResults
          artworks={artworks}
          previewedArtwork={previewedArtwork}
          onPreviewArtwork={this.onPreviewArtwork}
          onPreviewPrevious={this.onPreviewPrevious}
          onPreviewNext={this.onPreviewNext}
          />
        */}
      </div>
    )
  }
}

export default App
