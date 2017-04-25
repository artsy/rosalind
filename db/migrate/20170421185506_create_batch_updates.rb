class CreateBatchUpdates < ActiveRecord::Migration[5.0]
  def change
    create_table :batch_updates do |t|
      t.json :genes
      t.string :artworks, array: true
      t.integer :user_id
      t.timestamps
    end
  end
end
