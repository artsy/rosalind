def stub_filter_artworks_request(status, params, body)
  endpoint = "#{Rails.application.config_for(:gravity)['api_root']}/filter/artworks"
  WebMock.stub_request(:get, endpoint).with(query: params).to_return(status: status, body: body, headers: {})
end

def read_sample_artwork_fixture
  JSON.parse(File.read('./spec/fixtures/kiki-smith-the-falls-i.json'))
end
