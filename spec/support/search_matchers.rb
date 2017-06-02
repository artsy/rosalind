RSpec::Matchers.define :have_selected_gene do |gene_name|
  match do |page|
    expect(page).to have_css('h2', text: 'GENES')
    expect(page).to have_css('div', text: gene_name)
    expect(page).to have_css('.remove')
  end
end

RSpec::Matchers.define :have_selected_tag do |tag_name|
  match do |page|
    expect(page).to have_css('h2', text: 'TAGS')
    expect(page).to have_css('div', text: tag_name)
    expect(page).to have_css('.remove')
  end
end

RSpec::Matchers.define :have_selected_partner do |partner_name|
  match do |page|
    expect(page).to have_css('h2', text: 'PARTNER')
    expect(page).to have_css('div', text: partner_name)
    expect(page).to have_css('.remove')
  end
end

RSpec::Matchers.define :have_selected_fair do |fair_name|
  match do |page|
    expect(page).to have_css('h2', text: 'FAIR')
    expect(page).to have_css('div', text: fair_name)
    expect(page).to have_css('.remove')
  end
end

RSpec::Matchers.define :have_autosuggest do |placeholder|
  match do |page|
    expect(page).to have_xpath("//input[@placeholder='#{placeholder}']")
  end
end

RSpec::Matchers.define :have_results do |hits|
  count = hits.count

  match do |page|
    expect(page).to have_css('.counts', text: "Displaying #{count} of #{count} matching artworks")

    expected_srcs = hits.map { |hit| hit['_source']['image_url'] }
    actual_srcs = page.all('.results img').map { |node| node['src'] }
    expect(actual_srcs).to eq expected_srcs

    expected_captions = hits.map { |hit| hit['_source']['name'] }
    actual_captions = page.all('.results figcaption').map(&:text)
    expect(actual_captions).to eq expected_captions
  end
end

RSpec::Matchers.define :have_no_results do
  match do |page|
    expect(page).to_not have_css('.counts')
    expect(page).to_not have_css('.results img')
  end
end
