class ApplicationController < Kinetic::ApplicationController
  protect_from_forgery with: :exception

  before_action :find_current_user
  before_action :require_current_user
end
