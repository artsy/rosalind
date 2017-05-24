import React from 'react'
import styled from 'styled-components'
import { Link } from './Links'
import { LinkButton } from './Buttons'
import { colors } from './Layout'
import GeneInput from './GeneInput'
import { GeneAutosuggest } from './Autosuggest'

class BatchUpdateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      geneValues: {}
    }
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.onAddGene = this.onAddGene.bind(this)
    this.onChangeGeneValue = this.onChangeGeneValue.bind(this)
  }

  handleCancelClick (e) {
    e.preventDefault()
    this.setState({
      geneValues: {}
    })
    this.props.onCancel()
  }

  onAddGene ({name}) {
    const { geneValues } = this.state
    this.setState({
      geneValues: Object.assign(geneValues, { [name]: null })
    })
  }

  onChangeGeneValue ({name, value}) {
    const { geneValues } = this.state
    const parsedValue = (value === '' ? null : parseInt(value))
    this.setState({
      geneValues: Object.assign(geneValues, { [name]: parsedValue })
    })
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
          { geneNames.map(name => <GeneInput key={name} name={name} value={geneValues[name]} onChangeValue={this.onChangeGeneValue} />) }
        </Genes>

        <GeneAutosuggest placeholder='Add a gene' onSelectGene={this.onAddGene} />
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
