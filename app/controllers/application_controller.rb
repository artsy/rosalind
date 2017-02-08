class ApplicationController < Kinetic::ApplicationController
  protect_from_forgery with: :exception

  before_action :find_current_user
  before_action :require_admin_or_genomer

  private

  def require_admin_or_genomer
    return if is_admin? || is_genomer?
    redirect_to Kinetic.config[:artsy_url], notice: "It doesn't look like you have access to this application."
  end
end
