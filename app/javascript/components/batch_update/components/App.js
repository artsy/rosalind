/* eslint-disable @typescript-eslint/no-this-alias */
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b
          }) ||
        function(d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function(d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        )
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var __spreadArray =
  (this && this.__spreadArray) ||
  function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
import React from 'react'
import intersection from 'lodash.intersection'
import defaults from 'lodash.defaults'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import BatchUpdateForm from './BatchUpdateForm'
import { buildElasticsearchQuery } from '../helpers/elasticsearch'
import { matchArtworks } from '../../../lib/rosalind-api'
import { Wrapper, Sidebar, Content } from './Layout'
import FullScreenModal from './FullScreenModal'
import { Notices, Notice } from './Notices'
var findByName = function(items, item) {
  return items.find(function(i) {
    return i.name === item.name
  })
}
var findById = function(items, item) {
  return items.find(function(i) {
    return i.id === item.id
  })
}
var commonGenesToIgnore = ['Art', 'Career Stage Gene']
var App = /** @class */ (function(_super) {
  __extends(App, _super)
  function App(props) {
    var _this = _super.call(this, props) || this
    _this.state = {
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
      listedFilter: 'SHOW_ALL',
      restrictedArtworkIDs: [],
      selectedArtworkIds: [],
      size: 100,
      sort: 'RECENTLY_PUBLISHED',
      tags: [],
      totalHits: { value: 0, relation: 'eq' },
    }
    _this.shouldComponentUpdate = _this.shouldComponentUpdate.bind(_this)
    _this.onRemoveGene = _this.onRemoveGene.bind(_this)
    _this.onAddGene = _this.onAddGene.bind(_this)
    _this.onRemoveTag = _this.onRemoveTag.bind(_this)
    _this.onAddTag = _this.onAddTag.bind(_this)
    _this.onRemoveArtist = _this.onRemoveArtist.bind(_this)
    _this.onAddArtist = _this.onAddArtist.bind(_this)
    _this.onRemoveKeyword = _this.onRemoveKeyword.bind(_this)
    _this.onAddKeyword = _this.onAddKeyword.bind(_this)
    _this.onAddRestrictedArtworkIDs = _this.onAddRestrictedArtworkIDs.bind(
      _this
    )
    _this.updateStateFor = _this.updateStateFor.bind(_this)
    _this.clearStateFor = _this.clearStateFor.bind(_this)
    _this.getCommonGenes = _this.getCommonGenes.bind(_this)
    _this.getCommonTags = _this.getCommonTags.bind(_this)
    _this.onToggleArtwork = _this.onToggleArtwork.bind(_this)
    _this.onSelectAllArtworks = _this.onSelectAllArtworks.bind(_this)
    _this.onDeselectAllArtworks = _this.onDeselectAllArtworks.bind(_this)
    _this.onPreviewArtwork = _this.onPreviewArtwork.bind(_this)
    _this.onPreviewPrevious = _this.onPreviewPrevious.bind(_this)
    _this.onPreviewNext = _this.onPreviewNext.bind(_this)
    _this.fetchArtworks = _this.fetchArtworks.bind(_this)
    _this.fetchMoreArtworks = _this.fetchMoreArtworks.bind(_this)
    _this.hasSearchCriteriaChanged = _this.hasSearchCriteriaChanged.bind(_this)
    _this.canSearch = _this.canSearch.bind(_this)
    _this.refresh = _this.refresh.bind(_this)
    _this.handleKeyup = _this.handleKeyup.bind(_this)
    _this.onOpenBatchUpdate = _this.onOpenBatchUpdate.bind(_this)
    _this.onDismissBatchUpdate = _this.onDismissBatchUpdate.bind(_this)
    _this.addNotice = _this.addNotice.bind(_this)
    _this.removeNotice = _this.removeNotice.bind(_this)
    return _this
  }
  App.prototype.componentDidMount = function() {
    if (this.canSearch()) {
      this.fetchArtworks()
    }
    window.addEventListener('keyup', this.handleKeyup)
  }
  App.prototype.componentWillUnmount = function() {
    window.removeEventListener('keyup', this.handleKeyup)
  }
  App.prototype.componentDidUpdate = function(_prevProps, prevState) {
    if (this.shouldComponentUpdate(prevState)) {
      this.fetchArtworks()
    }
  }
  App.prototype.shouldComponentUpdate = function(prevState) {
    return this.hasSearchCriteriaChanged(prevState)
  }
  App.prototype.hasSearchCriteriaChanged = function(prevState) {
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
      this.state.listedFilter !== prevState.listedFilter ||
      this.state.sort !== prevState.sort ||
      this.state.tags !== prevState.tags ||
      this.state.restrictedArtworkIDs !== prevState.restrictedArtworkIDs
    )
  }
  App.prototype.canSearch = function() {
    return (
      this.state.artists.length !== 0 ||
      this.state.attributionClass !== null ||
      this.state.fair !== null ||
      this.state.genes.length !== 0 ||
      this.state.keywords.length !== 0 ||
      this.state.partner !== null ||
      this.state.tags.length !== 0 ||
      this.state.restrictedArtworkIDs.length !== 0
    )
  }
  App.prototype.fetchArtworks = function() {
    var _this = this
    var _a = this.state,
      artists = _a.artists,
      attributionClass = _a.attributionClass,
      createdAfterDate = _a.createdAfterDate,
      createdBeforeDate = _a.createdBeforeDate,
      fair = _a.fair,
      genes = _a.genes,
      keywords = _a.keywords,
      acquireableOrOfferableFilter = _a.acquireableOrOfferableFilter,
      forSaleFilter = _a.forSaleFilter,
      maxPrice = _a.maxPrice,
      minPrice = _a.minPrice,
      partner = _a.partner,
      publishedFilter = _a.publishedFilter,
      listedFilter = _a.listedFilter,
      restrictedArtworkIDs = _a.restrictedArtworkIDs,
      size = _a.size,
      sort = _a.sort,
      tags = _a.tags
    if (this.canSearch() === false) {
      this.setState({
        artworks: [],
        selectedArtworkIds: [],
        totalHits: { value: 0, relation: 'eq' },
      })
    } else {
      var query = buildElasticsearchQuery({
        artists: artists,
        attributionClass: attributionClass,
        createdAfterDate: createdAfterDate,
        createdBeforeDate: createdBeforeDate,
        fair: fair,
        genes: genes,
        keywords: keywords,
        acquireableOrOfferableFilter: acquireableOrOfferableFilter,
        forSaleFilter: forSaleFilter,
        maxPrice: maxPrice,
        minPrice: minPrice,
        partner: partner,
        publishedFilter: publishedFilter,
        listedFilter: listedFilter,
        restrictedArtworkIDs: restrictedArtworkIDs,
        size: size,
        sort: sort,
        tags: tags,
      })
      this.setState({ isLoading: true })
      var meta = document.querySelector('meta[name=csrf-token]')
      var csrfToken = meta.content
      matchArtworks(query, csrfToken).then(function(hits) {
        var totalHits = hits.total
        var artworks = hits.hits.map(function(hit) {
          return hit._source
        })
        _this.setState({
          artworks: artworks,
          selectedArtworkIds: [],
          totalHits: totalHits,
          isLoading: false,
        })
      })
    }
  }
  App.prototype.fetchMoreArtworks = function() {
    var _this = this
    var _a = this.state,
      artists = _a.artists,
      artworks = _a.artworks,
      attributionClass = _a.attributionClass,
      createdAfterDate = _a.createdAfterDate,
      createdBeforeDate = _a.createdBeforeDate,
      fair = _a.fair,
      genes = _a.genes,
      keywords = _a.keywords,
      acquireableOrOfferableFilter = _a.acquireableOrOfferableFilter,
      forSaleFilter = _a.forSaleFilter,
      maxPrice = _a.maxPrice,
      minPrice = _a.minPrice,
      partner = _a.partner,
      publishedFilter = _a.publishedFilter,
      listedFilter = _a.listedFilter,
      restrictedArtworkIDs = _a.restrictedArtworkIDs,
      size = _a.size,
      sort = _a.sort,
      tags = _a.tags
    var from = artworks.length
    var query = buildElasticsearchQuery({
      artists: artists,
      attributionClass: attributionClass,
      createdAfterDate: createdAfterDate,
      createdBeforeDate: createdBeforeDate,
      fair: fair,
      from: from,
      genes: genes,
      keywords: keywords,
      acquireableOrOfferableFilter: acquireableOrOfferableFilter,
      forSaleFilter: forSaleFilter,
      maxPrice: maxPrice,
      minPrice: minPrice,
      partner: partner,
      publishedFilter: publishedFilter,
      listedFilter: listedFilter,
      restrictedArtworkIDs: restrictedArtworkIDs,
      size: size,
      sort: sort,
      tags: tags,
    })
    var meta = document.querySelector('meta[name=csrf-token]')
    var csrfToken = meta.content
    matchArtworks(query, csrfToken).then(function(hits) {
      var totalHits = hits.total
      var moreArtworks = hits.hits.map(function(hit) {
        return hit._source
      })
      _this.setState({
        artworks: __spreadArray(
          __spreadArray([], artworks, true),
          moreArtworks,
          true
        ),
        totalHits: totalHits,
      })
    })
  }
  App.prototype.refresh = function() {
    this.fetchArtworks()
  }
  App.prototype.handleKeyup = function(e) {
    if (e.code === 'KeyR' && e.target.tagName === 'BODY') {
      this.refresh()
    }
  }
  App.prototype.onRemoveGene = function(geneName) {
    var genes = this.state.genes
    this.setState({
      genes: genes.filter(function(g) {
        return g.name !== geneName
      }),
    })
  }
  App.prototype.onAddGene = function(gene) {
    var genes = this.state.genes
    findByName(genes, gene) ||
      this.setState({
        genes: genes.concat(gene),
      })
  }
  App.prototype.onRemoveTag = function(tagName) {
    var tags = this.state.tags
    this.setState({
      tags: tags.filter(function(t) {
        return t.name !== tagName
      }),
    })
  }
  App.prototype.onAddTag = function(tag) {
    var tags = this.state.tags
    findByName(tags, tag) ||
      this.setState({
        tags: tags.concat(tag),
      })
  }
  App.prototype.onRemoveArtist = function(artistId) {
    var artists = this.state.artists
    this.setState({
      artists: artists.filter(function(a) {
        return a.id !== artistId
      }),
    })
  }
  App.prototype.onAddArtist = function(artist) {
    var artists = this.state.artists
    findById(artists, artist) ||
      this.setState({
        artists: artists.concat(artist),
      })
  }
  App.prototype.onRemoveKeyword = function(keyword) {
    var keywords = this.state.keywords
    this.setState({
      keywords: keywords.filter(function(k) {
        return k !== keyword
      }),
    })
  }
  App.prototype.onAddKeyword = function(keyword) {
    var keywords = this.state.keywords
    keywords.includes(keyword) ||
      this.setState({
        keywords: __spreadArray(
          __spreadArray([], keywords, true),
          [keyword],
          false
        ),
      })
  }
  App.prototype.onAddRestrictedArtworkIDs = function(artworkIDs) {
    this.setState({
      restrictedArtworkIDs: artworkIDs
        .split(/\s+/)
        .map(function(part) {
          return part.split(',')
        })
        .flat()
        .map(function(id) {
          return id.trim()
        }),
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  App.prototype.clearStateFor = function(name, key) {
    var _a, _b
    if (name === void 0) {
      name = null
    }
    if (Array.isArray(this.state[key])) {
      // @ts-ignore
      this.setState(((_a = {}), (_a[key] = []), _a))
    } else {
      // @ts-ignore
      this.setState(((_b = {}), (_b[key] = null), _b))
    }
  }
  App.prototype.updateStateFor = function(key, newState) {
    var _a
    // @ts-ignore
    this.setState(((_a = {}), (_a[key] = newState), _a))
  }
  App.prototype.onToggleArtwork = function(artwork) {
    var selectedArtworkIds = this.state.selectedArtworkIds
    if (selectedArtworkIds.indexOf(artwork.id) > -1) {
      this.setState({
        selectedArtworkIds: selectedArtworkIds.filter(function(id) {
          return id !== artwork.id
        }),
      })
    } else {
      this.setState({
        selectedArtworkIds: __spreadArray(
          __spreadArray([], selectedArtworkIds, true),
          [artwork.id],
          false
        ),
      })
    }
  }
  App.prototype.onSelectAllArtworks = function() {
    var artworks = this.state.artworks
    this.setState({
      selectedArtworkIds: artworks.map(function(a) {
        return a.id
      }),
    })
  }
  App.prototype.onDeselectAllArtworks = function() {
    this.setState({
      selectedArtworkIds: [],
    })
  }
  App.prototype.getCommonGenes = function() {
    var _a = this.state,
      selectedArtworkIds = _a.selectedArtworkIds,
      artworks = _a.artworks
    var geneArraysForSelectedArtworks = artworks
      .filter(function(artwork) {
        return selectedArtworkIds.indexOf(artwork.id) > -1
      })
      .map(function(artwork) {
        return artwork.genes
      })
    var commonGenes = intersection
      .apply(void 0, geneArraysForSelectedArtworks)
      .filter(function(g) {
        return commonGenesToIgnore.indexOf(g) === -1
      })
    return commonGenes
  }
  App.prototype.getCommonTags = function() {
    var _a = this.state,
      selectedArtworkIds = _a.selectedArtworkIds,
      artworks = _a.artworks
    var tagArraysForSelectedArtworks = artworks
      .filter(function(artwork) {
        return selectedArtworkIds.indexOf(artwork.id) > -1
      })
      .map(function(artwork) {
        return artwork.tags || []
      })
    return intersection.apply(void 0, tagArraysForSelectedArtworks)
  }
  App.prototype.onPreviewArtwork = function(artwork) {
    this.setState({ previewedArtwork: artwork })
  }
  App.prototype.onPreviewPrevious = function() {
    var curr = this.state.artworks.indexOf(this.state.previewedArtwork)
    var prev = Math.max(0, curr - 1)
    var artwork = this.state.artworks[prev]
    this.setState({ previewedArtwork: artwork })
  }
  App.prototype.onPreviewNext = function() {
    var curr = this.state.artworks.indexOf(this.state.previewedArtwork)
    var next = Math.min(this.state.artworks.length, curr + 1)
    var artwork = this.state.artworks[next]
    this.setState({ previewedArtwork: artwork })
  }
  App.prototype.onOpenBatchUpdate = function() {
    this.setState({ isSpecifyingBatchUpdate: true })
  }
  App.prototype.onDismissBatchUpdate = function() {
    this.setState({ isSpecifyingBatchUpdate: false })
  }
  App.prototype.addNotice = function(message, options) {
    var optionsWithDefaults = defaults(options, { isError: false })
    var isError = optionsWithDefaults.isError
    var newNotice = {
      id: ''.concat(Date.now(), '\u2014').concat(message),
      message: message,
      isError: isError,
    }
    this.setState({
      notices: __spreadArray(
        __spreadArray([], this.state.notices, true),
        [newNotice],
        false
      ),
    })
  }
  App.prototype.removeNotice = function(id) {
    var notices = this.state.notices.filter(function(n) {
      return n.id !== id
    })
    this.setState({ notices: notices })
  }
  App.prototype.render = function() {
    var _this = this
    var _a = this.state,
      artists = _a.artists,
      artworks = _a.artworks,
      attributionClass = _a.attributionClass,
      createdAfterDate = _a.createdAfterDate,
      createdBeforeDate = _a.createdBeforeDate,
      fair = _a.fair,
      genes = _a.genes,
      isLoading = _a.isLoading,
      isSpecifyingBatchUpdate = _a.isSpecifyingBatchUpdate,
      keywords = _a.keywords,
      acquireableOrOfferableFilter = _a.acquireableOrOfferableFilter,
      forSaleFilter = _a.forSaleFilter,
      partner = _a.partner,
      previewedArtwork = _a.previewedArtwork,
      publishedFilter = _a.publishedFilter,
      listedFilter = _a.listedFilter,
      restrictedArtworkIDs = _a.restrictedArtworkIDs,
      selectedArtworkIds = _a.selectedArtworkIds,
      sort = _a.sort,
      tags = _a.tags,
      totalHits = _a.totalHits,
      minPrice = _a.minPrice,
      maxPrice = _a.maxPrice
    return React.createElement(
      Wrapper,
      null,
      React.createElement(
        Sidebar,
        null,
        React.createElement(SearchForm, {
          artists: artists,
          attributionClass: attributionClass,
          clearState: this.clearStateFor,
          createdAfterDate: createdAfterDate,
          createdBeforeDate: createdBeforeDate,
          fair: fair,
          genes: genes,
          keywords: keywords,
          acquireableOrOfferableFilter: acquireableOrOfferableFilter,
          forSaleFilter: forSaleFilter,
          maxPrice: maxPrice,
          minPrice: minPrice,
          onAddRestrictedArtworkIDs: this.onAddRestrictedArtworkIDs,
          onAddArtist: this.onAddArtist,
          onAddGene: this.onAddGene,
          onAddKeyword: this.onAddKeyword,
          onAddTag: this.onAddTag,
          onOpenBatchUpdate: this.onOpenBatchUpdate,
          onRemoveArtist: this.onRemoveArtist,
          onRemoveGene: this.onRemoveGene,
          onRemoveKeyword: this.onRemoveKeyword,
          onRemoveTag: this.onRemoveTag,
          partner: partner,
          publishedFilter: publishedFilter,
          listedFilter: listedFilter,
          restrictedArtworkIDs: restrictedArtworkIDs,
          selectedArtworkIds: selectedArtworkIds,
          selectedArtworksCount: selectedArtworkIds.length,
          sort: sort,
          tags: tags,
          updateState: this.updateStateFor,
        })
      ),
      React.createElement(
        Content,
        null,
        React.createElement(SearchResults, {
          artworks: artworks,
          selectedArtworkIds: selectedArtworkIds,
          previewedArtwork: previewedArtwork,
          isLoading: isLoading,
          totalHits: totalHits,
          onToggleArtwork: this.onToggleArtwork,
          onSelectAllArtworks: this.onSelectAllArtworks,
          onDeselectAllArtworks: this.onDeselectAllArtworks,
          onPreviewArtwork: this.onPreviewArtwork,
          onPreviewPrevious: this.onPreviewPrevious,
          onPreviewNext: this.onPreviewNext,
          onLoadMore: this.fetchMoreArtworks,
        })
      ),
      React.createElement(
        FullScreenModal,
        {
          isOpen: isSpecifyingBatchUpdate,
          onDismiss: this.onDismissBatchUpdate,
        },
        React.createElement(BatchUpdateForm, {
          getCommonGenes: this.getCommonGenes,
          getCommonTags: this.getCommonTags,
          onCancel: this.onDismissBatchUpdate,
          selectedArtworkIds: selectedArtworkIds,
          updateState: this.updateStateFor,
          onAddNotice: this.addNotice,
          onRemoveNotice: this.removeNotice,
        })
      ),
      React.createElement(
        Notices,
        null,
        this.state.notices.map(function(_a) {
          var id = _a.id,
            message = _a.message,
            isError = _a.isError
          return React.createElement(
            Notice,
            {
              key: id,
              id: id,
              isError: isError,
              onDismiss: _this.removeNotice,
            },
            message
          )
        })
      )
    )
  }
  return App
})(React.Component)
export default App
//# sourceMappingURL=App.js.map
