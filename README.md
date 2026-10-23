# Coin Flip

A responsive, interactive probability playground. Start with 1,000 people, flip a coin for each, keep heads or tails, and repeat to explore randomness.

## Features

- Warm editorial design, illustrated animated coin, and responsive desktop/mobile layouts.
- A compact participant grid: neutral before flipping, orange **H** for heads, green **T** for tails. Hover for participant details.
- Live remaining/removed counts, heads/tails percentages, round count, and outcome distribution.
- Keep heads or tails to remove the opposite result. Flip again to reroll only the remaining participants.
- Recent history of the last six moves and per-filter usage counts.
- Start over restores all 1,000 participants and clears counters/history.
- Space to flip when focus is outside interactive controls; native keyboard activation for buttons.
- Screen-reader announcements, descriptive chart labels, skip links, focus indicators, and reduced-motion support.
- Matching **How it works** and **About** pages.

## Run locally

No dependencies or build step. Open `index.html` directly, or serve this directory:

```sh
python -m http.server 8000
```

Then open http://localhost:8000.

## Experiment behavior

Filtering is disabled until the first flip. Displayed outcome counts and percentages always describe the current remaining participants. Keeping the same side again without flipping changes no participants; keeping the opposite side may empty the field. An empty field offers a reset.

Results exist only in memory: reloading or navigating away starts a new experiment. Every simulated flip uses JavaScript's `Math.random()` independently with equal probability for heads and tails. This is an educational tool, not a cryptographic randomness source.

## Files

- `index.html`: experiment dashboard
- `style.css`: shared design, responsive layout, and motion preferences
- `script.js`: simulation, rendering, controls, keyboard shortcut, and history
- `instructions.html`: guide to using the experiment
- `about.html`: project background and credits
- `favicon.svg`: coin icon

## Credits

Created by **Rabit Bin Khalil** with assistance from **ChatGPT**.

Version 2.0.
