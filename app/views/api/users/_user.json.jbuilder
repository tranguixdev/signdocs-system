json.key_format! camelize: :lower
json.extract! user, :id, :email, :first_name, :last_name, :user_role_id
json.sig_id user.signature.id
json.full_name user.full_name
