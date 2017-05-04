require 'rails_helper'

describe ProcessBatchUpdateJob do
  context 'with a bogus batch update id' do
    it 'does not enqueue any jobs' do
      ProcessBatchUpdateJob.new.perform(123)
      jobs = ActiveJob::Base.queue_adapter.enqueued_jobs
      expect(jobs.count).to eq 0
    end
  end

  context 'with some artworks' do
    it 'enqueues a job for each artwork' do
      artwork_ids = %w[a1 b2 c3]
      batch_update = Fabricate :batch_update, artworks: artwork_ids

      ProcessBatchUpdateJob.new.perform(batch_update.id)

      jobs = ActiveJob::Base.queue_adapter.enqueued_jobs
      expect(jobs.count).to eq 3
      first_args = jobs.map { |job| job[:args].first }
      expect(first_args).to eq artwork_ids
    end
  end
end
