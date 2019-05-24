source 'https://rubygems.org'

ruby File.read('.ruby-version')

gem 'pg'
gem 'puma'
gem 'rails', '~>5.2.0'

kinetic_gem_spec = { git: 'https://github.com/artsy/kinetic.git', branch: 'master' }
# kinetic_gem_spec = { path: '../kinetic' }
gem 'kinetic', kinetic_gem_spec

gem 'coffee-rails'
gem 'decent_exposure'
gem 'haml-rails'
gem 'jbuilder'
gem 'sassc-rails'
gem 'sentry-raven'
gem 'sidekiq'
gem 'typhoeus'
gem 'uglifier'
gem 'webpacker'

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
  gem 'fabrication'
  gem 'webdrivers'
  gem 'webmock'
end
