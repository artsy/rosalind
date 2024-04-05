require "rails_helper"

describe PartnerGenomeUpdater do
  context "with an artwork that does not have a partner" do
    it "does nothing" do
      artwork_id = "abc123"
      gene_names = %w[Photography]

      expect(Artwork).to receive(:find).with(artwork_id).and_return nil
      expect(PartnerGenome).to_not receive(:genes)
      expect(PartnerGenome).to_not receive(:update_genes)

      PartnerGenomeUpdater.update(artwork_id, gene_names)
    end
  end

  context "with an artwork that has a partner genome" do
    context "but does not have the gene to remove" do
      it "does nothing" do
        artwork_id = "abc123"
        gene_names = %w[Photography]
        artwork = double(:artwork, partner: {"id" => "def456"})

        expect(Artwork).to receive(:find).with(artwork_id).and_return(artwork)
        expect(PartnerGenome).to receive(:genes).and_return("Painting" => 100)
        expect(PartnerGenome).to_not receive(:update_genes)

        PartnerGenomeUpdater.update(artwork_id, gene_names)
      end
    end

    context "and has the gene to remove" do
      it "removes that gene" do
        artwork_id = "abc123"
        partner_id = "def456"
        gene_names = %w[Photography]
        artwork = double(:artwork, partner: {"id" => partner_id})

        expect(Artwork).to receive(:find).with(artwork_id).and_return(artwork)
        expect(PartnerGenome).to receive(:genes).and_return("Photography" => 100)
        expect(PartnerGenome).to receive(:update_genes).with(partner_id, artwork_id, {})

        PartnerGenomeUpdater.update(artwork_id, gene_names)
      end
    end
  end
end
