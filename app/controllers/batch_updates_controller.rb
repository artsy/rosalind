class BatchUpdatesController < ApplicationController
  before_action :require_genomer

  expose(:batch_update)

  def create
    batch_update.save!
    ProcessBatchUpdateJob.perform_later batch_update.id
  rescue StandardError => e
    render json: {error_message: e.message}, status: :unprocessable_entity
  end

  private

  def batch_update_params
    defaults = {user_id: current_user.id}
    gene_keys = params[:batch_update][:genes].try(:keys)
    params.require(:batch_update)
          .permit(artworks: [], genes: gene_keys, tags: {toAdd: [], toRemove: []})
          .merge(defaults)
  end

  def require_genomer
    redirect_to Kinetic.config[:artsy_url] unless is_genomer?
  end
end
