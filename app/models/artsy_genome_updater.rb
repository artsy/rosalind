class ArtsyGenomeUpdater
  def self.update(artwork_id, genes)
    new(artwork_id, genes).update
  end

  def initialize(artwork_id, genes)
    @artwork_id = artwork_id
    @genes = genes
  end

  def update
    updated_genes = current_genes.merge new_genes
    update_artwork_genes(updated_genes)
  end

  private

  def new_genes
    @genes
  end

  def current_genes
    @current_genes ||= ArtsyGenome.genes(@artwork_id)
  end

  def update_artwork_genes(updated_genes)
    ArtsyGenome.update_genes(@artwork_id, updated_genes)
  end
end
