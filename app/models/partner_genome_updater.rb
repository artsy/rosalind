class PartnerGenomeUpdater
  def self.update(artwork_id, gene_names)
    new(artwork_id, gene_names).update
  end

  def initialize(artwork_id, gene_names)
    @artwork_id = artwork_id
    @gene_names = gene_names
  end

  def update
    return unless current_genes

    updated_genes = current_genes.except(*genes_to_remove)
    update_artwork_genes(updated_genes) if updated_genes != current_genes
  end

  private

  def genes_to_remove
    @gene_names
  end

  def partner_attrs
    @partner_attrs ||= Artwork.find(@artwork_id)&.partner || {}
  end

  def partner_id
    @partner_id = partner_attrs['id']
  end

  def current_genes
    return nil unless partner_id

    @current_genes ||= PartnerGenome.genes partner_id, @artwork_id
  end

  def update_artwork_genes(updated_genes)
    PartnerGenome.update_genes partner_id, @artwork_id, updated_genes
  end
end
