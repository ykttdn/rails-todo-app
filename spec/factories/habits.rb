# frozen_string_literal: true

FactoryBot.define do
  factory :habit do
    name { Faker::Lorem.sentence }

    trait :with_logs do
      transient do
        logs_count { 3 }
      end

      after(:create) do |habit, evaluator|
        create_list(:habit_log, evaluator.logs_count, habit:)
      end
    end
  end
end
