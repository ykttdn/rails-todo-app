# frozen_string_literal: true

FactoryBot.define do
  factory :habit_log do
    executed_at do
      from = Date.new(2020, 1, 1)
      to = Date.new(2030, 1, 1)
      rand(from...to)
    end
  end
end
