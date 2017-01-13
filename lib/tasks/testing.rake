# require 'rubocop/rake_task'

# desc 'Run rubocop'
# task :rubocop do
#   RuboCop::RakeTask.new
# end

# # reassign unused 'test' task
# task test: [:rubocop, :spec]

# # overwrite 'default' task to invoke 'test'
# task(:default).clear.enhance([:test])
