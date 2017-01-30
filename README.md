# Rosalind [![CircleCI][badge]][circle_ci]

Rosalind is an admin app for large-batch operations on artist and artwork
genomes (Artsy-created genomes as well as "partner-applied categories").

Among its major components are [Rails 5][rails_5] + [Kinetic][kinetic] on the
backend and [React][react] + [Webpack][webpack] on the frontend.

You can read more about [the motivation for the app][motivation].

## Meta

* State: development
* Staging: [https://rosalind-staging.herokuapp.com/][staging] | [Heroku][heroku_staging]
* GitHub: [https://github.com/artsy/rosalind][rosalind]
* Point People: [@anandaroop][anandaroop]

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

Note: you'll probably want to configure your Ruby manager before you run the
setup script. For RVM users, something like this:

```
$ echo 2.3.0 > .ruby-version && echo rosalind > .ruby-gemset
```

## Tests

There are two levels of testing on this project: those at the Ruby level and
those at the Javascript level. Same goes for linting. That means to run
everything individually you would do:

```
$ bundle exec rake rubocop
$ bundle exec rake spec
$ yarn lint
$ yarn test
```

Note: the default rake task is setup to run all linting and tests.

## Starting Server

Foreman is used to manage the server configuration, so starting a server is as
easy as:

```
$ foreman start
```

See the Procfile for more.

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
[motivation]: https://github.com/artsy/rosalind/pull/1
[staging]: https://rosalind-staging.herokuapp.com/
[heroku_staging]: https://dashboard.heroku.com/apps/rosalind-staging
[rosalind]: https://github.com/artsy/rosalind
[anandaroop]: https://github.com/anandaroop
[xapp]: https://github.com/artsy/gravity/blob/master/doc/ApiAuthentication.md#create-xapp-token
[franklin]: https://www.google.com/search?q=Rosalind+Franklin
[helix]: https://github.com/artsy/helix
