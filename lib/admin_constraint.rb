# https://github.com/mperham/sidekiq/wiki/Monitoring#restful-authentication-or-sorcery
class AdminConstraint
  def matches?(request)
    return false unless request.session[:current_user]

    user_type = request.session[:current_user]['type']
    user_type == 'Admin'
  end
end
