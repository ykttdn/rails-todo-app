class AddLevelToHabitLogs < ActiveRecord::Migration[7.2]
  def change
    add_column :habit_logs, :level, :integer, limit: 1, default: 0, null: false, after: :executed_at
  end
end
