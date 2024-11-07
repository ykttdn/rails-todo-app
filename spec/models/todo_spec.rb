# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Todo do
  describe 'validation' do
    let(:todo) { build(:todo, title:) }

    context 'when title is valid' do
      let(:title) { 'read a book' }

      it { expect(todo).to be_valid }
    end

    context 'when title is empty' do
      let(:title) { '' }

      it { expect(todo).not_to be_valid }
    end

    context 'when title is nil' do
      let(:title) { nil }

      it { expect(todo).not_to be_valid }
    end
  end
end
