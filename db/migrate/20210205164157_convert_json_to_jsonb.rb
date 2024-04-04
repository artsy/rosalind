class ConvertJsonToJsonb < ActiveRecord::Migration[5.2]
  def change
    reversible do |dir|
      dir.up { change_column :batch_updates, :genes, "jsonb USING CAST(genes AS jsonb)" }
      dir.down { change_column :batch_updates, :genes, "json USING CAST(genes AS json)" }

      dir.up { change_column :batch_updates, :tags, "jsonb USING CAST(tags AS jsonb)" }
      dir.down { change_column :batch_updates, :tags, "json USING CAST(tags AS json)" }
    end
  end
end
