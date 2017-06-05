require 'rails_helper'

feature 'User searches artworks' do
  before do
    allow_any_instance_of(ApplicationController).to receive(:find_current_user)
    allow_any_instance_of(ApplicationController).to receive(:require_admin_or_genomer)
  end

  let(:elasticsearch_artworks_response) do
    [
      {
        '_index' => 'gravity',
        '_type' => 'artwork',
        '_id' => '1234',
        '_source' => {
          'id' => '1234',
          'genes' => [
            'Kawaii'
          ],
          'tags' => [
            'Monster'
          ],
          'name' => 'Pikachu',
          'image_url' => 'https://d32dm0rphc51dk.cloudfront.net/Zm4R54uWxcufME7KJBRxdw/square.jpg'
        }
      },
      {
        '_index' => 'gravity',
        '_type' => 'artwork',
        '_id' => '5678',
        '_source' => {
          'id' => '5678',
          'genes' => [
            'Kawaii'
          ],
          'tags' => [
            'Monster'
          ],
          'name' => 'Jigglypuff',
          'image_url' => 'https://d32dm0rphc51dk.cloudfront.net/JLFgGc6WgP3Nx-4h9Jh1Xw/square.jpg'
        }
      }
    ]
  end

  scenario 'by gene', js: true do
    Kinetic::Stub::Gravity::GravityModel.match([
      {
        'id' => 'kawaii',
        'name' => 'Kawaii'
      }
    ], { params: { term: 'Kawa' } }, 200, Gene)
    allow(ArtworkSearchService).to receive(:call).and_return({ hits: { hits: elasticsearch_artworks_response } }.to_json)

    visit '/'
    fill_in placeholder: 'Add a gene', with: 'Kawa'
    find('li[role=option]', text: 'Kawaii').click

    expect(page).to have_text('Pikachu')
    expect(page).to have_text('Jigglypuff')
  end

  scenario 'by tag', js: true do
    Kinetic::Stub::Gravity::GravityModel.match([
      {
        'id' => 'monster',
        'name' => 'Monster'
      }
    ], { params: { term: 'Mon' } }, 200, Tag)
    allow(ArtworkSearchService).to receive(:call).and_return({ hits: { hits: elasticsearch_artworks_response } }.to_json)

    visit '/'
    sleep 2
    fill_in placeholder: 'Add a tag', with: 'Mon'
    find('li[role=option]', text: 'Monster').click

    expect(page).to have_text('Pikachu')
    expect(page).to have_text('Jigglypuff')
  end

  scenario 'by partner', js: true
  scenario 'by fair', js: true
end
