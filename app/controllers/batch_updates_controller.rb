class BatchUpdatesController < ApplicationController
  expose(:batch_update)

  def create
    batch_update.save
  end

  private

  def batch_update_params
    batch_update = params.fetch(:batch_update, {})

    genes = JSON.parse batch_update[:genes]
    artworks = batch_update[:artworks].map(&:to_i)

    {
      artworks: artworks,
      genes: genes,
      user_id: current_user.id
    }
  end
end
