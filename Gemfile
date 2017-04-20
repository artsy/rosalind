source 'https://rubygems.org'

ruby '2.4.1'

gem 'rails', '5.0.2'
gem 'puma'

kinetic_gem_spec = { git: 'https://github.com/artsy/kinetic.git', branch: 'master' }
# kinetic_gem_spec = { path: '../kinetic' }
gem 'kinetic', kinetic_gem_spec

gem 'coffee-rails'
gem 'haml-rails'
gem 'jbuilder'
gem 'sass-rails'
gem 'typhoeus'
gem 'uglifier'
gem 'webpack-rails'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'danger'
  gem 'rspec-rails'
  gem 'rubocop', '~> 0.46.0', require: false
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
  gem 'webmock'
end
