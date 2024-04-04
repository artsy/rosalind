#!/bin/bash

set -ex

# browser testing version info
google-chrome --version

# set up test database
bundle exec rails db:drop db:create db:migrate

# run linters
yarn run lint
bundle exec standardrb

# run specs
yarn run test --runInBand
bundle exec rspec
