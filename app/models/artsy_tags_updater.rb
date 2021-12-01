class ArtsyTagsUpdater
  def self.update(artwork_id, tags_whitelist = [], tags_blacklist = [])
    new(artwork_id, tags_whitelist, tags_blacklist).update
  end

  def initialize(artwork_id, tags_whitelist, tags_blacklist)
    @artwork_id = artwork_id
    @tags_whitelist = tags_whitelist
    @tags_blacklist = tags_blacklist
  end

  def update
    valid_tags = (current_tags + additional_tags - superfluous_tags).uniq
    update_artwork_tags valid_tags
  end

  private

  def additional_tags
    @tags_whitelist
  end

  def superfluous_tags
    @tags_blacklist
  end

  def current_tags
    @current_tags ||= ArtsyTags.tags(@artwork_id)
  end

  def update_artwork_tags(updated_tags)
    ArtsyTags.update_tags(@artwork_id, updated_tags)
  end
end
