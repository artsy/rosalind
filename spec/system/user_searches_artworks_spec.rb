require 'rails_helper'

describe 'User searches artworks', js: true do
  before do
    allow_any_instance_of(ApplicationController).to receive(:find_current_user)
    allow_any_instance_of(ApplicationController).to receive(:require_admin_or_genomer)

    allow(ArtworkSearchService).to receive(:call).and_return(search_response)
  end

  let(:hits) do
    [
      {
        '_source' => {
          'id' => '1234',
          'name' => 'Pikachu',
          'image_url' => 'https://d32dm0rphc51dk.cloudfront.net/Zm4R54uWxcufME7KJBRxdw/square.jpg'
        }
      },
      {
        '_source' => {
          'id' => '5678',
          'name' => 'Jigglypuff',
          'image_url' => 'https://d32dm0rphc51dk.cloudfront.net/s8oMXsCa4LFVnsBc7sQluA/square.jpg'
        }
      }
    ]
  end

  let(:search_response) { { hits: { total: hits.count, hits: hits } }.to_json }

  scenario 'by gene' do
    gene = { 'id' => 'kawaii', 'name' => 'Kawaii' }
    options = { params: { term: 'Kawa' } }
    Kinetic::Stub::Gravity::GravityModel.match([gene], options, 200, Gene)

    visit '/'
    fill_in placeholder: 'Add a gene', with: 'Kawa'
    find('li[role=option]', text: 'Kawaii').click

    expect(page).to have_selected_gene('Kawaii')
    expect(page).to have_autosuggest('Add a gene')
    expect(page).to have_results(hits)

    find('.remove').click

    expect(page).to_not have_selected_gene('Kawaii')
    expect(page).to have_no_results
  end

  scenario 'by tag' do
    tag = { 'id' => 'monster', 'name' => 'Monster' }
    options = { params: { term: 'Mon' } }
    Kinetic::Stub::Gravity::GravityModel.match([tag], options, 200, Tag)

    visit '/'
    fill_in placeholder: 'Add a tag', with: 'Mon'
    find('li[role=option]', text: 'Monster').click

    expect(page).to have_selected_tag('Monster')
    expect(page).to have_autosuggest('Add a tag')
    expect(page).to have_results(hits)

    find('.remove').click

    expect(page).to_not have_selected_tag('Kawaii')
    expect(page).to have_no_results
  end

  scenario 'by partner' do
    partner = { 'id' => 'gallery super', 'name' => 'Gallery Super' }
    options = { params: { term: 'Gall' } }
    Kinetic::Stub::Gravity::GravityModel.match([partner], options, 200, Partner)

    visit '/'
    fill_in placeholder: 'Select a partner', with: 'Gall'
    find('li[role=option]', text: 'Gallery Super').click

    expect(page).to have_selected_partner('Gallery Super')
    expect(page).to_not have_autosuggest('Select a partner')
    expect(page).to have_results(hits)

    find('.remove').click

    expect(page).to_not have_selected_partner('Gallery Super')
    expect(page).to have_no_results
  end

  scenario 'by fair' do
    fair = { 'id' => 'fair best', 'name' => 'Fair Best' }
    options = { params: { term: 'Fai' } }
    Kinetic::Stub::Gravity::GravityModel.match([fair], options, 200, Fair)

    visit '/'
    fill_in placeholder: 'Select a fair', with: 'Fai'
    find('li[role=option]', text: 'Fair Best').click

    expect(page).to have_selected_fair('Fair Best')
    expect(page).to_not have_autosuggest('Select a fair')
    expect(page).to have_results(hits)

    find('.remove').click

    expect(page).to_not have_selected_partner('Fair Best')
    expect(page).to have_no_results
  end
end
