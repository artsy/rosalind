# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
  config.use_transactional_fixtures = true

  config.before(:each) do
    ActiveJob::Base.queue_adapter.enqueued_jobs = []
    ActiveJob::Base.queue_adapter.performed_jobs = []
  end

  config.before(:each, type: :system) do
    Capybara.server = :puma, { Silent: true }
    driven_by :selenium_chrome_headless
    # or launch a real windowed browser:
    # driven_by :selenium_chrome
  end
end

# only look for driver updates if the previous check was
# longer ago than a specified number of seconds
Webdrivers.cache_time = 86_400
