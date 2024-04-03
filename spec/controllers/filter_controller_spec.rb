require "rails_helper"

RSpec.describe FilterController, type: :controller do
  context "with a logged in admin" do
    include_context "logged in admin"

    describe "#artworks" do
      let(:params) do
        {for_sale: true, attribution_class: "unique", gene_ids: ["sculpture"]}
      end

      let(:artwork_hit) { read_sample_artwork_fixture }

      let(:response) do
        {hits: [artwork_hit], aggregations: []}
      end

      let!(:gravity_request) do
        stub_filter_artworks_request(200, params, response.to_json)
      end

      it "issues the correct gravity query" do
        get :artworks, params: params
        expect(gravity_request).to have_been_made
      end
    end
  end
end
