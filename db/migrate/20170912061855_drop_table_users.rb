class DropTableUsers < ActiveRecord::Migration
  def change
    drop_table :users, :installs
  end
end
