# Jest 29 + Enzyme → RTL Upgrade Plan

## Background

`@artsy/palette` is pinned to `31.2.0` because every version from `31.3.0` onward depends on `@artsy/icons`, which uses Node's `exports` map in its `package.json`. Jest 24 doesn't understand `exports` maps (support landed in Jest 28), so tests fail with:

```
Cannot find module '@artsy/icons/SearchIcon' from 'AutocompleteInput.js'
```

Webpack handles `exports` fine, so builds work — only Jest breaks.

## Phase 1: Jest 29 + palette upgrade

Verified working in a worktree — all 41 suites, 190 tests, 51 snapshots pass.

### Changes

1. **Bump packages**:
   - `jest` 24.9.0 → 29
   - `babel-jest` 24.9.0 → 29
   - Add `jest-environment-jsdom@29` (no longer bundled with Jest)
   - `@artsy/palette` 31.2.0 → 31.7.1
   - Keep `jest-styled-components@6.3.4` (v7 requires styled-components v5+)

2. **Update Jest config** in `package.json`:
   - Remove `"testURL": "http://localhost"` (deprecated)
   - Add `"testEnvironment": "jsdom"`
   - Add moduleNameMapper: `"@artsy/icons/(.*)": "<rootDir>/node_modules/@artsy/icons/dist/web/$1.js"`

3. **Fix 1 test file**: `AttributionClassAutosuggest.spec.js`
   - Replace `setImmediate(callback)` with `await new Promise(resolve => setTimeout(resolve, 0))`
   - Jest 29's jsdom (v20) no longer provides the Node.js `setImmediate` global

## Phase 2: Enzyme → RTL migration

### New dependencies

- Add: `@testing-library/react`, `@testing-library/jest-dom`
- Remove: `enzyme`, `enzyme-adapter-react-16`, `react-addons-test-utils`, `react-test-renderer`
- Remove: `app/javascript/test/setup.js` (Enzyme adapter config)

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
