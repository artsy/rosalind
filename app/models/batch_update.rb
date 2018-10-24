class BatchUpdate < ApplicationRecord
  validates :genes, presence: true
  validates :artworks, presence: true
  validates :user_id, presence: true

  def removes_genes?
    genes.value?(0)
  end

  def increment_updated_artworks
    increment! :updated_artworks # rubocop:disable Rails/SkipsModelValidations
  end
end
