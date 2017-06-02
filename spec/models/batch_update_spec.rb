require 'rails_helper'

describe BatchUpdate do
  describe '#removes_genes?' do
    context 'with genes that have zero value' do
      it 'returns true' do
        genes = { 'Photography' => 0, 'Modern' => 100 }
        batch_update = Fabricate :batch_update, genes: genes
        expect(batch_update.removes_genes?).to eq true
      end
    end

    context 'with no genes that have zero value' do
      it 'returns false' do
        genes = { 'Photography' => 50, 'Modern' => 100 }
        batch_update = Fabricate :batch_update, genes: genes
        expect(batch_update.removes_genes?).to eq false
      end
    end
  end
end
