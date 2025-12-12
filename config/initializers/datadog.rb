Datadog.configure do |c|
  c.service = "rosalind"
  c.tracing.enabled = Rails.application.config_for(:datadog)["enabled"].present?
  c.agent.host = Rails.application.config_for(:datadog)["hostname"]
  c.diagnostics.debug = false

  c.tracing.instrument :rails,
    distributed_tracing: true,
    controller_service: "rosalind.controller",
    cache_service: "rosalind.cache"

  c.tracing.instrument :redis, service_name: "rosalind.redis"
  c.tracing.instrument :http, service_name: "rosalind.http", distributed_tracing: true
  c.tracing.instrument :pg, service_name: "rosalind.postgres"
  c.tracing.instrument :sidekiq, service_name: "rosalind.sidekiq", distributed_tracing: true
end
