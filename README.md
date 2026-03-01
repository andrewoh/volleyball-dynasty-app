# High School Volleyball Dynasty (MVP)

A browser-based dynasty management prototype focused on season-to-season progression and **automatic save reliability**.

## What is implemented

- Division climb: `Division 5 -> Division 4 -> Division 3 -> Division 2 -> Division 1 -> Open Division`
- Seasonal cycle:
  - Tryouts (build 12 JV + 12 Varsity)
  - Preseason tournament selection (2 tournaments, unlocks based on progress)
  - Weekly regular season loop (league weeks + tournament weeks)
  - Postseason reveal (sectional field + bracket + state berth logic)
  - Offseason upgrades + player progression + next-season regeneration
- Match systems:
  - Weekly energy allocation (must total 100%) across scouting, individual development, and team development
  - In-season tabs for `Matchday`, `League Standings`, and `Player Stats`
  - Per-match strategic focus (gameplan)
  - Live in-set coaching mode for manual matches:
    - Rally-by-rally progression
    - Pregame lock flow for gameplan + lineup before match starts
    - Real-time score and rotation tracking
    - In-game scenario decisions with upside/downside outcomes
    - Set autoplay / full-match autoplay controls
  - JV + Varsity outcomes for league nights
  - Player XP and growth
- Player model:
  - Boys-only generated player pool
  - Expanded physical attributes: height, standing reach, block touch, approach touch
  - Expanded skills: serving, passing, setting, hitting, blocking, awareness, resilience, leadership
  - Captains required for JV and Varsity; leadership impacts match performance with on-court tradeoffs
- Recruiting systems:
  - Offseason recruiting board with star levels and commit thresholds
  - Scout / pitch / offer actions with finite recruiting points
  - Signed commits flow into next-season tryouts
- Ranking/resume systems:
  - Resume-based sectional at-large scoring (win pct, SOS, quality wins, bad losses, tournament weight)
  - Sectional reveal table shows resume components for transparency
- Scouting and intel:
  - Opponent info starts limited and improves over the season
  - Playing/scouting teams reveals strengths, weaknesses, and counters over time
  - Opponent preparation can neutralize counter bonuses if they scout you effectively
- Tournament system:
  - 16-team structure, 4 pools of 4
  - Gold/Silver/Bronze brackets after pool play
- Sectional + state progression model:
  - 12-team sectional selection (4 auto-bids + 8 at-large)
  - Sectional finalists earn state berth

## Critical save behavior

Autosave is enabled by default and runs on **every state-changing action**.

- Writes synchronously to `localStorage`
- Writes asynchronously to `IndexedDB`
- Flushes local save on tab hide/unload
- Includes export/import save tools in the app sidebar

## Run

From `/Users/andrew.oh/volleyball-dynasty-app`:

```bash
python3 -m http.server 4173
```

Then open:

- [http://localhost:4173](http://localhost:4173)

## Deploy to Render

This project is now configured for Render using [render.yaml](/Users/andrew.oh/volleyball-dynasty-app/render.yaml) as a static web service.

1. Put `/Users/andrew.oh/volleyball-dynasty-app` in a GitHub repo.
2. In Render, choose `New` -> `Blueprint`.
3. Connect that repo and deploy.
4. Render will read `render.yaml` and publish the app root as a static site.

Notes:

- Autosave still works in production via browser `localStorage` + `IndexedDB`.
- Save data is per browser/domain, so use `Export Save`/`Import Save` if you move devices/browsers.

## Files

- `index.html` - app shell
- `styles.css` - visual theme and responsive layout
- `app.js` - game logic, simulation, UI rendering, autosave
