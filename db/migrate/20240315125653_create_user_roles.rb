class CreateUserRoles < ActiveRecord::Migration[7.1]
  def change
    create_table :user_roles do |t|
      t.string :name, null: false, comment: '1:super admin, 2:admin, 3:employee'
      t.timestamps
    end
  end
end
