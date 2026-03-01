const SAVE_VERSION = 1;
const SAVE_KEY = "volleyball_dynasty_save_v1";
const SAVE_BACKUP_KEY = "volleyball_dynasty_backup_v1";
const IDB_NAME = "VolleyballDynastyDB";
const IDB_STORE = "saves";
const IDB_PRIMARY_KEY = "primary";
const MAX_MATCHES_PER_SEASON = 30;
const RECRUITING_SCOUT_COST = 1;
const RECRUITING_PITCH_COST = 1;
const MAX_RECRUIT_OFFERS = 5;
const RESUME_QUALITY_WIN_STRENGTH = 70;
const RESUME_BAD_LOSS_STRENGTH = 56;
const SEASON_PHASE_STAGES = ["tryouts", "preseason", "season", "postseason", "offseason"];
const GAMEPLAN_OPTIONS = [
  { id: "balanced", label: "Balanced" },
  { id: "serve_pressure", label: "Serve Pressure" },
  { id: "defensive_wall", label: "Defensive Wall" },
  { id: "quick_tempo", label: "Quick Tempo" }
];
const WEEKLY_ENERGY_AREAS = [
  {
    id: "scouting",
    label: "Scouting",
    detail: "Improves opponent intel and counter confidence."
  },
  {
    id: "individual",
    label: "Individual Development",
    detail: "Boosts one targeted player's growth."
  },
  {
    id: "team",
    label: "Team Development",
    detail: "Improves chemistry and team-wide readiness."
  }
];
const UPGRADE_DEFS = [
  {
    id: "scouting",
    label: "Scouting",
    detail: "Improves opponent read quality and matchup targeting."
  },
  {
    id: "potentialVision",
    label: "Potential Vision",
    detail: "Reduces uncertainty when evaluating tryout potential."
  },
  {
    id: "training",
    label: "Training",
    detail: "Increases weekly training impact and player development."
  },
  {
    id: "gameplan",
    label: "Game Plan",
    detail: "Increases strategic advantage in matches."
  },
  {
    id: "culture",
    label: "Culture",
    detail: "Improves chemistry retention and morale stability."
  }
];
const DIVISIONS = ["Division 5", "Division 4", "Division 3", "Division 2", "Division 1", "Open Division"];
const LEAGUE_NAMES = ["North Coast League", "Metro Valley League", "Canyon Crest League", "Pacific Hills League"];
const FIRST_NAMES = [
  "Liam",
  "Noah",
  "Oliver",
  "Elijah",
  "James",
  "William",
  "Benjamin",
  "Lucas",
  "Henry",
  "Alexander",
  "Mason",
  "Michael",
  "Ethan",
  "Daniel",
  "Jacob",
  "Logan",
  "Jackson",
  "Levi",
  "Sebastian",
  "Mateo",
  "Jack",
  "Owen",
  "Theodore",
  "Aiden",
  "Samuel",
  "Joseph",
  "John",
  "David",
  "Wyatt",
  "Luke",
  "Asher",
  "Carter",
  "Julian",
  "Grayson",
  "Leo",
  "Jayden",
  "Gabriel",
  "Isaac",
  "Lincoln",
  "Anthony",
  "Hudson",
  "Dylan"
];
const LAST_NAMES = [
  "Ramirez",
  "Kim",
  "Lopez",
  "Nguyen",
  "Patel",
  "Jones",
  "Davis",
  "Miller",
  "Clark",
  "Adams",
  "Bennett",
  "Diaz",
  "Sato",
  "Park",
  "Sullivan",
  "Tran",
  "Foster",
  "Reed",
  "Cook",
  "Sanders",
  "Bailey",
  "Hughes",
  "Price",
  "Flores",
  "Howard",
  "Morris",
  "Ward",
  "Gutierrez",
  "Rivera",
  "Cruz",
  "Ng",
  "Khan",
  "Mendoza",
  "Brooks",
  "Turner",
  "Henderson",
  "Diaz",
  "Perry",
  "Choi",
  "Wright"
];
const SCHOOL_PREFIX = [
  "Redwood",
  "Summit",
  "Westview",
  "Granite",
  "Cypress",
  "Riverbend",
  "Maple",
  "Canyon",
  "Lakeside",
  "San Marco",
  "Golden",
  "Vista",
  "Pioneer",
  "Harbor",
  "Stonehill",
  "Silver",
  "Foothill",
  "Rancho",
  "Mission",
  "Cedar"
];
const SCHOOL_SUFFIX = [
  "Prep",
  "Academy",
  "Heights",
  "Union",
  "Christian",
  "East",
  "West",
  "North",
  "South",
  "Central",
  "Valley",
  "Ridge",
  "Charter",
  "Collegiate",
  "High"
];
const MASCOTS = [
  "Hawks",
  "Falcons",
  "Panthers",
  "Spartans",
  "Titans",
  "Knights",
  "Mustangs",
  "Warriors",
  "Coyotes",
  "Storm",
  "Lions",
  "Wolves",
  "Bears",
  "Ravens",
  "Comets"
];
const POSITIONS = ["OH", "MB", "S", "RS", "LIB"];
const SKILLS = ["serving", "passing", "setting", "hitting", "blocking", "awareness", "resilience", "leadership"];
const TOURNAMENTS = [
  {
    id: "harvest_classic",
    name: "Harvest Classic",
    difficulty: 52,
    prestige: 9,
    unlock: { minDivisionIndex: 0, minPlayoffAppearances: 0, requiresStateBerth: false }
  },
  {
    id: "coastal_throwdown",
    name: "Coastal Throwdown",
    difficulty: 57,
    prestige: 12,
    unlock: { minDivisionIndex: 0, minPlayoffAppearances: 0, requiresStateBerth: false }
  },
  {
    id: "frontier_showcase",
    name: "Frontier Showcase",
    difficulty: 64,
    prestige: 15,
    unlock: { minDivisionIndex: 1, minPlayoffAppearances: 1, requiresStateBerth: false }
  },
  {
    id: "iron_spike_invite",
    name: "Iron Spike Invite",
    difficulty: 72,
    prestige: 21,
    unlock: { minDivisionIndex: 2, minPlayoffAppearances: 1, requiresStateBerth: false }
  },
  {
    id: "elite_cup",
    name: "Elite Cup",
    difficulty: 79,
    prestige: 26,
    unlock: { minDivisionIndex: 3, minPlayoffAppearances: 2, requiresStateBerth: false }
  },
  {
    id: "champions_invite",
    name: "Champions Invite",
    difficulty: 87,
    prestige: 32,
    unlock: { minDivisionIndex: 4, minPlayoffAppearances: 3, requiresStateBerth: true }
  }
];

const app = document.getElementById("app");
const runtime = {
  saveStatus: "Loading...",
  lastSavedAt: null,
  pendingIdbWrite: Promise.resolve(),
  renderScheduled: false
};

let state = null;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(items) {
  return items[randomInt(0, items.length - 1)];
}

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function slug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDivision(index) {
  return DIVISIONS[clamp(index, 0, DIVISIONS.length - 1)];
}

function logistic(value) {
  return 1 / (1 + Math.exp(-value));
}

function formatTime(ts) {
  if (!ts) return "Never";
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function gradeLabel(grade) {
  if (grade <= 9) return "Fr";
  if (grade === 10) return "So";
  if (grade === 11) return "Jr";
  return "Sr";
}

function formatHeight(inches) {
  const safe = Math.round(inches || 0);
  const feet = Math.floor(safe / 12);
  const rem = safe % 12;
  return `${feet}'${rem}"`;
}

function friendlyFocusLabel(focusId) {
  const found = WEEKLY_ENERGY_AREAS.find((focus) => focus.id === focusId);
  return found ? found.label : "Not set";
}

function phaseLabel(phase) {
  if (phase === "tryouts") return "Tryouts";
  if (phase === "preseason") return "Preseason";
  if (phase === "season") return "Regular Season";
  if (phase === "postseason") return "Postseason";
  if (phase === "offseason") return "Offseason";
  return "Career Start";
}

function phaseIndex(phase) {
  const index = SEASON_PHASE_STAGES.indexOf(phase);
  return index >= 0 ? index : -1;
}

function starLabel(stars) {
  return "★".repeat(clamp(stars, 1, 5));
}

function findTournamentById(id) {
  return TOURNAMENTS.find((tournament) => tournament.id === id);
}

function nextPlayerId(draft) {
  const id = `P${draft.meta.nextPlayerCounter}`;
  draft.meta.nextPlayerCounter += 1;
  return id;
}

function createRandomName() {
  return `${randomChoice(FIRST_NAMES)} ${randomChoice(LAST_NAMES)}`;
}

function playerOverall(player) {
  const average = SKILLS.reduce((sum, key) => sum + (player[key] || 50), 0) / SKILLS.length;
  return Math.round(average);
}

function positionHeightBaseline(position) {
  if (position === "MB") return 75;
  if (position === "OH" || position === "RS") return 73;
  if (position === "S") return 71;
  return 69;
}

function physicalPotentialContribution(player) {
  const heightScore = (player.heightInches - 68) * 1.5;
  const reachScore = (player.standingReach - 92) * 0.7;
  const blockTouchScore = (player.blockTouch - 104) * 0.75;
  const approachTouchScore = (player.approachTouch - 106) * 0.9;
  return (heightScore + reachScore + blockTouchScore + approachTouchScore) / 4;
}

function estimatePotential(player, upgradeLevel) {
  const noiseRange = Math.max(12 - upgradeLevel * 2, 2);
  return clamp(player.potential + randomInt(-noiseRange, noiseRange), 40, 99);
}

function unlocksTournament(career, tournament) {
  const playoffAppearances = career.history.filter((season) => season.madeSectional).length;
  const hasStateBerth = career.history.some((season) => season.madeState);
  const { unlock } = tournament;
  return (
    career.divisionIndex >= unlock.minDivisionIndex &&
    playoffAppearances >= unlock.minPlayoffAppearances &&
    (!unlock.requiresStateBerth || hasStateBerth)
  );
}

function createPlayer(draft, opts = {}) {
  const baseSkill = opts.baseSkill ?? randomInt(46, 67);
  const variation = () => randomInt(-7, 8);
  const position = opts.position ?? randomChoice(POSITIONS);
  const heightBase = positionHeightBaseline(position);
  const heightInches = clamp(opts.heightInches ?? heightBase + randomInt(-3, 3), 64, 82);
  const standingReach = clamp(opts.standingReach ?? heightInches + randomInt(20, 27), 86, 112);
  const verticalSeed = Math.round((baseSkill - 45) * 0.45 + randomInt(12, 26));
  const blockTouch = clamp(opts.blockTouch ?? standingReach + verticalSeed + randomInt(-2, 2), 96, 132);
  const approachTouch = clamp(opts.approachTouch ?? blockTouch + randomInt(2, 8), 99, 138);
  const morale = clamp(opts.morale ?? randomInt(60, 82), 30, 99);
  const player = {
    id: nextPlayerId(draft),
    name: opts.name ?? createRandomName(),
    gender: "M",
    grade: opts.grade ?? randomInt(9, 12),
    position,
    heightInches,
    standingReach,
    blockTouch,
    approachTouch,
    serving: clamp(opts.serving ?? baseSkill + variation(), 35, 95),
    passing: clamp(opts.passing ?? baseSkill + variation(), 35, 95),
    setting: clamp(opts.setting ?? baseSkill + variation(), 35, 95),
    hitting: clamp(opts.hitting ?? baseSkill + variation(), 35, 95),
    blocking: clamp(opts.blocking ?? baseSkill + variation(), 35, 95),
    awareness: clamp(opts.awareness ?? baseSkill + variation(), 35, 95),
    resilience: clamp(opts.resilience ?? baseSkill + variation(), 35, 95),
    leadership: clamp(opts.leadership ?? Math.round(morale * 0.9) + randomInt(-4, 5), 35, 95),
    potential: 0,
    xp: opts.xp ?? 0,
    morale,
    origin: opts.origin ?? "freshman",
    yearsInProgram: opts.yearsInProgram ?? 0,
    seasonStats: opts.seasonStats ?? {
      setsPlayed: 0,
      impact: 0
    }
  };
  player.potential = clamp(
    opts.potential ??
      Math.round(playerOverall(player) + 10 + physicalPotentialContribution(player) / 2 + randomInt(-4, 7)),
    45,
    99
  );
  return player;
}

function recruitingPointBudget(career) {
  return 8 + career.upgrades.scouting * 2 + career.upgrades.culture;
}

function createRecruitProspect(draft, summary = {}) {
  const stars = clamp(2 + Math.floor(Math.random() * 4) + Math.floor((summary.transferInterest || 0) / 3), 2, 5);
  const grade = Math.random() < 0.75 ? 9 : randomInt(10, 11);
  const immediateSkill = clamp(37 + stars * 6 + randomInt(-4, 6), 35, 92);
  const potential = clamp(immediateSkill + 14 + stars * 2 + randomInt(-5, 9), 58, 99);
  return {
    id: `R${draft.meta.nextRecruitCounter++}`,
    name: createRandomName(),
    stars,
    grade,
    position: randomChoice(POSITIONS),
    immediateSkill,
    hiddenPotential: potential,
    interest: clamp(
      26 + stars * 6 + (summary.transferInterest || 0) * 6 + (summary.madeState ? 8 : 0) + randomInt(-14, 15),
      8,
      95
    ),
    commitmentThreshold: clamp(58 + stars * 6 + randomInt(-8, 9), 50, 96),
    pitches: 0,
    offered: false,
    scouted: false,
    note: randomChoice([
      "Explosive first step and good vertical pop.",
      "High-motor defender, likely to anchor serve receive.",
      "Raw athlete with strong long-term upside.",
      "Polished floor game and stable passing touch.",
      "Can contribute early in specific rotations."
    ])
  };
}

function generateRecruitingBoard(draft, summary = {}) {
  const boardSize = 10 + Math.floor(draft.career.upgrades.scouting / 2);
  return Array.from({ length: boardSize }).map(() => createRecruitProspect(draft, summary));
}

function recruitCommitChance(recruit, career) {
  const attentionBonus = recruit.pitches * 5 + (recruit.scouted ? 3 : 0) + career.upgrades.culture * 2;
  const offerBonus = recruit.offered ? 18 : 0;
  const score = recruit.interest + attentionBonus + offerBonus - recruit.commitmentThreshold;
  return clamp(0.08 + score / 38, 0.03, 0.96);
}

function convertRecruitToPlayer(draft, recruit) {
  const player = createPlayer(draft, {
    grade: recruit.grade,
    position: recruit.position,
    baseSkill: clamp(recruit.immediateSkill + randomInt(-2, 3), 35, 95),
    potential: clamp(recruit.hiddenPotential + randomInt(-4, 4), 55, 99),
    morale: randomInt(64, 86),
    origin: "recruit",
    yearsInProgram: 0
  });
  return player;
}

function makeSchoolName(existing) {
  let name = "";
  let attempts = 0;
  while (!name || existing.has(name)) {
    name = `${randomChoice(SCHOOL_PREFIX)} ${randomChoice(SCHOOL_SUFFIX)}`;
    attempts += 1;
    if (attempts > 15) {
      name = `${randomChoice(SCHOOL_PREFIX)} ${randomInt(10, 99)}`;
      break;
    }
  }
  existing.add(name);
  return name;
}

function createOpponentTeam({ id, leagueIndex, divisionIndex, schoolName }) {
  const base = 52 + divisionIndex * 6;
  const strength = clamp(base + randomInt(-9, 9), 40, 96);
  const profileOffset = () => randomInt(-7, 7);
  return {
    id,
    leagueIndex,
    schoolName,
    mascot: randomChoice(MASCOTS),
    strength,
    profile: {
      offense: clamp(strength + profileOffset(), 35, 99),
      defense: clamp(strength + profileOffset(), 35, 99),
      serveReceive: clamp(strength + profileOffset(), 35, 99),
      block: clamp(strength + profileOffset(), 35, 99),
      tempo: clamp(strength + profileOffset(), 35, 99)
    }
  };
}

function createWorldForSeason(career, schoolName, mascot) {
  const usedNames = new Set([schoolName]);
  const leagues = [];
  for (let leagueIndex = 0; leagueIndex < LEAGUE_NAMES.length; leagueIndex += 1) {
    const teams = [];
    if (leagueIndex === 0) {
      teams.push({
        id: "user_team",
        leagueIndex,
        schoolName,
        mascot,
        strength: 55 + career.divisionIndex * 5,
        profile: {
          offense: 58,
          defense: 58,
          serveReceive: 58,
          block: 58,
          tempo: 58
        }
      });
    }

    while (teams.length < 10) {
      const school = makeSchoolName(usedNames);
      teams.push(
        createOpponentTeam({
          id: slug(`${school}-${leagueIndex}-${teams.length}`),
          leagueIndex,
          divisionIndex: career.divisionIndex,
          schoolName: school
        })
      );
    }

    leagues.push({
      id: `league_${leagueIndex}`,
      name: LEAGUE_NAMES[leagueIndex],
      teams
    });
  }

  return { leagues };
}

function userTeamInfo(currentState) {
  const team = currentState.world.leagues[0].teams.find((candidate) => candidate.id === "user_team");
  return team;
}

function findTeamById(currentState, teamId) {
  for (const league of currentState.world.leagues) {
    const found = league.teams.find((team) => team.id === teamId);
    if (found) return found;
  }
  return null;
}

function deriveTeamProfileFromRoster(currentState) {
  const varsity = getVarsityPlayers(currentState);
  if (!varsity.length) {
    return {
      offense: 50,
      defense: 50,
      serveReceive: 50,
      block: 50,
      tempo: 50
    };
  }
  const average = (key) => Math.round(varsity.reduce((sum, player) => sum + player[key], 0) / varsity.length);
  return {
    offense: Math.round((average("hitting") + average("setting") + average("serving")) / 3),
    defense: Math.round((average("passing") + average("awareness") + average("resilience")) / 3),
    serveReceive: Math.round((average("passing") + average("awareness")) / 2),
    block: Math.round((average("blocking") + average("awareness")) / 2),
    tempo: Math.round((average("resilience") + average("awareness")) / 2)
  };
}

function getVarsityPlayers(currentState) {
  const ids = new Set(currentState.team.rosters.varsityIds);
  return currentState.program.rosterPlayers.filter((player) => ids.has(player.id));
}

function getJvPlayers(currentState) {
  const ids = new Set(currentState.team.rosters.jvIds);
  return currentState.program.rosterPlayers.filter((player) => ids.has(player.id));
}

function buildLeagueStandingsMap(league) {
  const map = {};
  for (const team of league.teams) {
    map[team.id] = {
      teamId: team.id,
      teamName: `${team.schoolName} ${team.mascot}`,
      wins: 0,
      losses: 0,
      setsFor: 0,
      setsAgainst: 0,
      streak: 0
    };
  }
  return map;
}

function applyLeagueResultToStandings(standings, teamAId, teamBId, teamAWon, teamASets, teamBSets) {
  if (!standings?.[teamAId] || !standings?.[teamBId]) return;
  const teamA = standings[teamAId];
  const teamB = standings[teamBId];
  teamA.setsFor += teamASets;
  teamA.setsAgainst += teamBSets;
  teamB.setsFor += teamBSets;
  teamB.setsAgainst += teamASets;

  if (teamAWon) {
    teamA.wins += 1;
    teamB.losses += 1;
    teamA.streak = teamA.streak >= 0 ? teamA.streak + 1 : 1;
    teamB.streak = teamB.streak <= 0 ? teamB.streak - 1 : -1;
  } else {
    teamB.wins += 1;
    teamA.losses += 1;
    teamB.streak = teamB.streak >= 0 ? teamB.streak + 1 : 1;
    teamA.streak = teamA.streak <= 0 ? teamA.streak - 1 : -1;
  }
}

function sortedLeagueStandingsRows(standings) {
  const rows = Object.values(standings || {});
  rows.sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (a.losses !== b.losses) return a.losses - b.losses;
    const aDiff = a.setsFor - a.setsAgainst;
    const bDiff = b.setsFor - b.setsAgainst;
    if (bDiff !== aDiff) return bDiff - aDiff;
    return a.teamName.localeCompare(b.teamName);
  });

  const leaderWins = rows[0]?.wins || 0;
  const leaderLosses = rows[0]?.losses || 0;
  return rows.map((row, index) => {
    const total = row.wins + row.losses;
    const pct = total > 0 ? row.wins / total : 0;
    const gb = ((leaderWins - row.wins) + (row.losses - leaderLosses)) / 2;
    return {
      ...row,
      rank: index + 1,
      pct,
      gb
    };
  });
}

function simulateBackgroundLeagueWeek(draft, week) {
  if (!week || week.kind !== "league" || week.backgroundSimulated) return;
  const league = draft.world.leagues[0];
  const ids = shuffle(league.teams.map((team) => team.id).filter((id) => id !== "user_team"));
  while (ids.length > 1) {
    const teamAId = ids.pop();
    const teamBId = ids.pop();
    const teamA = findTeamById(draft, teamAId);
    const teamB = findTeamById(draft, teamBId);
    const result = simulateBestOfFive(teamA.strength + randomInt(-3, 3), teamB.strength + randomInt(-3, 3));
    applyLeagueResultToStandings(
      draft.season.leagueStandings,
      teamAId,
      teamBId,
      result.won,
      result.teamSets,
      result.oppSets
    );
  }
  week.backgroundSimulated = true;
}

function opponentTraitFromProfile(profile, mode = "strength") {
  const entries = Object.entries(profile || {});
  if (!entries.length) return "offense";
  if (mode === "weakness") {
    return entries.reduce((best, current) => (current[1] < best[1] ? current : best), entries[0])[0];
  }
  return entries.reduce((best, current) => (current[1] > best[1] ? current : best), entries[0])[0];
}

function traitLabel(key) {
  const map = {
    offense: "Offense Tempo",
    defense: "Defensive Shape",
    serveReceive: "Serve Receive",
    block: "Blocking Wall",
    tempo: "Transition Tempo"
  };
  return map[key] || key;
}

function counterForTrait(trait, mode = "strength") {
  if (mode === "weakness") {
    if (trait === "serveReceive") return "serve_pressure";
    if (trait === "block") return "quick_tempo";
    if (trait === "defense") return "quick_tempo";
    return "balanced";
  }
  if (trait === "offense") return "defensive_wall";
  if (trait === "tempo") return "defensive_wall";
  if (trait === "block") return "quick_tempo";
  if (trait === "serveReceive") return "serve_pressure";
  return "balanced";
}

function initializeOpponentIntel(currentState) {
  const intel = {};
  const userLeague = currentState.world.leagues[0];
  for (const team of userLeague.teams) {
    if (team.id === "user_team") continue;
    const strengthTrait = opponentTraitFromProfile(team.profile, "strength");
    const weaknessTrait = opponentTraitFromProfile(team.profile, "weakness");
    intel[team.id] = {
      knowledge: randomInt(6, 14),
      gamesSeen: 0,
      playstyleKnown: false,
      strengthKnown: false,
      weaknessKnown: false,
      countersKnown: false,
      strengthTrait,
      weaknessTrait,
      counterToStrength: counterForTrait(strengthTrait, "strength"),
      counterToWeakness: counterForTrait(weaknessTrait, "weakness"),
      yourExposure: randomInt(8, 16),
      notes: []
    };
  }
  return intel;
}

function refreshIntelUnlocks(entry) {
  entry.playstyleKnown = entry.knowledge >= 18;
  entry.strengthKnown = entry.knowledge >= 34;
  entry.weaknessKnown = entry.knowledge >= 52;
  entry.countersKnown = entry.knowledge >= 70;
}

function gainOpponentIntel(draft, opponentId, points, reason = "") {
  const intel = draft.season?.opponentIntel?.[opponentId];
  if (!intel) return;
  intel.knowledge = clamp(intel.knowledge + points, 0, 100);
  refreshIntelUnlocks(intel);
  if (reason) {
    intel.notes = intel.notes || [];
    intel.notes.unshift(reason);
    intel.notes = intel.notes.slice(0, 4);
  }
}

function applyWeeklyEnergyScouting(draft, week) {
  if (!draft.season || week.scoutingApplied) return;
  const scoutingPct = week.energy?.scouting ?? 0;
  const scoutingPower =
    (scoutingPct / 100) * (12 + draft.career.upgrades.scouting * 3) + draft.career.upgrades.scouting * 0.8;

  for (const [opponentId, intel] of Object.entries(draft.season.opponentIntel || {})) {
    intel.yourExposure = clamp(
      intel.yourExposure + randomInt(2, 6) + Math.floor((week.opponentInvestments?.[opponentId] || 0) / 40),
      0,
      100
    );
    gainOpponentIntel(draft, opponentId, 1 + Math.floor(draft.career.upgrades.scouting / 2));
  }

  if (week.kind === "league") {
    const uniqueOpponents = [...new Set(week.matches.map((match) => match.opponentId))];
    for (const opponentId of uniqueOpponents) {
      const extra = scoutingPower / Math.max(uniqueOpponents.length, 1);
      gainOpponentIntel(draft, opponentId, extra, "Weekly scouting focus");
    }
  }
  week.scoutingApplied = true;
}

function getCaptainPlayer(currentState, teamType, players) {
  const captainId = teamType === "varsity" ? currentState.team.captains.varsityId : currentState.team.captains.jvId;
  if (!captainId) return null;
  return players.find((player) => player.id === captainId) || null;
}

function calculateCaptainEffect(currentState, teamType, players, lineupIds = null) {
  if (!players.length) return -1;
  const captain = getCaptainPlayer(currentState, teamType, players);
  if (!captain) return -1.2;
  const sorted = [...players].sort((a, b) => playerOverall(b) - playerOverall(a));
  const rank = sorted.findIndex((player) => player.id === captain.id);
  const captainOverall = playerOverall(captain);
  const leadershipBoost = (captain.leadership - 55) / 6;
  const lineupSet = lineupIds ? new Set(lineupIds) : null;
  const captainInLineup = lineupSet ? lineupSet.has(captain.id) : rank <= 6;
  const onCourtFactor = captainInLineup ? 1 : clamp(0.25 + (captainOverall - 52) / 80, 0.15, 0.6);
  const forcedRotationPenalty =
    captainInLineup ? 0 : clamp((rank - 5) * 0.9 + Math.max(0, 62 - captainOverall) / 10, 0, 6);
  return leadershipBoost * onCourtFactor - forcedRotationPenalty;
}

function autoCaptainFromRosterIds(currentState, ids) {
  const eligible = currentState.program.rosterPlayers.filter((player) => ids.includes(player.id));
  if (!eligible.length) return null;
  eligible.sort((a, b) => {
    if (b.leadership !== a.leadership) return b.leadership - a.leadership;
    return playerOverall(b) - playerOverall(a);
  });
  return eligible[0].id;
}

function generateTryoutPool(draft, summary = null) {
  const returning = [];
  const noShows = [];
  const transferCount = clamp(Math.floor((summary?.transferInterest ?? 0) + randomInt(0, 2)), 0, 5);
  const incomingFreshmen = randomInt(8, 13);
  const returningFreeAgents = [];
  const returningRosterPool = [];
  const incomingCommits = (draft.program.incomingCommits || []).map((player) => ({
    ...player,
    origin: "recruit"
  }));

  for (const player of draft.program.rosterPlayers) {
    if (player.grade >= 12) {
      continue;
    }
    const skipChance = clamp(0.08 + (58 - player.morale) / 100 + randomInt(0, 8) / 100, 0.05, 0.32);
    if (Math.random() < skipChance) {
      noShows.push(player);
      continue;
    }
    returning.push({
      ...player,
      origin: "returning"
    });
    returningRosterPool.push(player.id);
  }

  for (const freeAgent of draft.program.freeAgents) {
    if (freeAgent.grade >= 12) continue;
    const returnChance = 0.35 + (draft.career.upgrades.culture * 0.04);
    if (Math.random() < returnChance) {
      const improved = {
        ...freeAgent,
        origin: "walk-on"
      };
      SKILLS.forEach((key) => {
        improved[key] = clamp(improved[key] + randomInt(0, 2), 30, 99);
      });
      returningFreeAgents.push(improved);
    }
  }

  const transferBase = 58 + draft.career.divisionIndex * 6 + (summary?.regularSeasonWins ?? 0) * 0.4;
  const transfers = Array.from({ length: transferCount }).map(() =>
    createPlayer(draft, {
      grade: randomInt(10, 12),
      baseSkill: clamp(Math.round(transferBase + randomInt(-8, 9)), 42, 90),
      potential: clamp(transferBase + randomInt(6, 20), 55, 98),
      origin: "transfer"
    })
  );

  const freshmen = Array.from({ length: incomingFreshmen }).map(() =>
    createPlayer(draft, {
      grade: 9,
      baseSkill: randomInt(42, 62),
      potential: randomInt(58, 96),
      origin: "freshman"
    })
  );

  const pool = [...returning, ...incomingCommits, ...returningFreeAgents, ...transfers, ...freshmen].map((candidate) => ({
    ...candidate,
    seasonStats: {
      setsPlayed: 0,
      impact: 0
    }
  }));

  const minimumPool = 26;
  while (pool.length < minimumPool) {
    pool.push(
      createPlayer(draft, {
        grade: randomInt(9, 11),
        baseSkill: randomInt(40, 58),
        potential: randomInt(55, 91),
        origin: "walk-on"
      })
    );
  }

  const assignments = {};
  for (const candidate of pool) {
    assignments[candidate.id] = "cut";
  }

  draft.tryouts = {
    candidates: shuffle(pool),
    assignments,
    captainSelections: {
      varsityId: null,
      jvId: null
    },
    summary: {
      returning: returning.length,
      noShows: noShows.length,
      transfers: transfers.length,
      freshmen: freshmen.length,
      walkOns: returningFreeAgents.length,
      recruits: incomingCommits.length
    },
    autoMode: "skill"
  };

  draft.program.rosterPlayers = draft.program.rosterPlayers.filter((player) => player.grade <= 12);
  draft.program.freeAgents = draft.program.freeAgents.filter((player) => player.grade <= 12);
  draft.program.noShowPlayers = noShows;
  draft.program.returningRosterIds = returningRosterPool;
  draft.program.incomingCommits = [];
}

function applyTryoutAutofill(draft, mode) {
  if (!draft.tryouts) return;
  const ranked = [...draft.tryouts.candidates].sort((a, b) => {
    const aScore = mode === "potential" ? a.potential : playerOverall(a);
    const bScore = mode === "potential" ? b.potential : playerOverall(b);
    return bScore - aScore;
  });
  const assignments = {};
  for (const candidate of ranked) {
    assignments[candidate.id] = "cut";
  }
  ranked.slice(0, 12).forEach((candidate) => {
    assignments[candidate.id] = "varsity";
  });
  ranked.slice(12, 24).forEach((candidate) => {
    assignments[candidate.id] = "jv";
  });
  draft.tryouts.assignments = assignments;
  const varsityCandidates = ranked.slice(0, 12).sort((a, b) => b.leadership - a.leadership);
  const jvCandidates = ranked.slice(12, 24).sort((a, b) => b.leadership - a.leadership);
  draft.tryouts.captainSelections = {
    varsityId: varsityCandidates[0]?.id || null,
    jvId: jvCandidates[0]?.id || null
  };
  draft.tryouts.autoMode = mode;
}

function finalizeTryouts(draft) {
  const varsities = [];
  const jvs = [];
  const cuts = [];

  for (const candidate of draft.tryouts.candidates) {
    const assignment = draft.tryouts.assignments[candidate.id] || "cut";
    if (assignment === "varsity") varsities.push(candidate);
    else if (assignment === "jv") jvs.push(candidate);
    else cuts.push(candidate);
  }

  if (varsities.length !== 12 || jvs.length !== 12) {
    return { ok: false, message: "Select exactly 12 Varsity and 12 JV players." };
  }

  const varsityCaptainId = draft.tryouts.captainSelections?.varsityId;
  const jvCaptainId = draft.tryouts.captainSelections?.jvId;
  if (!varsityCaptainId || !jvCaptainId) {
    return { ok: false, message: "Select one captain for Varsity and one for JV." };
  }
  if (!varsities.some((player) => player.id === varsityCaptainId)) {
    return { ok: false, message: "Varsity captain must be assigned to Varsity." };
  }
  if (!jvs.some((player) => player.id === jvCaptainId)) {
    return { ok: false, message: "JV captain must be assigned to JV." };
  }

  draft.program.rosterPlayers = [...varsities, ...jvs].map((player) => ({
    ...player,
    yearsInProgram: (player.yearsInProgram ?? 0) + 1
  }));

  draft.program.freeAgents = [...cuts, ...(draft.program.noShowPlayers || [])].map((player) => ({
    ...player,
    yearsInProgram: player.yearsInProgram ?? 0
  }));

  draft.team.rosters.varsityIds = varsities.map((player) => player.id);
  draft.team.rosters.jvIds = jvs.map((player) => player.id);
  draft.team.captains = {
    varsityId: varsityCaptainId,
    jvId: jvCaptainId
  };

  const continuity = varsities.filter((player) => (draft.program.returningRosterIds || []).includes(player.id)).length;
  draft.team.chemistry = clamp(
    Math.round(
      draft.team.chemistry * 0.48 +
        34 +
        continuity * 2.5 +
        draft.career.upgrades.culture * 2 +
        randomInt(-4, 5)
    ),
    28,
    97
  );

  draft.tryouts = null;
  draft.preseason.selectedTournamentIds = [];
  draft.phase = "preseason";
  return { ok: true };
}

function buildLeagueMatchups(currentState) {
  const userLeague = currentState.world.leagues[0];
  const opponents = userLeague.teams.filter((team) => team.id !== "user_team");
  const matches = [];
  for (const opponent of opponents) {
    matches.push({
      id: `M-${opponent.id}-home`,
      opponentId: opponent.id,
      opponentName: `${opponent.schoolName} ${opponent.mascot}`,
      home: true,
      status: "pending",
      gameplan: "balanced",
      pregame: null,
      live: null
    });
    matches.push({
      id: `M-${opponent.id}-away`,
      opponentId: opponent.id,
      opponentName: `${opponent.schoolName} ${opponent.mascot}`,
      home: false,
      status: "pending",
      gameplan: "balanced",
      pregame: null,
      live: null
    });
  }
  return shuffle(matches);
}

function createSeasonWeeks(currentState) {
  const matches = buildLeagueMatchups(currentState);
  const weeks = [];
  let cursor = 0;
  const selected = currentState.preseason.selectedTournamentIds;
  for (let weekNumber = 1; weekNumber <= 11; weekNumber += 1) {
    if (weekNumber === 3 || weekNumber === 9) {
      const tournamentIndex = weekNumber === 3 ? 0 : 1;
      const tournamentId = selected[tournamentIndex];
      const tournament = findTournamentById(tournamentId);
      weeks.push({
        id: `W${weekNumber}`,
        weekNumber,
        kind: "tournament",
        title: tournament ? tournament.name : "Tournament",
        tournamentId,
        status: "pending",
        gameplan: "balanced",
        opponentInvestments: {},
        energy: { scouting: 34, individual: 33, team: 33 },
        energyTargetPlayerId: null,
        scoutingApplied: false,
        focusLocked: false,
        focus: null,
        summary: null
      });
      continue;
    }

    const weekMatches = matches.slice(cursor, cursor + 2).map((match, index) => ({
      ...match,
      id: `${match.id}-w${weekNumber}-${index}`
    }));
    cursor += 2;
    weeks.push({
      id: `W${weekNumber}`,
      weekNumber,
      kind: "league",
      title: `League Week ${weekNumber}`,
      matches: weekMatches,
      status: "pending",
      backgroundSimulated: false,
      opponentInvestments: {},
      energy: { scouting: 34, individual: 33, team: 33 },
      energyTargetPlayerId: null,
      scoutingApplied: false,
      focusLocked: false,
      focus: null,
      summary: null
    });
  }

  return weeks;
}

function initializeSeasonState(draft) {
  const season = {
    weekIndex: 0,
    weeks: createSeasonWeeks(draft),
    viewTab: "matchday",
    record: {
      varsityWins: 0,
      varsityLosses: 0,
      jvWins: 0,
      jvLosses: 0,
      leagueWins: 0,
      leagueLosses: 0
    },
    leagueStandings: buildLeagueStandingsMap(draft.world.leagues[0]),
    opponentIntel: initializeOpponentIntel(draft),
    rankingPoints: 0,
    matchesPlayed: [],
    tournamentResults: [],
    postseason: null
  };
  for (const week of season.weeks) {
    if (week.kind !== "league") continue;
    const investments = {};
    for (const match of week.matches) {
      investments[match.opponentId] = randomInt(18, 72);
    }
    week.opponentInvestments = investments;
  }
  draft.season = season;
}

function evaluateWeeklyEffects(currentState, week, opponentId = null) {
  const energy = week.energy || { scouting: 34, individual: 33, team: 33 };
  const scoutingRatio = clamp((energy.scouting || 0) / 100, 0, 1);
  const individualRatio = clamp((energy.individual || 0) / 100, 0, 1);
  const teamRatio = clamp((energy.team || 0) / 100, 0, 1);
  const intel = opponentId ? currentState.season?.opponentIntel?.[opponentId] : null;
  const knowledgeFactor = intel ? (intel.knowledge || 0) / 100 : 0;

  return {
    teamBonus: teamRatio * (2 + currentState.career.upgrades.training * 0.6),
    individualBonus: individualRatio * (3 + currentState.career.upgrades.training * 0.8),
    individualTargetId: week.energyTargetPlayerId || null,
    intelLevel:
      scoutingRatio * (1.6 + currentState.career.upgrades.scouting * 0.5) +
      knowledgeFactor * (1 + currentState.career.upgrades.scouting * 0.15),
    chemistryDelta: Math.round(teamRatio * (2 + currentState.career.upgrades.culture * 0.6)),
    scoutingRatio,
    individualRatio,
    teamRatio
  };
}

function computeRosterPower(players) {
  if (!players.length) return 50;
  const ranked = [...players].sort((a, b) => playerOverall(b) - playerOverall(a));
  const top = ranked.slice(0, Math.min(7, ranked.length));
  return top.reduce((sum, player) => sum + playerOverall(player), 0) / top.length;
}

function getOpponentWeakness(opponentProfile) {
  let weaknessKey = "offense";
  let weaknessScore = opponentProfile.offense;
  for (const key of ["defense", "serveReceive", "block", "tempo"]) {
    if (opponentProfile[key] < weaknessScore) {
      weaknessScore = opponentProfile[key];
      weaknessKey = key;
    }
  }
  return weaknessKey;
}

function gameplanTargetKey(gameplan) {
  if (gameplan === "serve_pressure") return "serveReceive";
  if (gameplan === "defensive_wall") return "offense";
  if (gameplan === "quick_tempo") return "block";
  return "balanced";
}

function lineupPower(players, lineupIds) {
  const ids = new Set(lineupIds || []);
  const lineup = players.filter((player) => ids.has(player.id));
  if (!lineup.length) return computeRosterPower(players);
  return lineup.reduce((sum, player) => sum + playerOverall(player), 0) / lineup.length;
}

function computeCounterKnowledgeBonus(currentState, week, opponent, gameplan) {
  const intel = currentState.season?.opponentIntel?.[opponent.id];
  const weakTarget = intel?.counterToWeakness || counterForTrait(getOpponentWeakness(opponent.profile), "weakness");
  const strengthTarget = intel?.counterToStrength || counterForTrait(opponentTraitFromProfile(opponent.profile, "strength"), "strength");
  const counterMatch = gameplan === weakTarget || gameplan === strengthTarget;
  const effects = evaluateWeeklyEffects(currentState, week, opponent.id);
  const baseCertainty = effects.intelLevel + currentState.career.upgrades.gameplan * 0.4;
  const certainty = intel?.countersKnown ? baseCertainty + 1.2 : baseCertainty * 0.65;
  const opponentPrep = week.opponentInvestments?.[opponent.id] || randomInt(20, 60);
  const neutralization = clamp((opponentPrep - (week.energy?.scouting || 0)) / 70 + (intel?.yourExposure || 0) / 130, 0, 1.3);
  const matchupBonus = counterMatch ? 2.2 + certainty : 0.4 + certainty * 0.2;
  return matchupBonus - neutralization * 2;
}

function simulateSet(teamWinProb, finalSet = false) {
  const teamWins = Math.random() < teamWinProb;
  const target = finalSet ? 15 : 25;
  const margin = randomInt(2, 8);
  const winnerPoints = target + (Math.random() < 0.1 ? randomInt(1, 3) : 0);
  const loserPoints = clamp(winnerPoints - margin, finalSet ? 8 : 14, finalSet ? 14 : 24);
  if (teamWins) {
    return { team: winnerPoints, opp: loserPoints, won: true };
  }
  return { team: loserPoints, opp: winnerPoints, won: false };
}

function simulateBestOfFive(teamPower, opponentPower, setsToWin = 3) {
  let teamSets = 0;
  let oppSets = 0;
  const sets = [];
  const decidingSetIndex = setsToWin * 2 - 2;

  while (teamSets < setsToWin && oppSets < setsToWin) {
    const setIndex = teamSets + oppSets;
    const momentum = (teamSets - oppSets) * 0.08;
    const diff = (teamPower - opponentPower) / 13 + momentum;
    const winProb = clamp(logistic(diff), 0.1, 0.9);
    const set = simulateSet(winProb, setIndex === decidingSetIndex);
    sets.push(set);
    if (set.won) teamSets += 1;
    else oppSets += 1;
  }

  return {
    won: teamSets > oppSets,
    teamSets,
    oppSets,
    sets,
    scoreLine: `${teamSets}-${oppSets}`
  };
}

function computeVaristyPowerForMatch(currentState, week, opponent, lineupIds = null) {
  const varsity = getVarsityPlayers(currentState);
  const rosterPower = computeRosterPower(varsity);
  const activeLineupIds = lineupIds && lineupIds.length ? lineupIds : varsity.slice(0, 6).map((player) => player.id);
  const captainEffect = calculateCaptainEffect(currentState, "varsity", varsity, activeLineupIds);
  const lineupDelta = (lineupPower(varsity, activeLineupIds) - rosterPower) / 2.8;
  const profile = deriveTeamProfileFromRoster(currentState);
  const teamNode = userTeamInfo(currentState);
  teamNode.profile = profile;
  teamNode.strength = Math.round(rosterPower);

  const weeklyEffects = evaluateWeeklyEffects(currentState, week, opponent.id);
  const chemistryBoost = (currentState.team.chemistry - 55) / 7;
  const focusBonus = weeklyEffects.teamBonus;
  const upgradeBonus =
    currentState.career.upgrades.training * 0.7 +
    currentState.career.upgrades.gameplan * 0.45 +
    currentState.career.upgrades.culture * 0.2;
  const homeBonus = 0.8;

  return {
    base: rosterPower + chemistryBoost + focusBonus + upgradeBonus + homeBonus + captainEffect + lineupDelta,
    weeklyEffects,
    varsity,
    captainEffect,
    lineupDelta,
    lineupIds: activeLineupIds
  };
}

function grantExperienceForMatch(players, won, impactMagnitude, trainingLevel) {
  for (const player of players) {
    const base = won ? 8 : 4;
    const situational = Math.round(impactMagnitude + playerOverall(player) / 34 + randomInt(0, 3));
    const gained = base + situational;
    player.xp += gained;
    player.seasonStats.setsPlayed += randomInt(2, 5);
    player.seasonStats.impact += Math.round(impactMagnitude * 10 + randomInt(0, 7));

    while (player.xp >= 100) {
      player.xp -= 100;
      const growthBudget = 1 + Math.floor((player.potential - playerOverall(player)) / 18) + Math.floor(trainingLevel / 2);
      let growthSpent = growthBudget;
      const orderedSkills = shuffle(SKILLS);
      for (const skill of orderedSkills) {
        if (growthSpent <= 0) break;
        player[skill] = clamp(player[skill] + 1, 30, 99);
        growthSpent -= 1;
      }
      player.morale = clamp(player.morale + (won ? 3 : 1), 30, 99);
    }
  }
}

function buildLeagueMatchContext(draft, week, match, opponent, pregame) {
  const gameplan = pregame?.gameplan || match.gameplan || "balanced";
  const lineupIds = pregame?.lineupIds || getVarsityPlayers(draft).slice(0, 6).map((player) => player.id);
  const teamContext = computeVaristyPowerForMatch(draft, week, opponent, lineupIds);
  const gameplanBonus = computeCounterKnowledgeBonus(draft, week, opponent, gameplan);
  let teamPower = teamContext.base + gameplanBonus;

  const targetId = week.energyTargetPlayerId;
  if ((week.energy?.individual || 0) > 0 && targetId) {
    const targetPlayer = teamContext.varsity.find((player) => player.id === targetId);
    if (targetPlayer) {
      teamPower += teamContext.weeklyEffects.individualBonus;
    }
  }

  const opponentIntel = draft.season.opponentIntel?.[opponent.id];
  const opponentKnowledgeBoost = (opponentIntel?.yourExposure || 0) / 35;
  const opponentPower = opponent.strength + randomInt(-3, 3) + (match.home ? -0.6 : 0.8) + opponentKnowledgeBoost;
  return {
    teamContext,
    teamPower,
    opponentPower,
    gameplanBonus,
    gameplan,
    lineupIds
  };
}

function calculateLeagueRankingGain({ won, opponentStrength, teamPower, home, teamSets, oppSets }) {
  const resultBase = won ? 7 : 2;
  const difficultyTerm = clamp((opponentStrength - teamPower) / 2.8, -2, 6);
  const roadTerm = home ? 0 : 1.4;
  const setMargin = teamSets - oppSets;
  const marginTerm = won ? clamp(setMargin * 0.9, 0.4, 2.4) : clamp(setMargin * 0.5, -1.8, 0);
  return Math.max(0, Math.round(resultBase + difficultyTerm + roadTerm + marginTerm));
}

function applyWeeklyDevelopmentEffects(draft, week, teamContext) {
  if ((week.energy?.team || 0) > 0) {
    draft.team.chemistry = clamp(draft.team.chemistry + teamContext.weeklyEffects.chemistryDelta, 20, 99);
  }
  if ((week.energy?.individual || 0) > 0 && week.energyTargetPlayerId) {
    const target = draft.program.rosterPlayers.find((player) => player.id === week.energyTargetPlayerId);
    if (target) {
      const targetSkill = randomChoice(SKILLS);
      const growth = 1 + Math.floor((week.energy.individual / 100) * 3) + Math.floor(draft.career.upgrades.training / 3);
      target[targetSkill] = clamp(target[targetSkill] + growth, 30, 99);
      target.morale = clamp(target.morale + 2, 20, 99);
    }
  }
}

function completeLeagueMatch(
  draft,
  week,
  match,
  opponent,
  context,
  varsityResult,
  metadata = {}
) {
  const jvPlayers = getJvPlayers(draft);
  const jvCaptainEffect = calculateCaptainEffect(draft, "jv", jvPlayers);
  const jvPower = computeRosterPower(jvPlayers) + draft.career.upgrades.training * 0.4 + jvCaptainEffect;
  const jvOpponentPower = clamp(opponent.strength - 6 + randomInt(-4, 4), 35, 96);
  const jvResult = simulateBestOfFive(jvPower, jvOpponentPower, 2);

  grantExperienceForMatch(
    context.teamContext.varsity,
    varsityResult.won,
    Math.abs(context.teamPower - context.opponentPower) / 5 + 1,
    draft.career.upgrades.training
  );
  grantExperienceForMatch(
    jvPlayers,
    jvResult.won,
    Math.abs(jvPower - jvOpponentPower) / 5 + 0.8,
    draft.career.upgrades.training
  );

  applyWeeklyDevelopmentEffects(draft, week, context.teamContext);

  if (varsityResult.won) {
    draft.season.record.varsityWins += 1;
    draft.season.record.leagueWins += 1;
    draft.team.chemistry = clamp(draft.team.chemistry + 1, 18, 99);
  } else {
    draft.season.record.varsityLosses += 1;
    draft.season.record.leagueLosses += 1;
    draft.team.chemistry = clamp(draft.team.chemistry - 1, 18, 99);
  }

  if (jvResult.won) draft.season.record.jvWins += 1;
  else draft.season.record.jvLosses += 1;

  applyLeagueResultToStandings(
    draft.season.leagueStandings,
    "user_team",
    opponent.id,
    varsityResult.won,
    varsityResult.teamSets,
    varsityResult.oppSets
  );

  const rankingGain = calculateLeagueRankingGain({
    won: varsityResult.won,
    opponentStrength: opponent.strength,
    teamPower: context.teamPower,
    home: match.home,
    teamSets: varsityResult.teamSets,
    oppSets: varsityResult.oppSets
  });
  draft.season.rankingPoints += rankingGain;

  const played = {
    id: match.id,
    weekId: week.id,
    type: "league",
    opponentId: opponent.id,
    opponentName: `${opponent.schoolName} ${opponent.mascot}`,
    home: match.home,
    varsity: varsityResult,
    jv: jvResult,
    gameplan: context.gameplan,
    lineupIds: context.lineupIds,
    rankingGain,
    opponentStrength: opponent.strength,
    dateIndex: draft.season.matchesPlayed.length + 1,
    live: metadata.live || null
  };

  match.status = "played";
  match.live = null;
  match.result = played;
  draft.season.matchesPlayed.push(played);

  const allPlayed = week.matches.every((candidate) => candidate.status === "played");
  if (allPlayed) {
    week.status = "completed";
    week.summary = summarizeWeek(week);
  }

  return played;
}

function createLiveSet(setIndex, teamSets, oppSets, setsToWin = 3) {
  return {
    setIndex,
    target: teamSets === setsToWin - 1 && oppSets === setsToWin - 1 ? 15 : 25,
    team: 0,
    opp: 0
  };
}

function createLiveMatchSession(match, context, opponent, pregame) {
  const lineupIds = [...(pregame?.lineupIds || [])];
  return {
    teamPower: context.teamPower,
    opponentPower: context.opponentPower,
    gameplan: context.gameplan,
    lineupIds,
    benchIds: (pregame?.benchIds || []).filter((id) => !lineupIds.includes(id)),
    opponentName: `${opponent.schoolName} ${opponent.mascot}`,
    serving: Math.random() < 0.5 ? "team" : "opp",
    rotationIndexTeam: 0,
    rotationIndexOpp: 0,
    setsToWin: 3,
    setsWonTeam: 0,
    setsWonOpp: 0,
    currentSet: createLiveSet(1, 0, 0, 3),
    setScores: [],
    rallyCount: 0,
    activeBoosts: [],
    scenario: null,
    scenarioLog: [],
    finished: false
  };
}

function liveSetComplete(live) {
  const { team, opp, target } = live.currentSet;
  return (team >= target || opp >= target) && Math.abs(team - opp) >= 2;
}

function advanceLiveSet(live) {
  const won = live.currentSet.team > live.currentSet.opp;
  if (won) live.setsWonTeam += 1;
  else live.setsWonOpp += 1;
  live.setScores.push({
    team: live.currentSet.team,
    opp: live.currentSet.opp,
    won
  });
  if (live.setsWonTeam >= live.setsToWin || live.setsWonOpp >= live.setsToWin) {
    live.finished = true;
    return;
  }
  live.currentSet = createLiveSet(live.setScores.length + 1, live.setsWonTeam, live.setsWonOpp, live.setsToWin);
}

function liveRallyWinProbability(live) {
  const tempTeam = live.activeBoosts.reduce((sum, boost) => sum + (boost.team || 0), 0);
  const tempOpp = live.activeBoosts.reduce((sum, boost) => sum + (boost.opp || 0), 0);
  const setDiff = (live.setsWonTeam - live.setsWonOpp) * 0.08;
  const pointDiff = (live.currentSet.team - live.currentSet.opp) * 0.02;
  const raw = (live.teamPower + tempTeam - (live.opponentPower + tempOpp)) / 14 + setDiff - pointDiff;
  return clamp(logistic(raw), 0.12, 0.88);
}

function decayLiveBoosts(live) {
  live.activeBoosts = (live.activeBoosts || [])
    .map((boost) => ({ ...boost, ralliesLeft: boost.ralliesLeft - 1 }))
    .filter((boost) => boost.ralliesLeft > 0);
}

function maybeRotateAfterSideout(live, winner) {
  if (winner === live.serving) return;
  live.serving = winner;
  if (winner === "team") {
    live.rotationIndexTeam = (live.rotationIndexTeam + 1) % Math.max(live.lineupIds.length, 1);
  } else {
    live.rotationIndexOpp = (live.rotationIndexOpp + 1) % 6;
  }
}

function averageSkill(players, key) {
  if (!players.length) return 50;
  return players.reduce((sum, player) => sum + (player[key] || 50), 0) / players.length;
}

function generateLiveScenario(draft, week, match) {
  const intel = draft.season.opponentIntel?.[match.opponentId];
  const lineup = getVarsityPlayers(draft).filter((player) => match.live.lineupIds.includes(player.id));
  const bench = getVarsityPlayers(draft).filter((player) => match.live.benchIds.includes(player.id));
  const coachRead = draft.career.upgrades.gameplan + draft.career.upgrades.scouting;
  const scoutEnergy = week.energy?.scouting || 0;
  const awareness = averageSkill(lineup, "awareness");
  const resilience = averageSkill(lineup, "resilience");
  const leadership = averageSkill(lineup, "leadership");
  const intelligenceFactor = ((intel?.knowledge || 0) / 100) + scoutEnergy / 100 + coachRead / 10;

  const scenarioTypeRoll = Math.random();
  if (scenarioTypeRoll < 0.33) {
    const readBonus = clamp(-0.3 + intelligenceFactor * 1.4, -0.4, 1.8);
    return {
      id: `scn-${Date.now()}-${randomInt(1, 999)}`,
      title: "Opponent Shift Spotted",
      body: "Their setter changed tempo and is forcing your block to react late.",
      options: [
        {
          id: "scout-adjust",
          label: "Use scout cue and hard switch block assignment",
          impact: { team: readBonus, opp: -0.25, rallies: 4 }
        },
        {
          id: "stay-steady",
          label: "Stay in current scheme",
          impact: { team: 0, opp: 0.1, rallies: 3 }
        },
        {
          id: "overcommit",
          label: "Overload to the hot hitter",
          impact: { team: -0.25, opp: 0.25, rallies: 3 }
        }
      ]
    };
  }

  if (scenarioTypeRoll < 0.66 || bench.length < 2) {
    const calmBonus = clamp((resilience + leadership - 118) / 20 + draft.career.upgrades.culture * 0.1, -0.4, 1.5);
    return {
      id: `scn-${Date.now()}-${randomInt(1, 999)}`,
      title: "Momentum Swing",
      body: "You lost two long rallies and the gym got loud.",
      options: [
        {
          id: "captain-huddle",
          label: "Call captain-led huddle",
          impact: { team: calmBonus, opp: 0, rallies: 4 }
        },
        {
          id: "coach-push",
          label: "Challenge them with aggressive serve pressure",
          impact: { team: 0.5, opp: 0.2, rallies: 3 }
        },
        {
          id: "play-through",
          label: "Play through it",
          impact: { team: -0.2, opp: 0.2, rallies: 3 }
        }
      ]
    };
  }

  const sortedBench = [...bench].sort((a, b) => playerOverall(b) - playerOverall(a)).slice(0, 3);
  const bestId = sortedBench[0].id;
  return {
    id: `scn-${Date.now()}-${randomInt(1, 999)}`,
    title: "Bench Spark Decision",
    body: "You can insert one bench player for a short tactical stretch.",
    options: sortedBench.map((player) => ({
      id: `bench-${player.id}`,
      label: `Insert ${player.name} (OVR ${playerOverall(player)})`,
      impact: {
        team: player.id === bestId ? 1 : playerOverall(player) > playerOverall(sortedBench[sortedBench.length - 1]) ? 0.3 : -0.35,
        opp: 0,
        rallies: 4
      },
      swapInId: player.id
    }))
  };
}

function applyLiveScenarioChoice(draft, week, match, optionId) {
  const live = match.live;
  if (!live?.scenario) return { ok: false, message: "No active scenario." };
  const option = live.scenario.options.find((candidate) => candidate.id === optionId);
  if (!option) return { ok: false, message: "Invalid scenario option." };
  const impact = option.impact || {};
  live.activeBoosts.push({
    team: impact.team || 0,
    opp: impact.opp || 0,
    ralliesLeft: impact.rallies || 3
  });
  if (option.swapInId) {
    const lineupIds = [...live.lineupIds];
    const outIndex = lineupIds.length - 1;
    const swapOutId = lineupIds[outIndex];
    lineupIds[outIndex] = option.swapInId;
    live.lineupIds = lineupIds;
    live.benchIds = [...new Set([...live.benchIds.filter((id) => id !== option.swapInId), swapOutId])];
  }
  live.scenarioLog.push({ title: live.scenario.title, option: option.label });
  live.scenario = null;
  return { ok: true, message: option.label };
}

function maybeSpawnLiveScenario(draft, week, match) {
  const live = match.live;
  if (live.finished || live.scenario) return;
  const scoutingPct = week.energy?.scouting || 0;
  const baseChance = 0.18 + (100 - scoutingPct) / 450;
  if (live.rallyCount > 0 && live.rallyCount % 7 === 0 && Math.random() < baseChance) {
    live.scenario = generateLiveScenario(draft, week, match);
  }
}

function runLiveRally(draft, week, match) {
  const live = match.live;
  if (live.finished) return { ok: false, message: "Match already complete." };
  if (live.scenario) return { ok: false, message: "Resolve the scenario before continuing." };
  const probability = liveRallyWinProbability(live);
  const teamWinsRally = Math.random() < probability;
  if (teamWinsRally) live.currentSet.team += 1;
  else live.currentSet.opp += 1;

  maybeRotateAfterSideout(live, teamWinsRally ? "team" : "opp");
  live.rallyCount += 1;
  decayLiveBoosts(live);

  const endedSet = liveSetComplete(live);
  if (endedSet) {
    advanceLiveSet(live);
  }
  if (!live.finished) {
    maybeSpawnLiveScenario(draft, week, match);
  }

  return {
    ok: true,
    rallyWon: teamWinsRally,
    endedSet,
    finished: live.finished,
    scenario: Boolean(live.scenario)
  };
}

function autoplayCurrentSet(draft, week, match) {
  const live = match.live;
  let rallies = 0;
  const setIndex = live.currentSet.setIndex;
  while (!live.finished && live.currentSet.setIndex === setIndex && rallies < 150) {
    const step = runLiveRally(draft, week, match);
    if (step.scenario && live.scenario) {
      const best = [...live.scenario.options].sort((a, b) => (b.impact?.team || 0) - (a.impact?.team || 0))[0];
      applyLiveScenarioChoice(draft, week, match, best.id);
    }
    rallies += 1;
  }
  return { ok: true };
}

function autoplayEntireLiveMatch(draft, week, match) {
  const live = match.live;
  let safety = 0;
  while (!live.finished && safety < 800) {
    const step = runLiveRally(draft, week, match);
    if (step.scenario && live.scenario) {
      const sorted = [...live.scenario.options].sort((a, b) => (b.impact?.team || 0) - (a.impact?.team || 0));
      const pickIndex = randomInt(0, Math.min(1, sorted.length - 1));
      applyLiveScenarioChoice(draft, week, match, sorted[pickIndex].id);
    }
    safety += 1;
  }
  return { ok: true };
}

function finalizeLiveResult(draft, week, match, opponent, context) {
  const live = match.live;
  const varsityResult = {
    won: live.setsWonTeam > live.setsWonOpp,
    teamSets: live.setsWonTeam,
    oppSets: live.setsWonOpp,
    sets: live.setScores.map((set) => ({
      team: set.team,
      opp: set.opp,
      won: set.won
    })),
    scoreLine: `${live.setsWonTeam}-${live.setsWonOpp}`
  };
  const played = completeLeagueMatch(draft, week, match, opponent, context, varsityResult, {
    live: {
      rallies: live.rallyCount,
      scenarios: live.scenarioLog.length
    }
  });
  return played;
}

function playLeagueMatch(draft, weekId, matchId) {
  const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
  if (!week || week.kind !== "league" || !week.focusLocked) {
    return { ok: false, message: "Lock your weekly energy plan before playing matches." };
  }
  const match = week.matches.find((candidate) => candidate.id === matchId);
  if (!match || match.status === "played") {
    return { ok: false, message: "Match already completed." };
  }
  if (match.status === "pregame") {
    return { ok: false, message: "Finish this match setup first." };
  }
  if (match.status === "live") {
    return { ok: false, message: "This match is already in progress." };
  }
  if (week.matches.some((candidate) => candidate.status === "live")) {
    return { ok: false, message: "Finish the current live match before starting another." };
  }

  applyWeeklyEnergyScouting(draft, week);
  const varsity = getVarsityPlayers(draft).sort((a, b) => playerOverall(b) - playerOverall(a));
  const defaultLineup = varsity.slice(0, 6).map((player) => player.id);
  const bench = varsity.slice(6).map((player) => player.id);
  match.status = "pregame";
  match.pregame = {
    gameplan: "balanced",
    lineupIds: defaultLineup,
    benchIds: bench
  };
  return { ok: true, pregameOpened: true, message: `Match prep opened vs ${match.opponentName}.` };
}

function lockMatchPregame(draft, weekId, matchId) {
  const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
  if (!week || week.kind !== "league") return { ok: false, message: "Week not found." };
  const match = week.matches.find((candidate) => candidate.id === matchId);
  if (!match || match.status !== "pregame" || !match.pregame) {
    return { ok: false, message: "No pregame setup to lock." };
  }
  const lineupIds = match.pregame.lineupIds || [];
  if (lineupIds.length !== 6) {
    return { ok: false, message: "Select exactly 6 starters before locking pregame." };
  }
  const opponent = findTeamById(draft, match.opponentId);
  const context = buildLeagueMatchContext(draft, week, match, opponent, match.pregame);
  match.gameplan = match.pregame.gameplan;
  match.status = "live";
  match.live = createLiveMatchSession(match, context, opponent, match.pregame);
  gainOpponentIntel(draft, opponent.id, 6 + Math.floor((week.energy?.scouting || 0) / 16), "Pregame film study");
  return { ok: true, liveStarted: true, message: `Live match started vs ${match.opponentName}.` };
}

function runLiveMatchAction(draft, weekId, matchId, action) {
  const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
  if (!week || week.kind !== "league") return { ok: false, message: "Week not found." };
  const match = week.matches.find((candidate) => candidate.id === matchId);
  if (!match || match.status !== "live" || !match.live) return { ok: false, message: "No live match found." };

  const opponent = findTeamById(draft, match.opponentId);
  const context = {
    teamContext: computeVaristyPowerForMatch(draft, week, opponent, match.live.lineupIds),
    teamPower: match.live.teamPower,
    opponentPower: match.live.opponentPower,
    gameplan: match.live.gameplan,
    lineupIds: match.live.lineupIds
  };
  if (action.startsWith("scenario:")) {
    const optionId = action.slice("scenario:".length);
    const applied = applyLiveScenarioChoice(draft, week, match, optionId);
    if (!applied.ok) return applied;
    return { ok: true, message: `Scenario choice: ${applied.message}.` };
  }

  if (action === "autoplay-set") {
    autoplayCurrentSet(draft, week, match);
  } else if (action === "finish") {
    autoplayEntireLiveMatch(draft, week, match);
  } else {
    const step = runLiveRally(draft, week, match);
    if (!step.ok) return step;
  }

  if (match.live.finished) {
    gainOpponentIntel(
      draft,
      opponent.id,
      12 + Math.floor((week.energy?.scouting || 0) / 10) + (match.live.setsWonTeam > match.live.setsWonOpp ? 2 : 0),
      "Match film completed"
    );
    const intel = draft.season.opponentIntel?.[opponent.id];
    if (intel) {
      intel.gamesSeen += 1;
      intel.yourExposure = clamp(intel.yourExposure + randomInt(4, 11), 0, 100);
    }
    const played = finalizeLiveResult(draft, week, match, opponent, context);
    return {
      ok: true,
      completed: true,
      played,
      message: `Live match complete: Varsity ${played.varsity.scoreLine}.`
    };
  }

  if (match.live.scenario) {
    return {
      ok: true,
      completed: false,
      scenario: match.live.scenario,
      message: `Scenario: ${match.live.scenario.title}`
    };
  }

  return {
    ok: true,
    completed: false,
    message: `Set ${match.live.currentSet.setIndex}: ${match.live.currentSet.team}-${match.live.currentSet.opp}`
  };
}

function summarizeWeek(week) {
  if (week.kind === "tournament") {
    if (!week.summary) return "Tournament pending.";
    return week.summary;
  }
  const wins = week.matches.filter((match) => match.result?.varsity?.won).length;
  const losses = week.matches.length - wins;
  return `Varsity went ${wins}-${losses} this week.`;
}

function simulateAiMatch(strengthA, strengthB) {
  const probabilityA = logistic((strengthA - strengthB) / 11);
  return Math.random() < probabilityA;
}

function simulateRoundRobinPool(teams) {
  const records = new Map();
  for (const team of teams) {
    records.set(team.id, {
      id: team.id,
      team,
      wins: 0,
      losses: 0,
      pointsDelta: 0,
      games: []
    });
  }

  for (let i = 0; i < teams.length; i += 1) {
    for (let j = i + 1; j < teams.length; j += 1) {
      const teamA = teams[i];
      const teamB = teams[j];
      const aWon = simulateAiMatch(teamA.strength, teamB.strength);
      const setScore = aWon ? "2-0" : "0-2";
      const delta = aWon ? randomInt(4, 13) : -randomInt(4, 13);
      const recA = records.get(teamA.id);
      const recB = records.get(teamB.id);
      if (aWon) {
        recA.wins += 1;
        recB.losses += 1;
      } else {
        recB.wins += 1;
        recA.losses += 1;
      }
      recA.pointsDelta += delta;
      recB.pointsDelta -= delta;
      recA.games.push({ opponent: teamB.id, score: setScore });
      recB.games.push({ opponent: teamA.id, score: aWon ? "2-0" : "0-2" });
    }
  }

  return [...records.values()].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.pointsDelta !== a.pointsDelta) return b.pointsDelta - a.pointsDelta;
    return b.team.strength - a.team.strength;
  });
}

function generateTournamentField(draft, tournament) {
  const varsity = getVarsityPlayers(draft);
  const captainEffect = calculateCaptainEffect(draft, "varsity", varsity);
  const userStrength = Math.round(computeRosterPower(varsity) + captainEffect + draft.career.divisionIndex * 2);
  const userTeam = {
    id: "user_team",
    name: `${draft.career.schoolName} ${draft.career.mascot}`,
    strength: userStrength,
    profile: deriveTeamProfileFromRoster(draft)
  };

  const field = [userTeam];
  for (let i = 0; i < 15; i += 1) {
    const strength = clamp(tournament.difficulty + randomInt(-12, 11), 42, 98);
    field.push({
      id: `tour_${tournament.id}_${i}`,
      name: `${randomChoice(SCHOOL_PREFIX)} ${randomChoice(MASCOTS)}`,
      strength,
      profile: {
        offense: clamp(strength + randomInt(-6, 6), 35, 99),
        defense: clamp(strength + randomInt(-6, 6), 35, 99),
        serveReceive: clamp(strength + randomInt(-6, 6), 35, 99),
        block: clamp(strength + randomInt(-6, 6), 35, 99),
        tempo: clamp(strength + randomInt(-6, 6), 35, 99)
      }
    });
  }

  return shuffle(field);
}

function simulateBracket(entries, label) {
  const results = [];
  let current = entries;
  let round = label === "gold" ? "Quarterfinal" : "Semifinal";

  while (current.length > 1) {
    const next = [];
    for (let i = 0; i < current.length; i += 2) {
      const a = current[i];
      const b = current[i + 1];
      const aWon = simulateAiMatch(a.strength, b.strength);
      const winner = aWon ? a : b;
      const loser = aWon ? b : a;
      next.push(winner);
      results.push({ round, winner: winner.id, loser: loser.id, matchup: `${a.name} vs ${b.name}` });
    }
    current = next;
    if (current.length === 4) round = "Semifinal";
    else if (current.length === 2) round = "Final";
    else round = "Champion";
  }

  return {
    champion: current[0],
    games: results
  };
}

function simulateTournamentWeek(draft, weekId) {
  const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
  if (!week || week.kind !== "tournament" || !week.focusLocked || week.status === "completed") {
    return { ok: false, message: "Lock your weekly energy plan first and run this tournament once." };
  }

  const tournament = findTournamentById(week.tournamentId);
  if (!tournament) {
    return { ok: false, message: "Tournament selection is invalid." };
  }
  applyWeeklyEnergyScouting(draft, week);

  const field = generateTournamentField(draft, tournament);
  const pools = [field.slice(0, 4), field.slice(4, 8), field.slice(8, 12), field.slice(12, 16)];

  const poolStandings = pools.map((pool) => simulateRoundRobinPool(pool));

  const gold = [];
  const silver = [];
  const bronze = [];

  for (const standing of poolStandings) {
    gold.push(standing[0].team, standing[1].team);
    silver.push(standing[2].team);
    bronze.push(standing[3].team);
  }

  const goldBracket = simulateBracket(shuffle(gold), "gold");
  const silverBracket = simulateBracket(shuffle(silver), "silver");
  const bronzeBracket = simulateBracket(shuffle(bronze), "bronze");

  const userPool = poolStandings.find((standing) => standing.some((entry) => entry.id === "user_team"));
  const userPoolRank = userPool.findIndex((entry) => entry.id === "user_team") + 1;
  const userBracket = userPoolRank <= 2 ? "Gold" : userPoolRank === 3 ? "Silver" : "Bronze";

  const bracketGames =
    userBracket === "Gold"
      ? goldBracket.games
      : userBracket === "Silver"
        ? silverBracket.games
        : bronzeBracket.games;

  const userGames = bracketGames.filter((game) => game.winner === "user_team" || game.loser === "user_team");
  const userBracketWins = userGames.filter((game) => game.winner === "user_team").length;
  const userBracketLosses = userGames.filter((game) => game.loser === "user_team").length;

  const userPoolWins = userPool[userPoolRank - 1].wins;
  const userPoolLosses = userPool[userPoolRank - 1].losses;

  const totalWins = userPoolWins + userBracketWins;
  const totalLosses = userPoolLosses + userBracketLosses;

  const placementMap = {
    Gold: ["Gold Champion", "Gold Finalist", "Gold Semifinal"],
    Silver: ["Silver Champion", "Silver Finalist"],
    Bronze: ["Bronze Champion", "Bronze Finalist"]
  };

  let finishLabel = `${userBracket} Participant`;
  if (userGames.length) {
    const finalistLoss = userGames.some((game) => game.round === "Final" && game.loser === "user_team");
    const championWin = userGames.some((game) => game.round === "Final" && game.winner === "user_team");
    const semifinalLoss = userGames.some((game) => game.round === "Semifinal" && game.loser === "user_team");
    if (championWin) finishLabel = placementMap[userBracket][0] || finishLabel;
    else if (finalistLoss) finishLabel = placementMap[userBracket][1] || finishLabel;
    else if (semifinalLoss) finishLabel = placementMap[userBracket][2] || finishLabel;
  }

  const strengthEdge = tournament.difficulty - computeRosterPower(getVarsityPlayers(draft));
  const rankingGain = Math.max(
    0,
    Math.round(
      tournament.prestige * 0.7 +
        (userBracket === "Gold" ? 8 : userBracket === "Silver" ? 4 : 2) +
        totalWins * 3 -
        totalLosses +
        clamp(strengthEdge / 3, -3, 8)
    )
  );

  draft.season.record.varsityWins += totalWins;
  draft.season.record.varsityLosses += totalLosses;
  draft.season.rankingPoints += rankingGain;

  const varsity = getVarsityPlayers(draft);
  grantExperienceForMatch(
    varsity,
    totalWins > totalLosses,
    (tournament.difficulty - computeRosterPower(varsity)) / 7 + 2,
    draft.career.upgrades.training
  );

  draft.team.chemistry = clamp(
    draft.team.chemistry + (totalWins > totalLosses ? 2 : -1) + Math.floor(totalWins / 4),
    20,
    99
  );

  const result = {
    tournamentId: tournament.id,
    tournamentName: tournament.name,
    difficulty: tournament.difficulty,
    prestige: tournament.prestige,
    poolRank: userPoolRank,
    bracket: userBracket,
    finishLabel,
    wins: totalWins,
    losses: totalLosses,
    matchesPlayed: totalWins + totalLosses,
    rankingGain,
    poolTable: userPool.map((entry) => ({
      teamId: entry.id,
      name: entry.team.name,
      wins: entry.wins,
      losses: entry.losses,
      pointsDelta: entry.pointsDelta
    }))
  };

  draft.season.tournamentResults.push(result);
  draft.season.matchesPlayed.push({
    id: `T-${tournament.id}-${draft.season.tournamentResults.length}`,
    weekId,
    type: "tournament",
    opponentName: `${tournament.name} Field`,
    home: false,
    varsity: {
      won: totalWins > totalLosses,
      scoreLine: `${totalWins}-${totalLosses}`,
      teamSets: totalWins,
      oppSets: totalLosses
    },
    rankingGain,
    tournament: result
  });

  week.status = "completed";
  week.summary = `${finishLabel} (${totalWins}-${totalLosses})`;
  week.result = result;

  return { ok: true, result };
}

function allWeekMatchesComplete(week) {
  if (!week) return false;
  if (week.kind === "tournament") {
    return week.status === "completed";
  }
  return week.matches.every((match) => match.status === "played");
}

function advanceWeek(draft) {
  const week = draft.season.weeks[draft.season.weekIndex];
  if (!week) return { ok: false, message: "No current week." };
  if (!allWeekMatchesComplete(week)) {
    return { ok: false, message: "Finish all matches/events first." };
  }
  if (week.kind === "league") {
    simulateBackgroundLeagueWeek(draft, week);
  }
  for (const intel of Object.values(draft.season.opponentIntel || {})) {
    intel.knowledge = clamp(intel.knowledge + 1.5 + draft.career.upgrades.scouting * 0.2, 0, 100);
    refreshIntelUnlocks(intel);
  }
  week.status = "completed";
  draft.season.weekIndex += 1;

  if (draft.season.weekIndex >= draft.season.weeks.length) {
    draft.phase = "postseason";
    buildPostseason(draft);
    return { ok: true, postseason: true };
  }

  return { ok: true, postseason: false };
}

function calculateStrengthOfSchedule(draft) {
  if (!draft.season.matchesPlayed.length) return 50;
  const leagueMatches = draft.season.matchesPlayed.filter((match) => match.type === "league");
  if (!leagueMatches.length) return 50;
  const avg =
    leagueMatches.reduce((sum, match) => {
      const opp = findTeamById(draft, match.opponentId);
      return sum + (opp ? opp.strength : 50);
    }, 0) / leagueMatches.length;
  return Math.round(avg + draft.season.tournamentResults.length * 2.5);
}

function generateTeamSeasonLine(team, draft) {
  const divisionBase = 52 + draft.career.divisionIndex * 6;
  const strengthEdge = team.strength - divisionBase;
  const wins = clamp(Math.round(12 + strengthEdge * 0.52 + randomInt(-4, 5)), 4, 27);
  const losses = clamp(MAX_MATCHES_PER_SEASON - wins, 3, 26);
  const leagueWins = clamp(Math.round(6 + strengthEdge * 0.33 + randomInt(-3, 3)), 2, 17);
  const leagueLosses = 18 - clamp(leagueWins, 1, 18);
  const sos = clamp(Math.round(45 + team.strength * 0.5 + randomInt(-5, 5)), 35, 98);
  const qualityWins = clamp(Math.round((wins * 0.42 + (team.strength - 60) / 6 + randomInt(-1, 2))), 0, wins);
  const badLosses = clamp(Math.round((losses * 0.28 + (63 - team.strength) / 8 + randomInt(-1, 1))), 0, losses);
  const tournamentBoost = clamp(Math.round((team.strength - 52) / 3 + randomInt(-2, 3)), -2, 20);
  const winPct = wins / Math.max(wins + losses, 1);
  const ratingScore =
    winPct * 58 +
    sos * 0.34 +
    qualityWins * 2.6 +
    tournamentBoost * 0.7 -
    badLosses * 1.9;
  return {
    teamId: team.id,
    teamName: `${team.schoolName} ${team.mascot}`,
    leagueIndex: team.leagueIndex,
    wins,
    losses,
    leagueWins,
    leagueLosses,
    sos,
    winPct,
    qualityWins,
    badLosses,
    tournamentBoost,
    ratingScore,
    strength: team.strength,
    isUser: team.id === "user_team"
  };
}

function buildUserResumeMetrics(draft) {
  const matches = draft.season.matchesPlayed.filter((match) => match.type === "league");
  const wins = matches.filter((match) => match.varsity.won).length;
  const losses = matches.length - wins;
  const qualityWins = matches.filter((match) => match.varsity.won && match.opponentStrength >= RESUME_QUALITY_WIN_STRENGTH).length;
  const badLosses = matches.filter((match) => !match.varsity.won && match.opponentStrength <= RESUME_BAD_LOSS_STRENGTH).length;
  const tournamentBoost = draft.season.tournamentResults.reduce(
    (sum, result) => sum + result.prestige + (result.bracket === "Gold" ? 4 : result.bracket === "Silver" ? 2 : 0),
    0
  );
  const sos = calculateStrengthOfSchedule(draft);
  const totalWins = draft.season.record.varsityWins;
  const totalLosses = draft.season.record.varsityLosses;
  const winPct = totalWins / Math.max(totalWins + totalLosses, 1);
  const ratingScore =
    winPct * 58 +
    sos * 0.34 +
    qualityWins * 2.6 +
    tournamentBoost * 0.18 +
    draft.season.rankingPoints * 0.16 -
    badLosses * 1.9;

  return {
    winPct,
    qualityWins,
    badLosses,
    tournamentBoost,
    sos,
    ratingScore
  };
}

function buildSectionalField(teamLines) {
  const grouped = LEAGUE_NAMES.map((_, index) => teamLines.filter((line) => line.leagueIndex === index));
  const leagueWinners = grouped.map(
    (group) =>
      [...group].sort((a, b) => {
        if (b.leagueWins !== a.leagueWins) return b.leagueWins - a.leagueWins;
        return b.ratingScore - a.ratingScore;
      })[0]
  );
  const winnerIds = new Set(leagueWinners.map((winner) => winner.teamId));

  const atLarge = teamLines
    .filter((line) => !winnerIds.has(line.teamId))
    .sort((a, b) => {
      if (b.ratingScore !== a.ratingScore) return b.ratingScore - a.ratingScore;
      if (b.qualityWins !== a.qualityWins) return b.qualityWins - a.qualityWins;
      return b.sos - a.sos;
    })
    .slice(0, 8);

  const field = [...leagueWinners, ...atLarge]
    .sort((a, b) => {
      if (b.ratingScore !== a.ratingScore) return b.ratingScore - a.ratingScore;
      if (b.qualityWins !== a.qualityWins) return b.qualityWins - a.qualityWins;
      return b.sos - a.sos;
    })
    .map((entry, index) => ({ ...entry, seed: index + 1 }));

  return { field, leagueWinners, atLarge };
}

function simulatePlayoffMatch(teamA, teamB) {
  const powerA = teamA.strength + teamA.sos / 10;
  const powerB = teamB.strength + teamB.sos / 10;
  const aWins = simulateAiMatch(powerA, powerB);
  return aWins ? teamA : teamB;
}

function runSectionalBracket(field) {
  const bySeed = [...field].sort((a, b) => a.seed - b.seed);
  const r1 = [
    [bySeed[4], bySeed[11]],
    [bySeed[5], bySeed[10]],
    [bySeed[6], bySeed[9]],
    [bySeed[7], bySeed[8]]
  ];

  const r1Winners = r1.map(([a, b]) => simulatePlayoffMatch(a, b));
  const quarterPairs = [
    [bySeed[0], r1Winners[3]],
    [bySeed[1], r1Winners[2]],
    [bySeed[2], r1Winners[1]],
    [bySeed[3], r1Winners[0]]
  ];
  const qfWinners = quarterPairs.map(([a, b]) => simulatePlayoffMatch(a, b));

  const semiPairs = [
    [qfWinners[0], qfWinners[1]],
    [qfWinners[2], qfWinners[3]]
  ];
  const semifinalWinners = semiPairs.map(([a, b]) => simulatePlayoffMatch(a, b));

  const champion = simulatePlayoffMatch(semifinalWinners[0], semifinalWinners[1]);
  const runnerUp = champion.teamId === semifinalWinners[0].teamId ? semifinalWinners[1] : semifinalWinners[0];

  return {
    roundOne: r1,
    quarterPairs,
    semiPairs,
    finalists: [semifinalWinners[0], semifinalWinners[1]],
    champion,
    runnerUp
  };
}

function runStatePlayoffs(userLine) {
  const stateField = [];
  stateField.push({ ...userLine, seed: 1 });
  for (let i = 0; i < 15; i += 1) {
    const strength = clamp(72 + randomInt(-9, 13), 50, 99);
    const wins = clamp(20 + randomInt(-4, 7), 13, 32);
    stateField.push({
      teamId: `state_${i}`,
      teamName: `${randomChoice(SCHOOL_PREFIX)} ${randomChoice(MASCOTS)}`,
      strength,
      sos: clamp(58 + randomInt(-6, 10), 35, 99),
      wins,
      losses: clamp(34 - wins, 2, 17)
    });
  }

  const seeded = stateField
    .sort((a, b) => b.strength + b.sos / 10 - (a.strength + a.sos / 10))
    .map((entry, index) => ({ ...entry, seed: index + 1 }));

  let current = seeded;
  let userAlive = true;
  const rounds = ["Round of 16", "Quarterfinal", "Semifinal", "Final"];
  let roundIndex = 0;
  let userRoundReached = "Round of 16";
  while (current.length > 1) {
    const next = [];
    for (let i = 0; i < current.length; i += 2) {
      const winner = simulatePlayoffMatch(current[i], current[i + 1]);
      next.push(winner);
      if (userAlive) {
        const involved = [current[i].teamId, current[i + 1].teamId].includes("user_team");
        if (involved && winner.teamId !== "user_team") {
          userAlive = false;
          userRoundReached = rounds[roundIndex];
        }
      }
    }
    current = next;
    roundIndex += 1;
  }

  if (userAlive) {
    userRoundReached = "State Champion";
  }

  return {
    roundReached: userRoundReached,
    champion: current[0]
  };
}

function buildPostseason(draft) {
  const lines = [];
  for (const league of draft.world.leagues) {
    for (const team of league.teams) {
      lines.push(generateTeamSeasonLine(team, draft));
    }
  }

  const userLine = lines.find((line) => line.teamId === "user_team");
  userLine.wins = draft.season.record.varsityWins;
  userLine.losses = draft.season.record.varsityLosses;
  userLine.leagueWins = draft.season.record.leagueWins;
  userLine.leagueLosses = draft.season.record.leagueLosses;
  const resume = buildUserResumeMetrics(draft);
  userLine.sos = resume.sos;
  userLine.winPct = resume.winPct;
  userLine.qualityWins = resume.qualityWins;
  userLine.badLosses = resume.badLosses;
  userLine.tournamentBoost = resume.tournamentBoost;
  userLine.ratingScore = resume.ratingScore;
  userLine.strength = Math.round(computeRosterPower(getVarsityPlayers(draft)));

  const sectional = buildSectionalField(lines);
  const bracket = runSectionalBracket(sectional.field);

  const madeSectional = sectional.field.some((entry) => entry.teamId === "user_team");
  const finalistIds = bracket.finalists.map((team) => team.teamId);
  const madeState = finalistIds.includes("user_team");

  let sectionalOutcome = "Missed Playoffs";
  if (madeSectional) {
    const champion = bracket.champion.teamId === "user_team";
    const finalist = finalistIds.includes("user_team");
    const semis = bracket.semiPairs.some(([a, b]) => a.teamId === "user_team" || b.teamId === "user_team");
    if (champion) sectionalOutcome = "Section Champion";
    else if (finalist) sectionalOutcome = "Section Finalist";
    else if (semis) sectionalOutcome = "Section Semifinal";
    else sectionalOutcome = "Section Quarterfinal";
  }

  let stateOutcome = null;
  if (madeState) {
    stateOutcome = runStatePlayoffs(userLine);
  }

  const pointsFromWins = Math.floor(draft.season.record.varsityWins / 3);
  const pointsFromSection =
    sectionalOutcome === "Section Champion"
      ? 8
      : sectionalOutcome === "Section Finalist"
        ? 6
        : sectionalOutcome === "Section Semifinal"
          ? 4
          : madeSectional
            ? 2
            : 0;
  const pointsFromState =
    stateOutcome?.roundReached === "State Champion"
      ? 8
      : stateOutcome
        ? 4
        : 0;
  const coachPointsEarned = pointsFromWins + pointsFromSection + pointsFromState + 3;

  let promoted = false;
  if (
    draft.career.divisionIndex < DIVISIONS.length - 1 &&
    (sectionalOutcome === "Section Champion" || sectionalOutcome === "Section Finalist" || (madeSectional && draft.season.record.varsityWins >= 22))
  ) {
    draft.career.divisionIndex += 1;
    promoted = true;
  }

  draft.season.postseason = {
    revealStage: 0,
    teamLines: lines,
    sectionalField: sectional.field,
    leagueWinners: sectional.leagueWinners,
    atLarge: sectional.atLarge,
    bracket,
    sectionalOutcome,
    madeSectional,
    madeState,
    stateOutcome,
    coachPointsEarned,
    promoted,
    resume,
    promotionText: promoted
      ? `Promoted to ${formatDivision(draft.career.divisionIndex)} for next year.`
      : `Remain in ${formatDivision(draft.career.divisionIndex)} next season.`
  };

  draft.career.history.push({
    seasonNumber: draft.career.seasonNumber,
    division: formatDivision(promoted ? draft.career.divisionIndex - 1 : draft.career.divisionIndex),
    wins: draft.season.record.varsityWins,
    losses: draft.season.record.varsityLosses,
    leagueWins: draft.season.record.leagueWins,
    leagueLosses: draft.season.record.leagueLosses,
    madeSectional,
    madeState,
    sectionalOutcome,
    stateOutcome: stateOutcome?.roundReached ?? "N/A",
    rankingPoints: draft.season.rankingPoints,
    resumeScore: Math.round(resume.ratingScore),
    promoted
  });
}

function enterOffseason(draft) {
  if (!draft.season.postseason) return;
  draft.phase = "offseason";
  draft.career.coachPoints += draft.season.postseason.coachPointsEarned;
  const lastHistory = draft.career.history[draft.career.history.length - 1];
  const transferInterest = clamp((lastHistory.wins - 10) / 4 + (lastHistory.madeState ? 3 : 1), 0, 6);
  const recruits = generateRecruitingBoard(draft, {
    transferInterest,
    madeState: lastHistory.madeState
  });
  draft.offseason = {
    newlyEarned: draft.season.postseason.coachPointsEarned,
    transferInterest,
    graduated: draft.program.rosterPlayers.filter((player) => player.grade >= 12).length,
    recruitingPoints: recruitingPointBudget(draft.career),
    recruits,
    signedCommits: [],
    notes: []
  };
}

function applyUpgradePurchase(draft, upgradeId) {
  const currentLevel = draft.career.upgrades[upgradeId] ?? 0;
  const cost = currentLevel + 1;
  if (draft.career.coachPoints < cost) {
    return { ok: false, message: "Not enough coach points." };
  }
  draft.career.coachPoints -= cost;
  draft.career.upgrades[upgradeId] += 1;
  return { ok: true };
}

function progressProgramForNextSeason(draft) {
  const developmentBoost = draft.career.upgrades.training;
  const cultureBoost = draft.career.upgrades.culture;

  const progressOne = (player) => {
    const next = { ...player };
    next.grade += 1;
    const growthShots = 2 + Math.floor((next.potential - playerOverall(next)) / 20) + Math.floor(developmentBoost / 2);
    for (let i = 0; i < growthShots; i += 1) {
      const key = randomChoice(SKILLS);
      next[key] = clamp(next[key] + randomInt(0, 2), 30, 99);
    }
    next.morale = clamp(next.morale + randomInt(-4, 6) + cultureBoost, 30, 99);
    next.seasonStats = { setsPlayed: 0, impact: 0 };
    return next;
  };

  draft.program.rosterPlayers = draft.program.rosterPlayers.map(progressOne).filter((player) => player.grade <= 12);
  draft.program.freeAgents = draft.program.freeAgents.map(progressOne).filter((player) => player.grade <= 12);
  draft.program.incomingCommits = [];

  if (draft.offseason?.recruits?.length) {
    const signed = [];
    for (const recruit of draft.offseason.recruits) {
      const chance = clamp(recruitCommitChance(recruit, draft.career) + randomInt(-8, 8) / 100, 0.02, 0.98);
      if (Math.random() < chance) {
        const converted = convertRecruitToPlayer(draft, recruit);
        signed.push(converted);
      }
    }
    draft.program.incomingCommits = signed;
    draft.offseason.signedCommits = signed.map((player) => ({
      id: player.id,
      name: player.name,
      grade: player.grade,
      position: player.position,
      overall: playerOverall(player),
      potential: player.potential
    }));
  }

  draft.career.seasonNumber += 1;

  draft.world = createWorldForSeason(draft.career, draft.career.schoolName, draft.career.mascot);
  draft.team.rosters = {
    varsityIds: [],
    jvIds: []
  };
  draft.team.captains = {
    varsityId: null,
    jvId: null
  };
  draft.phase = "tryouts";
  const transferInterest = draft.offseason?.transferInterest || 0;
  const summary = {
    regularSeasonWins: draft.season.record.varsityWins,
    transferInterest
  };
  draft.season = null;
  draft.offseason = null;
  draft.preseason.selectedTournamentIds = [];
  generateTryoutPool(draft, summary);
}

function createInitialState() {
  const initial = {
    version: SAVE_VERSION,
    updatedAt: Date.now(),
    phase: "onboarding",
    meta: {
      nextPlayerCounter: 1,
      nextRecruitCounter: 1,
      lastAction: "init"
    },
    career: {
      coachName: "Coach Riley",
      schoolName: "Cedar Ridge High",
      mascot: "Falcons",
      seasonNumber: 1,
      divisionIndex: 0,
      coachPoints: 0,
      upgrades: {
        scouting: 0,
        potentialVision: 0,
        training: 0,
        gameplan: 0,
        culture: 0
      },
      history: []
    },
    world: {
      leagues: []
    },
    team: {
      chemistry: 55,
      rosters: {
        varsityIds: [],
        jvIds: []
      },
      captains: {
        varsityId: null,
        jvId: null
      }
    },
    program: {
      rosterPlayers: [],
      freeAgents: [],
      noShowPlayers: [],
      returningRosterIds: [],
      incomingCommits: []
    },
    tryouts: null,
    preseason: {
      selectedTournamentIds: []
    },
    season: null,
    offseason: null,
    notices: []
  };

  initial.world = createWorldForSeason(initial.career, initial.career.schoolName, initial.career.mascot);
  const starterPlayers = Array.from({ length: 20 }).map(() =>
    createPlayer(initial, {
      grade: randomInt(9, 11),
      baseSkill: randomInt(44, 62),
      potential: randomInt(58, 95),
      origin: "returning"
    })
  );
  initial.program.rosterPlayers = starterPlayers;
  initial.program.freeAgents = [];

  return initial;
}

function setNotice(message, tone = "neutral") {
  state.notices = [{ message, tone, id: Date.now() }];
}

function clearNotices() {
  state.notices = [];
}

function mutate(mutator, reason = "update") {
  const draft = structuredClone(state);
  mutator(draft);
  draft.updatedAt = Date.now();
  draft.meta.lastAction = reason;
  state = draft;
  persistState();
  render();
}

function markSaveStatus(status, savedAt = null) {
  runtime.saveStatus = status;
  if (savedAt) {
    runtime.lastSavedAt = savedAt;
  }
  if (!runtime.renderScheduled) {
    runtime.renderScheduled = true;
    requestAnimationFrame(() => {
      runtime.renderScheduled = false;
      if (state) render();
    });
  }
}

function writeLocalSave(payload) {
  localStorage.setItem(SAVE_KEY, payload);
  localStorage.setItem(
    SAVE_BACKUP_KEY,
    JSON.stringify({
      savedAt: Date.now(),
      payload
    })
  );
}

function openSaveDatabase() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function saveToIndexedDb(saveObject) {
  return openSaveDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put({
          id: IDB_PRIMARY_KEY,
          updatedAt: saveObject.updatedAt,
          state: saveObject
        });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      })
  );
}

function readFromIndexedDb() {
  return openSaveDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readonly");
        const req = tx.objectStore(IDB_STORE).get(IDB_PRIMARY_KEY);
        req.onsuccess = () => resolve(req.result?.state ?? null);
        req.onerror = () => reject(req.error);
      })
  );
}

function parseState(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!isValidStateShape(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function isValidStateShape(candidate) {
  return Boolean(
    candidate &&
      typeof candidate === "object" &&
      candidate.version === SAVE_VERSION &&
      candidate.career &&
      candidate.team &&
      candidate.program &&
      typeof candidate.updatedAt === "number"
  );
}

function migrateLegacyPlayer(player) {
  if (!player || typeof player !== "object") return player;
  const migrated = { ...player };
  migrated.gender = "M";
  const athleticismSeed = migrated.athleticism ?? migrated.resilience ?? 58;
  const defenseSeed = migrated.defense ?? migrated.passing ?? 58;
  const attackSeed = migrated.attack ?? migrated.hitting ?? 58;
  const serveSeed = migrated.serve ?? migrated.serving ?? 58;
  const blockSeed = migrated.block ?? migrated.blocking ?? 58;
  const settingSeed = migrated.setting ?? 58;

  migrated.serving = clamp(migrated.serving ?? serveSeed, 30, 99);
  migrated.passing = clamp(migrated.passing ?? defenseSeed, 30, 99);
  migrated.setting = clamp(migrated.setting ?? settingSeed, 30, 99);
  migrated.hitting = clamp(migrated.hitting ?? attackSeed, 30, 99);
  migrated.blocking = clamp(migrated.blocking ?? blockSeed, 30, 99);
  migrated.awareness = clamp(
    migrated.awareness ?? Math.round((defenseSeed + settingSeed) / 2 + randomInt(-4, 4)),
    30,
    99
  );
  migrated.resilience = clamp(
    migrated.resilience ?? Math.round((athleticismSeed + defenseSeed) / 2 + randomInt(-4, 4)),
    30,
    99
  );
  migrated.leadership = clamp(
    migrated.leadership ?? Math.round((migrated.morale ?? 70) * 0.9) + randomInt(-4, 4),
    30,
    99
  );

  const defaultHeight = clamp(positionHeightBaseline(migrated.position || "OH") + randomInt(-3, 3), 64, 82);
  migrated.heightInches = clamp(migrated.heightInches ?? defaultHeight, 64, 82);
  migrated.standingReach = clamp(
    migrated.standingReach ?? migrated.heightInches + randomInt(20, 27),
    86,
    112
  );
  migrated.blockTouch = clamp(
    migrated.blockTouch ?? migrated.standingReach + randomInt(13, 24),
    96,
    132
  );
  migrated.approachTouch = clamp(
    migrated.approachTouch ?? migrated.blockTouch + randomInt(2, 8),
    99,
    138
  );

  migrated.xp = migrated.xp ?? 0;
  migrated.morale = clamp(migrated.morale ?? 70, 30, 99);
  migrated.seasonStats = migrated.seasonStats || { setsPlayed: 0, impact: 0 };
  migrated.potential = clamp(
    migrated.potential ??
      Math.round(playerOverall(migrated) + 10 + physicalPotentialContribution(migrated) / 2 + randomInt(-4, 7)),
    45,
    99
  );
  return migrated;
}

function normalizeLoadedState(loaded) {
  const normalized = loaded;
  normalized.notices = normalized.notices || [];
  normalized.preseason = normalized.preseason || { selectedTournamentIds: [] };
  normalized.team = normalized.team || { chemistry: 55, rosters: { varsityIds: [], jvIds: [] } };
  normalized.team.rosters = normalized.team.rosters || { varsityIds: [], jvIds: [] };
  normalized.team.captains = normalized.team.captains || { varsityId: null, jvId: null };
  normalized.program = normalized.program || {
    rosterPlayers: [],
    freeAgents: [],
    noShowPlayers: [],
    returningRosterIds: []
  };
  normalized.program.rosterPlayers = (normalized.program.rosterPlayers || []).map(migrateLegacyPlayer);
  normalized.program.freeAgents = (normalized.program.freeAgents || []).map(migrateLegacyPlayer);
  normalized.program.noShowPlayers = (normalized.program.noShowPlayers || []).map(migrateLegacyPlayer);
  normalized.program.returningRosterIds = normalized.program.returningRosterIds || [];
  normalized.program.incomingCommits = (normalized.program.incomingCommits || []).map(migrateLegacyPlayer);
  const rosterIds = new Set(normalized.program.rosterPlayers.map((player) => player.id));
  if (!rosterIds.has(normalized.team.captains.varsityId)) normalized.team.captains.varsityId = null;
  if (!rosterIds.has(normalized.team.captains.jvId)) normalized.team.captains.jvId = null;
  if (!normalized.team.captains.varsityId && normalized.team.rosters.varsityIds?.length) {
    normalized.team.captains.varsityId = autoCaptainFromRosterIds(normalized, normalized.team.rosters.varsityIds);
  }
  if (!normalized.team.captains.jvId && normalized.team.rosters.jvIds?.length) {
    normalized.team.captains.jvId = autoCaptainFromRosterIds(normalized, normalized.team.rosters.jvIds);
  }
  if (normalized.tryouts?.candidates) {
    normalized.tryouts.candidates = normalized.tryouts.candidates.map(migrateLegacyPlayer);
    normalized.tryouts.captainSelections = normalized.tryouts.captainSelections || {
      varsityId: null,
      jvId: null
    };
    if (
      normalized.tryouts.captainSelections.varsityId &&
      normalized.tryouts.assignments?.[normalized.tryouts.captainSelections.varsityId] !== "varsity"
    ) {
      normalized.tryouts.captainSelections.varsityId = null;
    }
    if (
      normalized.tryouts.captainSelections.jvId &&
      normalized.tryouts.assignments?.[normalized.tryouts.captainSelections.jvId] !== "jv"
    ) {
      normalized.tryouts.captainSelections.jvId = null;
    }
  }
  normalized.meta = normalized.meta || { nextPlayerCounter: 1, lastAction: "hydrate" };
  normalized.meta.nextPlayerCounter = normalized.meta.nextPlayerCounter || 1;
  normalized.meta.nextRecruitCounter = normalized.meta.nextRecruitCounter || 1;
  if (normalized.offseason?.recruits && normalized.offseason.recruitingPoints == null) {
    normalized.offseason.recruitingPoints = recruitingPointBudget(normalized.career);
  }
  if (normalized.offseason) {
    normalized.offseason.recruits = normalized.offseason.recruits || [];
    normalized.offseason.signedCommits = normalized.offseason.signedCommits || [];
    if (normalized.offseason.recruitingPoints == null) {
      normalized.offseason.recruitingPoints = recruitingPointBudget(normalized.career);
    }
  }
  if (normalized.phase === "season" && normalized.season?.weeks) {
    normalized.season.viewTab = normalized.season.viewTab || "matchday";
    normalized.season.opponentIntel = normalized.season.opponentIntel || initializeOpponentIntel(normalized);
    for (const intel of Object.values(normalized.season.opponentIntel || {})) {
      intel.knowledge = clamp(intel.knowledge ?? 0, 0, 100);
      intel.gamesSeen = intel.gamesSeen || 0;
      intel.notes = intel.notes || [];
      intel.strengthTrait = intel.strengthTrait || "offense";
      intel.weaknessTrait = intel.weaknessTrait || "defense";
      intel.counterToStrength = intel.counterToStrength || counterForTrait(intel.strengthTrait, "strength");
      intel.counterToWeakness = intel.counterToWeakness || counterForTrait(intel.weaknessTrait, "weakness");
      intel.yourExposure = clamp(intel.yourExposure || 0, 0, 100);
      refreshIntelUnlocks(intel);
    }
    if (!normalized.season.leagueStandings) {
      normalized.season.leagueStandings = buildLeagueStandingsMap(normalized.world.leagues[0]);
      const leagueResults = (normalized.season.matchesPlayed || []).filter((match) => match.type === "league");
      for (const match of leagueResults) {
        if (!match.opponentId) continue;
        applyLeagueResultToStandings(
          normalized.season.leagueStandings,
          "user_team",
          match.opponentId,
          match.varsity?.won ?? false,
          match.varsity?.teamSets ?? 0,
          match.varsity?.oppSets ?? 0
        );
      }
    }
    for (const week of normalized.season.weeks) {
      week.energy = week.energy || { scouting: 34, individual: 33, team: 33 };
      week.energyTargetPlayerId = week.energyTargetPlayerId || week.focusTargetPlayerId || null;
      week.scoutingApplied = Boolean(week.scoutingApplied);
      week.opponentInvestments = week.opponentInvestments || {};
      if (week.kind === "league" && week.backgroundSimulated == null) {
        week.backgroundSimulated = week.status === "completed";
      }
      if (week.kind !== "league" || !week.matches) continue;
      for (const match of week.matches) {
        if (!match.pregame) match.pregame = null;
        if (match.status === "live" && !match.live) {
          match.status = "pending";
        }
        if (match.status === "pregame" && !match.pregame) {
          match.status = "pending";
        }
      }
    }
  }
  if (!normalized.world?.leagues?.length) {
    normalized.world = createWorldForSeason(normalized.career, normalized.career.schoolName, normalized.career.mascot);
  }
  return normalized;
}

async function loadInitialState() {
  const local = parseState(localStorage.getItem(SAVE_KEY));
  let idb = null;
  try {
    idb = await readFromIndexedDb();
  } catch {
    idb = null;
  }
  if (!isValidStateShape(idb)) idb = null;

  if (local && idb) {
    return normalizeLoadedState(local.updatedAt >= idb.updatedAt ? local : idb);
  }
  if (local) return normalizeLoadedState(local);
  if (idb) return normalizeLoadedState(idb);
  return createInitialState();
}

function persistState() {
  if (!state) return;
  const payload = JSON.stringify(state);
  try {
    writeLocalSave(payload);
    markSaveStatus("Saving…");
  } catch {
    markSaveStatus("Save failed (storage unavailable)");
    return;
  }

  runtime.pendingIdbWrite = runtime.pendingIdbWrite
    .then(() => saveToIndexedDb(state))
    .then(() => {
      markSaveStatus("Saved", Date.now());
    })
    .catch(() => {
      markSaveStatus("Saved locally", Date.now());
    });
}

function forceFlushLocalSave() {
  if (!state) return;
  try {
    writeLocalSave(JSON.stringify(state));
  } catch {
    // Ignore flush errors.
  }
}

function startCareerFromOnboarding(draft, coachName, schoolName, mascot) {
  draft.career.coachName = coachName || "Coach Riley";
  draft.career.schoolName = schoolName || "Cedar Ridge High";
  draft.career.mascot = mascot || "Falcons";
  draft.world = createWorldForSeason(draft.career, draft.career.schoolName, draft.career.mascot);
  draft.team.chemistry = 55;
  draft.team.captains = { varsityId: null, jvId: null };
  draft.program.incomingCommits = [];
  draft.phase = "tryouts";
  generateTryoutPool(draft);
}

function recalcRosterAssignmentsCounts(tryouts) {
  if (!tryouts) return { varsity: 0, jv: 0, cut: 0 };
  const counts = { varsity: 0, jv: 0, cut: 0 };
  for (const value of Object.values(tryouts.assignments)) {
    if (value === "varsity") counts.varsity += 1;
    else if (value === "jv") counts.jv += 1;
    else counts.cut += 1;
  }
  return counts;
}

function getCurrentWeek() {
  if (!state.season) return null;
  return state.season.weeks[state.season.weekIndex] || null;
}

function canStartSeason(currentState) {
  return (
    currentState.preseason.selectedTournamentIds.length === 2 &&
    Boolean(currentState.team.captains?.varsityId) &&
    Boolean(currentState.team.captains?.jvId)
  );
}

function startSeason(draft) {
  if (!canStartSeason(draft)) {
    return { ok: false, message: "Select two tournaments and set both captains before starting." };
  }
  initializeSeasonState(draft);
  draft.phase = "season";
  draft.offseason = null;
  return { ok: true };
}

function revealPostseasonStep(draft) {
  if (!draft.season?.postseason) return;
  draft.season.postseason.revealStage = clamp(draft.season.postseason.revealStage + 1, 0, 3);
}

function replaceStateFromImport(nextState) {
  if (!isValidStateShape(nextState)) return false;
  state = normalizeLoadedState(nextState);
  persistState();
  render();
  return true;
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  if (action === "dismiss-notice") {
    mutate((draft) => {
      draft.notices = [];
    }, "dismiss-notice");
    return;
  }

  if (action === "new-career") {
    const coachName = document.getElementById("coach-name")?.value.trim();
    const schoolName = document.getElementById("school-name")?.value.trim();
    const mascot = document.getElementById("mascot-name")?.value.trim();

    mutate(
      (draft) => {
        startCareerFromOnboarding(draft, coachName, schoolName, mascot);
        draft.notices = [{ id: Date.now(), tone: "good", message: "Career started. Tryouts are ready." }];
      },
      "start-career"
    );
    return;
  }

  if (action === "tryout-autofill") {
    const mode = target.dataset.mode;
    mutate(
      (draft) => {
        applyTryoutAutofill(draft, mode);
      },
      `tryout-autofill-${mode}`
    );
    return;
  }

  if (action === "set-assignment") {
    const playerId = target.dataset.playerId;
    const value = target.dataset.value;
    mutate(
      (draft) => {
        if (!draft.tryouts?.assignments[playerId]) return;
        draft.tryouts.assignments[playerId] = value;
        if (draft.tryouts.captainSelections?.varsityId === playerId && value !== "varsity") {
          draft.tryouts.captainSelections.varsityId = null;
        }
        if (draft.tryouts.captainSelections?.jvId === playerId && value !== "jv") {
          draft.tryouts.captainSelections.jvId = null;
        }
      },
      `set-assignment-${value}`
    );
    return;
  }

  if (action === "finalize-tryouts") {
    mutate(
      (draft) => {
        const result = finalizeTryouts(draft);
        if (!result.ok) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: result.message }];
        } else {
          draft.notices = [{ id: Date.now(), tone: "good", message: "Rosters locked. Pick your tournaments." }];
        }
      },
      "finalize-tryouts"
    );
    return;
  }

  if (action === "toggle-tournament") {
    const tournamentId = target.dataset.tournamentId;
    mutate(
      (draft) => {
        const list = draft.preseason.selectedTournamentIds;
        if (list.includes(tournamentId)) {
          draft.preseason.selectedTournamentIds = list.filter((id) => id !== tournamentId);
          return;
        }
        if (list.length >= 2) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: "Only two tournaments can be scheduled." }];
          return;
        }
        draft.preseason.selectedTournamentIds.push(tournamentId);
      },
      "toggle-tournament"
    );
    return;
  }

  if (action === "start-season") {
    mutate(
      (draft) => {
        const result = startSeason(draft);
        draft.notices = [
          {
            id: Date.now(),
            tone: result.ok ? "good" : "bad",
            message: result.ok ? "Season started. Weekly planning is now live." : result.message
          }
        ];
      },
      "start-season"
    );
    return;
  }

  if (action === "lock-week-focus") {
    mutate(
      (draft) => {
        const week = getCurrentWeekFromDraft(draft);
        if (!week) return;
        const energy = week.energy || { scouting: 0, individual: 0, team: 0 };
        const total = (energy.scouting || 0) + (energy.individual || 0) + (energy.team || 0);
        if (total !== 100) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: "Weekly energy allocation must total exactly 100%." }];
          return;
        }
        if ((energy.individual || 0) >= 15 && !week.energyTargetPlayerId) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: "Pick a player target for individual development." }];
          return;
        }
        week.focusLocked = true;
        applyWeeklyEnergyScouting(draft, week);
        draft.notices = [
          {
            id: Date.now(),
            tone: "good",
            message: `Weekly energy locked: Scout ${energy.scouting}%, Individual ${energy.individual}%, Team ${energy.team}%.`
          }
        ];
      },
      "lock-week-focus"
    );
    return;
  }

  if (action === "season-tab") {
    const tab = target.dataset.tab;
    mutate(
      (draft) => {
        if (!draft.season) return;
        if (!["matchday", "standings", "players"].includes(tab)) return;
        draft.season.viewTab = tab;
      },
      "season-tab"
    );
    return;
  }

  if (action === "play-match") {
    const weekId = target.dataset.weekId;
    const matchId = target.dataset.matchId;
    mutate(
      (draft) => {
        const result = playLeagueMatch(draft, weekId, matchId);
        draft.notices = [
          {
            id: Date.now(),
            tone: result.ok ? "good" : "bad",
            message: result.ok
              ? result.pregameOpened
                ? result.message
                : result.liveStarted
                ? result.message
                : `Match complete: ${result.played.opponentName}, Varsity ${result.played.varsity.scoreLine}.`
              : result.message
          }
        ];
      },
      "play-match"
    );
    return;
  }

  if (action === "lock-pregame" || action === "live-rally" || action === "live-autoplay-set" || action === "live-finish" || action === "live-scenario-choice") {
    const weekId = target.dataset.weekId;
    const matchId = target.dataset.matchId;
    const actionMap = {
      "lock-pregame": "lock-pregame",
      "live-rally": "rally",
      "live-autoplay-set": "autoplay-set",
      "live-finish": "finish",
      "live-scenario-choice": `scenario:${target.dataset.optionId}`
    };
    mutate(
      (draft) => {
        const result =
          action === "lock-pregame"
            ? lockMatchPregame(draft, weekId, matchId)
            : runLiveMatchAction(draft, weekId, matchId, actionMap[action]);
        draft.notices = [
          {
            id: Date.now(),
            tone: result.ok ? "good" : "bad",
            message: result.message
          }
        ];
      },
      action
    );
    return;
  }

  if (action === "run-tournament") {
    const weekId = target.dataset.weekId;
    mutate(
      (draft) => {
        const result = simulateTournamentWeek(draft, weekId);
        draft.notices = [
          {
            id: Date.now(),
            tone: result.ok ? "good" : "bad",
            message: result.ok
              ? `${result.result.tournamentName} complete: ${result.result.finishLabel}.`
              : result.message
          }
        ];
      },
      "run-tournament"
    );
    return;
  }

  if (action === "advance-week") {
    mutate(
      (draft) => {
        const result = advanceWeek(draft);
        draft.notices = [
          {
            id: Date.now(),
            tone: result.ok ? "good" : "bad",
            message: result.ok
              ? result.postseason
                ? "Regular season complete. Sectional reveal ready."
                : "Advanced to next week."
              : result.message
          }
        ];
      },
      "advance-week"
    );
    return;
  }

  if (action === "reveal-postseason") {
    mutate(
      (draft) => {
        revealPostseasonStep(draft);
      },
      "reveal-postseason"
    );
    return;
  }

  if (action === "to-offseason") {
    mutate(
      (draft) => {
        enterOffseason(draft);
        draft.notices = [
          {
            id: Date.now(),
            tone: "good",
            message: `Offseason started. You earned ${draft.offseason.newlyEarned} coach points.`
          }
        ];
      },
      "to-offseason"
    );
    return;
  }

  if (action === "buy-upgrade") {
    const upgradeId = target.dataset.upgradeId;
    mutate(
      (draft) => {
        const result = applyUpgradePurchase(draft, upgradeId);
        draft.notices = [
          {
            id: Date.now(),
            tone: result.ok ? "good" : "bad",
            message: result.ok
              ? `${UPGRADE_DEFS.find((def) => def.id === upgradeId)?.label ?? "Upgrade"} increased.`
              : result.message
          }
        ];
      },
      "buy-upgrade"
    );
    return;
  }

  if (action === "recruit-scout" || action === "recruit-pitch" || action === "recruit-offer") {
    const recruitId = target.dataset.recruitId;
    mutate(
      (draft) => {
        if (!draft.offseason?.recruits?.length) return;
        const recruit = draft.offseason.recruits.find((candidate) => candidate.id === recruitId);
        if (!recruit) return;

        if (action === "recruit-scout") {
          if (recruit.scouted) {
            draft.notices = [{ id: Date.now(), tone: "bad", message: "Recruit already scouted." }];
            return;
          }
          if (draft.offseason.recruitingPoints < RECRUITING_SCOUT_COST) {
            draft.notices = [{ id: Date.now(), tone: "bad", message: "Not enough recruiting points." }];
            return;
          }
          draft.offseason.recruitingPoints -= RECRUITING_SCOUT_COST;
          recruit.scouted = true;
          recruit.interest = clamp(recruit.interest + 4 + draft.career.upgrades.scouting, 0, 99);
          draft.notices = [{ id: Date.now(), tone: "good", message: `Scouted ${recruit.name}.` }];
          return;
        }

        if (action === "recruit-pitch") {
          if (draft.offseason.recruitingPoints < RECRUITING_PITCH_COST) {
            draft.notices = [{ id: Date.now(), tone: "bad", message: "Not enough recruiting points." }];
            return;
          }
          draft.offseason.recruitingPoints -= RECRUITING_PITCH_COST;
          recruit.pitches += 1;
          recruit.interest = clamp(recruit.interest + 5 + Math.floor(draft.career.upgrades.culture / 2), 0, 99);
          draft.notices = [{ id: Date.now(), tone: "good", message: `Made a pitch to ${recruit.name}.` }];
          return;
        }

        if (!recruit.offered) {
          const offersUsed = draft.offseason.recruits.filter((candidate) => candidate.offered).length;
          if (offersUsed >= MAX_RECRUIT_OFFERS) {
            draft.notices = [{ id: Date.now(), tone: "bad", message: `You can only offer ${MAX_RECRUIT_OFFERS} recruits.` }];
            return;
          }
          recruit.offered = true;
          recruit.interest = clamp(recruit.interest + 11, 0, 99);
          draft.notices = [{ id: Date.now(), tone: "good", message: `Offer sent to ${recruit.name}.` }];
        } else {
          recruit.offered = false;
          recruit.interest = clamp(recruit.interest - 6, 0, 99);
          draft.notices = [{ id: Date.now(), tone: "neutral", message: `Offer withdrawn from ${recruit.name}.` }];
        }
      },
      action
    );
    return;
  }

  if (action === "advance-season") {
    mutate(
      (draft) => {
        progressProgramForNextSeason(draft);
        const recruitCount = draft.tryouts?.summary?.recruits || 0;
        draft.notices = [
          {
            id: Date.now(),
            tone: "good",
            message: `Welcome to Season ${draft.career.seasonNumber}. Tryouts are open with ${recruitCount} signed recruits.`
          }
        ];
      },
      "advance-season"
    );
    return;
  }

  if (action === "export-save") {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `volleyball-dynasty-save-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    return;
  }

  if (action === "import-save") {
    const input = document.getElementById("import-save-input");
    if (input) input.click();
  }
}

function getCurrentWeekFromDraft(draft) {
  if (!draft.season) return null;
  return draft.season.weeks[draft.season.weekIndex] || null;
}

function handleChange(event) {
  const target = event.target;

  if (target.id === "import-save-input" && target.files?.[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const ok = replaceStateFromImport(parsed);
        if (!ok) {
          mutate(
            (draft) => {
              draft.notices = [{ id: Date.now(), tone: "bad", message: "Import failed: invalid save format." }];
            },
            "import-failed"
          );
        } else {
          mutate(
            (draft) => {
              draft.notices = [{ id: Date.now(), tone: "good", message: "Save imported successfully." }];
            },
            "import-success"
          );
        }
      } catch {
        mutate(
          (draft) => {
            draft.notices = [{ id: Date.now(), tone: "bad", message: "Import failed: could not parse file." }];
          },
          "import-parse-failed"
        );
      }
    };
    reader.readAsText(file);
    target.value = "";
    return;
  }

  const action = target.dataset.action;
  if (!action) return;

  if (action === "week-energy") {
    mutate(
      (draft) => {
        const week = getCurrentWeekFromDraft(draft);
        if (!week || week.focusLocked) return;
        const key = target.dataset.energyKey;
        if (!["scouting", "individual", "team"].includes(key)) return;
        week.energy[key] = clamp(Number(target.value), 0, 100);
      },
      "week-energy"
    );
    return;
  }

  if (action === "tryout-captain-varsity" || action === "tryout-captain-jv") {
    mutate(
      (draft) => {
        if (!draft.tryouts) return;
        const value = target.value || null;
        if (action === "tryout-captain-varsity") {
          if (value && draft.tryouts.assignments[value] !== "varsity") return;
          draft.tryouts.captainSelections.varsityId = value;
          return;
        }
        if (value && draft.tryouts.assignments[value] !== "jv") return;
        draft.tryouts.captainSelections.jvId = value;
      },
      action
    );
    return;
  }

  if (action === "week-energy-player") {
    mutate(
      (draft) => {
        const week = getCurrentWeekFromDraft(draft);
        if (!week || week.focusLocked) return;
        week.energyTargetPlayerId = target.value || null;
      },
      "week-energy-player"
    );
    return;
  }

  if (action === "pregame-gameplan") {
    const weekId = target.dataset.weekId;
    const matchId = target.dataset.matchId;
    mutate(
      (draft) => {
        const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
        if (!week || week.kind !== "league") return;
        const match = week.matches.find((candidate) => candidate.id === matchId);
        if (!match || match.status !== "pregame" || !match.pregame) return;
        match.pregame.gameplan = target.value;
      },
      "pregame-gameplan"
    );
    return;
  }

  if (action === "pregame-lineup") {
    const weekId = target.dataset.weekId;
    const matchId = target.dataset.matchId;
    const playerId = target.dataset.playerId;
    const checked = target.checked;
    mutate(
      (draft) => {
        const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
        if (!week || week.kind !== "league") return;
        const match = week.matches.find((candidate) => candidate.id === matchId);
        if (!match || match.status !== "pregame" || !match.pregame) return;
        const ids = new Set(match.pregame.lineupIds || []);
        if (checked) {
          ids.add(playerId);
        } else {
          ids.delete(playerId);
        }
        const array = [...ids];
        if (array.length > 6) return;
        match.pregame.lineupIds = array;
        const varsityIds = new Set(getVarsityPlayers(draft).map((player) => player.id));
        match.pregame.benchIds = [...varsityIds].filter((id) => !ids.has(id));
      },
      "pregame-lineup"
    );
    return;
  }

  if (action === "tournament-gameplan") {
    const weekId = target.dataset.weekId;
    mutate(
      (draft) => {
        const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
        if (!week || week.kind !== "tournament" || week.status === "completed") return;
        week.gameplan = target.value;
      },
      "tournament-gameplan"
    );
    return;
  }

  if (action === "tournament-control-mode" || action === "tournament-timeouts" || action === "tournament-subs") {
    return;
  }
}

function renderNotice() {
  if (!state.notices?.length) return "";
  const notice = state.notices[0];
  const toneClass = notice.tone === "good" ? "tag good" : notice.tone === "bad" ? "tag bad" : "tag";
  return `
    <div class="card" style="margin-top:0.8rem;">
      <div class="line">
        <div><span class="${toneClass}">${notice.tone === "good" ? "Update" : notice.tone === "bad" ? "Warning" : "Note"}</span> ${notice.message}</div>
        <button class="btn btn-secondary" data-action="dismiss-notice">Dismiss</button>
      </div>
    </div>
  `;
}

function renderBanner() {
  const record = state.season
    ? `${state.season.record.varsityWins}-${state.season.record.varsityLosses}`
    : state.career.history[0]
      ? `${state.career.history[state.career.history.length - 1].wins}-${state.career.history[state.career.history.length - 1].losses}`
      : "0-0";
  const activePhase = phaseIndex(state.phase);
  const stageRow = SEASON_PHASE_STAGES.map((phase, index) => {
    const classes = [
      "phase-chip",
      index === activePhase ? "active" : "",
      index < activePhase ? "done" : ""
    ]
      .filter(Boolean)
      .join(" ");
    return `<span class="${classes}">${phaseLabel(phase)}</span>`;
  }).join("");

  return `
    <div class="banner">
      <div>
        <strong>${state.career.schoolName} ${state.career.mascot}</strong>
        <span>${state.career.coachName}</span>
      </div>
      <div>
        <strong>Season ${state.career.seasonNumber}</strong>
        <span>${formatDivision(state.career.divisionIndex)}</span>
      </div>
      <div>
        <strong>Record ${record}</strong>
        <span>Chemistry ${state.team.chemistry}</span>
      </div>
      <div>
        <strong>${runtime.saveStatus}</strong>
        <span>Last save ${formatTime(runtime.lastSavedAt)}</span>
      </div>
      <div class="phase-row">${stageRow}</div>
    </div>
  `;
}

function renderSidebar() {
  const varsity = getVarsityPlayers(state)
    .slice()
    .sort((a, b) => playerOverall(b) - playerOverall(a))
    .slice(0, 8);
  const varsityCaptain = state.program.rosterPlayers.find((player) => player.id === state.team.captains?.varsityId);
  const jvCaptain = state.program.rosterPlayers.find((player) => player.id === state.team.captains?.jvId);

  return `
    <div class="stack">
      <div class="card">
        <h3>Program Snapshot</h3>
        <div class="grid-two">
          <div class="kpi"><strong>${state.career.coachPoints}</strong><span>Coach Points</span></div>
          <div class="kpi"><strong>${state.season ? state.season.rankingPoints : 0}</strong><span>Ranking Points</span></div>
          <div class="kpi"><strong>${state.program.rosterPlayers.length}</strong><span>Rostered Players</span></div>
          <div class="kpi"><strong>${state.program.freeAgents.length}</strong><span>Program Free Agents</span></div>
        </div>
      </div>

      <div class="card">
        <h3>Top Varsity</h3>
        ${
          varsity.length
            ? `<table>
                <thead><tr><th>Player</th><th>Pos</th><th>Yr</th><th class="right">OVR</th></tr></thead>
                <tbody>
                  ${varsity
                    .map(
                      (player) => `
                    <tr>
                      <td>${player.name}</td>
                      <td>${player.position}</td>
                      <td>${gradeLabel(player.grade)}</td>
                      <td class="right">${playerOverall(player)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>`
            : `<p class="subtle">Rosters will appear after tryouts.</p>`
        }
        <p class="footnote" style="margin-top:0.55rem;">V Captain: ${varsityCaptain ? `${varsityCaptain.name} (LDR ${varsityCaptain.leadership})` : "Not set"}</p>
        <p class="footnote">JV Captain: ${jvCaptain ? `${jvCaptain.name} (LDR ${jvCaptain.leadership})` : "Not set"}</p>
      </div>

      <div class="card">
        <h3>Save Tools</h3>
        <p class="subtle">Autosave runs on every action to both localStorage and IndexedDB.</p>
        <div class="line" style="margin-top:0.6rem;">
          <button class="btn btn-secondary" data-action="export-save">Export Save</button>
          <button class="btn btn-secondary" data-action="import-save">Import Save</button>
        </div>
        <input id="import-save-input" type="file" accept="application/json" style="display:none;" />
      </div>
    </div>
  `;
}

function renderOnboarding() {
  return `
    <div class="card">
      <h2>Start Your Dynasty</h2>
      <p class="subtle">You begin in Division 5. Build the program, climb to Open Division, and survive every season cycle.</p>
      <div class="grid-three" style="margin-top:0.8rem;">
        <label>
          Coach Name
          <input id="coach-name" class="input" value="${state.career.coachName}" />
        </label>
        <label>
          School Name
          <input id="school-name" class="input" value="${state.career.schoolName}" />
        </label>
        <label>
          Mascot
          <input id="mascot-name" class="input" value="${state.career.mascot}" />
        </label>
      </div>
      <div class="callout" style="margin-top:0.8rem;">
        Progress is autosaved immediately after every click, roster change, and game result.
      </div>
      <button style="margin-top:0.8rem;" class="btn btn-primary" data-action="new-career">Start Career</button>
    </div>
  `;
}

function renderTryouts() {
  if (!state.tryouts) {
    return `
      <div class="card">
        <h2>Tryouts</h2>
        <p class="subtle">No tryout pool found. Start the next season cycle to regenerate candidates.</p>
      </div>
    `;
  }
  const candidates = state.tryouts?.candidates || [];
  const counts = recalcRosterAssignmentsCounts(state.tryouts);
  const varsityCandidates = candidates
    .filter((player) => state.tryouts.assignments[player.id] === "varsity")
    .sort((a, b) => b.leadership - a.leadership);
  const jvCandidates = candidates
    .filter((player) => state.tryouts.assignments[player.id] === "jv")
    .sort((a, b) => b.leadership - a.leadership);

  return `
    <div class="stack">
      <div class="card">
        <h2>Tryouts</h2>
        <p class="subtle">Select exactly 12 Varsity and 12 JV players. Set one captain for each team. Captains with high leadership provide a match boost only when they can stay on the court.</p>
        <div class="grid-three" style="margin-top:0.7rem;">
          <div class="kpi"><strong>${state.tryouts.summary.returning}</strong><span>Returning Tryouts</span></div>
          <div class="kpi"><strong>${state.tryouts.summary.transfers}</strong><span>Transfers</span></div>
          <div class="kpi"><strong>${state.tryouts.summary.noShows}</strong><span>No-Shows</span></div>
          <div class="kpi"><strong>${state.tryouts.summary.recruits || 0}</strong><span>Signed Recruits</span></div>
        </div>
        <div class="line" style="margin-top:0.8rem;">
          <div>
            <span class="tag">Varsity ${counts.varsity}/12</span>
            <span class="tag">JV ${counts.jv}/12</span>
            <span class="tag">Cuts ${counts.cut}</span>
          </div>
          <div>
            <button class="btn btn-secondary" data-action="tryout-autofill" data-mode="skill">Auto by Skill</button>
            <button class="btn btn-secondary" data-action="tryout-autofill" data-mode="potential">Auto by Potential</button>
          </div>
        </div>
        <div class="grid-two" style="margin-top:0.8rem;">
          <label>
            Varsity Captain
            <select class="select" data-action="tryout-captain-varsity">
              <option value="">Select Varsity captain</option>
              ${varsityCandidates
                .map(
                  (player) =>
                    `<option value="${player.id}" ${state.tryouts.captainSelections?.varsityId === player.id ? "selected" : ""}>${player.name} (OVR ${playerOverall(player)}, LDR ${player.leadership})</option>`
                )
                .join("")}
            </select>
          </label>
          <label>
            JV Captain
            <select class="select" data-action="tryout-captain-jv">
              <option value="">Select JV captain</option>
              ${jvCandidates
                .map(
                  (player) =>
                    `<option value="${player.id}" ${state.tryouts.captainSelections?.jvId === player.id ? "selected" : ""}>${player.name} (OVR ${playerOverall(player)}, LDR ${player.leadership})</option>`
                )
                .join("")}
            </select>
          </label>
        </div>
      </div>

      <div class="card">
        <div style="overflow-x:auto;">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Pos</th>
              <th>Yr</th>
              <th class="right">Ht</th>
              <th class="right">Reach</th>
              <th class="right">BT</th>
              <th class="right">AT</th>
              <th class="right">OVR</th>
              <th class="right">Potential (est.)</th>
              <th class="right">SV</th>
              <th class="right">PS</th>
              <th class="right">ST</th>
              <th class="right">HT</th>
              <th class="right">BL</th>
              <th class="right">AW</th>
              <th class="right">RS</th>
              <th class="right">LD</th>
              <th>Origin</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            ${candidates
              .sort((a, b) => playerOverall(b) - playerOverall(a))
              .map((player) => {
                const estimated = estimatePotential(player, state.career.upgrades.potentialVision);
                const assignment = state.tryouts.assignments[player.id] || "cut";
                return `
                  <tr>
                    <td>${player.name}</td>
                    <td>${player.position}</td>
                    <td>${gradeLabel(player.grade)}</td>
                    <td class="right">${formatHeight(player.heightInches)}</td>
                    <td class="right">${player.standingReach}</td>
                    <td class="right">${player.blockTouch}</td>
                    <td class="right">${player.approachTouch}</td>
                    <td class="right">${playerOverall(player)}</td>
                    <td class="right">${estimated}</td>
                    <td class="right">${player.serving}</td>
                    <td class="right">${player.passing}</td>
                    <td class="right">${player.setting}</td>
                    <td class="right">${player.hitting}</td>
                    <td class="right">${player.blocking}</td>
                    <td class="right">${player.awareness}</td>
                    <td class="right">${player.resilience}</td>
                    <td class="right">${player.leadership}</td>
                    <td>${player.origin}</td>
                    <td>
                      <button class="btn btn-secondary" data-action="set-assignment" data-player-id="${player.id}" data-value="varsity" ${assignment === "varsity" ? "disabled" : ""}>V</button>
                      <button class="btn btn-secondary" data-action="set-assignment" data-player-id="${player.id}" data-value="jv" ${assignment === "jv" ? "disabled" : ""}>JV</button>
                      <button class="btn btn-secondary" data-action="set-assignment" data-player-id="${player.id}" data-value="cut" ${assignment === "cut" ? "disabled" : ""}>Cut</button>
                    </td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
        </div>
      </div>

      <div class="card">
        <button class="btn btn-primary" data-action="finalize-tryouts">Lock Rosters</button>
      </div>
    </div>
  `;
}

function renderPreseason() {
  const selected = state.preseason.selectedTournamentIds;
  const hasCaptains = Boolean(state.team.captains?.varsityId) && Boolean(state.team.captains?.jvId);
  return `
    <div class="stack">
      <div class="card">
        <h2>Preseason Scheduling</h2>
        <p class="subtle">Choose one early-season and one late-season tournament. Harder events provide more ranking upside but stronger opposition.</p>
        <div class="line">
          <div>
            <span class="tag">Selected ${selected.length}/2</span>
          </div>
          <button class="btn btn-primary" data-action="start-season" ${(selected.length === 2 && hasCaptains) ? "" : "disabled"}>Start Season</button>
        </div>
        ${!hasCaptains ? `<p class="footnote">Captain selection required for JV and Varsity before season start.</p>` : ""}
      </div>

      <div class="card">
        <table>
          <thead>
            <tr>
              <th>Tournament</th>
              <th class="right">Difficulty</th>
              <th class="right">Prestige</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${TOURNAMENTS.map((tournament) => {
              const unlocked = unlocksTournament(state.career, tournament);
              const chosen = selected.includes(tournament.id);
              let reason = "Available";
              if (!unlocked) {
                reason = `Locked: needs ${formatDivision(tournament.unlock.minDivisionIndex)}+, ${tournament.unlock.minPlayoffAppearances} playoff yrs${tournament.unlock.requiresStateBerth ? ", and a state berth" : ""}`;
              }
              return `
                <tr>
                  <td>${tournament.name}</td>
                  <td class="right">${tournament.difficulty}</td>
                  <td class="right">${tournament.prestige}</td>
                  <td>${reason}</td>
                  <td>
                    <button class="btn ${chosen ? "btn-accent" : "btn-secondary"}" data-action="toggle-tournament" data-tournament-id="${tournament.id}" ${unlocked ? "" : "disabled"}>${chosen ? "Selected" : "Select"}</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderWeeklyFocus(week) {
  const varsity = getVarsityPlayers(state);
  const energy = week.energy || { scouting: 34, individual: 33, team: 33 };
  const total = (energy.scouting || 0) + (energy.individual || 0) + (energy.team || 0);
  return `
    <div class="card">
      <h3>Week ${week.weekNumber} Energy Plan</h3>
      <p class="subtle">M/W/F are practice sessions. Tue/Thu are game nights (JV first, Varsity second).</p>
      <div class="grid-three">
        ${WEEKLY_ENERGY_AREAS.map(
          (area) => `
            <label>
              <strong>${area.label}</strong>
              <div class="subtle">${area.detail}</div>
              <input class="input" type="number" min="0" max="100" step="1" value="${energy[area.id] || 0}" data-action="week-energy" data-energy-key="${area.id}" ${week.focusLocked ? "disabled" : ""} />
            </label>
          `
        ).join("")}
      </div>
      <p class="footnote">Current allocation: ${total}% (must equal 100%).</p>
      ${
        (energy.individual || 0) > 0
          ? `
          <div style="margin-top:0.6rem;">
            <label>
              Individual Development Target
              <select class="select" data-action="week-energy-player" ${week.focusLocked ? "disabled" : ""}>
                <option value="">Choose player</option>
                ${varsity
                  .map(
                    (player) =>
                      `<option value="${player.id}" ${week.energyTargetPlayerId === player.id ? "selected" : ""}>${player.name} (${player.position}, OVR ${playerOverall(player)})</option>`
                  )
                  .join("")}
              </select>
            </label>
          </div>
        `
          : ""
      }
      <button style="margin-top:0.7rem;" class="btn btn-primary" data-action="lock-week-focus" ${week.focusLocked ? "disabled" : ""}>${week.focusLocked ? "Energy Locked" : "Lock Weekly Energy"}</button>
    </div>
  `;
}

function renderMatchCard(week, match) {
  const opponent = findTeamById(state, match.opponentId);
  const intel = state.season?.opponentIntel?.[match.opponentId];
  const intelLevel = evaluateWeeklyEffects(state, week, match.opponentId).intelLevel;
  const hasLiveMatch = week.matches.some((candidate) => candidate.status === "live");
  const fuzz = intelLevel > 1.8 ? 2 : intelLevel > 1.1 ? 4 : 9;
  const showRange = (value) => `${clamp(value - fuzz, 30, 99)}-${clamp(value + fuzz, 30, 99)}`;

  if (match.status === "played") {
    return `
      <div class="card">
        <h4>${match.opponentName} (${match.home ? "Home" : "Away"})</h4>
        <p><span class="tag ${match.result.varsity.won ? "good" : "bad"}">Varsity ${match.result.varsity.scoreLine}</span>
        <span class="tag ${match.result.jv.won ? "good" : "bad"}">JV ${match.result.jv.scoreLine}</span></p>
        <p class="footnote">Gameplan: ${GAMEPLAN_OPTIONS.find((option) => option.id === match.gameplan)?.label}. Ranking +${match.result.rankingGain}.</p>
        ${
          match.result.live
            ? `<p class="footnote">Live mode: ${match.result.live.rallies} rallies, ${match.result.live.scenarios} scenario events.</p>`
            : ""
        }
      </div>
    `;
  }

  if (match.status === "pregame" && match.pregame) {
    const varsity = getVarsityPlayers(state).slice().sort((a, b) => playerOverall(b) - playerOverall(a));
    const lineupIds = new Set(match.pregame.lineupIds || []);
    const intelHints = [];
    if (intel?.playstyleKnown) intelHints.push("Playstyle mapped");
    if (intel?.strengthKnown) intelHints.push(`Strength: ${traitLabel(intel.strengthTrait)}`);
    if (intel?.weaknessKnown) intelHints.push(`Weakness: ${traitLabel(intel.weaknessTrait)}`);
    if (intel?.countersKnown) {
      const counterA = GAMEPLAN_OPTIONS.find((option) => option.id === intel.counterToStrength)?.label || "Balanced";
      const counterB = GAMEPLAN_OPTIONS.find((option) => option.id === intel.counterToWeakness)?.label || "Balanced";
      intelHints.push(`Counters: ${counterA} / ${counterB}`);
    }
    const intelText = intelHints.length ? intelHints.join(" | ") : "Limited scouting intel. You mostly have broad ranges.";
    return `
      <div class="card">
        <h4>Pregame Setup: ${match.opponentName}</h4>
        <p class="subtle">Opponent read: Off ${showRange(opponent.profile.offense)}, Def ${showRange(opponent.profile.defense)}, SR ${showRange(opponent.profile.serveReceive)}, Block ${showRange(opponent.profile.block)}.</p>
        <p class="footnote">${intelText}</p>
        <label>
          Gameplan Counter
          <select class="select" data-action="pregame-gameplan" data-week-id="${week.id}" data-match-id="${match.id}">
            ${GAMEPLAN_OPTIONS.map((option) => `<option value="${option.id}" ${match.pregame.gameplan === option.id ? "selected" : ""}>${option.label}</option>`).join("")}
          </select>
        </label>
        <p class="subtle" style="margin-top:0.65rem;">Select exactly 6 starters (Varsity match lineup):</p>
        <div class="grid-two">
          ${varsity
            .map(
              (player) => `
              <label>
                <input type="checkbox" data-action="pregame-lineup" data-week-id="${week.id}" data-match-id="${match.id}" data-player-id="${player.id}" ${lineupIds.has(player.id) ? "checked" : ""} />
                ${player.name} (${player.position}) OVR ${playerOverall(player)} LDR ${player.leadership}
              </label>
            `
            )
            .join("")}
        </div>
        <button style="margin-top:0.7rem;" class="btn btn-primary" data-action="lock-pregame" data-week-id="${week.id}" data-match-id="${match.id}">
          Lock Gameplan + Lineup
        </button>
      </div>
    `;
  }

  if (match.status === "live" && match.live) {
    const live = match.live;
    const setTags = live.setScores
      .map(
        (set, index) =>
          `<span class="tag ${set.won ? "good" : "bad"}">S${index + 1} ${set.team}-${set.opp}</span>`
      )
      .join("");
    const lineupPlayers = getVarsityPlayers(state).filter((player) => live.lineupIds.includes(player.id));
    const orderedRotation = lineupPlayers
      .map((player, idx) => {
        const rotationSlot = (idx - live.rotationIndexTeam + lineupPlayers.length) % lineupPlayers.length;
        return { player, rotationSlot };
      })
      .sort((a, b) => a.rotationSlot - b.rotationSlot);
    const rotationText = orderedRotation
      .map((entry, idx) => `${idx + 1}:${entry.player.name.split(" ")[0]}`)
      .join(" | ");
    return `
      <div class="card live-card">
        <h4>${match.opponentName} (${match.home ? "Home" : "Away"})</h4>
        <div class="live-scoreboard">
          <div>
            <strong>${state.career.schoolName}</strong>
            <span>Sets ${live.setsWonTeam}</span>
          </div>
          <div class="live-current">${live.currentSet.team} - ${live.currentSet.opp}</div>
          <div>
            <strong>${match.opponentName}</strong>
            <span>Sets ${live.setsWonOpp}</span>
          </div>
        </div>
        <p class="subtle">Set ${live.currentSet.setIndex} to ${live.currentSet.target}. Serving: ${live.serving === "team" ? "You" : "Opponent"}.</p>
        <p class="footnote">Rotation: ${rotationText || "No lineup set"}.</p>
        <div>${setTags || '<span class="tag">No completed sets yet</span>'}</div>
        ${
          live.scenario
            ? `
              <div class="callout" style="margin-top:0.65rem;">
                <strong>${live.scenario.title}</strong>
                <p class="subtle">${live.scenario.body}</p>
                <div class="line" style="flex-wrap:wrap;">
                  ${live.scenario.options
                    .map(
                      (option) =>
                        `<button class="btn btn-secondary" data-action="live-scenario-choice" data-week-id="${week.id}" data-match-id="${match.id}" data-option-id="${option.id}">${option.label}</button>`
                    )
                    .join("")}
                </div>
              </div>
            `
            : `
              <div class="line" style="margin-top:0.65rem; flex-wrap:wrap;">
                <button class="btn btn-primary" data-action="live-rally" data-week-id="${week.id}" data-match-id="${match.id}">Play Rally</button>
                <button class="btn btn-accent" data-action="live-autoplay-set" data-week-id="${week.id}" data-match-id="${match.id}">Autoplay Set</button>
                <button class="btn btn-good" data-action="live-finish" data-week-id="${week.id}" data-match-id="${match.id}">Finish Match</button>
              </div>
            `
        }
      </div>
    `;
  }

  return `
    <div class="card">
      <h4>${match.opponentName} (${match.home ? "Home" : "Away"})</h4>
      <p class="subtle">Opponent read: Off ${showRange(opponent.profile.offense)}, Def ${showRange(opponent.profile.defense)}, SR ${showRange(opponent.profile.serveReceive)}, Block ${showRange(opponent.profile.block)}</p>
      <p class="footnote">Intel: ${Math.round(intel?.knowledge || 0)}/100 | Games played vs this team: ${intel?.gamesSeen || 0}</p>
      <button style="margin-top:0.7rem;" class="btn btn-primary" data-action="play-match" data-week-id="${week.id}" data-match-id="${match.id}" ${(week.focusLocked && !hasLiveMatch) ? "" : "disabled"}>Open Match Prep</button>
    </div>
  `;
}

function renderTournamentCard(week) {
  if (week.status === "completed") {
    const result = week.result;
    return `
      <div class="card">
        <h3>${result.tournamentName}</h3>
        <p><span class="tag good">${result.finishLabel}</span> <span class="tag">Record ${result.wins}-${result.losses}</span> <span class="tag">Ranking +${result.rankingGain}</span></p>
        <h4>Pool Results</h4>
        <table>
          <thead><tr><th>Team</th><th class="right">W</th><th class="right">L</th><th class="right">PD</th></tr></thead>
          <tbody>
            ${result.poolTable
              .map(
                (line) => `
              <tr>
                <td>${line.name}</td>
                <td class="right">${line.wins}</td>
                <td class="right">${line.losses}</td>
                <td class="right">${line.pointsDelta}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  const tournament = findTournamentById(week.tournamentId);
  return `
    <div class="card">
      <h3>${tournament?.name || "Tournament"}</h3>
      <p class="subtle">16-team format: 4 pools of 4, then Gold (8), Silver (4), Bronze (4) brackets. Max season matches remain capped at 30.</p>
      <label>
        Gameplan
        <select class="select" data-action="tournament-gameplan" data-week-id="${week.id}">
          ${GAMEPLAN_OPTIONS.map((option) => `<option value="${option.id}" ${week.gameplan === option.id ? "selected" : ""}>${option.label}</option>`).join("")}
        </select>
      </label>
      <button style="margin-top:0.7rem;" class="btn btn-primary" data-action="run-tournament" data-week-id="${week.id}" ${week.focusLocked ? "" : "disabled"}>Run Tournament Week</button>
    </div>
  `;
}

function renderSeasonStandingsTab() {
  const rows = sortedLeagueStandingsRows(state.season.leagueStandings);
  return `
    <div class="card">
      <h3>League Standings</h3>
      <p class="subtle">Varsity league race updates after each completed week.</p>
      <div style="overflow-x:auto;">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th class="right">W</th>
              <th class="right">L</th>
              <th class="right">Pct</th>
              <th class="right">GB</th>
              <th class="right">Set +/-</th>
              <th class="right">Streak</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map((row) => {
                const streakText = row.streak === 0 ? "-" : row.streak > 0 ? `W${row.streak}` : `L${Math.abs(row.streak)}`;
                return `
                  <tr>
                    <td>${row.rank}</td>
                    <td>${row.teamName} ${row.teamId === "user_team" ? "<span class='tag good'>You</span>" : ""}</td>
                    <td class="right">${row.wins}</td>
                    <td class="right">${row.losses}</td>
                    <td class="right">${row.pct.toFixed(3)}</td>
                    <td class="right">${row.rank === 1 ? "-" : row.gb.toFixed(1)}</td>
                    <td class="right">${row.setsFor - row.setsAgainst}</td>
                    <td class="right">${streakText}</td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSeasonPlayerStatsTab() {
  const players = [...state.program.rosterPlayers].sort((a, b) => b.seasonStats.impact - a.seasonStats.impact);
  return `
    <div class="card">
      <h3>Player Season Stats</h3>
      <p class="subtle">Track development and production throughout the year.</p>
      <div style="overflow-x:auto;">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Pos</th>
              <th>Yr</th>
              <th class="right">Sets</th>
              <th class="right">Impact</th>
              <th class="right">OVR</th>
              <th class="right">POT</th>
              <th class="right">XP</th>
              <th class="right">SV</th>
              <th class="right">PS</th>
              <th class="right">ST</th>
              <th class="right">HT</th>
              <th class="right">BL</th>
              <th class="right">AW</th>
              <th class="right">RS</th>
              <th class="right">LD</th>
            </tr>
          </thead>
          <tbody>
            ${players
              .map((player) => {
                const teamLabel = state.team.rosters.varsityIds.includes(player.id)
                  ? "Varsity"
                  : state.team.rosters.jvIds.includes(player.id)
                    ? "JV"
                    : "Program";
                const captainTag =
                  player.id === state.team.captains?.varsityId
                    ? "<span class='tag good'>V C</span>"
                    : player.id === state.team.captains?.jvId
                      ? "<span class='tag good'>JV C</span>"
                      : "";
                return `
                  <tr>
                    <td>${player.name} ${captainTag}</td>
                    <td>${teamLabel}</td>
                    <td>${player.position}</td>
                    <td>${gradeLabel(player.grade)}</td>
                    <td class="right">${player.seasonStats.setsPlayed}</td>
                    <td class="right">${player.seasonStats.impact}</td>
                    <td class="right">${playerOverall(player)}</td>
                    <td class="right">${player.potential}</td>
                    <td class="right">${player.xp}</td>
                    <td class="right">${player.serving}</td>
                    <td class="right">${player.passing}</td>
                    <td class="right">${player.setting}</td>
                    <td class="right">${player.hitting}</td>
                    <td class="right">${player.blocking}</td>
                    <td class="right">${player.awareness}</td>
                    <td class="right">${player.resilience}</td>
                    <td class="right">${player.leadership}</td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSeason() {
  const week = getCurrentWeek();
  if (!week) {
    return `<div class="card"><h2>Season Complete</h2><p class="subtle">All weeks completed.</p></div>`;
  }

  const totalMatches = state.season.record.varsityWins + state.season.record.varsityLosses;
  const completedWeeks = state.season.weeks.filter((entry) => entry.status === "completed").length;
  const progressPct = Math.round((completedWeeks / state.season.weeks.length) * 100);
  const liveMatches = week.kind === "league" ? week.matches.filter((match) => match.status === "live").length : 0;
  const varsityCaptain = state.program.rosterPlayers.find((player) => player.id === state.team.captains?.varsityId);
  const jvCaptain = state.program.rosterPlayers.find((player) => player.id === state.team.captains?.jvId);
  const activeTab = state.season.viewTab || "matchday";
  const tabButtons = [
    { id: "matchday", label: "Matchday" },
    { id: "standings", label: "Standings" },
    { id: "players", label: "Player Stats" }
  ];

  let tabContent = "";
  if (activeTab === "standings") {
    tabContent = renderSeasonStandingsTab();
  } else if (activeTab === "players") {
    tabContent = renderSeasonPlayerStatsTab();
  } else {
    tabContent = `
      ${renderWeeklyFocus(week)}
      ${
        week.kind === "league"
          ? week.matches.map((match) => renderMatchCard(week, match)).join("")
          : renderTournamentCard(week)
      }
      <div class="card">
        <button class="btn btn-primary" data-action="advance-week" ${allWeekMatchesComplete(week) ? "" : "disabled"}>Advance To Next Week</button>
      </div>
    `;
  }

  return `
    <div class="stack">
      <div class="card">
        <h2>Regular Season Week ${week.weekNumber}</h2>
        <p class="subtle">Match cap: ${totalMatches}/${MAX_MATCHES_PER_SEASON}. Current Varsity: ${state.season.record.varsityWins}-${state.season.record.varsityLosses}. League: ${state.season.record.leagueWins}-${state.season.record.leagueLosses}.</p>
        <div class="season-progress"><span style="width:${progressPct}%"></span></div>
        <p class="footnote">${completedWeeks}/${state.season.weeks.length} weeks complete. ${liveMatches ? `${liveMatches} live match in progress.` : ""}</p>
        <div>
          <span class="tag">Tue / Thu match nights</span>
          <span class="tag">JV first, Varsity second</span>
          <span class="tag">Energy: ${week.focusLocked ? `S${week.energy.scouting}/I${week.energy.individual}/T${week.energy.team}` : "Not Locked"}</span>
          <span class="tag">Ranking ${state.season.rankingPoints}</span>
          <span class="tag">V Captain: ${varsityCaptain ? `${varsityCaptain.name} (${varsityCaptain.leadership})` : "Unset"}</span>
          <span class="tag">JV Captain: ${jvCaptain ? `${jvCaptain.name} (${jvCaptain.leadership})` : "Unset"}</span>
        </div>
      </div>
      <div class="card">
        <div class="line" style="justify-content:flex-start; gap:0.45rem; flex-wrap:wrap;">
          ${tabButtons
            .map(
              (tab) =>
                `<button class="btn ${activeTab === tab.id ? "btn-accent" : "btn-secondary"}" data-action="season-tab" data-tab="${tab.id}">${tab.label}</button>`
            )
            .join("")}
        </div>
      </div>
      ${tabContent}
    </div>
  `;
}

function renderPostseason() {
  const postseason = state.season.postseason;
  const reveal = postseason.revealStage;
  const resume = postseason.resume || {
    ratingScore: 0,
    qualityWins: 0,
    badLosses: 0,
    sos: 0
  };

  return `
    <div class="stack">
      <div class="card reveal">
        <h2>Sectional Selection Show</h2>
        <p>12 teams qualify across 4 leagues. 4 auto-bids (league champs) + 8 at-large (record + strength of schedule).</p>
        <button class="btn btn-primary" data-action="reveal-postseason" ${reveal >= 3 ? "disabled" : ""}>${reveal === 0 ? "Reveal Playoff Field" : reveal === 1 ? "Reveal Bracket Results" : reveal === 2 ? "Reveal State Berths" : "All Revealed"}</button>
      </div>

      ${
        reveal >= 1
          ? `
          <div class="card">
            <h3>Sectional Field</h3>
            <table>
              <thead><tr><th>Seed</th><th>Team</th><th>League</th><th class="right">Record</th><th class="right">QW</th><th class="right">BL</th><th class="right">SOS</th><th class="right">Resume</th></tr></thead>
              <tbody>
                ${postseason.sectionalField
                  .map(
                    (team) => `
                  <tr>
                    <td>${team.seed}</td>
                    <td>${team.teamName} ${team.teamId === "user_team" ? "<span class='tag good'>You</span>" : ""}</td>
                    <td>${LEAGUE_NAMES[team.leagueIndex]}</td>
                    <td class="right">${team.wins}-${team.losses}</td>
                    <td class="right">${team.qualityWins ?? 0}</td>
                    <td class="right">${team.badLosses ?? 0}</td>
                    <td class="right">${team.sos}</td>
                    <td class="right">${Math.round(team.ratingScore)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `
          : ""
      }

      ${
        reveal >= 2
          ? `
          <div class="card">
            <h3>Sectional Outcome</h3>
            <p><span class="tag ${postseason.madeSectional ? "good" : "bad"}">${postseason.sectionalOutcome}</span></p>
            <p class="subtle">Resume score ${Math.round(resume.ratingScore)} | QW ${resume.qualityWins} | BL ${resume.badLosses} | SOS ${resume.sos}</p>
            <p>Finalists: ${postseason.bracket.finalists.map((team) => `${team.teamName}${team.teamId === "user_team" ? " (You)" : ""}`).join(" vs ")}</p>
            <p>Champion: <strong>${postseason.bracket.champion.teamName}${postseason.bracket.champion.teamId === "user_team" ? " (You)" : ""}</strong></p>
          </div>
        `
          : ""
      }

      ${
        reveal >= 3
          ? `
          <div class="card">
            <h3>State Playoffs</h3>
            ${
              postseason.madeState
                ? `<p><span class="tag good">State Berth Earned</span></p>
                   <p>State run: <strong>${postseason.stateOutcome.roundReached}</strong></p>`
                : `<p><span class="tag bad">No State Berth</span></p>`
            }
            <p>Coach points earned this season: <strong>${postseason.coachPointsEarned}</strong></p>
            <p>${postseason.promotionText}</p>
            <button class="btn btn-primary" data-action="to-offseason">Enter Offseason</button>
          </div>
        `
          : ""
      }
    </div>
  `;
}

function renderOffseason() {
  const history = state.career.history[state.career.history.length - 1];
  const recruits = state.offseason.recruits || [];
  const offersUsed = recruits.filter((recruit) => recruit.offered).length;
  const projectedCommits = recruits.filter(
    (recruit) => recruit.offered && recruitCommitChance(recruit, state.career) >= 0.45
  ).length;
  return `
    <div class="stack">
      <div class="card">
        <h2>Offseason</h2>
        <p class="subtle">Upgrade coach attributes, work your recruiting board, then advance players and start new tryouts.</p>
        <div class="grid-three">
          <div class="kpi"><strong>${state.offseason.newlyEarned}</strong><span>Points Earned</span></div>
          <div class="kpi"><strong>${state.career.coachPoints}</strong><span>Unspent Points</span></div>
          <div class="kpi"><strong>${state.offseason.transferInterest.toFixed(1)}</strong><span>Transfer Interest</span></div>
          <div class="kpi"><strong>${state.offseason.recruitingPoints}</strong><span>Recruiting Points</span></div>
          <div class="kpi"><strong>${offersUsed}/${MAX_RECRUIT_OFFERS}</strong><span>Offers Sent</span></div>
          <div class="kpi"><strong>${projectedCommits}</strong><span>Projected Commits</span></div>
        </div>
        <p class="footnote" style="margin-top:0.6rem;">Last season: ${history.wins}-${history.losses}, ${history.sectionalOutcome}, ${history.promoted ? "promoted" : "same division"}.</p>
      </div>

      <div class="card">
        <h3>Recruiting Board</h3>
        <p class="subtle">Scout and pitch recruits to raise commitment odds. You can send ${MAX_RECRUIT_OFFERS} offers.</p>
        <table>
          <thead><tr><th>Recruit</th><th>Pos</th><th>Yr</th><th>Stars</th><th class="right">Interest</th><th class="right">Need</th><th>Eval</th><th>Actions</th></tr></thead>
          <tbody>
            ${recruits
              .sort((a, b) => b.stars - a.stars || b.interest - a.interest)
              .map((recruit) => {
                const evalText = recruit.scouted
                  ? `OVR ${recruit.immediateSkill} / POT ${recruit.hiddenPotential}`
                  : "Unscouted";
                const commitPct = Math.round(recruitCommitChance(recruit, state.career) * 100);
                return `
                  <tr>
                    <td>${recruit.name} ${recruit.offered ? "<span class='tag good'>Offer</span>" : ""}<div class="footnote">${recruit.note}</div></td>
                    <td>${recruit.position}</td>
                    <td>${gradeLabel(recruit.grade)}</td>
                    <td>${starLabel(recruit.stars)}</td>
                    <td class="right">${recruit.interest}</td>
                    <td class="right">${recruit.commitmentThreshold}</td>
                    <td>${evalText}<div class="footnote">Commit ${commitPct}%</div></td>
                    <td>
                      <button class="btn btn-secondary" data-action="recruit-scout" data-recruit-id="${recruit.id}" ${(recruit.scouted || state.offseason.recruitingPoints < RECRUITING_SCOUT_COST) ? "disabled" : ""}>Scout</button>
                      <button class="btn btn-secondary" data-action="recruit-pitch" data-recruit-id="${recruit.id}" ${state.offseason.recruitingPoints < RECRUITING_PITCH_COST ? "disabled" : ""}>Pitch</button>
                      <button class="btn ${recruit.offered ? "btn-accent" : "btn-secondary"}" data-action="recruit-offer" data-recruit-id="${recruit.id}" ${(!recruit.offered && offersUsed >= MAX_RECRUIT_OFFERS) ? "disabled" : ""}>${recruit.offered ? "Withdraw" : "Offer"}</button>
                    </td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="card">
        <h3>Coach Upgrades</h3>
        <table>
          <thead><tr><th>Attribute</th><th>Level</th><th>Next Cost</th><th>Effect</th><th>Action</th></tr></thead>
          <tbody>
            ${UPGRADE_DEFS.map((upgrade) => {
              const level = state.career.upgrades[upgrade.id] || 0;
              const cost = level + 1;
              return `
                <tr>
                  <td>${upgrade.label}</td>
                  <td>${level}</td>
                  <td>${cost}</td>
                  <td>${upgrade.detail}</td>
                  <td><button class="btn btn-secondary" data-action="buy-upgrade" data-upgrade-id="${upgrade.id}" ${state.career.coachPoints >= cost ? "" : "disabled"}>Buy</button></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>

      <div class="card">
        <button class="btn btn-primary" data-action="advance-season">Advance To Next Season</button>
      </div>
    </div>
  `;
}

function renderCareerHistory() {
  if (!state.career.history.length) {
    return `
      <div class="card">
        <h3>Career History</h3>
        <p class="subtle">No completed seasons yet.</p>
      </div>
    `;
  }

  const rows = [...state.career.history].slice(-6).reverse();
  return `
    <div class="card">
      <h3>Recent Seasons</h3>
      <table>
        <thead>
          <tr>
            <th>Season</th>
            <th>Division</th>
            <th class="right">Record</th>
            <th>Section</th>
            <th>State</th>
            <th class="right">Resume</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (season) => `
            <tr>
              <td>${season.seasonNumber}</td>
              <td>${season.division}</td>
              <td class="right">${season.wins}-${season.losses}</td>
              <td>${season.sectionalOutcome}</td>
              <td>${season.stateOutcome}</td>
              <td class="right">${season.resumeScore ?? "-"}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderMainContent() {
  if (state.phase === "onboarding") return renderOnboarding();
  if (state.phase === "tryouts") return renderTryouts();
  if (state.phase === "preseason") return renderPreseason();
  if (state.phase === "season") return renderSeason();
  if (state.phase === "postseason") return renderPostseason();
  if (state.phase === "offseason") return renderOffseason();
  return `<div class="card"><p>Unknown phase.</p></div>`;
}

function render() {
  if (!app || !state) return;

  app.innerHTML = `
    ${renderBanner()}
    ${renderNotice()}
    <div class="main-grid">
      <div class="stack">
        ${renderMainContent()}
        ${renderCareerHistory()}
      </div>
      ${renderSidebar()}
    </div>
  `;
}

async function bootstrap() {
  try {
    state = await loadInitialState();
  } catch {
    state = createInitialState();
  }

  if (!state.world?.leagues?.length) {
    state.world = createWorldForSeason(state.career, state.career.schoolName, state.career.mascot);
  }

  markSaveStatus("Loaded", state.updatedAt);
  render();
}

window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    forceFlushLocalSave();
  }
});

window.addEventListener("beforeunload", () => {
  forceFlushLocalSave();
});

app.addEventListener("click", handleClick);
app.addEventListener("change", handleChange);

bootstrap();
