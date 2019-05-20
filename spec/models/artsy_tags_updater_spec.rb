require 'rails_helper'

describe ArtsyTagsUpdater do
  it 'correctly combines existing tags, tags to add and tags to remove' do
    artwork_id = 'abcdef'
    current_tags = %w[foo bar bat]
    tags_to_add = %w[bang]
    tags_to_remove = %w[bat]

    allow(ArtsyTags).to receive(:tags).and_return(current_tags)
    expect(ArtsyTags).to receive(:update_tags).with(artwork_id, %w[foo bar bang])

    ArtsyTagsUpdater.update(artwork_id, tags_to_add, tags_to_remove)
  end
end
