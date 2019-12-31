namespace :test do
  desc 'Shortcut to run all ruby and javascript linters and specs'
  task :all do # rubocop:disable Rails/RakeEnvironment
    commands = [
      'bundle exec rubocop',
      'bundle exec rspec',
      'yarn run lint',
      'yarn run test'
    ]
    system commands.join(' && ')
  end
end
