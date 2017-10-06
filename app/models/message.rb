class Message < ActiveRecord::Base
  belongs_to :user

  # validationがない??

  # ここ俺のコードとほとんど一緒だけどコピーした感じかな？
  def set_image(file)
    if !file.nil?
      file_name = Time.now().to_i.to_s + file.original_filename
      File.open("public/message_images/#{file_name}", 'wb'){
        |f| f.write(file.read)
      }
      self.image = file_name
    end
  end
end
