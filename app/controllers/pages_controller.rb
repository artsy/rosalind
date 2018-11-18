class PagesController < ApplicationController
  def batch_update
    @props = {
      sites: {
        artsy: Rails.application.config_for(:sites)['artsy'],
        volt: Rails.application.config_for(:sites)['volt'],
        helix: Rails.application.config_for(:sites)['helix']
      }
    }
  end
end
