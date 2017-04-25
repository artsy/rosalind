class BatchUpdatesController < ApplicationController
  before_action :require_genomer

  expose(:batch_update)

  def create
    batch_update.save
  end

  private

  def batch_update_params
    defaults = { user_id: current_user.id }
    gene_keys = params[:batch_update][:genes].try(:keys)
    params.require(:batch_update).permit(artworks: [], genes: gene_keys).merge(defaults)
  end

  def require_genomer
    return if is_genomer?
    redirect_to Kinetic.config[:artsy_url], notice: "It doesn't look like you have access to this application."
  end
end
