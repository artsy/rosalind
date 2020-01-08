import React from 'react'
import intersection from 'lodash.intersection'
import defaults from 'lodash.defaults'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import BatchUpdateForm from './BatchUpdateForm'
import { buildElasticsearchQuery } from '../helpers/elasticsearch'
import { matchArtworks } from 'lib/rosalind-api'
import { Wrapper, Sidebar, Content } from './Layout'
import FullScreenModal from './FullScreenModal'
import { Notices, Notice } from './Notices'

const findByName = (items, item) => items.find(i => i.name === item.name)
const findById = (items, item) => items.find(i => i.id === item.id)

const commonGenesToIgnore = ['Art', 'Career Stage Gene']

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      artworks: [],
      attributionClass: null,
      createdAfterDate: null,
      createdBeforeDate: null,
      fair: null,
      genes: [],
      isLoading: false,
      isSpecifyingBatchUpdate: false,
      keywords: [],
      maxPrice: null,
      minPrice: null,
      notices: [],
      acquireableOrOfferableFilter: 'SHOW_ALL',
      forSaleFilter: 'SHOW_ALL',
      partner: null,
      previewedArtwork: null,
      publishedFilter: 'SHOW_ALL',
      selectedArtworkIds: [],
      size: 100,
      sort: 'RECENTLY_PUBLISHED',
      tags: [],
      totalHits: null,
    }

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
    this.onRemoveGene = this.onRemoveGene.bind(this)
    this.onAddGene = this.onAddGene.bind(this)
    this.onRemoveTag = this.onRemoveTag.bind(this)
    this.onAddTag = this.onAddTag.bind(this)
    this.onRemoveArtist = this.onRemoveArtist.bind(this)
    this.onAddArtist = this.onAddArtist.bind(this)
    this.onRemoveKeyword = this.onRemoveKeyword.bind(this)
    this.onAddKeyword = this.onAddKeyword.bind(this)
    this.updateStateFor = this.updateStateFor.bind(this)
    this.clearStateFor = this.clearStateFor.bind(this)

    this.getCommonGenes = this.getCommonGenes.bind(this)
    this.getCommonTags = this.getCommonTags.bind(this)
    this.onToggleArtwork = this.onToggleArtwork.bind(this)
    this.onSelectAllArtworks = this.onSelectAllArtworks.bind(this)
    this.onDeselectAllArtworks = this.onDeselectAllArtworks.bind(this)
    this.onPreviewArtwork = this.onPreviewArtwork.bind(this)
    this.onPreviewPrevious = this.onPreviewPrevious.bind(this)
    this.onPreviewNext = this.onPreviewNext.bind(this)

    this.fetchArtworks = this.fetchArtworks.bind(this)
    this.fetchMoreArtworks = this.fetchMoreArtworks.bind(this)
    this.hasSearchCriteriaChanged = this.hasSearchCriteriaChanged.bind(this)
    this.canSearch = this.canSearch.bind(this)
    this.refresh = this.refresh.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)

    this.onOpenBatchUpdate = this.onOpenBatchUpdate.bind(this)
    this.onDismissBatchUpdate = this.onDismissBatchUpdate.bind(this)

    this.addNotice = this.addNotice.bind(this)
    this.removeNotice = this.removeNotice.bind(this)
  }

  componentDidMount() {
    if (this.canSearch()) {
      this.fetchArtworks()
    }
    window.addEventListener('keyup', this.handleKeyup)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyup)
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.shouldComponentUpdate(prevState)) {
      this.fetchArtworks()
    }
  }

  shouldComponentUpdate(prevState) {
    return this.hasSearchCriteriaChanged(prevState)
  }

  hasSearchCriteriaChanged(prevState) {
    return (
      this.state.artists !== prevState.artists ||
      this.state.attributionClass !== prevState.attributionClass ||
      this.state.createdAfterDate !== prevState.createdAfterDate ||
      this.state.createdBeforeDate !== prevState.createdBeforeDate ||
      this.state.fair !== prevState.fair ||
      this.state.genes !== prevState.genes ||
      this.state.keywords !== prevState.keywords ||
      this.state.acquireableOrOfferableFilter !==
        prevState.acquireableOrOfferableFilter ||
      this.state.forSaleFilter !== prevState.forSaleFilter ||
      this.state.minPrice !== prevState.minPrice ||
      this.state.maxPrice !== prevState.maxPrice ||
      this.state.partner !== prevState.partner ||
      this.state.publishedFilter !== prevState.publishedFilter ||
      this.state.tags !== prevState.tags
    )
  }

  canSearch() {
    return (
      this.state.artists.length !== 0 ||
      this.state.attributionClass !== null ||
      this.state.fair !== null ||
      this.state.genes.length !== 0 ||
      this.state.keywords.length !== 0 ||
      this.state.partner !== null ||
      this.state.tags.length !== 0
    )
  }

  fetchArtworks() {
    const {
      artists,
      attributionClass,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      keywords,
      acquireableOrOfferableFilter,
      forSaleFilter,
      maxPrice,
      minPrice,
      partner,
      publishedFilter,
      size,
      sort,
      tags,
    } = this.state

    if (this.canSearch() === false) {
      this.setState({
        artworks: [],
        selectedArtworkIds: [],
        totalHits: 0,
      })
    } else {
      const query = buildElasticsearchQuery({
        artists,
        attributionClass,
        createdAfterDate,
        createdBeforeDate,
        fair,
        genes,
        keywords,
        acquireableOrOfferableFilter,
        forSaleFilter,
        maxPrice,
        minPrice,
        partner,
        publishedFilter,
        size,
        sort,
        tags,
      })

      this.setState({ isLoading: true })
      matchArtworks(query).then(hits => {
        const totalHits = hits.total
        const artworks = hits.hits.map(hit => hit._source)
        this.setState({
          artworks,
          selectedArtworkIds: [],
          totalHits,
          isLoading: false,
        })
      })
    }
  }

  fetchMoreArtworks() {
    const {
      artists,
      artworks,
      attributionClass,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      keywords,
      acquireableOrOfferableFilter,
      forSaleFilter,
      maxPrice,
      minPrice,
      partner,
      publishedFilter,
      size,
      sort,
      tags,
    } = this.state

    const from = artworks.length

    const query = buildElasticsearchQuery({
      artists,
      attributionClass,
      createdAfterDate,
      createdBeforeDate,
      fair,
      from,
      genes,
      keywords,
      acquireableOrOfferableFilter,
      forSaleFilter,
      maxPrice,
      minPrice,
      partner,
      publishedFilter,
      size,
      sort,
      tags,
    })

    matchArtworks(query).then(hits => {
      const totalHits = hits.total
      const moreArtworks = hits.hits.map(hit => hit._source)
      this.setState({ artworks: [...artworks, ...moreArtworks], totalHits })
    })
  }

  refresh() {
    this.fetchArtworks()
  }

  handleKeyup(e) {
    if (e.code === 'KeyR' && e.target.tagName === 'BODY') {
      this.refresh()
    }
  }

  onRemoveGene(geneName, key = null) {
    const { genes } = this.state
    this.setState({
      genes: genes.filter(g => g.name !== geneName),
    })
  }

  onAddGene(gene) {
    const { genes } = this.state
    findByName(genes, gene) ||
      this.setState({
        genes: genes.concat(gene),
      })
  }

  onRemoveTag(tagName, key = null) {
    const { tags } = this.state
    this.setState({
      tags: tags.filter(t => t.name !== tagName),
    })
  }

  onAddTag(tag) {
    const { tags } = this.state
    findByName(tags, tag) ||
      this.setState({
        tags: tags.concat(tag),
      })
  }

  onRemoveArtist(artistId) {
    const { artists } = this.state
    this.setState({
      artists: artists.filter(a => a.id !== artistId),
    })
  }

  onAddArtist(artist) {
    const { artists } = this.state
    findById(artists, artist) ||
      this.setState({
        artists: artists.concat(artist),
      })
  }

  onRemoveKeyword(keyword) {
    const { keywords } = this.state
    this.setState({
      keywords: keywords.filter(k => k !== keyword),
    })
  }

  onAddKeyword(keyword) {
    const { keywords } = this.state
    keywords.includes(keyword) ||
      this.setState({
        keywords: [...keywords, keyword],
      })
  }

  clearStateFor(name = null, key) {
    this.setState({ [key]: null })
  }

  updateStateFor(key, newState) {
    this.setState({ [key]: newState })
  }

  onToggleArtwork(artwork) {
    const { selectedArtworkIds } = this.state
    if (selectedArtworkIds.indexOf(artwork.id) > -1) {
      this.setState({
        selectedArtworkIds: selectedArtworkIds.filter(id => id !== artwork.id),
      })
    } else {
      this.setState({
        selectedArtworkIds: [...selectedArtworkIds, artwork.id],
      })
    }
  }

  onSelectAllArtworks() {
    const { artworks } = this.state
    this.setState({
      selectedArtworkIds: artworks.map(a => a.id),
    })
  }

  onDeselectAllArtworks() {
    this.setState({
      selectedArtworkIds: [],
    })
  }

  getCommonGenes() {
    const { selectedArtworkIds, artworks } = this.state
    const geneArraysForSelectedArtworks = artworks
      .filter(artwork => selectedArtworkIds.indexOf(artwork.id) > -1)
      .map(artwork => artwork.genes)
    const commonGenes = intersection(...geneArraysForSelectedArtworks).filter(
      g => commonGenesToIgnore.indexOf(g) === -1
    )
    return commonGenes
  }

  getCommonTags() {
    const { selectedArtworkIds, artworks } = this.state

    const tagArraysForSelectedArtworks = artworks
      .filter(artwork => selectedArtworkIds.indexOf(artwork.id) > -1)
      .map(artwork => artwork.tags || [])

    return intersection(...tagArraysForSelectedArtworks)
  }

  onPreviewArtwork(artwork) {
    this.setState({ previewedArtwork: artwork })
  }

  onPreviewPrevious() {
    const curr = this.state.artworks.indexOf(this.state.previewedArtwork)
    const prev = Math.max(0, curr - 1)
    const artwork = this.state.artworks[prev]
    this.setState({ previewedArtwork: artwork })
  }

  onPreviewNext() {
    const curr = this.state.artworks.indexOf(this.state.previewedArtwork)
    const next = Math.min(this.state.artworks.length, curr + 1)
    const artwork = this.state.artworks[next]
    this.setState({ previewedArtwork: artwork })
  }

  onOpenBatchUpdate() {
    this.setState({ isSpecifyingBatchUpdate: true })
  }

  onDismissBatchUpdate() {
    this.setState({ isSpecifyingBatchUpdate: false })
  }

  addNotice(message, options) {
    const optionsWithDefaults = defaults(options, { isError: false })
    const { isError } = optionsWithDefaults
    const newNotice = {
      id: `${Date.now()}—${message}`,
      message,
      isError,
    }
    this.setState({
      notices: [...this.state.notices, newNotice],
    })
  }

  removeNotice(id) {
    const notices = this.state.notices.filter(n => n.id !== id)
    this.setState({ notices })
  }

  render() {
    const {
      artists,
      artworks,
      attributionClass,
      createdAfterDate,
      createdBeforeDate,
      fair,
      genes,
      isLoading,
      isSpecifyingBatchUpdate,
      keywords,
      acquireableOrOfferableFilter,
      forSaleFilter,
      partner,
      previewedArtwork,
      publishedFilter,
      selectedArtworkIds,
      tags,
      totalHits,
      minPrice,
      maxPrice,
    } = this.state

    return (
      <Wrapper>
        <Sidebar>
          <SearchForm
            artists={artists}
            attributionClass={attributionClass}
            clearState={this.clearStateFor}
            createdAfterDate={createdAfterDate}
            createdBeforeDate={createdBeforeDate}
            fair={fair}
            genes={genes}
            keywords={keywords}
            acquireableOrOfferableFilter={acquireableOrOfferableFilter}
            forSaleFilter={forSaleFilter}
            maxPrice={maxPrice}
            minPrice={minPrice}
            onAddArtist={this.onAddArtist}
            onAddGene={this.onAddGene}
            onAddKeyword={this.onAddKeyword}
            onAddTag={this.onAddTag}
            onOpenBatchUpdate={this.onOpenBatchUpdate}
            onRemoveArtist={this.onRemoveArtist}
            onRemoveGene={this.onRemoveGene}
            onRemoveKeyword={this.onRemoveKeyword}
            onRemoveTag={this.onRemoveTag}
            partner={partner}
            publishedFilter={publishedFilter}
            selectedArtworkIds={selectedArtworkIds}
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

        <FullScreenModal
          isOpen={isSpecifyingBatchUpdate}
          onDismiss={this.onDismissBatchUpdate}
        >
          <BatchUpdateForm
            getCommonGenes={this.getCommonGenes}
            getCommonTags={this.getCommonTags}
            onCancel={this.onDismissBatchUpdate}
            selectedArtworkIds={selectedArtworkIds}
            updateState={this.updateStateFor}
            onAddNotice={this.addNotice}
            onRemoveNotice={this.removeNotice}
          />
        </FullScreenModal>

        <Notices>
          {this.state.notices.map(({ id, message, isError }) => {
            return (
              <Notice
                key={id}
                id={id}
                isError={isError}
                onDismiss={this.removeNotice}
              >
                {message}
              </Notice>
            )
          })}
        </Notices>
      </Wrapper>
    )
  }
}

export default App
