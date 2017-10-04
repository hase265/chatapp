class ChangeColumn < ActiveRecord::Migration
  def change
    add_column :messages, :image, :string
    remove_column :users, :image, :string
  end
end
