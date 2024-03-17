# == Schema Information
#
# Table name: user_roles
#
#  id                                       :bigint           not null, primary key
#  name(1:super admin, 2:admin, 3:employee) :string           not null
#  created_at                               :datetime         not null
#  updated_at                               :datetime         not null
#
require 'rails_helper'

RSpec.describe UserRole, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
