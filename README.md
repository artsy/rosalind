# Rosalind [![CircleCI][badge]][circle_ci]

Rosalind is an admin app for large-batch operations on artwork
genomes (Artsy-created genomes as well as "partner-applied categories").

Among its major components are [Rails 5][rails_5] + [Kinetic][kinetic] on the
backend and [React][react] + [Webpack][webpack] on the frontend.

You can read more about the motivation for the app over in [Pull Request #1][pull_1],
and in the [blog post][blog_post] we wrote when we open-sourced it.

## Meta

* __State:__ production
* __Staging:__ [https://rosalind-staging.artsy.net/][staging]
  - [Sidekiq][sidekiq_staging]
  - [Kubernetes][kubernetes_staging]
  - [Datadog][datadog_staging]
  - [Sentry][sentry_staging]
  - Papertrail [Web][papertrail_staging_web] | [Sidekiq][papertrail_staging_sidekiq]
* __Production:__ [https://rosalind.artsy.net/][production]
  - [Sidekiq][sidekiq_production]
  - [Kubernetes][kubernetes_production]
  - [Datadog][datadog_production]
  - [Sentry][sentry_production]
  - Papertrail [Web][papertrail_production_web] | [Sidekiq][papertrail_production_sidekiq]
* __GitHub:__ [https://github.com/artsy/rosalind][github]
* __Deployment:__
  - PRs from feature branches ([on this repo](#contributing-pull-requests)) → main will automatically deploy to staging
  - PRs from staging → release will automatically deploy to production. ([Start a deploy][deploy])
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

## Developing with Storybook

In order to facilitate development and documentation of UI components,
we've added Storybook to this project.

```sh
$ yarn run storybook
```

Storybook can only show accurate styling if it can load the Rails
`application.css` stylesheet. For this reason we require you to have the Rails
server running first.

## Starting the Server

Foreman is used to manage the server configuration, so starting a server is as
easy as `foreman start`, but you might want to use the development version
in Procfile.dev instead.

Procfile.dev is configured to run Webpack's dev server, for hot reloading of
React components.

```sh
$ foreman start -f Procfile.dev
```

See the Procfiles for more.

## Docker and Hokusai

As an alternative to the full local workflow outlined above, it _should_ be possible to use a Docker & [Hokusai][hokusai] workflow to boot up, test, and (slowly) iterate on the app, without having to install and start up the usual backing services (Postgres, Redis).

```sh
$ hokusai build
$ hokusai test
$ hokusai dev start
```

## Gravity Connection

Rosalind uses Gravity to get detail about some models. See the [gravity
docs][xapp] for the process.

## Elasticsearch Connection

Rosalind communicates directly with the Elasticsearch cluster to search for
artworks. Elasticsearch is guarded behind a VPN, so to retrieve artwork search
results locally, make sure you're connected to VPN associated with the
environment you're targeting (production or staging).

See documentation available [here][readme-vpn-docs] or [here][infra-vpn-docs]

[readme-vpn-docs]: https://github.com/artsy/potential/blob/main/platform/VPN.md
[infra-vpn-docs]: https://github.com/artsy/infrastructure#vpn

## Contributing Pull Requests

Rosalind accepts PRs from branches on the main artsy/rosalind repo. PRs from forks will not be built in the CI environment and cannot be merged directly.

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
[production]: https://rosalind.artsy.net/
[github]: https://github.com/artsy/rosalind
[anandaroop]: https://github.com/anandaroop
[xapp]: https://github.com/artsy/gravity/blob/master/doc/ApiAuthentication.md#create-xapp-token
[franklin]: https://www.google.com/search?q=Rosalind+Franklin
[helix]: https://github.com/artsy/helix
[deploy]: https://github.com/artsy/rosalind/compare/release...staging?expand=1
[pull_1]: https://github.com/artsy/rosalind/pull/1
[blog_post]: https://artsy.github.io/blog/2019/05/09/rosalind/
[kubernetes_staging]: https://kubernetes.stg.artsy.systems/#!/search?namespace=default&q=rosalind
[kubernetes_production]: https://kubernetes.prd.artsy.systems/#!/search?namespace=default&q=rosalind
[sidekiq_staging]: https://rosalind-staging.artsy.net/sidekiq/
[sidekiq_production]: https://rosalind.artsy.net/sidekiq/
[papertrail_staging_web]: https://papertrailapp.com/searches/66122132
[papertrail_staging_sidekiq]: https://papertrailapp.com/searches/66121952
[papertrail_production_web]: https://papertrailapp.com/searches/66122242
[papertrail_production_sidekiq]: https://papertrailapp.com/searches/66122302
[sentry_staging]: https://sentry.io/organizations/artsynet/issues/?project=176621
[sentry_production]: https://sentry.io/organizations/artsynet/issues/?project=176628
[datadog_staging]: https://app.datadoghq.com/apm/services?env=staging&paused=false&search=rosalind
[datadog_production]: https://app.datadoghq.com/apm/services?env=production&paused=false&search=rosalind
[hokusai]: https://github.com/artsy/hokusai
