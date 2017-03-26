import React from 'react'
import SearchForm from './SearchForm.js'
import SearchResults from './SearchResults.js'
import { buildElasticsearchQuery } from '../helpers/elasticsearch'
import { matchArtworks } from 'lib/rosalind-api'
import './App.css'

const findByName = (items, item) => items.find(i => i.name === item.name)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      genes: [],
      tags: [],
      partner: null,
      fair: null,
      publishedFilter: 'SHOW_ALL',
      deletedFilter: 'SHOW_ALL',
      genomedFilter: 'SHOW_ALL',
      artworks: [],
      previewedArtwork: null
    }
    this.onRemoveGene = this.onRemoveGene.bind(this)
    this.onAddGene = this.onAddGene.bind(this)
    this.onRemoveTag = this.onRemoveTag.bind(this)
    this.onAddTag = this.onAddTag.bind(this)
    this.onSetPartner = this.onSetPartner.bind(this)
    this.onClearPartner = this.onClearPartner.bind(this)
    this.onSetFair = this.onSetFair.bind(this)
    this.onClearFair = this.onClearFair.bind(this)

    this.onSetPublishedFilter = this.onSetPublishedFilter.bind(this)
    this.onSetDeletedFilter = this.onSetDeletedFilter.bind(this)
    this.onSetGenomedFilter = this.onSetGenomedFilter.bind(this)

    this.onPreviewArtwork = this.onPreviewArtwork.bind(this)
    this.onPreviewPrevious = this.onPreviewPrevious.bind(this)
    this.onPreviewNext = this.onPreviewNext.bind(this)
  }

  fetchArtworks () {
    const { genes, tags, partner, fair } = this.state
    if ((genes.length === 0) && (tags.length === 0) && (partner === null) && (fair === null)) {
      this.setState({ artworks: [] })
    } else {
      const { genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter } = this.state
      const query = buildElasticsearchQuery({ genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter })
      matchArtworks(query).then(artworks => {
        this.setState({ artworks: artworks })
      })
    }
  }

  componentWillMount () {
    if (this.state.genes.length || this.state.tags.length) {
      this.fetchArtworks()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      (this.state.genes !== prevState.genes) ||
      (this.state.tags !== prevState.tags) ||
      (this.state.partner !== prevState.partner) ||
      (this.state.fair !== prevState.fair) ||
      (this.state.publishedFilter !== prevState.publishedFilter) ||
      (this.state.deletedFilter !== prevState.deletedFilter) ||
      (this.state.genomedFilter !== prevState.genomedFilter)
     ) {
      this.fetchArtworks()
    }
  }

  onRemoveGene (geneName) {
    const { genes } = this.state
    this.setState({
      genes: genes.filter(g => g.name !== geneName)
    })
  }

  onAddGene (gene) {
    const { genes } = this.state
    findByName(genes, gene) || this.setState({
      genes: genes.concat(gene)
    })
  }

  onRemoveTag (tagName) {
    const { tags } = this.state
    this.setState({
      tags: tags.filter(t => t.name !== tagName)
    })
  }

  onAddTag (tag) {
    const { tags } = this.state
    findByName(tags, tag) || this.setState({
      tags: tags.concat(tag)
    })
  }

  onSetPartner (partner) {
    this.setState({ partner })
  }

  onClearPartner () {
    this.setState({ partner: null })
  }

  onSetFair (fair) {
    this.setState({ fair })
  }

  onClearFair () {
    this.setState({ fair: null })
  }

  onSetPublishedFilter (filterValue) {
    this.setState({ publishedFilter: filterValue })
  }

  onSetDeletedFilter (filterValue) {
    this.setState({ deletedFilter: filterValue })
  }

  onSetGenomedFilter (filterValue) {
    this.setState({ genomedFilter: filterValue })
  }

  onPreviewArtwork (artwork) {
    this.setState({ previewedArtwork: artwork })
  }

  onPreviewPrevious () {
    const curr = this.state.artworks.indexOf(this.state.previewedArtwork)
    const prev = Math.max(0, curr - 1)
    const artwork = this.state.artworks[prev]
    this.setState({ previewedArtwork: artwork })
  }

  onPreviewNext () {
    const curr = this.state.artworks.indexOf(this.state.previewedArtwork)
    const next = Math.min(this.state.artworks.length, curr + 1)
    const artwork = this.state.artworks[next]
    this.setState({ previewedArtwork: artwork })
  }

  render () {
    const { genes, tags, partner, fair, artworks, previewedArtwork } = this.state
    return (
      <div className='App'>
        <SearchForm
          genes={genes}
          tags={tags}
          partner={partner}
          fair={fair}
          onRemoveGene={this.onRemoveGene}
          onAddGene={this.onAddGene}
          onRemoveTag={this.onRemoveTag}
          onAddTag={this.onAddTag}
          onSetPartner={this.onSetPartner}
          onClearPartner={this.onClearPartner}
          onSetFair={this.onSetFair}
          onClearFair={this.onClearFair}
          publishedFilter={this.state.publishedFilter}
          onSetPublishedFilter={this.onSetPublishedFilter}
          deletedFilter={this.state.deletedFilter}
          onSetDeletedFilter={this.onSetDeletedFilter}
          genomedFilter={this.state.genomedFilter}
          onSetGenomedFilter={this.onSetGenomedFilter}
          />

        <SearchResults
          artworks={artworks}
          previewedArtwork={previewedArtwork}
          onPreviewArtwork={this.onPreviewArtwork}
          onPreviewPrevious={this.onPreviewPrevious}
          onPreviewNext={this.onPreviewNext}
          />
      </div>
    )
  }
}

export default App
