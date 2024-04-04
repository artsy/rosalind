require_relative "config/application"

Rails.application.load_tasks

task :eslint do
  system "yarn run lint"
end

task :jest do
  system "yarn run test"
end

if %w[development test].include? Rails.env
  Rake::Task[:default].clear
  task default: %i[standard spec eslint jest]
end
