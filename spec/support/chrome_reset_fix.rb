require "capybara/selenium/driver"

# shortcut: Chrome 158 rejects Capybara 3.40's Storage.clearDataForOrigin(origin: '*'), which also clears cookies; clear them here and skip localStorage; remove when Capybara ships a fix
Capybara::Selenium::Driver::ChromeDriver.prepend(Module.new do
  def reset!
    super
  rescue Selenium::WebDriver::Error::InvalidArgumentError => e
    raise unless e.message.include?("not a valid URL")

    delete_all_cookies
  end
end)
