source 'https://rubygems.org'

ruby File.read('.ruby-version')

gem 'rails', '5.2.0'
gem 'pg'
gem 'puma'

kinetic_gem_spec = { git: 'https://github.com/artsy/kinetic.git', branch: 'master' }
# kinetic_gem_spec = { path: '../kinetic' }
gem 'kinetic', kinetic_gem_spec

gem 'coffee-rails'
gem 'decent_exposure'
gem 'haml-rails'
gem 'jbuilder'
gem 'sass-rails'
gem 'sentry-raven'
gem 'sidekiq'
gem 'typhoeus'
gem 'uglifier'
gem 'webpacker', '3.5.3'

group :development, :test do
  gem 'danger'
  gem 'pry-rails'
  gem 'rspec-rails'
  gem 'rubocop'
end

group :development do
  gem 'foreman', require: false
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console'
end

group :test do
  gem 'capybara'
  gem 'chromedriver-helper'
  gem 'fabrication'
  gem 'selenium-webdriver'
  gem 'webmock'
end
