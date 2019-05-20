import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import zipObject from 'lodash.zipobject'
import pickBy from 'lodash.pickby'
import { Link } from './Links'
import { Button } from '@artsy/palette'
import { colors } from './Layout'
import GeneInput from './GeneInput'
import { GeneAutosuggest } from './Autosuggest'
import Overlay from './Overlay'
import ConfirmationModal from './ConfirmationModal'
import { submitBatchUpdate } from 'lib/rosalind-api'

class BatchUpdateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geneValues: {},
      isConfirming: false,
    }
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

  componentWillReceiveProps(nextProps) {
    const currentArtworks = this.props.selectedArtworkIds
    const nextArtworks = nextProps.selectedArtworkIds
    if (nextArtworks !== currentArtworks) {
      this.initializeGeneValues()
    }
  }

  initializeGeneValues() {
    const commonGeneNames = this.props.getCommonGenes()
    const nulls = Array(commonGeneNames.length).fill(null)
    const initialGeneValues = zipObject(commonGeneNames, nulls)
    this.setState({
      geneValues: initialGeneValues,
    })
  }

  handleCancelClick(e) {
    e.preventDefault()
    this.close()
  }

  close() {
    this.dismissConfirmation()
    this.initializeGeneValues()
    this.props.onCancel()
  }

  showConfirmation() {
    this.setState({
      isConfirming: true,
    })
  }

  dismissConfirmation() {
    this.setState({
      isConfirming: false,
    })
  }

  isValid() {
    const selectedArtworksCount = this.props.selectedArtworkIds.length
    const { geneValues } = this.state
    const names = Object.keys(geneValues)
    const validGeneValues = names
      .map(name => geneValues[name])
      .filter(value => value !== null)
    return selectedArtworksCount > 0 && validGeneValues.length > 0
  }

  submit() {
    const { selectedArtworkIds } = this.props
    const { geneValues } = this.state
    const validGenes = pickBy(geneValues, (value, _key) => value !== null)
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

  handleSuccess() {
    const { selectedArtworkIds } = this.props
    const { geneValues } = this.state
    console.log('Success:', JSON.stringify(geneValues), selectedArtworkIds)
    this.props.onAddNotice('Batch update was successfully queued')
    this.close()
  }

  handleFailure(response) {
    response.json().then(json => {
      console.log('Failure:', json)
      this.props.onAddNotice(
        `Batch update could not be submitted: ${json.error_message}`,
        { isError: true }
      )
    })
  }

  handleError(error) {
    console.error('Unexpected error:', error)
    this.props.onAddNotice(`There was an unexpected error: ${error}`, {
      isError: true,
    })
  }

  onAddGene({ name }) {
    const { geneValues } = this.state
    this.setState({
      geneValues: Object.assign(geneValues, { [name]: null }),
    })
  }

  onChangeGeneValue({ name, value }) {
    const { geneValues } = this.state
    const parsedValue = value === '' ? null : parseInt(value)
    this.setState({
      geneValues: Object.assign(geneValues, { [name]: parsedValue }),
    })
  }

  render() {
    const { selectedArtworkIds } = this.props
    const selectedArtworksCount = selectedArtworkIds.length
    const { geneValues, isConfirming } = this.state
    const geneNames = Object.keys(geneValues).sort()
    return (
      <Wrapper>
        <Controls>
          <Link href="#" onClick={this.handleCancelClick} className="cancel">
            Cancel
          </Link>
          <div>{selectedArtworksCount} works selected</div>
          <Button
            className="queue"
            onClick={this.showConfirmation}
            disabled={!this.isValid()}
          >
            Queue changes
          </Button>
        </Controls>

        <Genes>
          {geneNames.map(name => (
            <GeneInput
              key={name}
              name={name}
              value={geneValues[name]}
              onChangeValue={this.onChangeGeneValue}
            />
          ))}
        </Genes>

        {geneNames.length === 0 && (
          <EmptyGenesMessage>
            There aren’t any genes that describe all of your selected works
          </EmptyGenesMessage>
        )}

        <GeneAutosuggest
          placeholder="Add a gene"
          onSelectGene={this.onAddGene}
        />
        <Spacer />

        {isConfirming && <Overlay />}
        <ConfirmationModal
          isOpen={isConfirming}
          onDismiss={this.dismissConfirmation}
          onAccept={this.submit}
        >
          <h1>Are you sure you want to queue these changes?</h1>
          <section>
            <p>
              You will be changing the genome of {selectedArtworkIds.length}{' '}
              works
            </p>
          </section>
        </ConfirmationModal>
      </Wrapper>
    )
  }
}

BatchUpdateForm.propTypes = {
  getCommonGenes: PropTypes.func,
  onAddNotice: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  selectedArtworkIds: PropTypes.array.isRequired,
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

const Spacer = styled.div`
  height: 5em;
`
Spacer.displayName = 'Spacer'

export default BatchUpdateForm
