# Simon-Game-site

## Web-based Simon game

This is a browser implementation of the classic Simon game using JavaScript and jQuery.
The player repeats the computer's color sequence, which grows by one each round.

### Run locally

1. Open a terminal in the project directory:
   - `/Users/ashatz/Desktop/PersonalProjects/Simon-Game-site`
2. Start a static server:
   - `python3 -m http.server 8000`
3. Visit `http://localhost:8000/index.html`

### How to play

- Press any key or tap the Start button to begin.
- Watch the sequence (buttons flash with sounds), then repeat it by clicking/tapping the pads.
- Each level adds one more color to the sequence.
- A mistake ends the game; press any key or tap Start to play again.

### Accessibility

- Buttons are keyboard accessible (Tab to focus, Enter/Space to activate).
- The level heading is announced via `aria-live`.

### Credits

- Sounds and images are included in the repository.
