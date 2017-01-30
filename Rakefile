require_relative 'config/application'

Rails.application.load_tasks

require 'rubocop/rake_task'

RuboCop::RakeTask.new(:rubocop) do |task|
  task.options = ['--display-cop-names']
end

task :yarn do
  `yarn lint && yarn test`
end

task default: [:rubocop, :spec, :yarn]
