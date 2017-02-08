require 'rails_helper'

RSpec.describe MatchController, type: :controller do
  let!(:gravity_api_root) { Rails.application.config_for(:gravity)['api_root'] }

  describe '#genes' do
    let(:gravity_request) do
      stub_request(:get, Regexp.new("#{gravity_api_root}/match/tags"))
    end

    it 'issues the correct gravity query' do
      get :genes, params: { term: 'photo' }
      expect(gravity_request).to have_been_made
    end
  end

  describe '#tags' do
    let(:gravity_request) do
      stub_request(:get, Regexp.new("#{gravity_api_root}/match/tags"))
    end

    it 'issues the correct gravity query' do
      get :tags, params: { term: 'new york' }
      expect(gravity_request).to have_been_made
    end
  end

  describe '#partners' do
    let(:gravity_request) do
      stub_request(:get, Regexp.new("#{gravity_api_root}/match/partners"))
    end

    it 'issues the correct gravity query' do
      get :partners, params: { term: 'gago' }
      expect(gravity_request).to have_been_made
    end
  end

  describe '#fairs' do
    let(:gravity_request) do
      stub_request(:get, Regexp.new("#{gravity_api_root}/match/fairs"))
    end

    it 'issues the correct gravity query' do
      get :fairs, params: { term: 'new york' }
      expect(gravity_request).to have_been_made
    end
  end
end
