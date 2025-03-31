# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::HabitLogs' do
  describe 'GET /api/habits/:habit_id/habit_logs' do
    let(:logs_count) { 5 }
    let(:habit) { create(:habit, :with_logs, logs_count:) }

    it 'returns a 200 OK status' do
      get "/api/habits/#{habit.id}/habit_logs"

      expect(response).to have_http_status(:ok)
    end

    it 'returns all logs associated with habit' do
      get "/api/habits/#{habit.id}/habit_logs"

      expect(response.parsed_body.length).to eq(logs_count)
    end
  end

  describe 'GET /api/habit_logs' do
    it 'returns a 200 OK status' do
      get '/api/habit_logs', params: { from: '2025-01-01', to: '2025-01-31' }

      expect(response).to have_http_status(:ok)
    end
  end
end
