class Message < ActiveRecord::Base
  belongs_to :user

  def set_image(file)
    return if file
      file_name = Time.now.to_i.to_s + file.original_filename
      File.open("public/message_images/#{file_name}", 'wb'){ |f| f.write(file.read) }
      self.image = file_name
  end
end
