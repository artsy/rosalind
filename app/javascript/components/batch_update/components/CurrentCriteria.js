import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { avantGarde } from './Layout'
import {
  SelectedCreatedAfterDate,
  SelectedCreatedBeforeDate,
  SelectedGene,
  SelectedTag,
  SelectedArtist,
  SelectedPartner,
  SelectedFair
} from './Selected'

function CurrentCriteria (props) {
  const {
    artists,
    className,
    clearState,
    createdAfterDate,
    createdBeforeDate,
    fair,
    genes,
    onRemoveGene,
    onRemoveTag,
    onRemoveArtist,
    partner,
    tags
  } = props

  return (
    <div className={className}>
      {genes.length > 0 && <CurrentGenes genes={genes} onRemoveGene={onRemoveGene} />}
      {tags.length > 0 && <CurrentTags tags={tags} onRemoveTag={onRemoveTag} />}
      {artists.length > 0 && <CurrentArtists artists={artists} onRemoveArtist={onRemoveArtist} />}
      {partner && <SelectedPartner name={partner.name} clearState={clearState} />}
      {fair && <SelectedFair name={fair.name} clearState={clearState} />}
      {createdAfterDate && <SelectedCreatedAfterDate name={createdAfterDate} clearState={clearState} />}
      {createdBeforeDate && <SelectedCreatedBeforeDate name={createdBeforeDate} clearState={clearState} />}
    </div>
  )
}

CurrentCriteria.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object),
  clearState: PropTypes.func,
  createdAfterDate: PropTypes.string,
  createdBeforeDate: PropTypes.string,
  fair: PropTypes.object,
  genes: PropTypes.arrayOf(PropTypes.object),
  onRemoveGene: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
  partner: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.object),
}

function CurrentGenes (props) {
  const { genes, onRemoveGene } = props
  return (
    <div>
      <h2>Genes</h2>
      {genes.map(g => <SelectedGene key={g.id} name={g.name} onRemove={onRemoveGene} />)}
    </div>
  )
}

function CurrentTags (props) {
  const { tags, onRemoveTag } = props
  return (
    <div>
      <h2>Tags</h2>
      {tags.map(t => <SelectedTag key={t.id} name={t.name} onRemove={onRemoveTag} />)}
    </div>
  )
}

function CurrentArtists (props) {
  const { artists, onRemoveArtist } = props
  return (
    <div>
      <h2>Artists</h2>
      {artists.map(a => <SelectedArtist key={a.id} id={a.id} name={a.name} onRemove={onRemoveArtist} />)}
    </div>
  )
}

/* default styled component */

const StyledCurrentCriteria = styled(CurrentCriteria)`
  h2 {
    ${avantGarde}
    color: #999;
    font-size: 0.75em;
    font-weight: 400;
    letter-spacing: 0.1em;
    margin-top: 1.5em;
    text-transform: uppercase;
  }
`

export default StyledCurrentCriteria
