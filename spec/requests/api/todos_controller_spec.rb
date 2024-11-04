# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::TodosController do
  describe 'GET /api/todos' do
    before do
      create_list(:todo, 5)
    end

    it 'returns a 200 OK status' do
      get api_todos_path

      expect(response).to have_http_status(:ok)
    end

    it 'returns all the todos' do
      get api_todos_path

      expect(response.parsed_body.length).to eq(5)
    end
  end

  describe 'GET /api/todos/:id' do
    let(:todo) { create(:todo) }

    context 'when the todo exists' do
      it 'returns a 200 OK status' do
        get api_todo_path(todo.id)

        expect(response).to have_http_status(:ok)
      end

      it 'returns the todo' do
        get api_todo_path(todo.id)

        expect(response.parsed_body['todo']).to include('title' => todo.title)
      end
    end

    context 'when the todo does not exist' do
      it 'returns a 404 Not Found status' do
        get api_todo_path(0)

        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'POST /api/todos' do
    context 'when the params are valid' do
      let(:todo_params) { { title: 'read a book' } }

      it 'returns a 200 OK status' do
        post api_todos_path, params: { todo: todo_params }

        expect(response).to have_http_status(:ok)
      end

      it "increases todos' count by 1" do
        expect do
          post api_todos_path, params: { todo: todo_params }
        end.to change(Todo, :count).by(1)
      end

      it 'creates a new todo whose attributes are the same as the params' do
        post api_todos_path, params: { todo: todo_params }

        new_todo = Todo.order(:created_at).last
        expect(new_todo.attributes).to include('title' => 'read a book')
      end
    end

    context 'when the params are not valid' do
      let(:todo_params) { { title: '' } }

      it 'returns a 422 Unprocessable Entity status' do
        post api_todos_path, params: { todo: todo_params }

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "does not change the todos' count" do
        expect do
          post api_todos_path, params: { todo: todo_params }
        end.not_to change(Todo, :count)
      end
    end
  end

  describe 'PATCH /api/todos/:id' do
    context 'when the todo exists' do
      let(:todo) { create(:todo, title: 'original title') }

      context 'when the params are valid' do
        let(:todo_params) { { title: 'new title' } }

        it 'returns a 200 OK status' do
          patch api_todo_path(todo.id), params: { todo: todo_params }

          expect(response).to have_http_status(:ok)
        end

        it "updates the todo's content" do
          patch api_todo_path(todo.id), params: { todo: todo_params }

          expect(todo.reload.attributes).to include('title' => 'new title')
        end
      end

      context 'when the params are not valid' do
        let(:todo_params) { { title: '' } }

        it 'returns a 422 Unprocessable Entity status' do
          patch api_todo_path(todo.id), params: { todo: todo_params }

          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "does not update the todo's content" do
          expect do
            patch api_todo_path(todo.id), params: { todo: todo_params }
          end.not_to(change { todo.reload.attributes })
        end
      end
    end

    context 'when the todo does not exist' do
      it 'returns a 404 Not Found status' do
        patch api_todo_path(0), params: { todo: { title: 'new title' } }

        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'DELETE /api/todos/:id' do
    context 'when the todo exists' do
      let!(:todo) { create(:todo) }

      it 'returns a 204 No Content status' do
        delete api_todo_path(todo.id)

        expect(response).to have_http_status(:no_content)
      end

      it "decreases the todos' count by 1" do
        expect do
          delete api_todo_path(todo.id)
        end.to change(Todo, :count).by(-1)
      end

      it 'deletes the todo' do
        delete api_todo_path(todo.id)

        expect { Todo.find(todo.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'when the todo does not exist' do
      it 'returns a 404 Not Found status' do
        delete api_todo_path(0)

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
