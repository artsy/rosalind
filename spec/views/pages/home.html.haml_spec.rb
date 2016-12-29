require 'rails_helper'

RSpec.describe 'pages/home.html.haml', type: :view do
  it 'renders all artworks' do
    assign(:artworks, [
      Fabricate(:kinetic_artwork, title: 'Starry Night', images: [{ 'image_urls' => { 'square' => 'x.jpg' } }]),
      Fabricate(:kinetic_artwork, title: 'Mona Lisa', images: [{ 'image_urls' => { 'square' => 'y.jpg' } }])
    ])
    render
    expect(rendered).to have_selector 'h2', text: 'Starry Night'
    expect(rendered).to have_selector 'h2', text: 'Mona Lisa'
  end
end
