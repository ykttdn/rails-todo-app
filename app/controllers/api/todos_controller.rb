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

    def create
      todo = Todo.new(todo_params)

      if todo.save
        render json: { todo:, error: nil }
      else
        render json: { todo: nil, error: todo.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      todo = Todo.find(params[:id])

      if todo.update(todo_params)
        render json: { todo:, error: nil }
      else
        render json: { todo:, error: todo.errors.full_messages }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
      render json: { todo: nil, error: [RECORD_NOT_FOUND] }, status: :not_found
    end

    def destroy
      todo = Todo.find(params[:id])

      todo.destroy
      head :no_content
    rescue ActiveRecord::RecordNotFound
      render json: { error: [RECORD_NOT_FOUND] }, status: :not_found
    end

    private

    def todo_params
      params.require(:todo).permit(:title)
    end
  end
end
