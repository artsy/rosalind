require "rails_helper"

describe UpdateArtworkJob do
  context "with a bogus batch update id" do
    it "does nothing" do
      expect(ArtsyTagsUpdater).to_not receive(:update)
      expect(ArtsyGenomeUpdater).to_not receive(:update)
      expect(PartnerGenomeUpdater).to_not receive(:update)
      UpdateArtworkJob.new.perform("bogus", "also_bogus")
    end
  end

  context "with a valid batch update" do
    it "updates the Artsy genome and increments the counter" do
      artwork_id = "abc123"
      batch_update = Fabricate :batch_update
      genes = batch_update.genes
      tags_to_add = batch_update.tags["toAdd"]
      tags_to_remove = batch_update.tags["toRemove"]

      expect(ArtsyGenomeUpdater).to receive(:update).with(artwork_id, genes)
      expect(ArtsyTagsUpdater).to receive(:update).with(artwork_id, tags_to_add, tags_to_remove)
      expect(PartnerGenomeUpdater).to_not receive(:update)

      UpdateArtworkJob.new.perform(artwork_id, batch_update)

      expect(batch_update.reload.updated_artworks).to eq 1
    end
  end

  context "with a batch update that removes genes" do
    it "also updates the Partner genome" do
      artwork_id = "abc123"
      genes = {"Photography" => 0}
      batch_update = Fabricate :batch_update, genes: genes

      allow(ArtsyGenomeUpdater).to receive(:update)
      expect(PartnerGenomeUpdater).to receive(:update).with(artwork_id, genes.keys)

      UpdateArtworkJob.new.perform(artwork_id, batch_update)
    end
  end
end
