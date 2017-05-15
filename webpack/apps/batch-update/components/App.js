import React from 'react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { buildElasticsearchQuery } from '../helpers/elasticsearch'
import { matchArtworks } from 'lib/rosalind-api'
import { Wrapper, Sidebar, Content } from './Layout'
import FullScreenModal from './FullScreenModal'

const findByName = (items, item) => items.find(i => i.name === item.name)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      artworks: [],
      createdAfterDate: null,
      createdBeforeDate: null,
      deletedFilter: 'SHOW_ALL',
      fair: null,
      genes: [],
      genomedFilter: 'SHOW_ALL',
      isLoading: false,
      isSpecifyingBatchUpdate: false,
      partner: null,
      previewedArtwork: null,
      publishedFilter: 'SHOW_ALL',
      selectedArtworkIds: [],
      size: 100,
      tags: [],
      totalHits: null
    }

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
    this.onRemoveGene = this.onRemoveGene.bind(this)
    this.onAddGene = this.onAddGene.bind(this)
    this.onRemoveTag = this.onRemoveTag.bind(this)
    this.onAddTag = this.onAddTag.bind(this)

    this.updateStateFor = this.updateStateFor.bind(this)
    this.clearStateFor = this.clearStateFor.bind(this)

    this.onToggleArtwork = this.onToggleArtwork.bind(this)
    this.onSelectAllArtworks = this.onSelectAllArtworks.bind(this)
    this.onDeselectAllArtworks = this.onDeselectAllArtworks.bind(this)
    this.onPreviewArtwork = this.onPreviewArtwork.bind(this)
    this.onPreviewPrevious = this.onPreviewPrevious.bind(this)
    this.onPreviewNext = this.onPreviewNext.bind(this)

    this.fetchArtworks = this.fetchArtworks.bind(this)
    this.fetchMoreArtworks = this.fetchMoreArtworks.bind(this)

    this.onOpenBatchUpdate = this.onOpenBatchUpdate.bind(this)
    this.onDismissBatchUpdate = this.onDismissBatchUpdate.bind(this)
  }

  componentWillMount () {
    if (this.state.genes.length || this.state.tags.length) {
      this.fetchArtworks()
    }
  }

  componentDidUpdate (_prevProps, prevState) {
    if (this.shouldComponentUpdate(prevState)) {
      this.fetchArtworks()
    }
  }

  shouldComponentUpdate (prevState) {
    return (
      (this.state.createdAfterDate !== prevState.createdAfterDate) ||
      (this.state.createdBeforeDate !== prevState.createdBeforeDate) ||
      (this.state.deletedFilter !== prevState.deletedFilter) ||
      (this.state.fair !== prevState.fair) ||
      (this.state.genes !== prevState.genes) ||
      (this.state.genomedFilter !== prevState.genomedFilter) ||
      (this.state.partner !== prevState.partner) ||
      (this.state.publishedFilter !== prevState.publishedFilter) ||
      (this.state.tags !== prevState.tags)
    )
  }

  fetchArtworks () {
    const {
      createdAfterDate,
      createdBeforeDate,
      genes,
      tags,
      partner,
      fair
    } = this.state

    if ((genes.length === 0) &&
      (tags.length === 0) &&
      (partner === null) && (fair === null)
    ) {
      this.setState({ artworks: [], totalHits: 0 })
    } else {
      const { publishedFilter, deletedFilter, genomedFilter, size } = this.state

      const query = buildElasticsearchQuery({
        createdAfterDate,
        createdBeforeDate,
        deletedFilter,
        fair,
        genes,
        genomedFilter,
        partner,
        publishedFilter,
        size,
        tags
      })

      this.setState({ isLoading: true })
      matchArtworks(query).then(hits => {
        const totalHits = hits.total
        const artworks = hits.hits.map(hit => hit._source)
        this.setState({ artworks, totalHits, isLoading: false })
      })
    }
  }

  fetchMoreArtworks () {
    const {
      createdAfterDate,
      createdBeforeDate,
      deletedFilter,
      fair,
      genes,
      genomedFilter,
      partner,
      publishedFilter,
      tags
    } = this.state

    const { artworks, size } = this.state

    const from = artworks.length

    const query = buildElasticsearchQuery({
      createdAfterDate,
      createdBeforeDate,
      deletedFilter,
      fair,
      from,
      genes,
      genomedFilter,
      partner,
      publishedFilter,
      size,
      tags
    })

    matchArtworks(query).then(hits => {
      const totalHits = hits.total
      const moreArtworks = hits.hits.map(hit => hit._source)
      this.setState({ artworks: [...artworks, ...moreArtworks], totalHits })
    })
  }

  onRemoveGene (geneName, _key) {
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

  onRemoveTag (tagName, _key) {
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

  clearStateFor (_name, key) {
    this.setState({[key]: null})
  }

  updateStateFor (key, newState) {
    this.setState({[key]: newState})
  }

  onToggleArtwork (artwork) {
    const { selectedArtworkIds } = this.state
    if (selectedArtworkIds.indexOf(artwork.id) > -1) {
      this.setState({
        selectedArtworkIds: selectedArtworkIds.filter(id => id !== artwork.id)
      })
    } else {
      this.setState({
        selectedArtworkIds: [...selectedArtworkIds, artwork.id]
      })
    }
  }

  onSelectAllArtworks () {
    const { artworks } = this.state
    this.setState({
      selectedArtworkIds: artworks.map(a => a.id)
    })
  }

  onDeselectAllArtworks () {
    this.setState({
      selectedArtworkIds: []
    })
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

  onOpenBatchUpdate () {
    this.setState({ isSpecifyingBatchUpdate: true })
  }

  onDismissBatchUpdate () {
    this.setState({ isSpecifyingBatchUpdate: false })
  }

  render () {
    const {
      artworks,
      createdAfterDate,
      createdBeforeDate,
      deletedFilter,
      fair,
      genes,
      genomedFilter,
      isLoading,
      isSpecifyingBatchUpdate,
      partner,
      previewedArtwork,
      publishedFilter,
      selectedArtworkIds,
      tags,
      totalHits
    } = this.state

    return (
      <Wrapper>
        <Sidebar>
          <SearchForm
            clearState={this.clearStateFor}
            createdAfterDate={createdAfterDate}
            createdBeforeDate={createdBeforeDate}
            deletedFilter={deletedFilter}
            fair={fair}
            genes={genes}
            genomedFilter={this.state.genomedFilter}
            onAddGene={this.onAddGene}
            onAddTag={this.onAddTag}
            onOpenBatchUpdate={this.onOpenBatchUpdate}
            onRemoveGene={this.onRemoveGene}
            onRemoveTag={this.onRemoveTag}
            partner={partner}
            publishedFilter={publishedFilter}
            selectedArtworksCount={selectedArtworkIds.length}
            tags={tags}
            updateState={this.updateStateFor}
          />
        </Sidebar>

        <Content>
          <SearchResults
            artworks={artworks}
            selectedArtworkIds={selectedArtworkIds}
            previewedArtwork={previewedArtwork}
            isLoading={isLoading}
            totalHits={totalHits}
            onToggleArtwork={this.onToggleArtwork}
            onSelectAllArtworks={this.onSelectAllArtworks}
            onDeselectAllArtworks={this.onDeselectAllArtworks}
            onPreviewArtwork={this.onPreviewArtwork}
            onPreviewPrevious={this.onPreviewPrevious}
            onPreviewNext={this.onPreviewNext}
            onLoadMore={this.fetchMoreArtworks}
          />
        </Content>

        <FullScreenModal isOpen={isSpecifyingBatchUpdate} onDismiss={this.onDismissBatchUpdate}>
          <p>{selectedArtworkIds.length} works selected</p>
          <a href='#' onClick={this.onDismissBatchUpdate}>cancel</a>
        </FullScreenModal>
      </Wrapper>
    )
  }
}

export default App
