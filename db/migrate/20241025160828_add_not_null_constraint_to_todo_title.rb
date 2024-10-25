class AddNotNullConstraintToTodoTitle < ActiveRecord::Migration[7.2]
  def change
    change_column_null(:todos, :title, false)
  end
end
