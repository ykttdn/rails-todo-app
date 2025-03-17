# frozen_string_literal: true

module Api
  class HabitLogsController < ApplicationController
    def index
      habit_logs = Habit.find(params[:habit_id]).habit_logs

      render json: habit_logs
    end
  end
end
