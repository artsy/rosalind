Rails.application.config.middleware.use OmniAuth::Builder do
  provider :artsy, Rails.application.config_for(:gravity)['application_id'], Rails.application.config_for(:gravity)['application_secret']
end
