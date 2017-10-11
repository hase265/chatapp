class Message < ActiveRecord::Base
  belongs_to :user
  validates :user_id, presence: true
  validates :to_id, presence: true

  def set_image(file)
    return if file.blank?
    file_name = Time.now.to_i.to_s + file.original_filename
    File.open("public/message_images/#{file_name}", 'wb'){ |f| f.write(file.read) }
    self.image = file_name
  end
end
