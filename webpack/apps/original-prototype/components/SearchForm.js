import React from 'react'
import { GeneAutosuggest, TagAutosuggest, PartnerAutosuggest, FairAutosuggest } from './Autosuggest'
import CurrentCriteria from './CurrentCriteria'

class SearchForm extends React.Component {
  render () {
    const { genes, tags, partner, fair, onRemoveGene, onRemoveTag, onClearPartner, onClearFair } = this.props
    const { publishedFilter, deletedFilter, genomedFilter } = this.props
    return (
      <div className='SearchForm'>
        <CurrentCriteria
          genes={genes}
          tags={tags}
          partner={partner}
          fair={fair}
          onRemoveGene={onRemoveGene}
          onRemoveTag={onRemoveTag}
          onClearPartner={onClearPartner}
          onClearFair={onClearFair}
          />

        <form onSubmit={e => e.preventDefault()}>
          <GeneAutosuggest placeholder='Add a gene' onSelectGene={this.props.onAddGene} />
          <TagAutosuggest placeholder='Add a tag' onSelectTag={this.props.onAddTag} />
          { partner === null && <PartnerAutosuggest onSelectPartner={this.props.onSetPartner} /> }
          { fair === null && <FairAutosuggest onSelectFair={this.props.onSetFair} /> }

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
