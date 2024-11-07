# frozen_string_literal: true

FactoryBot.define do
  factory :todo do
    title { Faker::Lorem.sentence }
  end
end
