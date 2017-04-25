class BatchUpdatesController < ApplicationController
  before_action :require_genomer

  expose(:batch_update)

  def create
    batch_update.save
  end

  private

  def batch_update_params
    batch_update = params.fetch(:batch_update, {})

    genes = JSON.parse batch_update[:genes]
    artworks = batch_update[:artworks]

    {
      artworks: artworks,
      genes: genes,
      user_id: current_user.id
    }
  end

  def require_genomer
    return if is_genomer?
    redirect_to Kinetic.config[:artsy_url], notice: "It doesn't look like you have access to this application."
  end
end
