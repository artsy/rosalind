class AddUpdatedArtworksToBatchUpdates < ActiveRecord::Migration[5.0]
  def change
    add_column :batch_updates, :updated_artworks, :integer, default: 0
  end
end
