app_id = Rails.application.config_for(:gravity)['application_id']
app_secret = Rails.application.config_for(:gravity)['application_secret']

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :artsy, app_id, app_secret
end
