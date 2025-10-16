## Simon Game — Improvements and Task List

This document captures actionable improvements based on play-testing to Level 4 and a quick code review. Tasks are grouped, concise, and include acceptance criteria with file references.

### Bugs

- [ ] Fix `lass` typo on first row container in `index.html`
  - Details: `div lass="row"` should be `class="row"`.
  - File/Line: `index.html` L27
  - Acceptance: The first row container has `class="row"` and renders both top buttons side-by-side.

- [ ] Replace invalid `type="button"` on `div` elements with proper semantics
  - Details: `div` elements use `type="button"` (invalid HTML). Use `<button>` elements or add `role="button"` + `tabindex="0"` and key handlers.
  - File/Lines: `index.html` L29, L33, L40, L43
  - Acceptance: Buttons are either `<button>` elements or accessible `div`s with role, tabindex, and keyboard activation (Enter/Space) working.

### UX/UI

- [ ] Harmonize start affordances and copy
  - Details: Heading says "Press A Key to Start" while there’s an image button. Make copy consistent and support mouse/touch/keyboard.
  - Files: `index.html` header and start image; `game.js` start handlers
  - Acceptance: A single, clear instruction; clicking/tapping start works; pressing any key also works; on mobile, tapping is sufficient.

- [ ] Replay full sequence each level
  - Details: Currently only the newly added color flashes. Standard Simon replays the entire cumulative sequence each round.
  - File: `game.js` `nextSequence()` L55–L65
  - Acceptance: On each level start, the full `gamePattern` plays back with timing gaps; inputs are disabled during playback.

- [ ] Lock inputs during sequence playback
  - Details: Prevent user clicks while the sequence is animating to avoid accidental errors.
  - Files: `game.js`
  - Acceptance: During playback, clicks/touches do nothing; user input is enabled only after playback completes.

- [ ] Improve button press animation timing
  - Details: `animeTime` is 150ms which can feel abrupt; consider 200–250ms and consistent fade/press timings.
  - File: `game.js`
  - Acceptance: Button animations feel responsive and readable; no overlap between playback and user presses.

### Accessibility

- [ ] Keyboard operability for game buttons
  - Details: Ensure Enter/Space activate each color; add focus-visible styles.
  - Files: `index.html` (semantics), `styles.css` (focus styles), `game.js` (keyboard handlers if using `div`s)
  - Acceptance: Tab navigation reaches each button; pressing Enter/Space triggers the same behavior as click.

- [ ] Provide focus-visible styles for interactive elements
  - Details: Add a clear focus ring distinct from `.pressed` state.
  - File: `styles.css`
  - Acceptance: Keyboard users can see focus on start control and each color button; meets WCAG 2.1 focus visible.

- [ ] Add `aria-live` feedback for level and game-over
  - Details: Screen readers should announce level changes and game over.
  - Files: `index.html` (e.g., wrap heading in `aria-live="polite"`) or programmatically update an offscreen live region.
  - Acceptance: Level changes and game-over announcements are read by screen readers without user action.

### Performance

- [ ] Preload and reuse audio instances
  - Details: `new Audio(...)` is created on every play; preload once and reuse to reduce latency.
  - File: `game.js` `playSound()` L119–L122
  - Acceptance: Sounds play with minimal latency; no memory leaks; audio works consistently across levels.

- [ ] Debounce rapid clicks
  - Details: Guard against extremely rapid repeated clicks causing multiple handlers.
  - File: `game.js`
  - Acceptance: Rapid tapping does not queue multiple inconsistent actions; game state remains consistent.

### Code Quality

- [ ] Remove implicit globals in `nextSequence()`
  - Details: `rand` and `randColour` are not declared.
  - File/Lines: `game.js` L60–L63
  - Acceptance: Variables use `const`/`let`; no implicit globals reported by linters or devtools.

- [ ] Correct spelling/grammar in comments and identifiers
  - Details: e.g., "initialeze", "vaiables", "ar any key from the keybord", "corect".
  - File: `game.js` comments throughout
  - Acceptance: Comments are clear and professional; no obvious typos remain.

- [ ] Modularize game logic for readability
  - Details: Extract sequence playback, input gating, and state reset into small functions.
  - File: `game.js`
  - Acceptance: Functions are small and named descriptively; cyclomatic complexity reduced; behavior unchanged.

### Responsiveness

- [ ] Make layout responsive for small screens
  - Details: 200px fixed squares and 50% container width are not mobile-friendly.
  - Files: `styles.css`
  - Acceptance: Buttons resize via CSS grid/flex and `min()`/`vw` units; layout works down to ~320px wide.

- [ ] Ensure tap targets meet recommended sizes
  - Details: Maintain ~44px minimum touch area while preserving layout.
  - Files: `styles.css`
  - Acceptance: On mobile, buttons are easily tappable without overlap.

### Features (Optional Enhancements)

- [ ] Add score/best level persistence
  - Details: Track best level in `localStorage`; display beside title.
  - Files: `index.html`, `game.js`
  - Acceptance: Best level persists across reloads and updates on new highs.

- [ ] Add strict mode toggle
  - Details: Optional mode that ends on any mistake vs. forgiving step replay.
  - Files: `index.html`, `game.js`
  - Acceptance: Toggle switch displayed; behavior changes accordingly.

- [ ] Add sound toggle / volume control
  - Details: Mute/volume UI with persisted preference.
  - Files: `index.html`, `game.js`, `styles.css`
  - Acceptance: User can mute or adjust volume; setting persists.

### README

- [ ] Expand `README.md` with instructions
  - Details: Add setup/run steps, controls, accessibility notes, and credits.
  - File: `README.md`
  - Acceptance: Clear steps to serve locally and play; mention keyboard/touch controls.

---

#### Notes from play-test

- Advanced from level 1 to level 4 by following the sequence.
- Observed that only the newly added color flashes each round; full sequence was not replayed.
- Inputs were accepted during flashes; could lead to accidental misclicks.


