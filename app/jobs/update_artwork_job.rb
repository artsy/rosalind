class UpdateArtworkJob < ApplicationJob
  def perform(artwork_id, batch_update_id)
    @artwork_id = artwork_id
    @batch_update = BatchUpdate.find_by id: batch_update_id
    return unless @batch_update

    @genes = @batch_update.genes
    handle_genes

    @tags = @batch_update.tags
    handle_tags

    @batch_update.increment_updated_artworks
  end

  def handle_tags
    return if @tags.blank? || (@tags["toAdd"].blank? && @tags["toRemove"].blank?)

    ArtsyTagsUpdater.update(@artwork_id, @tags["toAdd"], @tags["toRemove"])
  end

  def handle_genes
    return if @genes.blank?

    ArtsyGenomeUpdater.update(@artwork_id, @genes)
    PartnerGenomeUpdater.update(@artwork_id, @genes.keys) if @batch_update.removes_genes?
  end
end
