class AddTagsToBatchUpdates < ActiveRecord::Migration[5.2]
  def change
    change_table :batch_updates do |t|
      t.json :tags
    end
  end
end
