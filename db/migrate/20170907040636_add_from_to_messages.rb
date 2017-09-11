class AddFromToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :from, :integer
  end
end
