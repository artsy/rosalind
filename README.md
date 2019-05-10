# Rosalind [![CircleCI][badge]][circle_ci]

Rosalind is an admin app for large-batch operations on artist and artwork
genomes (Artsy-created genomes as well as "partner-applied categories").

Among its major components are [Rails 5][rails_5] + [Kinetic][kinetic] on the
backend and [React][react] + [Webpack][webpack] on the frontend.

You can read more about the motivation for the app over in [Pull Request #1][pull_1], 
and in the [blog post][blog_post] we wrote when we open-sourced it.

## Meta

* __State:__ production
* __Staging:__ [https://rosalind-staging.artsy.net/][staging] | [Heroku][heroku_staging]
* __Production:__ [https://rosalind.artsy.net/][production] | [Heroku][heroku_production]
* __GitHub:__ [https://github.com/artsy/rosalind][github]
* __Deployment:__ PR from master into release ([link][deploy])
* __Point People:__ [@anandaroop][anandaroop]

## Setup

* Fork the project to your GitHub account

* Clone your fork:
  ```
  $ git clone git@github.com:your-github-username/rosalind.git
  ```

* Read and run setup script:
  ```
  $ cat bin/setup
  $ bin/setup
  ```

## Tests

There are two levels of testing on this project: those at the Ruby level and
those at the Javascript level. Same goes for linting. That means to run
everything individually you would do:

```
$ bundle exec rubocop
$ bundle exec rspec
$ yarn run lint
$ yarn run test
```

Note: the default rake task (e.g. `bundle exec rake`) is setup to run all
linting and tests.

### Acceptance Tests

In order to improve our confidence that the Ruby and Javascript parts of this
project work together, we've added acceptance tests that run in Chrome.

They will be run as part of the default RSpec run. Or you can invoke them
directly with:

```sh
$ bundle exec rspec spec/system
```

In order to view the specs running in a real browser, you can change the
`driven_by` config to `:selenium_chrome` in `spec/rails_helper.rb`.

## Starting Server

Foreman is used to manage the server configuration, so starting a server is as
easy as `foreman start`, but you might want to use the development version
instead:

```sh
$ foreman start -f Procfile.dev
```

See the Procfiles for more.

## Gravity Connection

Rosalind uses Gravity to get detail about some models. See the [gravity
docs][xapp] for the process.

## The name

Rosalind is named after [Rosalind Franklin][franklin], the biophysicist whose
pioneering work in X-ray crystallography led to the discovery of the double
[helix][helix].

![franklin](https://cloud.githubusercontent.com/assets/140521/21436608/6bbbc722-c84d-11e6-9818-3e3b40688963.jpg)

[badge]: https://circleci.com/gh/artsy/rosalind.svg?style=svg&circle-token=cb49eab5b9f460be61b18d9eef1153b3db16e02a
[circle_ci]: https://circleci.com/gh/artsy/rosalind
[rails_5]: http://rubyonrails.org
[kinetic]: https://github.com/artsy/kinetic
[react]: https://facebook.github.io/react/
[webpack]: https://webpack.github.io
[staging]: https://rosalind-staging.artsy.net/
[heroku_staging]: https://dashboard.heroku.com/apps/rosalind-staging
[production]: https://rosalind.artsy.net/
[heroku_production]: https://dashboard.heroku.com/apps/rosalind-production
[github]: https://github.com/artsy/rosalind
[anandaroop]: https://github.com/anandaroop
[xapp]: https://github.com/artsy/gravity/blob/master/doc/ApiAuthentication.md#create-xapp-token
[franklin]: https://www.google.com/search?q=Rosalind+Franklin
[helix]: https://github.com/artsy/helix
[deploy]: https://github.com/artsy/rosalind/compare/release...master?expand=1
[pull_1]: https://github.com/artsy/rosalind/pull/1
[blog_post]: https://artsy.github.io/blog/2019/05/09/rosalind/
