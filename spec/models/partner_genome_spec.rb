require "rails_helper"

describe PartnerGenome do
  before do
    gravity_config = {
      "api_root" => "http://gravity.test/api/v1",
      "xapp_token" => "trusted_token"
    }

    application = double(:application, config_for: gravity_config)

    allow(Rails).to receive(:application).and_return(application)
  end

  describe ".genes" do
    it "returns parsed genes" do
      partner_id = "def456"
      artwork_id = "abc123"
      genes = {"Photography" => 100}
      genes_json = {genes: genes}.to_json

      response = double(:response, body: genes_json)
      request = double(:request, run: response)

      expect(Typhoeus::Request).to receive(:new).with(
        "http://gravity.test/api/v1/partner/def456/artwork/abc123/genome",
        headers: {"X-XAPP-TOKEN" => "trusted_token"},
        params: {},
        method: :get
      ).and_return(request)

      expect(PartnerGenome.genes(partner_id, artwork_id)).to eq genes
    end
  end

  describe ".update_genes" do
    it "hits Gravity with updates" do
      partner_id = "def456"
      artwork_id = "abc123"
      genes = {"Photography" => 100}

      request = double(:request, run: nil)

      expect(Typhoeus::Request).to receive(:new).with(
        "http://gravity.test/api/v1/partner/def456/artwork/abc123/genome",
        headers: {"X-XAPP-TOKEN" => "trusted_token"},
        params: {genes: genes},
        method: :put
      ).and_return(request)

      PartnerGenome.update_genes(partner_id, artwork_id, genes)
    end
  end
end
