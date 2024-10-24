# frozen_string_literal: true

module Api
  class TodosController < ApplicationController
    RECORD_NOT_FOUND = 'Record was not found'

    def index
      todos = Todo.all

      render json: todos
    end

    def show
      todo = Todo.find(params[:id])

      render json: { todo:, error: nil }
    rescue ActiveRecord::RecordNotFound
      render json: { todo: nil, error: [RECORD_NOT_FOUND] }, status: :not_found
    end
  end
end
