require 'rails_helper'

describe ArtworkSearch do
  describe '.run' do
    context 'with a successful response' do
      it 'returns the body of that reponse' do
        query = '{"query":{"bool":{"must":[{"match":{"genes":"Kawaii"}}]}}}'
        hits = elasticsearch_sample_artwork_hits

        response = double(:response, success?: true, body: hits)
        expect(Typhoeus).to receive(:post).and_return(response)

        results = ArtworkSearch.run(query)

        expect(results).to eq hits
      end
    end

    context 'with an unsuccessful response' do
      it 'logs the problem and then raises an exception' do
        response = double(:response, success?: false, code: 400, body: 'oh no!')
        expect(Typhoeus).to receive(:post).and_return(response)

        error_message = 'ArtworkSearch error: 400: oh no!'
        expect(Rails.logger).to receive(:warn).with(error_message)

        expect { ArtworkSearch.run(nil) }.to raise_error(ArtworkSearch::ServiceError)
      end
    end
  end
end
