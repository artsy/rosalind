import React from 'react'
import SelectedGene from './SelectedGene'
import SelectedTag from './SelectedTag'
import SelectedPartner from './SelectedPartner'
import SelectedFair from './SelectedFair'

export default function CurrentCriteria (props) {
  const {genes, tags, partner, fair, onRemoveGene, onRemoveTag, onClearPartner, onClearFair} = props
  return (
    <div>
      <CurrentGenes genes={genes} onRemoveGene={onRemoveGene} />
      <CurrentTags tags={tags} onRemoveTag={onRemoveTag} />
      <CurrentPartner partner={partner} onClearPartner={onClearPartner} />
      <CurrentFair fair={fair} onClearFair={onClearFair} />
    </div>
  )
}

function CurrentGenes (props) {
  const { genes, onRemoveGene } = props
  if (genes.length > 0) {
    return (
      <div>
        <h2 className='SearchForm-SectionHeader'>Genes</h2>
        { genes.map(g => <SelectedGene key={g.id} name={g.name} onRemoveGene={onRemoveGene} />) }
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
        <h2 className='SearchForm-SectionHeader'>Tags</h2>
        { tags.map(t => <SelectedTag key={t.id} name={t.name} onRemoveTag={onRemoveTag} />) }
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
        <h2 className='SearchForm-SectionHeader'>Partner</h2>
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
        <h2 className='SearchForm-SectionHeader'>Fair</h2>
        <SelectedFair fair={fair} onClearFair={onClearFair} />
      </div>
    )
  } else {
    return null
  }
}
