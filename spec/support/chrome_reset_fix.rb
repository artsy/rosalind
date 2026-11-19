require "capybara/selenium/driver"

# shortcut: Chrome 158 rejects Capybara 3.40's Storage.clearDataForOrigin(origin: '*'); remove when Capybara ships a fix
Capybara::Selenium::Driver::ChromeDriver.module_eval do
  def reset!
    Capybara::Selenium::Driver.instance_method(:reset!).bind_call(self)
  end
end
