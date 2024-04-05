require "rails_helper"

describe ArtsyTags do
  before do
    gravity_config = {
      "api_root" => "http://gravity.test/api/v1",
      "xapp_token" => "trusted_token"
    }

    application = double(:application, config_for: gravity_config)

    allow(Rails).to receive(:application).and_return(application)
  end
  describe ".tags" do
    before do
      @artwork_id = "abc123"
    end
    def prepare_request(expected_return_value = nil)
      @return_value = double(:response, body: expected_return_value)
      @request = double(:request, run: @return_value)
      allow(Typhoeus::Request).to receive(:new).with(
        "http://gravity.test/api/v1/artwork/#{@artwork_id}",
        headers: {"X-XAPP-TOKEN" => "trusted_token"},
        params: {},
        method: :get,
        params_encoding: :rack
      ).and_return(@request)
    end
    it "gets the tags from a given artwork" do
      prepare_request('{"tags": ["foo", "bar"]}')
      tags = ArtsyTags.tags @artwork_id
      expect(tags.count).to eq 2
      expect(tags).to include "foo"
      expect(tags).to include "bar"
    end
    it "gracefully handles the case where tags are nil" do
      prepare_request("{}")
      tags = ArtsyTags.tags @artwork_id
      expect(tags.count).to eq 0
    end
    it "gracefully handles the case where the whole body is nil" do
      prepare_request
      tags = ArtsyTags.tags @artwork_id
      expect(tags.count).to eq 0
    end
  end

  describe ".update_tags" do
    it "hits Gravity with updates" do
      artwork_id = "abc123"
      tags = %w[foo bar]

      request = double(:request, run: nil)

      expect(Typhoeus::Request).to receive(:new).with(
        "http://gravity.test/api/v1/artwork/abc123/tags",
        headers: {"X-XAPP-TOKEN" => "trusted_token"},
        params: {tags: tags},
        method: :put,
        params_encoding: :rack
      ).and_return(request)

      ArtsyTags.update_tags(artwork_id, tags)
    end
  end
end
