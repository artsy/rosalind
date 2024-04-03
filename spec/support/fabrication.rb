Fabrication.configure do |config|
  config.fabricator_path = [
    "spec/fabricators",
    Kinetic::Engine.root.join("spec", "fabricators").relative_path_from(Rails.root)
  ]
end
