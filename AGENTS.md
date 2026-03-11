# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## What is Rosalind?

Rosalind is an Artsy admin app for large-batch operations on artwork genomes (Artsy-created genomes and "partner-applied categories"). It pairs a Rails 6.1 backend with a React 16 frontend bundled via Shakapacker (Webpack 5).

## Commands

### Run everything (lint + tests)

```
bundle exec rake
```

### Ruby

```
bundle exec standard          # lint
bundle exec standard --fix    # lint + autofix
bundle exec rspec             # all tests
bundle exec rspec spec/models/batch_update_spec.rb        # single test file
bundle exec rspec spec/models/batch_update_spec.rb:42     # single example by line
bundle exec rspec spec/system  # acceptance tests (Capybara + headless Chrome)
```

### JavaScript/TypeScript

```
yarn test                     # Jest tests
yarn test --watch             # watch mode
yarn test path/to/file.spec.js  # single test file
yarn lint                     # ESLint
yarn type-check               # TypeScript type checking (tsc --noEmit)
```

### Dev server

```
foreman start -f Procfile.dev
```

Runs Rails (port 3000), Sidekiq, and Webpack dev server (hot reload).

### Docker/Hokusai

```
hokusai build && hokusai test    # build and test in Docker
hokusai dev start                # dev environment via Docker
```

## Architecture

### Backend (Rails)

- **Models**: `BatchUpdate` is the core domain model (persisted in PostgreSQL). Most other models (`Gene`, `Tag`, `Artist`, `Partner`, `Fair`, `Sale`, `Artwork`) are thin wrappers around the Gravity API via the `Kinetic` gem — they are not ActiveRecord-backed.
- **Genome system**: `Genome` is the base class; `ArtsyGenome` and `PartnerGenome` are subclasses. Each has a corresponding `*Updater` class that handles mutations. `ArtsyTags`/`ArtsyTagsUpdater` follow the same pattern.
- **Controllers**: `BatchUpdatesController` creates batch jobs. `MatchController` provides search/autocomplete endpoints for genes, tags, partners, fairs, artists, and sales. `FilterController` handles filtered artwork queries. `ArtworksController` renders artwork detail.
- **Services**: `ArtworkSearchService` queries OpenSearch directly (requires VPN). `FilteredArtworkSearchService` queries Gravity's API.
- **Jobs**: `ProcessBatchUpdateJob` orchestrates a batch, `UpdateArtworkJob` updates a single artwork. Both run via Sidekiq.
- **Auth**: Uses `Kinetic` gem for Gravity XAPP token authentication.

### Frontend (React + TypeScript)

- Source lives in `app/javascript/`. Entry point is `app/javascript/packs/application.js`.
- Main component is `App` (class component with state management) in `app/javascript/components/`.
- Uses `@artsy/palette` (Artsy design system), `styled-components`, and `react-autosuggest`.
- Tests use Jest + Enzyme, co-located as `*.spec.js` files alongside source.
- Views are HAML templates in `app/views/` that mount React components.

### External Dependencies

- **Gravity API**: Artsy's internal API for artwork/gene/tag data. Config in `config/gravity.yml`.
- **OpenSearch**: Direct cluster access for artwork search. Requires VPN connection. Config in `config/search.yml`.
- **Sidekiq + Redis**: Background job processing for batch updates.
- **PostgreSQL**: Only stores `BatchUpdate` records (SQL schema format).

## Code Style

- Ruby: StandardRB (no config needed, runs via `bundle exec standard`)
- JS/TS: ESLint + Prettier (trailing comma es5, no semicolons, single quotes)
- Pre-commit hook: lint-staged runs ESLint --fix and StandardRB --fix
- Pre-push hook: `yarn type-check`

## Deployment

- PRs to `main` auto-deploy to staging after CI passes
- PRs from `staging` to `release` branch deploy to production (requires approval)
- CI runs on CircleCI using Hokusai orbs
