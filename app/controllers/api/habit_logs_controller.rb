# frozen_string_literal: true

module Api
  class HabitLogsController < ApplicationController
    def index
      habit_logs = Habit.find(params[:habit_id]).habit_logs

      render json: habit_logs
    end

    def index_all
      habit_logs = HabitLog.where(executed_at: from..to)
                           .order(:executed_at)
                           .map do |habit_log|
                             {
                               date: habit_log.executed_at,
                               level: habit_log.level
                             }
                           end

      render json: habit_logs
    end

    private

    def from
      Date.parse(params[:from].to_s)
    rescue Date::Error # also when params[:from] is nil
      Date.current.beginning_of_month
    end

    def to
      Date.parse(params[:to].to_s)
    rescue Date::Error # also when params[:to] is nil
      Date.current.end_of_month
    end
  end
end
