import React from 'react'
import {
  SelectedCreatedAfterDate,
  SelectedCreatedBeforeDate,
  SelectedGene,
  SelectedTag,
  SelectedPartner,
  SelectedFair
} from './Selected'

function CurrentCriteria (props) {
  const {
    className,
    clearState,
    createdAfterDate,
    createdBeforeDate,
    fair,
    genes,
    onRemoveGene,
    onRemoveTag,
    partner,
    tags
  } = props

  return (
    <div className={className}>
      {genes.length > 0 && <CurrentGenes genes={genes} onRemoveGene={onRemoveGene} />}
      {tags.length > 0 && <CurrentTags tags={tags} onRemoveTag={onRemoveTag} />}
      {partner && <SelectedPartner name={partner.name} clearState={clearState} />}
      {fair && <SelectedFair name={fair.name} clearState={clearState} />}
      {createdAfterDate && <SelectedCreatedAfterDate name={createdAfterDate} clearState={clearState} />}
      {createdBeforeDate && <SelectedCreatedBeforeDate name={createdBeforeDate} clearState={clearState} />}
    </div>
  )
}

CurrentCriteria.propTypes = {
  genes: React.PropTypes.arrayOf(React.PropTypes.object),
  tags: React.PropTypes.arrayOf(React.PropTypes.object),
  partner: React.PropTypes.object,
  fair: React.PropTypes.object,
  onRemoveGene: React.PropTypes.func.isRequired,
  onRemoveTag: React.PropTypes.func.isRequired,
  clearState: React.PropTypes.func
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

/* default styled component */

import styled from 'styled-components'
import { avantGarde } from './Layout'

const StyledCurrentCriteria = styled(CurrentCriteria)`
  h2 {
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    ${avantGarde}
    font-size: 0.75em;
    font-weight: 400;
    margin-top: 1.5em;
  }
`

export default StyledCurrentCriteria
