class RenameFromIdToUserId < ActiveRecord::Migration
  def change
    rename_column :messages, :from_id, :user_id
  end
end
