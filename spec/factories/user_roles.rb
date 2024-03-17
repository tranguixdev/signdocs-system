# == Schema Information
#
# Table name: user_roles
#
#  id                                       :bigint           not null, primary key
#  name(1:super admin, 2:admin, 3:employee) :string           not null
#  created_at                               :datetime         not null
#  updated_at                               :datetime         not null
#
FactoryBot.define do
  factory :user_role do
    
  end
end
