import React from 'react'
import SelectedGene from './SelectedGene'
import SelectedTag from './SelectedTag'
import SelectedPartner from './SelectedPartner'
import SelectedFair from './SelectedFair'

function CurrentCriteria (props) {
  const {className, genes, tags, partner, fair, onRemoveGene, onRemoveTag, onClearPartner, onClearFair} = props
  return (
    <div className={className}>
      <CurrentGenes genes={genes} onRemoveGene={onRemoveGene} />
      <CurrentTags tags={tags} onRemoveTag={onRemoveTag} />
      <CurrentPartner partner={partner} onClearPartner={onClearPartner} />
      <CurrentFair fair={fair} onClearFair={onClearFair} />
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
  if (genes.length > 0) {
    return (
      <div>
        <h2>Genes</h2>
        {genes.map(g => <SelectedGene key={g.id} name={g.name} onRemoveGene={onRemoveGene} />)}
      </div>
    )
  } else {
    return null
  }
}

function CurrentTags (props) {
  const { tags, onRemoveTag } = props
  if (tags.length > 0) {
    return (
      <div>
        <h2>Tags</h2>
        {tags.map(t => <SelectedTag key={t.id} name={t.name} onRemoveTag={onRemoveTag} />)}
      </div>
    )
  } else {
    return null
  }
}

function CurrentPartner (props) {
  const { partner, onClearPartner } = props
  if (partner !== null) {
    return (
      <div>
        <h2>Partner</h2>
        <SelectedPartner partner={partner} onClearPartner={onClearPartner} />
      </div>
    )
  } else {
    return null
  }
}

function CurrentFair (props) {
  const { fair, onClearFair } = props
  if (fair !== null) {
    return (
      <div>
        <h2>Fair</h2>
        <SelectedFair fair={fair} onClearFair={onClearFair} />
      </div>
    )
  } else {
    return null
  }
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
