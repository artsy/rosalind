require "rails_helper"

describe ArtsyGenomeUpdater do
  context "with a gene not found in the Artsy genome for the artwork" do
    it "adds that gene" do
      artwork_id = "abc123"
      current_genes = {}
      genes = {"Photography" => 50}

      allow(ArtsyGenome).to receive(:genes).and_return(current_genes)
      expect(ArtsyGenome).to receive(:update_genes).with(artwork_id, genes)

      ArtsyGenomeUpdater.update(artwork_id, genes)
    end
  end

  context "with a gene already found in the Artsy genome for the artwork" do
    it "replaces the value for that gene" do
      artwork_id = "abc123"
      current_genes = {"Photography" => 100}
      genes = {"Photography" => 50}

      allow(ArtsyGenome).to receive(:genes).and_return(current_genes)
      expect(ArtsyGenome).to receive(:update_genes).with(artwork_id, genes)

      ArtsyGenomeUpdater.update(artwork_id, genes)
    end
  end
end
