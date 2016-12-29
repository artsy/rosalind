def login_as(current_user, current_partner = nil)
  return unless defined?(session)
  access_token = '4, 8, 15, 16, 23, 42'
  session[:current_user] = current_user.attributes
  session[:access_token] = access_token
  session[:current_partner] = current_partner.attributes if current_partner
  session[:partner_id] = current_partner.id if current_partner
end

shared_context 'logged in user' do
  let(:user) { Fabricate(:kinetic_user) }

  before do
    login_as user
  end
end

shared_context 'logged in user with current partner' do
  let(:user)    { Fabricate(:kinetic_user) }
  let(:partner) { Fabricate(:kinetic_partner, id: 'pace-gallery', name: 'Pace Gallery') }

  before do
    login_as user, partner
  end
end
