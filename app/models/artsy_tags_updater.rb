class ArtsyTagsUpdater
  def self.update(artwork_id, tags_to_add = [], tags_to_remove = [])
    new(artwork_id, tags_to_add, tags_to_remove).update
  end

  def initialize(artwork_id, tags_to_add, tags_to_remove)
    @artwork_id = artwork_id
    @tags_to_add = tags_to_add
    @tags_to_remove = tags_to_remove
  end

  def update
    valid_tags = (current_tags + additional_tags - superfluous_tags).uniq
    update_artwork_tags valid_tags
  end

  private

  def additional_tags
    @tags_to_add
  end

  def superfluous_tags
    @tags_to_remove
  end

  def current_tags
    @current_tags ||= ArtsyTags.tags(@artwork_id)
  end

  def update_artwork_tags(updated_tags)
    ArtsyTags.update_tags(@artwork_id, updated_tags)
  end
end
