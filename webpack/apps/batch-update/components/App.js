import React from 'react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { buildElasticsearchQuery } from '../helpers/elasticsearch'
import { matchArtworks } from 'lib/rosalind-api'
import { Wrapper, Sidebar, Content } from './Layout'

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
    this.onSetPartner = this.onSetPartner.bind(this)
    this.onClearPartner = this.onClearPartner.bind(this)
    this.onSetFair = this.onSetFair.bind(this)
    this.onClearFair = this.onClearFair.bind(this)
    this.onAddCreatedAfterDate = this.onAddCreatedAfterDate.bind(this)
    this.onClearCreatedAfterDate = this.onClearCreatedAfterDate.bind(this)
    this.onAddCreatedBeforeDate = this.onAddCreatedBeforeDate.bind(this)
    this.onClearCreatedBeforeDate = this.onClearCreatedBeforeDate.bind(this)

    this.onSetPublishedFilter = this.onSetPublishedFilter.bind(this)
    this.onSetDeletedFilter = this.onSetDeletedFilter.bind(this)
    this.onSetGenomedFilter = this.onSetGenomedFilter.bind(this)

    this.onToggleArtwork = this.onToggleArtwork.bind(this)
    this.onSelectAllArtworks = this.onSelectAllArtworks.bind(this)
    this.onDeselectAllArtworks = this.onDeselectAllArtworks.bind(this)
    this.onPreviewArtwork = this.onPreviewArtwork.bind(this)
    this.onPreviewPrevious = this.onPreviewPrevious.bind(this)
    this.onPreviewNext = this.onPreviewNext.bind(this)

    this.fetchArtworks = this.fetchArtworks.bind(this)
    this.fetchMoreArtworks = this.fetchMoreArtworks.bind(this)
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

  onAddCreatedAfterDate (createdAfterDate) {
    this.setState({ createdAfterDate })
  }

  onClearCreatedAfterDate () {
    this.setState({ createdAfterDate: null })
  }

  onAddCreatedBeforeDate (createdBeforeDate) {
    this.setState({ createdBeforeDate })
  }

  onClearCreatedBeforeDate () {
    this.setState({ createdBeforeDate: null })
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

  onToggleArtwork (artwork) {
    const { selectedArtworkIds } = this.state
    if (selectedArtworkIds.indexOf(artwork.id) > -1) {
      console.log('filtering')
      this.setState({
        selectedArtworkIds: selectedArtworkIds.filter(id => id !== artwork.id)
      })
    } else {
      console.log('pushing')
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

  render () {
    const {
      artworks,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      isLoading,
      partner,
      previewedArtwork,
      selectedArtworkIds,
      tags,
      totalHits
    } = this.state

    return (
      <Wrapper>
        <Sidebar>
          <SearchForm
            createdAfterDate={createdAfterDate}
            createdBeforeDate={createdBeforeDate}
            deletedFilter={this.state.deletedFilter}
            fair={fair}
            genes={genes}
            genomedFilter={this.state.genomedFilter}
            onAddCreatedAfterDate={this.onAddCreatedAfterDate}
            onAddCreatedBeforeDate={this.onAddCreatedBeforeDate}
            onAddGene={this.onAddGene}
            onAddTag={this.onAddTag}
            onClearCreatedAfterDate={this.onClearCreatedAfterDate}
            onClearCreatedBeforeDate={this.onClearCreatedBeforeDate}
            onClearFair={this.onClearFair}
            onClearPartner={this.onClearPartner}
            onRemoveGene={this.onRemoveGene}
            onRemoveTag={this.onRemoveTag}
            onSetDeletedFilter={this.onSetDeletedFilter}
            onSetFair={this.onSetFair}
            onSetGenomedFilter={this.onSetGenomedFilter}
            onSetPartner={this.onSetPartner}
            onSetPublishedFilter={this.onSetPublishedFilter}
            partner={partner}
            publishedFilter={this.state.publishedFilter}
            selectedArtworksCount={selectedArtworkIds.length}
            tags={tags}
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
      </Wrapper>
    )
  }
}

export default App
