Coverband.configure do |config|
  # supress some commonly un-informative file reports
  # https://github.com/danmayer/coverband/#ignoring-files
  config.ignore +=  [
    'app/mailers/*',
    'bin/*',
    'config/application.rb',
    'config/boot.rb',
    'config/environments/*',
    'config/puma.rb',
    'config/schedule.rb',
    'config/spring.rb',
    'lib/tasks/*'
  ]
end
