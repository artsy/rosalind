source "https://rubygems.org"

ruby "2.7.3"

gem "pg"
gem "puma"
gem "rails", "~> 5.2.8.1"

kinetic_gem_spec = {git: "https://github.com/artsy/kinetic.git", branch: "main"}
# kinetic_gem_spec = { path: '../kinetic' }
gem "kinetic", kinetic_gem_spec

gem "coffee-rails"
gem "ddtrace"
gem "decent_exposure"
gem "haml-rails"
gem "jbuilder"
gem "sassc-rails"
gem "sentry-raven"
gem "sidekiq", "6.5.10"
gem "typhoeus"
gem "uglifier"
gem "shakapacker", "7.0.3"

group :development, :test do
  gem "pry-rails"
  gem "rspec-rails"
  gem "rubocop", ">=1.21"
  gem "rubocop-rails"
  gem "dotenv"
end

group :development do
  gem "foreman", require: false
  gem "listen"
  gem "spring"
  gem "spring-watcher-listen"
  gem "web-console"
  gem "colored2"
end

group :test do
  gem "capybara"
  gem "fabrication"
  gem "selenium-webdriver"
  gem "webmock"
end

gem "coverband"
