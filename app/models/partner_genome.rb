class PartnerGenome < Genome
  def self.genes(partner_id, artwork_id)
    new(partner_id, artwork_id).genes
  end

  def self.update_genes(partner_id, artwork_id, genes)
    params = { genes: genes }
    new(partner_id, artwork_id, params, :put).update_genes
  end

  def initialize(partner_id, artwork_id, genes = {}, method = :get)
    super(artwork_id, genes, method)
    @partner_id = partner_id
  end

  private

  def api_url
    "#{api_root}/partner/#{@partner_id}/artwork/#{@artwork_id}/genome"
  end
end
