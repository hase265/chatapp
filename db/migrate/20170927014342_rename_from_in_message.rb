class RenameFromInMessage < ActiveRecord::Migration
  def change
    rename_column :messages, :from, :from_id
    rename_column :messages, :user_id, :to_id
  end
end
