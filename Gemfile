source 'https://rubygems.org'

ruby '2.3.1'

gem 'rails', '~> 5.0.1'
gem 'puma', '~> 3.0'

kinetic_gem_spec = { git: 'https://github.com/artsy/kinetic.git', branch: 'master' }
# kinetic_gem_spec = { path: '../kinetic' }
gem 'kinetic', kinetic_gem_spec

gem 'coffee-rails', '~> 4.2'
gem 'haml-rails'
gem 'jbuilder', '~> 2.5'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpack-rails'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'danger'
  gem 'rspec-rails'
  gem 'rubocop', '~> 0.46.0', require: false
end

group :development do
  gem 'foreman', require: false
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara'
  gem 'fabrication'
  gem 'webmock'
end
