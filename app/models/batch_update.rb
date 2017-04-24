class BatchUpdate < ApplicationRecord
  validates :genes, presence: true
  validates :artworks, presence: true
  validates :user_id, presence: true
end
