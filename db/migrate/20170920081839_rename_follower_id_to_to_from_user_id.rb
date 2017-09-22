class RenameFollowerIdToToFromUserId < ActiveRecord::Migration
  def change
    rename_column :friendships, :follower_id, :from_user_id
    rename_column :friendships, :followed_id, :to_user_id
  end
end
