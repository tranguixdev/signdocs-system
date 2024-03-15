# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                   :uuid             not null, primary key
#  email                :string           not null
#  first_name           :string           not null
#  last_name            :string           not null
#  password_digest      :string           not null
#  reset_token          :string
#  reset_token_exp      :integer
#  reset_token_verifier :string
#  session_token        :string           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  user_role_id         :integer
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_reset_token    (reset_token)
#  index_users_on_session_token  (session_token) UNIQUE
#

require 'digest'
require 'securerandom'

class User < ApplicationRecord # rubocop:disable Metrics/ClassLength,Style/Documentation
  validates :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, :first_name, :last_name, presence: true
  validates :password, length: {
    minimum: 6,
    maximum: 64,
    allow_nil: true,
    too_long: '%<count>s characters is the maximum allowed'
  }

  attr_reader :password

  before_validation :ensure_session_token
  before_create :downcase_fields
  after_create :create_signature
  after_create :setup_walkthrough

  # ActiveStorage associations

  # ActiveRecord associations
  has_one :signature,
          class_name: :SignatureBlock
  has_many :document_editors
  has_many :documents,
           through: :document_editors,
           source: :document
  has_many :text_blocks,
           dependent: :destroy
  has_many :sentinel_blocks,
           dependent: :destroy
  has_many :content_fields,
           foreign_key: :signatory_id

  def self.find_by_credentials(email, password)
    downcase_email = email.downcase
    @user = User.find_by(email: downcase_email)
    return nil if @user.nil?

    @user if @user.is_password?(password)
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw) # rubocop:disable Naming/PredicateName
    BCrypt::Password.new(password_digest).is_password?(pw)
  end

  def reset_session_token!
    new_st = SecureRandom.urlsafe_base64
    self.session_token = new_st
    save
    new_st
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def create_password_reset_token
    reset_token = SecureRandom.random_bytes(20)
    reset_token_verifier = SecureRandom.random_bytes(20)
    reset_string = Base64.urlsafe_encode64(reset_token + reset_token_verifier)
    # url = "https://signdocs.herokuapp.com/#/reset/#{reset_string}"

    self.reset_token = Base64.urlsafe_encode64(reset_token, padding: false)
    self.reset_token_verifier = Digest::SHA256.hexdigest reset_token_verifier
    self.reset_token_exp = 36.hours.from_now.to_i
    reset_string
  end

  def clear_password_reset_token
    self.reset_token = nil
    self.reset_token_exp = nil
    self.reset_token_verifier = nil
    save
  end

  def example_email
    /example\.org$/ =~ email ||
      /example\.com$/ =~ email
  end

  private

  def downcase_fields
    self.email = email.downcase
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def create_signature
    self.signature = SignatureBlock.create(user_id: id)
  end

  def setup_walkthrough
    doc = Document.setup_default(self)
    sentinel1 = SentinelBlock.setup_default('SIGNATURE')
    sentinel2 = SentinelBlock.setup_default('TEXT')
    phil_user = User.find_by(email: 'phil@gresham.dev')

    cfs = [
      {
        bbox: { 'x' => '0.176',
                'y' => '0.568',
                'page' => '1',
                'left' => '108.204',
                'top' => '450.271',
                'width' => '104.04',
                'height' => '34.68',
                'aspect_ratio' => '3',
                'width_pct' => '0.17' },
        document_id: doc.id,
        signatory_id: id,
        contentable: sentinel1
      },
      {
        bbox: { 'x' => '0.18',
                'y' => '0.612',
                'page' => '1',
                'left' => '110.456',
                'top' => '484.704',
                'width' => '169.524',
                'height' => '14.962',
                'aspect_ratio' => '11.33',
                'width_pct' => '0.277' },
        document_id: doc.id,
        signatory_id: id,
        contentable: sentinel2
      }
    ]

    if phil_user
      doc.editors << phil_user
      sentinel3 = SentinelBlock.setup_default('SIGNATURE')
      sentinel4 = SentinelBlock.setup_default('TEXT')
      cfs.concat([
                   {
                     bbox: { 'x' => '0.599',
                             'y' => '0.569',
                             'page' => '1',
                             'left' => '367.02',
                             'top' => '451.439',
                             'width' => '104.04',
                             'height' => '34.68',
                             'aspect_ratio' => '3',
                             'width_pct' => '0.17' },
                     document_id: doc.id,
                     signatory_id: phil_user.id,
                     contentable: sentinel3
                   },
                   {
                     bbox: { 'x' => '0.606',
                             'y' => '0.612',
                             'page' => '1',
                             'left' => '371.312',
                             'top' => '484.08',
                             'width' => '169.524',
                             'height' => '14.962',
                             'aspect_ratio' => '11.33',
                             'width_pct' => '0.277' },
                     document_id: doc.id,
                     signatory_id: phil_user.id,
                     contentable: sentinel4
                   }
                 ])
    end

    cfs = cfs.map do |cf| # rubocop:disable Lint/UselessAssignment
      ContentField.create(cf)
    end
  end
end
