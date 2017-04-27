class ApplicationController < Kinetic::ApplicationController
  protect_from_forgery with: :exception

  before_action :find_current_user
  before_action :require_admin_or_genomer

  private

  def require_admin_or_genomer
    redirect_to Kinetic.config[:artsy_url] unless is_admin? || is_genomer?
  end
end
