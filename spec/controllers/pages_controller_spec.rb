require "rails_helper"

RSpec.describe PagesController, type: :controller do
  context "with a logged in regular user" do
    include_context "logged in user"

    it "does not allow access" do
      get :batch_update
      expect(response).to have_http_status(302)
      expect(response).to redirect_to(Kinetic.config[:artsy_url])
    end
  end

  context "with a logged in admin" do
    include_context "logged in admin"

    describe "GET #batch_update" do
      it "allows access" do
        get :batch_update
        expect(response).to have_http_status(200)
      end
    end
  end
end
