# Rosalind [![CircleCI](https://circleci.com/gh/artsy/rosalind.svg?style=svg&circle-token=cb49eab5b9f460be61b18d9eef1153b3db16e02a)](https://circleci.com/gh/artsy/rosalind)

Rosalind is an admin app for large-batch operations on artist and artwork genomes (Artsy-created genomes as well as "partner-applied categories").

Among its major components are [Rails 5](http://rubyonrails.org) + [Kinetic](https://github.com/artsy/kinetic) on the backend and [React](https://facebook.github.io/react/) + [Webpack](https://webpack.github.io) on the frontend.

You can read more about [the motivation for the app](https://github.com/artsy/rosalind/pull/1).

## Meta

- **State**: development
- **Production** TBD / Heroku
- **Staging**: TBD / Heroku
- **CI**: [CircleCI](https://circleci.com/gh/artsy/rosalind)
- **Github**: [https://github.com/artsy/rosalind](https://github.com/artsy/rosalind)
- **Point people**: [@anandaroop](https://github.com/anandaroop)
- **Branching**:  This project uses the master-release workflow —
	- PRs merged to the master branch are automatically deployed to staging
	- PRs merged from master to release are automatically deployed to production.

## Development Setup

Depends on Ruby 2.3, Node 6.9, [Homebrew](http://brew.sh), [Yarn](https://yarnpkg.com)

- Fork [the repo](https://github.com/artsy/rosalind) to your account in Github

- Clone it locally to your machine

```sh
git clone git@github.com:<youruser>/rosalind.git
cd rosalind
```

- Set up the application environment:
```sh
cp .env.example .env # then edit .env as needed
```

- You can create a `ClientApplication` and obtain an auth token for your app by opening a Gravity console (in local or staging, depending which Gravity you want to access) and [following these instructions](https://github.com/artsy/gravity/blob/master/doc/ApiAuthentication.md#get-an-application-key)

- Take the `gravity_application_id` , `gravity_application_secret`, and `gravity_xapp_token` returned by the previous step and add them to your `.env` file.

- The `BUNDLE_GITHUB__COM` token is required for bundling and can be obtained from an existing Kinetic app's configuration, e.g.: `heroku config --app volt-staging | grep -i bundle`

-----

<details>
<summary><strong>If you are using <a href="https://rvm.io">RVM</a> for Ruby version management</strong></summary>
```sh
rvm install 2.3.1
rvm use 2.3.1
# optional steps below
rvm create gemset rosalind
rvm use ruby-2.3.1@rosalind
echo "2.3.1" | cat > .ruby-version
echo "rosalind" | cat > .ruby-gemset
gem install bundler
```
</details>

<details>
<summary><strong>If you are using <a href="https://github.com/creationix/nvm">NVM</a> for Node version management</strong></summary>
```sh
nvm install 6.9
nvm use 6.9
```
</details>

-----

- Install Yarn for Javascript package management:

```sh
brew update
brew install yarn
```

- Install Ruby dependencies:

```sh
bundle install
```

- Install Javascript dependencies:

```sh
yarn install
```

- Run tests

```sh
# ruby linting and specs
bundle exec rubocop
bundle exec rspec

# javascript linting and specs
yarn run lint
yarn run test
```

- Bring up the Rails server and the Webpack development server

```sh
foreman start
```

- You should now be able to visit the application at [http://localhost:5000](http://localhost:5000)

## The name

Rosalind is named after [Rosalind Franklin](https://www.google.com/search?q=Rosalind+Franklin), the biophysicist whose pioneering work in X-ray crystallography led to the discovery of the double [helix](https://github.com/artsy/helix).

![franklin](https://cloud.githubusercontent.com/assets/140521/21436608/6bbbc722-c84d-11e6-9818-3e3b40688963.jpg)
