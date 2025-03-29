# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

100.times do
  Todo.create!(title: Faker::Lorem.sentence)
end

habit = Habit.create!(name: Faker::Lorem.sentence)

day_range = Date.current.last_year..Date.current
level_range = 1..3
200.times do
  HabitLog.create!(habit:, executed_at: rand(day_range), level: rand(level_range))
end
