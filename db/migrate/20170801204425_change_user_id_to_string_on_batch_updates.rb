class ChangeUserIdToStringOnBatchUpdates < ActiveRecord::Migration[5.1]
  def up
    change_column :batch_updates, :user_id, :string
  end

  def down
    change_column :batch_updates, :user_id, :integer
  end
end
