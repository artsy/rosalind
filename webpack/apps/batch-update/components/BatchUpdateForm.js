import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { Link } from './Links'
import { Button } from './Buttons'
import { colors } from './Layout'
import GeneInput from './GeneInput'
import { GeneAutosuggest } from './Autosuggest'
import Overlay from './Overlay'
import ConfirmationModal from './ConfirmationModal'
import { submitBatchUpdate } from 'lib/rosalind-api'

const initialState = () => ({
  geneValues: {},
  isConfirming: false
})

class BatchUpdateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialState()
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.close = this.close.bind(this)
    this.showConfirmation = this.showConfirmation.bind(this)
    this.dismissConfirmation = this.dismissConfirmation.bind(this)
    this.isValid = this.isValid.bind(this)
    this.submit = this.submit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFailure = this.handleFailure.bind(this)
    this.handleError = this.handleError.bind(this)
    this.onAddGene = this.onAddGene.bind(this)
    this.onChangeGeneValue = this.onChangeGeneValue.bind(this)
  }

  componentWillReceiveProps () {
    this.initializeGeneValues()
  }

  initializeGeneValues () {
    const commonGeneNames = this.props.getCommonGenes()
    const nulls = Array(commonGeneNames.length).fill(null)
    const initialGeneValues = _.zipObject(commonGeneNames, nulls)
    this.setState({
      geneValues: initialGeneValues
    })
  }

  handleCancelClick (e) {
    e.preventDefault()
    this.close()
  }

  close () {
    this.setState(initialState())
    this.props.onCancel()
  }

  showConfirmation () {
    this.setState({
      isConfirming: true
    })
  }

  dismissConfirmation () {
    this.setState({
      isConfirming: false
    })
  }

  isValid () {
    const selectedArtworksCount = this.props.selectedArtworkIds.length
    const { geneValues } = this.state
    const names = Object.keys(geneValues)
    const validGeneValues = names.map(name => geneValues[name]).filter(value => value !== null)
    return (selectedArtworksCount > 0) && (validGeneValues.length > 0)
  }

  submit () {
    const { selectedArtworkIds } = this.props
    const { geneValues } = this.state
    const validGenes = _.pickBy(geneValues, (value, _key) => value !== null)
    const csrfToken = document.querySelector('meta[name=csrf-token]').content
    submitBatchUpdate(selectedArtworkIds, validGenes, csrfToken)
       .then(response => {
         if (response.ok) {
           this.handleSuccess()
         } else {
           this.handleFailure(response)
         }
       })
       .catch(error => {
         this.handleError(error)
       })
  }

  handleSuccess () {
    const { selectedArtworkIds } = this.props
    const { geneValues } = this.state
    this.setState(initialState())
    console.log('Success:', JSON.stringify(geneValues), selectedArtworkIds)
    window.alert('Batch update was successfully queued')
    this.close()
  }

  handleFailure (response) {
    response.json().then(json => {
      console.log('Failure:', json)
      window.alert(`Batch update could not be submitted: ${json.error_message}`)
    })
  }

  handleError (error) {
    console.error('Unexpected error:', error)
    window.alert(`There was an unexpected error: ${error}`)
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
    const { geneValues, isConfirming } = this.state
    const geneNames = Object.keys(geneValues).sort()
    return (
      <Wrapper>
        <Controls>
          <Link href='#' onClick={this.handleCancelClick} className='cancel'>Cancel</Link>
          <div>{selectedArtworksCount} works selected</div>
          <Button className='queue' onClick={this.showConfirmation} disabled={!this.isValid()}>Queue changes</Button>
        </Controls>

        <Genes>
          { geneNames.map(name =>
            <GeneInput key={name} name={name} value={geneValues[name]} onChangeValue={this.onChangeGeneValue} />
          )}
        </Genes>

        { (geneNames.length === 0) &&
          <EmptyGenesMessage>
            There aren’t any genes that describe all of your selected works
          </EmptyGenesMessage>
        }

        <GeneAutosuggest placeholder='Add a gene' onSelectGene={this.onAddGene} />

        { isConfirming && <Overlay /> }
        <ConfirmationModal isOpen={isConfirming} onDismiss={this.dismissConfirmation} onAccept={this.submit}>
          <h1>Are you sure you want to queue these changes?</h1>
          <section>
            <p>
              You will be changing the genome of {selectedArtworkIds.length} works
            </p>
          </section>
        </ConfirmationModal>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: solid 1px ${colors.grayLight};
`
Controls.displayName = 'Controls'

const Genes = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 30px 0;
`
Genes.displayName = 'Genes'

const EmptyGenesMessage = styled.div`
  align-self: center;
  text-align: center;
`
EmptyGenesMessage.displayName = 'EmptyGenesMessage'

export default BatchUpdateForm
