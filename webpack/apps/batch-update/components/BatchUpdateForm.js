import React from 'react'
import styled from 'styled-components'
import { Link } from './Links'
import { LinkButton } from './Buttons'
import { colors } from './Layout'
import GeneInput from './GeneInput'

class BatchUpdateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      geneValues: {}
    }
    this.handleCancelClick = this.handleCancelClick.bind(this)
  }

  handleCancelClick (e) {
    e.preventDefault()
    this.props.onCancel()
  }

  render () {
    const { selectedArtworkIds } = this.props
    const selectedArtworksCount = selectedArtworkIds.length
    const { geneValues } = this.state
    const geneNames = Object.keys(geneValues).sort()
    return (
      <Wrapper>
        <Controls>
          <Link href='#' onClick={this.handleCancelClick} className='cancel'>Cancel</Link>
          <div>{selectedArtworksCount} works selected</div>
          <LinkButton onClick={e => console.log('TODO')}>Queue changes</LinkButton>
        </Controls>
        <Genes>
          { geneNames.map(name => <GeneInput key={name} name={name} value={geneValues[name]} />) }
        </Genes>
      </Wrapper>
    )
  }
}

BatchUpdateForm.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
  selectedArtworkIds: React.PropTypes.array.isRequired
}

const Wrapper = styled.div`
  padding: 18px 30px;
`
Wrapper.displayName = 'Wrapper'

const Controls = styled.div`
  display: flex
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: solid 1px ${colors.grayLight}
`
Controls.displayName = 'Controls'

const Genes = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 30px 0;
`
Genes.displayName = 'Genes'

export default BatchUpdateForm
