Fabricator :batch_update do
  genes { {"Photography" => 100} }
  artworks [1, 2, 3]
  tags { generate_tags }
  user_id "abc123"
end

def generate_tags
  {
    toAdd: ["foo"],
    toRemove: ["bar"]
  }
end
