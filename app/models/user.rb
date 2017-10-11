class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages
  validates :username, presence: true

  #followに関する
  has_many :friendships_of_from_user, class_name: 'Friendship', foreign_key: 'from_user_id', dependent: :destroy
  has_many :following, through: :friendships_of_from_user, source: 'to_user'
  has_many :friendships_of_to_user, class_name: 'Friendship', foreign_key: 'to_user_id', dependent: :destroy
  has_many :follower, through: :friendships_of_to_user, source: 'from_user'

  def make_friends(other_user)
    friendships_of_from_user.create(to_user_id: other_user.id)
  end
end
