class ArtsyGenome < Genome
  def self.genes(artwork_id)
    new(artwork_id).genes
  end

  def self.update_genes(artwork_id, genes)
    params = { genes: genes }
    new(artwork_id, params, :put).update_genes
  end

  private

  def api_url
    "#{api_root}/artwork/#{@artwork_id}/genome"
  end
end
