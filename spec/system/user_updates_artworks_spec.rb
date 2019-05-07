require 'rails_helper'

describe 'User updates artworks', js: true do
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
      },
      {
        '_source' => {
          'id' => '1357',
          'name' => 'Charmander',
          'image_url' => 'https://d32dm0rphc51dk.cloudfront.net/8MNpmffdjCIvmjie-i6DIQ/square.jpg'
        }
      },
      {
        '_source' => {
          'id' => '2468',
          'name' => 'Bulbasaur',
          'image_url' => 'https://d32dm0rphc51dk.cloudfront.net/vYhR9LU0hHcG4wUolyHCNw/square.jpg'
        }
      }
    ]
  end

  let(:search_response) { { hits: { total: hits.count, hits: hits } }.to_json }

  before do
    ActionController::Base.allow_forgery_protection = true

    allow_any_instance_of(ApplicationController).to receive(:find_current_user)
    allow_any_instance_of(ApplicationController).to receive(:require_admin_or_genomer)
    allow_any_instance_of(BatchUpdatesController).to receive(:is_genomer?).and_return(true)
    allow(ArtworkSearchService).to receive(:call).and_return(search_response)
    current_user = double(:current_user, id: 123)
    allow_any_instance_of(BatchUpdatesController).to receive(:current_user).and_return(current_user)

    # perform a gene-based search
    gene = { 'id' => 'kawaii', 'name' => 'Kawaii' }
    options = { params: { term: 'Kawa' } }
    Kinetic::Stub::Gravity::GravityModel.match([gene], options, 200, Gene)
    visit '/'
    fill_in placeholder: 'Add a gene', with: 'Kawa'
    find('li[role=option]', text: 'Kawaii').click
  end

  after do
    ActionController::Base.allow_forgery_protection = false
  end

  scenario 'Enable editing by selecting works for update' do
    edit_button = find('button', text: /Edit Artworks/i)
    # TODO: uncomment once Palette handles `disabled` attribute correctly
    # expect(edit_button).to be_disabled

    find('img[alt="Charmander"]').click
    find('img[alt="Pikachu"]').click

    expect(edit_button).not_to be_disabled
  end

  scenario 'Specify a batch update' do
    gene_to_update = { 'id' => 'animation', 'name' => 'Animation' }
    gene_to_delete = { 'id' => 'flatness', 'name' => 'Flatness' }
    Kinetic::Stub::Gravity::GravityModel.match([gene_to_update, gene_to_delete], {}, 200, Gene)

    find('img[alt="Charmander"]').click
    find('img[alt="Pikachu"]').click
    click_button('Edit Artworks')
    expect(page).to have_text '2 works selected'

    within('.modal-open') do
      # specify a gene to add
      fill_in placeholder: 'Add a gene', with: 'anima'
      find('li[role=option]', text: 'Animation').click
      new_input = find(:xpath, '//div[contains(text(), "Animation")]/following-sibling::input')
      new_input.send_keys '66'

      # specify a gene to delete
      fill_in placeholder: 'Add a gene', with: 'flatn'
      find('li[role=option]', text: 'Flatness').click
      new_input = find(:xpath, '//div[contains(text(), "Flatness")]/following-sibling::input')
      new_input.send_keys '0'

      click_on 'Queue changes'
      expect(page).to have_text 'Are you sure'

      click_on 'Continue'
      # expect(page).to have_text 'Batch update was successfully queued'
    end
  end
end
