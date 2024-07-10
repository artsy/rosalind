Sentry.init do |config|
  config.dsn = Rails.application.secrets.sentry_dsn
  config.enabled_environments = %w[production]

  filter = ActiveSupport::ParameterFilter.new(Rails.application.config.filter_parameters)
  config.before_send = lambda do |event, _hint|
    filter.filter(event.to_hash)
  end
end
