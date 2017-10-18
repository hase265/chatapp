class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages, dependent: :destroy
  validates :username, presence: true

  has_many :friendships_of_from_user, class_name: 'Friendship', foreign_key: 'from_user_id', dependent: :destroy
  has_many :following, through: :friendships_of_from_user, source: 'to_user'
  has_many :friendships_of_to_user, class_name: 'Friendship', foreign_key: 'to_user_id', dependent: :destroy
  has_many :follower, through: :friendships_of_to_user, source: 'from_user'

  def make_friends_with(other_user_id)
    friendships_of_from_user.create(to_user_id: other_user_id)
  end

  def is_friend_with(other_user_id)
    Friendship.find_by(from_user_id: id, to_user_id: other_user_id) ||
    Friendship.find_by(from_user_id: other_user_id, to_user_id: id)
  end

end
