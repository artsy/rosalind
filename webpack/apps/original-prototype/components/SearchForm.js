import React from 'react'
import GeneAutosuggest from './GeneAutosuggest'
import TagAutosuggest from './TagAutosuggest'
import PartnerAutosuggest from './PartnerAutosuggest'
import FairAutosuggest from './FairAutosuggest'

class SearchForm extends React.Component {
  render () {
    const { genes, tags, partner, fair, publishedFilter, deletedFilter, genomedFilter } = this.props
    return (
      <div className='SearchForm'>
        { genes.length > 0 && <h2 className='SearchForm-SectionHeader'>Genes</h2> }
        { genes.map((g) => <SelectedGene key={g.id} name={g.name} onRemoveGene={this.props.onRemoveGene} />)}

        { tags.length > 0 && <h2 className='SearchForm-SectionHeader'>Tags</h2> }
        { tags.map((t) => <SelectedTag key={t.id} name={t.name} onRemoveTag={this.props.onRemoveTag} />)}

        { partner && <h2 className='SearchForm-SectionHeader'>Partner</h2> }
        { <SelectedPartner partner={partner} onClearPartner={this.props.onClearPartner} /> }

        { fair && <h2 className='SearchForm-SectionHeader'>Fair</h2> }
        { <SelectedFair fair={fair} onClearFair={this.props.onClearFair} /> }

        <form onSubmit={e => e.preventDefault()}>
          <GeneAutosuggest onSelectGene={this.props.onAddGene} />
          <TagAutosuggest onSelectTag={this.props.onAddTag} />
          { partner || <PartnerAutosuggest onSetPartner={this.props.onSetPartner} /> }
          { fair || <FairAutosuggest onSetFair={this.props.onSetFair} /> }

          <div className='FilterOptions'>
            { false && <p><strong>Options</strong></p> }
            <PublishedFilter current={publishedFilter}
              onSetPublishedFilter={this.props.onSetPublishedFilter}
              />
            <DeletedFilter current={deletedFilter}
              onSetDeletedFilter={this.props.onSetDeletedFilter}
              />
            <GenomedFilter current={genomedFilter}
              onSetGenomedFilter={this.props.onSetGenomedFilter}
              />
          </div>
        </form>
      </div>
    )
  }
}

class SelectedGene extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onRemoveGene(this.props.name)
  }

  render () {
    return (
      <div className='SelectedGene'>
        {this.props.name}
        <a href='#' className='SelectedGene-remove'
          onClick={this.handleRemove}>✕</a>
      </div>
    )
  }
}

class SelectedTag extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onRemoveTag(this.props.name)
  }

  render () {
    return (
      <div className='SelectedTag'>
        {this.props.name}
        <a href='#' className='SelectedTag-remove'
          onClick={this.handleRemove}>✕</a>
      </div>
    )
  }
}

class SelectedPartner extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onClearPartner()
  }

  render () {
    const { partner } = this.props
    if (partner !== null) {
      return (
        <div className='SelectedPartner'>
          {partner.name}
          <a href='#' className='SelectedPartner-remove'
            onClick={this.handleRemove}>✕</a>
        </div>
      )
    }
    return null
  }
}

class SelectedFair extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onClearFair()
  }

  render () {
    const { fair } = this.props
    if (fair !== null) {
      return (
        <div className='SelectedFair'>
          {fair.name}
          <a href='#' className='SelectedFair-remove'
            onClick={this.handleRemove}>✕</a>
        </div>
      )
    }
    return null
  }
}

function PublishedFilter (props) {
  const { current, onSetPublishedFilter } = props
  return (
    <div className='PublishedFilter'>
      <span style={{fontWeight: 'bold'}}>Published?</span>
      <br />
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetPublishedFilter('SHOW_ALL') }}>All</a>
      <a href='#' className={current === 'SHOW_PUBLISHED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetPublishedFilter('SHOW_PUBLISHED') }}>Published</a>
      <a href='#' className={current === 'SHOW_NOT_PUBLISHED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetPublishedFilter('SHOW_NOT_PUBLISHED') }}>Not published</a>
    </div>
  )
}

function DeletedFilter (props) {
  const { current, onSetDeletedFilter } = props
  return (
    <div className='DeletedFilter'>
      <span style={{fontWeight: 'bold'}}>Deleted?</span>
      <br />
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetDeletedFilter('SHOW_ALL') }}>All</a>
      <a href='#' className={current === 'SHOW_DELETED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetDeletedFilter('SHOW_DELETED') }}>Deleted</a>
      <a href='#' className={current === 'SHOW_NOT_DELETED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetDeletedFilter('SHOW_NOT_DELETED') }}>Not deleted</a>
    </div>
  )
}

function GenomedFilter (props) {
  const { current, onSetGenomedFilter } = props
  return (
    <div className='GenomedFilter'>
      <span style={{fontWeight: 'bold'}}>Genomed?</span>
      <br />
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_ALL') }}>All</a>
      <a href='#' className={current === 'SHOW_GENOMED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_GENOMED') }}>Genomed</a>
      <a href='#' className={current === 'SHOW_NOT_GENOMED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_NOT_GENOMED') }}>Not genomed</a>
    </div>
  )
}

export default SearchForm
