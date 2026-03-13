# Jest 29 + Enzyme → RTL Upgrade Plan

## Background

`@artsy/palette` is pinned to `31.2.0` because every version from `31.3.0` onward depends on `@artsy/icons`, which uses Node's `exports` map in its `package.json`. Jest 24 doesn't understand `exports` maps (support landed in Jest 28), so tests fail with:

```
Cannot find module '@artsy/icons/SearchIcon' from 'AutocompleteInput.js'
```

Webpack handles `exports` fine, so builds work — only Jest breaks.

## Phase 1: Jest 29 + palette upgrade ✅

Done. All 41 suites, 190 tests, 51 snapshots pass. Lint and type-check clean.

- Bumped `jest`, `babel-jest` to 29; added `jest-environment-jsdom@29`; bumped `@artsy/palette` to 31.7.1
- Updated Jest config: removed `testURL`, added `testEnvironment: "jsdom"`, added `@artsy/icons` moduleNameMapper
- Fixed `setImmediate` → `async/await` in `AttributionClassAutosuggest.spec.js`
- Fixed `space-before-function-paren` ESLint rule to allow `asyncArrow: 'always'` (Prettier compatibility)

## Phase 2: Enzyme → RTL migration

### Setup ✅

Done. `@testing-library/react@12` (v12 supports React 16) and `@testing-library/jest-dom@6` installed. `@testing-library/jest-dom` added to `setupFilesAfterEnv` alongside existing Enzyme setup. Exemplar spec (`GeneAutosuggest.rtl.spec.js`) passes.

### Remaining steps

- Remove: `enzyme`, `enzyme-adapter-react-16`, `react-addons-test-utils`, `react-test-renderer`
- Remove: `app/javascript/test/setup.js` (Enzyme adapter config) and its `setupFilesAfterEnv` entry

### Test file migration (41 files)

#### Category A — Snapshot-only (~20 files, trivial)

These use `react-test-renderer` (not Enzyme) and just assert `toMatchSnapshot()`. Swap `renderer.create()` for RTL's `render()`. All Selected/* and most Autosuggest/* files.

Files:
- `SelectedGene.spec.js`, `SelectedTag.spec.js`, `SelectedArtist.spec.js`
- `SelectedPartner.spec.js`, `SelectedFair.spec.js`, `SelectedSale.spec.js`
- `SelectedAttributionClass.spec.js`, `SelectedKeyword.spec.js`
- `SelectedPrices.spec.js`, `SelectedCreatedAfterDate.spec.js`, `SelectedCreatedBeforeDate.spec.js`
- `GeneAutosuggest.spec.js`, `TagAutosuggest.spec.js`, `ArtistAutosuggest.spec.js`
- `PartnerAutosuggest.spec.js`, `FairAutosuggest.spec.js`, `AttributionClassAutosuggest.spec.js`
- `Spinner.spec.js`, `GeneInput.spec.js`, `TagInput.spec.js`
- `FullScreenModal.spec.js`, `ConfirmationModal.spec.js`
- `SearchResults.spec.js`, `CurrentCriteria.spec.js`

#### Category B — Simple mount + assertions (~10 files, straightforward)

Use Enzyme `mount()` then check text, simulate clicks, or assert element existence. Translate to RTL `render()` + `screen` queries + `fireEvent`.

Files:
- `FilterOption.spec.js` — `mount`, `.find('Option')`, `.simulate('click')`, `.hasClass()`
- `SortOptions.spec.js` — snapshot + mount
- `Notices.spec.js` — `mount`, `.simulate('click')`, `.hasClass()`, fake timers
- `TextInput.spec.js` — `mount`, `.simulate('change')`
- `PriceInput.spec.js` — `mount`, `.simulate('change')`
- `DateInput.spec.js` — `mount`, `shallow`, `render`, `.simulate('change')`
- `GenericAutosuggest.spec.js` — `mount`, `render`, `.simulate('change')`
- `ArtworkPreviewModal.spec.js` — `mount`, keyboard events
- `ArtworkSearchResult.spec.js` — `mount`, `.simulate('click')`
- `SearchForm.spec.js` — `mount` + `renderer`, `.find()`, `.exists()`

#### Category C — Heavy instance/state testing (~2 files, rewrite needed)

These test internal implementation (`.instance()`, `.setState()`, `.state()`) rather than user-visible behavior. RTL has no equivalent — tests must be rewritten to drive behavior through the rendered UI.

Files:
- **`App.spec.js`** — Uses `shallow().instance()` to call methods like `app.onAddGene()` directly, reads `app.state`, calls `app.setState()`. Rewrite to test via UI interactions (type in autosuggest, click results, verify rendered output).
- **`BatchUpdateForm.spec.js`** — Uses `mount().instance()`, `.setState()`, `.state()`, `.setProps()`. Rewrite to test via form interactions (add genes/tags via UI, click Queue, verify modal and submission).

### Additional cleanup

- Delete all `__snapshots__/` directories and regenerate (snapshot format changes with RTL)
- Remove `helpers.spec.js` from Autosuggest — pure logic test, no Enzyme (just verify it still works)
- `search.spec.js`, `rosalind-api.spec.js`, `date-formats.spec.js` — pure logic, no component rendering, no changes needed
