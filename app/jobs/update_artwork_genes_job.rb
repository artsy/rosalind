class UpdateArtworkGenesJob < ApplicationJob
  def perform(artwork_id, batch_update_id)
    batch_update = BatchUpdate.find_by id: batch_update_id
    return unless batch_update
    genes = batch_update.genes
    gene_names = genes.keys
    ArtsyGenomeUpdater.update(artwork_id, genes)
    PartnerGenomeUpdater.update(artwork_id, gene_names) if batch_update.removes_genes?
    batch_update.increment_updated_artworks
  end
end
