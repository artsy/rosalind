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
    createdAfterDate,
    createdBeforeDate,
    fair,
    genes,
    onClearCreatedAfterDate,
    onClearCreatedBeforeDate,
    onClearFair,
    onClearPartner,
    onRemoveGene,
    onRemoveTag,
    partner,
    tags
  } = props

  return (
    <div className={className}>
      {genes.length > 1 && <CurrentGenes genes={genes} onRemoveGene={onRemoveGene} />}
      {tags.length > 1 && <CurrentTags tags={tags} onRemoveTag={onRemoveTag} />}
      {partner && <SelectedPartner name={partner.name} onRemove={onClearPartner} />}
      {fair && <SelectedFair name={fair.name} onRemove={onClearFair} />}
      {createdAfterDate && <SelectedCreatedAfterDate name={createdAfterDate} onRemove={onClearCreatedAfterDate} />}
      {createdBeforeDate && <SelectedCreatedBeforeDate name={createdBeforeDate} onRemove={onClearCreatedBeforeDate} />}
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
  onClearPartner: React.PropTypes.func.isRequired,
  onClearFair: React.PropTypes.func.isRequired
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
