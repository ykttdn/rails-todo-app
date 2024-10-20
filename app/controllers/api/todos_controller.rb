# frozen_string_literal: true

module Api
  class TodosController < ApplicationController
    def index
      todos = Todo.all

      render json: todos
    end
  end
end
