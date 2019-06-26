Datadog.configure do |c|
  c.tracer Rails.application.config_for(:datadog).symbolize_keys

  c.use :http, service_name: 'rosalind.http', distributed_tracing: true
  c.use :redis, service_name: 'rosalind.redis'
  c.use :sidekiq, service_name: 'rosalind.sidekiq'
  c.use :rails, service_name: 'rosalind',
                controller_service: 'rosalind.controller',
                database_service: 'rosalind.postgres',
                cache_service: 'rosalind.cache',
                distributed_tracing: true
end
