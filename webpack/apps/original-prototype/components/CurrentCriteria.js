import React from 'react'
import SelectedGene from './SelectedGene'
import SelectedTag from './SelectedTag'
import SelectedPartner from './SelectedPartner'
import SelectedFair from './SelectedFair'

export default function CurrentCriteria (props) {
  const {genes, tags, partner, fair, onRemoveGene, onRemoveTag, onClearPartner, onClearFair} = props
  return (
    <div>
      { genes.length > 0 && <h2 className='SearchForm-SectionHeader'>Genes</h2> }
      { genes.map(g => <SelectedGene key={g.id} name={g.name} onRemoveGene={onRemoveGene} />)}

      { tags.length > 0 && <h2 className='SearchForm-SectionHeader'>Tags</h2> }
      { tags.map(t => <SelectedTag key={t.id} name={t.name} onRemoveTag={onRemoveTag} />)}

      { partner !== null && <h2 className='SearchForm-SectionHeader'>Partner</h2> }
      { <SelectedPartner partner={partner} onClearPartner={onClearPartner} /> }

      { fair !== null && <h2 className='SearchForm-SectionHeader'>Fair</h2> }
      { <SelectedFair fair={fair} onClearFair={onClearFair} /> }
    </div>
  )
}
