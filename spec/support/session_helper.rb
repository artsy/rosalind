def login_as(current_user)
  return unless defined?(session)

  access_token = '9, 3, 6, 5, 5, 7'
  session[:current_user] = current_user.attributes
  session[:access_token] = access_token
end

shared_context 'logged in user' do
  let(:user) { Fabricate(:kinetic_user, roles: []) }
  before do
    login_as user
  end
end

shared_context 'logged in admin' do
  let(:admin) { Fabricate(:kinetic_admin) }
  before do
    login_as admin
  end
end

shared_context 'logged in genomer' do
  let(:genomer) { Fabricate(:kinetic_user, roles: ['genomer']) }
  before do
    login_as genomer
  end
end
