class BatchUpdate < ApplicationRecord
  validates :artworks, presence: true
  validates :user_id, presence: true
  validate :changes_to_submit?

  def removes_genes?
    genes.value?(0)
  end

  def increment_updated_artworks
    increment! :updated_artworks
  end

  def changes_to_submit?
    return if genes.present? || tags.present?

    errors.add(:changes, 'You must submit at least genes or tags to update this artwork.')
  end
end
