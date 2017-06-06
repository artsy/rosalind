Raven.configure do |config|
  config.dsn = Rails.application.secrets.sentry_dsn
  config.environments = %w[production]
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s) # rubocop:disable Metrics/LineLength
end
