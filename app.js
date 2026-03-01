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
const TRYOUT_POSITION_RULES = [
  { id: "LIB", label: "Libero", varsity: 2, jv: 2 },
  { id: "OH", label: "Outside Hitter", varsity: 3, jv: 3 },
  { id: "MB", label: "Middle Blocker", varsity: 3, jv: 3 },
  { id: "S", label: "Setter", varsity: 2, jv: 2 },
  { id: "RS", label: "Opposite", varsity: 2, jv: 2 }
];
const LINEUP_ROLE_SLOTS = [
  { index: 0, label: "Outside 1", expectedPosition: "OH" },
  { index: 1, label: "Outside 2", expectedPosition: "OH" },
  { index: 2, label: "Middle 1", expectedPosition: "MB" },
  { index: 3, label: "Middle 2", expectedPosition: "MB" },
  { index: 4, label: "Setter", expectedPosition: "S" },
  { index: 5, label: "Opposite", expectedPosition: "RS" }
];
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
const SKILLS = ["serving", "passing", "setting", "hitting", "blocking", "athleticism", "awareness", "resilience", "leadership"];
const SKILL_SHORT_LABELS = {
  serving: "SRV",
  passing: "PAS",
  setting: "SET",
  hitting: "HIT",
  blocking: "BLK",
  athleticism: "ATH",
  awareness: "AWR",
  resilience: "RES",
  leadership: "LDR"
};
const POSITION_TRYOUT_SKILL_PRIORITY = {
  LIB: ["passing", "awareness", "resilience", "athleticism", "serving", "leadership"],
  OH: ["hitting", "athleticism", "passing", "serving", "awareness", "resilience"],
  MB: ["blocking", "hitting", "athleticism", "awareness", "resilience", "serving"],
  S: ["setting", "awareness", "athleticism", "serving", "leadership", "passing"],
  RS: ["hitting", "blocking", "athleticism", "serving", "awareness", "resilience"]
};
const POSITION_SKILL_ARCHETYPES = {
  LIB: {
    bias: { serving: -1, passing: 14, setting: 1, hitting: -17, blocking: -19, athleticism: 8, awareness: 12, resilience: 10, leadership: 6 },
    floor: { passing: 45, awareness: 42, resilience: 40, athleticism: 40, serving: 36, setting: 34, hitting: 30, blocking: 30, leadership: 36 },
    cap: { passing: 99, awareness: 99, resilience: 99, athleticism: 97, serving: 90, setting: 86, hitting: 64, blocking: 62, leadership: 98 }
  },
  OH: {
    bias: { serving: 4, passing: 4, setting: -4, hitting: 10, blocking: 2, athleticism: 9, awareness: 4, resilience: 3, leadership: 2 },
    floor: { hitting: 40, athleticism: 42, passing: 38, serving: 38, awareness: 36, resilience: 36, blocking: 34, setting: 30, leadership: 34 },
    cap: { hitting: 99, athleticism: 99, passing: 95, serving: 96, awareness: 96, resilience: 96, blocking: 95, setting: 89, leadership: 95 }
  },
  MB: {
    bias: { serving: -3, passing: -10, setting: -12, hitting: 9, blocking: 15, athleticism: 7, awareness: 3, resilience: 3, leadership: 1 },
    floor: { blocking: 44, hitting: 40, athleticism: 40, awareness: 34, resilience: 34, serving: 32, passing: 30, setting: 30, leadership: 34 },
    cap: { blocking: 99, hitting: 98, athleticism: 98, awareness: 92, resilience: 92, serving: 90, passing: 84, setting: 80, leadership: 94 }
  },
  S: {
    bias: { serving: 2, passing: 3, setting: 16, hitting: -9, blocking: -11, athleticism: 5, awareness: 11, resilience: 5, leadership: 8 },
    floor: { setting: 45, awareness: 40, athleticism: 36, leadership: 38, serving: 35, passing: 35, resilience: 34, hitting: 30, blocking: 30 },
    cap: { setting: 99, awareness: 98, athleticism: 95, leadership: 99, serving: 95, passing: 94, resilience: 94, hitting: 82, blocking: 78 }
  },
  RS: {
    bias: { serving: 3, passing: -4, setting: -9, hitting: 12, blocking: 7, athleticism: 8, awareness: 4, resilience: 5, leadership: 2 },
    floor: { hitting: 42, blocking: 38, athleticism: 40, serving: 36, awareness: 34, resilience: 34, passing: 30, setting: 30, leadership: 34 },
    cap: { hitting: 99, blocking: 97, athleticism: 98, serving: 95, awareness: 95, resilience: 95, passing: 88, setting: 84, leadership: 95 }
  }
};
const POSITION_PHYSICAL_ARCHETYPES = {
  LIB: { heightRange: [-4, 1], reachRange: [18, 24], jumpRange: [10, 20], approachExtra: [1, 5] },
  OH: { heightRange: [-2, 3], reachRange: [21, 28], jumpRange: [12, 27], approachExtra: [3, 8] },
  MB: { heightRange: [-1, 4], reachRange: [23, 30], jumpRange: [13, 28], approachExtra: [3, 8] },
  S: { heightRange: [-2, 2], reachRange: [20, 26], jumpRange: [11, 23], approachExtra: [2, 6] },
  RS: { heightRange: [-1, 3], reachRange: [21, 28], jumpRange: [13, 27], approachExtra: [3, 8] }
};
const LINEUP_SLOT_ORDER = [3, 4, 5, 0, 1, 2];
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
  renderScheduled: false,
  avatarCache: new Map(),
  optionsMenuOpen: false,
  resetConfirmOpen: false
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

function hashSeed(seed) {
  const text = String(seed ?? "seed");
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeSeededRandom(seed) {
  let value = hashSeed(seed) || 1;
  return () => {
    value ^= value << 13;
    value ^= value >>> 17;
    value ^= value << 5;
    return (value >>> 0) / 4294967295;
  };
}

function createPixelAvatarDataUri(seed) {
  const random = makeSeededRandom(seed);
  const skinTones = ["#F7DFC9", "#F1CFB2", "#E5BD99", "#CF9E76", "#B8855F"];
  const hairColors = ["#0F1014", "#2A1D1A", "#4A3228", "#6D3F2B", "#BE6C2F", "#8C8D93", "#BCA776"];
  const eyeColors = ["#5F4336", "#2B4F7D", "#4F6E46", "#765226", "#3E3B60"];
  const jerseyBases = ["#1D2D53", "#243F73", "#153D66", "#A32125", "#E06A1D", "#1D6C45"];
  const jerseyTrims = ["#F5F8FC", "#EDE5D4", "#F7D670"];
  const outline = "#3A2A24";
  const skin = randomChoice(skinTones);
  const hair = randomChoice(hairColors);
  const eye = randomChoice(eyeColors);
  const jersey = randomChoice(jerseyBases);
  const jerseyTrim = randomChoice(jerseyTrims);
  const bgA = random() < 0.5 ? "#F3E5D2" : "#DDEAF7";
  const bgB = random() < 0.5 ? "#E6CFAF" : "#BFD8F3";
  const hairStyle = Math.floor(random() * 8);
  const expression = Math.floor(random() * 5);
  const eyeStyle = Math.floor(random() * 4);
  const hasGlasses = random() < 0.12;
  const hasStripe = random() < 0.58;
  const jerseyNumber = 1 + Math.floor(random() * 20);

  const hairBackTemplates = [
    "M30 54 L31 44 L39 31 L48 23 L59 19 L71 20 L81 25 L89 34 L96 45 L97 56 L94 59 L35 59 Z",
    "M29 56 L31 40 L38 30 L47 24 L58 20 L69 19 L80 24 L89 32 L95 43 L98 56 L94 61 L35 61 Z",
    "M30 56 L31 43 L39 31 L49 24 L61 20 L73 22 L83 28 L91 38 L96 49 L97 59 L94 62 L35 62 Z",
    "M28 56 L30 40 L38 30 L50 22 L63 20 L75 23 L84 30 L91 41 L97 53 L97 61 L93 63 L34 63 Z",
    "M30 55 L31 42 L39 31 L48 25 L58 22 L69 22 L80 25 L89 34 L95 45 L96 55 L94 59 L35 59 Z",
    "M30 56 L31 39 L40 29 L51 22 L64 20 L77 24 L87 32 L94 43 L97 55 L95 60 L34 60 Z",
    "M29 57 L31 43 L39 32 L49 25 L61 22 L73 22 L84 27 L92 35 L97 46 L97 57 L94 61 L35 61 Z",
    "M29 56 L30 41 L38 30 L48 24 L60 20 L72 21 L82 26 L90 34 L96 45 L97 57 L94 60 L35 60 Z"
  ];
  const hairFrontTemplates = [
    "M31 42 L38 33 L44 30 L46 21 L54 28 L60 19 L67 29 L74 21 L80 31 L88 36 L92 45 L90 56 L84 50 L78 54 L69 52 L61 55 L52 52 L43 54 L35 50 L31 56 Z",
    "M30 44 L37 35 L45 30 L52 22 L58 27 L64 21 L71 29 L78 24 L86 31 L92 40 L93 49 L89 56 L83 53 L74 55 L66 53 L58 56 L48 54 L39 56 L33 52 Z",
    "M30 45 L35 38 L43 33 L47 24 L56 30 L64 23 L70 31 L76 26 L85 33 L91 41 L93 50 L90 57 L81 51 L73 53 L65 50 L58 54 L49 52 L41 55 L34 51 Z",
    "M31 43 L38 34 L45 29 L49 21 L58 27 L66 20 L72 27 L79 23 L86 30 L92 39 L93 48 L90 56 L84 52 L75 53 L66 52 L58 54 L50 52 L42 53 L34 50 Z",
    "M30 44 L36 36 L44 31 L52 24 L59 26 L65 22 L73 29 L81 25 L88 32 L93 41 L93 49 L89 57 L81 53 L72 54 L64 53 L57 54 L48 53 L40 55 L33 51 Z",
    "M30 45 L37 35 L45 31 L52 25 L58 20 L66 24 L73 21 L81 28 L88 35 L92 44 L92 52 L88 58 L81 53 L72 54 L64 52 L56 54 L47 52 L40 54 L33 50 Z",
    "M31 44 L38 35 L46 30 L53 24 L61 22 L69 24 L77 29 L85 35 L91 43 L92 51 L88 57 L80 53 L72 54 L64 51 L56 54 L47 52 L40 54 L33 50 Z",
    "M31 43 L37 34 L45 30 L53 24 L61 21 L69 22 L77 26 L85 33 L91 41 L93 49 L89 56 L82 53 L73 54 L64 53 L56 55 L47 53 L39 54 L33 50 Z"
  ];

  const browMarkup =
    expression === 1
      ? `<path d="M43 53 L53 50" fill="none"/><path d="M75 50 L85 53" fill="none"/>`
      : expression === 3
      ? `<path d="M43 50 L53 52" fill="none"/><path d="M75 52 L85 50" fill="none"/>`
      : `<path d="M43 52 L53 51" fill="none"/><path d="M75 51 L85 52" fill="none"/>`;

  const eyeMarkup =
    eyeStyle === 0
      ? `
        <ellipse cx="48" cy="59" rx="6.3" ry="4.7" fill="#fff"/>
        <ellipse cx="80" cy="59" rx="6.3" ry="4.7" fill="#fff"/>
        <ellipse cx="48" cy="59.6" rx="3.2" ry="3.2" fill="${eye}"/>
        <ellipse cx="80" cy="59.6" rx="3.2" ry="3.2" fill="${eye}"/>
      `
      : eyeStyle === 1
      ? `
        <path d="M41 59 Q48 53 55 59 Q48 64 41 59 Z" fill="#fff"/>
        <path d="M73 59 Q80 53 87 59 Q80 64 73 59 Z" fill="#fff"/>
        <ellipse cx="48" cy="59.5" rx="3.1" ry="2.9" fill="${eye}"/>
        <ellipse cx="80" cy="59.5" rx="3.1" ry="2.9" fill="${eye}"/>
      `
      : eyeStyle === 2
      ? `
        <ellipse cx="48" cy="59.3" rx="6.1" ry="4.0" fill="#fff"/>
        <ellipse cx="80" cy="59.3" rx="6.1" ry="4.0" fill="#fff"/>
        <ellipse cx="48" cy="59.8" rx="3.1" ry="2.6" fill="${eye}"/>
        <ellipse cx="80" cy="59.8" rx="3.1" ry="2.6" fill="${eye}"/>
      `
      : `
        <path d="M42 59 L54 59" fill="none"/>
        <path d="M74 59 L86 59" fill="none"/>
        <ellipse cx="48" cy="59" rx="2.8" ry="2.2" fill="${eye}"/>
        <ellipse cx="80" cy="59" rx="2.8" ry="2.2" fill="${eye}"/>
      `;

  const mouthMarkup =
    expression === 0
      ? `<path d="M56 74 Q64 80 72 74" fill="none" stroke-width="2.2"/>`
      : expression === 1
      ? `<ellipse cx="64" cy="74.5" rx="7.0" ry="4.0" fill="#8D4B43"/><ellipse cx="64" cy="73.0" rx="5.0" ry="2.0" fill="#F4B7AF" stroke="none"/>`
      : expression === 2
      ? `<path d="M58 75 Q64 71 70 75" fill="none" stroke-width="2.1"/>`
      : expression === 3
      ? `<path d="M58 75 L70 75" fill="none" stroke-width="2.1"/>`
      : `<path d="M57 74 Q64 78 71 74" fill="none" stroke-width="2.1"/>`;

  const jerseyPattern = hasStripe
    ? `<path d="M64 99 V129" stroke="${jerseyTrim}" stroke-width="2.6"/><path d="M39 106 H89" stroke="${jerseyTrim}" stroke-width="2.2"/>`
    : `<path d="M39 108 H89" stroke="${jerseyTrim}" stroke-width="2.4"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgA}"/>
        <stop offset="100%" stop-color="${bgB}"/>
      </linearGradient>
      <linearGradient id="jerseyShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${jersey}"/>
        <stop offset="100%" stop-color="#111829"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="128" height="128" rx="20" fill="url(#bg)"/>
    <g stroke="${outline}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 128 L24 101 Q30 92 42 90 L52 87 H76 L86 90 Q98 92 104 101 L110 128 Z" fill="url(#jerseyShade)"/>
      <path d="M48 87 L57 100 H71 L80 87 Z" fill="${jerseyTrim}"/>
      <path d="M52 88 L64 101 L76 88" fill="${jersey}" stroke-width="1.8"/>
      ${jerseyPattern}
      <text x="64" y="120.2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11.5" font-weight="700" fill="${jerseyTrim}" stroke="none">${jerseyNumber}</text>
      <rect x="58" y="80" width="12" height="9" rx="3.8" fill="${skin}"/>
      <path d="${hairBackTemplates[hairStyle]}" fill="${hair}"/>
      <ellipse cx="40.8" cy="59.5" rx="3.3" ry="5.0" fill="${skin}"/>
      <ellipse cx="87.2" cy="59.5" rx="3.3" ry="5.0" fill="${skin}"/>
      <ellipse cx="64" cy="56" rx="24.5" ry="27.5" fill="${skin}"/>
      <path d="${hairFrontTemplates[hairStyle]}" fill="${hair}"/>
      ${browMarkup}
      ${eyeMarkup}
      <circle cx="49.2" cy="57.8" r="1.0" fill="#fff" stroke="none"/>
      <circle cx="81.2" cy="57.8" r="1.0" fill="#fff" stroke="none"/>
      <ellipse cx="64" cy="66.5" rx="1.3" ry="1.0" fill="#D59E7C" stroke="none"/>
      ${mouthMarkup}
      ${
        hasGlasses
          ? `<rect x="41.8" y="53.2" width="13.0" height="10.2" rx="2.0" fill="none"/><rect x="73.2" y="53.2" width="13.0" height="10.2" rx="2.0" fill="none"/><line x1="54.8" y1="58.2" x2="73.2" y2="58.2"/>`
          : ""
      }
      <path d="M18 128 L24 101 Q30 92 42 90 L52 87 H76 L86 90 Q98 92 104 101 L110 128" fill="none"/>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function avatarDataUriForPlayer(player) {
  if (!player) return "";
  const seed = player.avatarSeed ?? player.id ?? player.name ?? "player";
  if (!runtime.avatarCache.has(seed)) {
    runtime.avatarCache.set(seed, createPixelAvatarDataUri(seed));
  }
  return runtime.avatarCache.get(seed);
}

function renderPlayerIdentity(player, compact = false) {
  const cls = compact ? "player-id compact" : "player-id";
  return `<span class="${cls}"><img class="pixel-avatar" src="${avatarDataUriForPlayer(player)}" alt="${player.name}" /><span>${player.name}</span></span>`;
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

function positionLabel(position) {
  const labels = {
    OH: "Outside",
    MB: "Middle",
    S: "Setter",
    RS: "Opposite",
    LIB: "Libero"
  };
  return labels[position] || position;
}

function formatHeight(inches) {
  const safe = Math.round(inches || 0);
  const feet = Math.floor(safe / 12);
  const rem = safe % 12;
  return `${feet}'${rem}"`;
}

function previousTeamLabel(player) {
  const team = player.lastTeam || null;
  if (!team) return "N/A";
  if (player.lastTeamWasTransfer) return `${team} (Transfer)`;
  return team;
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

function skillShortLabel(skill) {
  return SKILL_SHORT_LABELS[skill] || skill.toUpperCase();
}

function tryoutSkillPriorityForPosition(position) {
  return POSITION_TRYOUT_SKILL_PRIORITY[position] || POSITION_TRYOUT_SKILL_PRIORITY.OH;
}

function positionSkillArchetype(position) {
  return POSITION_SKILL_ARCHETYPES[position] || POSITION_SKILL_ARCHETYPES.OH;
}

function positionPhysicalArchetype(position) {
  return POSITION_PHYSICAL_ARCHETYPES[position] || POSITION_PHYSICAL_ARCHETYPES.OH;
}

function positionFitScore(player, position) {
  const focusSkills = tryoutSkillPriorityForPosition(position).slice(0, 4);
  const average = focusSkills.reduce((sum, skill) => sum + (player[skill] || 0), 0) / Math.max(1, focusSkills.length);
  return Math.round(average);
}

function growthSkillOrderForPosition(position) {
  const primary = tryoutSkillPriorityForPosition(position).slice(0, 4);
  const secondary = SKILLS.filter((skill) => !primary.includes(skill));
  return [...shuffle(primary), ...shuffle(primary), ...shuffle(secondary)];
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
  const baseSkill = clamp(opts.baseSkill ?? randomInt(46, 67), 35, 95);
  const position = opts.position ?? randomChoice(POSITIONS);
  const archetype = positionSkillArchetype(position);
  const physical = positionPhysicalArchetype(position);
  const heightBase = positionHeightBaseline(position);
  const heightInches = clamp(
    opts.heightInches ?? heightBase + randomInt(physical.heightRange[0], physical.heightRange[1]),
    64,
    82
  );
  const standingReach = clamp(
    opts.standingReach ?? heightInches + randomInt(physical.reachRange[0], physical.reachRange[1]),
    86,
    112
  );
  const verticalSeed = Math.round((baseSkill - 45) * 0.42 + randomInt(physical.jumpRange[0], physical.jumpRange[1]));
  const blockTouch = clamp(opts.blockTouch ?? standingReach + verticalSeed + randomInt(-2, 2), 96, 132);
  const approachTouch = clamp(
    opts.approachTouch ?? blockTouch + randomInt(physical.approachExtra[0], physical.approachExtra[1]),
    99,
    138
  );
  const morale = clamp(opts.morale ?? randomInt(60, 82), 30, 99);
  const skillValue = (skill) => {
    const floor = archetype.floor?.[skill] ?? 35;
    const cap = archetype.cap?.[skill] ?? 95;
    if (opts[skill] != null) return clamp(opts[skill], floor, cap);
    const bias = archetype.bias?.[skill] ?? 0;
    const raw =
      skill === "leadership"
        ? Math.round(morale * 0.88) + bias + randomInt(-4, 5)
        : baseSkill + bias + randomInt(-6, 6);
    return clamp(raw, floor, cap);
  };
  const player = {
    id: nextPlayerId(draft),
    name: opts.name ?? createRandomName(),
    gender: "M",
    avatarSeed: opts.avatarSeed ?? `${draft.career?.seasonNumber || 1}-${randomInt(100000, 999999999)}`,
    grade: opts.grade ?? randomInt(9, 12),
    position,
    heightInches,
    standingReach,
    blockTouch,
    approachTouch,
    serving: skillValue("serving"),
    passing: skillValue("passing"),
    setting: skillValue("setting"),
    hitting: skillValue("hitting"),
    blocking: skillValue("blocking"),
    athleticism: skillValue("athleticism"),
    awareness: skillValue("awareness"),
    resilience: skillValue("resilience"),
    leadership: skillValue("leadership"),
    potential: 0,
    xp: opts.xp ?? 0,
    morale,
    lastTeam: opts.lastTeam ?? null,
    lastTeamWasTransfer: Boolean(opts.lastTeamWasTransfer),
    origin: opts.origin ?? "freshman",
    yearsInProgram: opts.yearsInProgram ?? 0,
    seasonStats: opts.seasonStats ?? {
      setsPlayed: 0,
      impact: 0
    }
  };
  player.potential = clamp(
    opts.potential ??
      Math.round(
        playerOverall(player) +
          8 +
          physicalPotentialContribution(player) / 2 +
          positionFitScore(player, position) / 6 +
          randomInt(-5, 6)
      ),
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
    offense: Math.round((average("hitting") + average("setting") + average("serving") + average("athleticism")) / 4),
    defense: Math.round((average("passing") + average("awareness") + average("resilience") + average("athleticism")) / 4),
    serveReceive: Math.round((average("passing") + average("awareness") + average("athleticism")) / 3),
    block: Math.round((average("blocking") + average("awareness") + average("athleticism")) / 3),
    tempo: Math.round((average("resilience") + average("awareness") + average("athleticism") + average("setting")) / 4)
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

function findTryoutPositionRule(positionId) {
  return TRYOUT_POSITION_RULES.find((rule) => rule.id === positionId) || null;
}

function makeTryoutPositionLocks(defaultLocked = false) {
  const locks = {};
  for (const rule of TRYOUT_POSITION_RULES) {
    locks[rule.id] = defaultLocked;
  }
  return locks;
}

function firstTryoutPositionId(tryouts) {
  const locks = tryouts?.positionLocks || {};
  const firstUnlocked = TRYOUT_POSITION_RULES.find((rule) => !locks[rule.id]);
  return firstUnlocked?.id || TRYOUT_POSITION_RULES[0].id;
}

function getTryoutPositionCounts(tryouts, positionId) {
  if (!tryouts) return { varsity: 0, jv: 0, cut: 0, total: 0 };
  const players = (tryouts.candidates || []).filter((player) => player.position === positionId);
  const counts = { varsity: 0, jv: 0, cut: 0, total: players.length };
  for (const player of players) {
    const assignment = tryouts.assignments[player.id] || "cut";
    if (assignment === "varsity") counts.varsity += 1;
    else if (assignment === "jv") counts.jv += 1;
    else counts.cut += 1;
  }
  return counts;
}

function validateTryoutPositionLocked(tryouts, positionId) {
  const rule = findTryoutPositionRule(positionId);
  if (!rule) return { ok: false, message: "Unknown position." };
  const counts = getTryoutPositionCounts(tryouts, positionId);
  if (counts.varsity !== rule.varsity || counts.jv !== rule.jv) {
    return {
      ok: false,
      message: `${rule.label} requires Varsity ${rule.varsity} and JV ${rule.jv}.`
    };
  }
  return { ok: true };
}

function allTryoutPositionsLocked(tryouts) {
  if (!tryouts) return false;
  return TRYOUT_POSITION_RULES.every((rule) => Boolean(tryouts.positionLocks?.[rule.id]));
}

function bestLineupIds(players, captainId = null) {
  const ranked = [...players].sort((a, b) => playerOverall(b) - playerOverall(a));
  const lineup = [];
  const used = new Set();
  for (const slot of LINEUP_ROLE_SLOTS) {
    let pick = ranked.find((player) => player.position === slot.expectedPosition && !used.has(player.id));
    if (!pick) {
      pick = ranked.find((player) => !used.has(player.id));
    }
    if (!pick) break;
    lineup.push(pick.id);
    used.add(pick.id);
  }
  while (lineup.length < 6) {
    const fallback = ranked.find((player) => !used.has(player.id));
    if (!fallback) break;
    lineup.push(fallback.id);
    used.add(fallback.id);
  }
  const captain = ranked.find((player) => player.id === captainId) || null;
  if (captainId && captain?.position !== "LIB" && !lineup.includes(captainId) && ranked.some((player) => player.id === captainId)) {
    const lowestIdx = lineup
      .map((id, idx) => {
        const found = ranked.find((player) => player.id === id);
        return { id, idx, ovr: found ? playerOverall(found) : 0 };
      })
      .sort((a, b) => a.ovr - b.ovr)[0]?.idx;
    if (lowestIdx != null) lineup[lowestIdx] = captainId;
  }
  return lineup.slice(0, 6);
}

function sanitizeLineupIds(players, lineupIds, captainId = null) {
  const valid = new Set(players.map((player) => player.id));
  const unique = [];
  for (const id of lineupIds || []) {
    if (valid.has(id) && !unique.includes(id)) unique.push(id);
  }
  const ranked = [...players].sort((a, b) => playerOverall(b) - playerOverall(a));
  const captain = players.find((player) => player.id === captainId) || null;
  if (captainId && valid.has(captainId) && captain?.position !== "LIB" && !unique.includes(captainId)) {
    unique.unshift(captainId);
  }
  for (const player of ranked) {
    if (unique.length >= 6) break;
    if (!unique.includes(player.id)) unique.push(player.id);
  }
  return unique.slice(0, Math.min(6, players.length));
}

function bestLiberoId(players, lineupIds = []) {
  if (!players.length) return null;
  const lineupSet = new Set(lineupIds || []);
  const liberos = players
    .filter((player) => player.position === "LIB" && !lineupSet.has(player.id))
    .sort((a, b) => playerOverall(b) - playerOverall(a));
  if (liberos.length) return liberos[0].id;

  const backcourt = players
    .filter((player) => !lineupSet.has(player.id))
    .sort((a, b) => b.passing + b.awareness + b.resilience + b.athleticism - (a.passing + a.awareness + a.resilience + a.athleticism));
  if (backcourt.length) return backcourt[0].id;

  const anyLibero = players.filter((player) => player.position === "LIB").sort((a, b) => playerOverall(b) - playerOverall(a));
  return anyLibero[0]?.id || players[0].id;
}

function sanitizeLiberoId(players, liberoId, lineupIds = []) {
  const valid = new Set(players.map((player) => player.id));
  if (liberoId && valid.has(liberoId) && !(lineupIds || []).includes(liberoId)) return liberoId;
  return bestLiberoId(players, lineupIds);
}

function calculateOutOfPositionPenalty(players, lineupIds, liberoId = null) {
  const byId = new Map(players.map((player) => [player.id, player]));
  let penalty = 0;
  for (const slot of LINEUP_ROLE_SLOTS) {
    const player = byId.get(lineupIds?.[slot.index]);
    if (!player) {
      penalty += 1.4;
      continue;
    }
    if (player.position !== slot.expectedPosition) penalty += 1.15;
  }
  const libero = byId.get(liberoId);
  if (!libero) {
    penalty += 1.15;
  } else if (libero.position !== "LIB") {
    penalty += 0.9;
  }
  return penalty;
}

function calculateLiberoImpact(players, liberoId) {
  const libero = players.find((player) => player.id === liberoId);
  if (!libero) return -0.55;
  if (libero.position !== "LIB") return 0.05;
  return clamp(0.35 + (libero.passing + libero.awareness + libero.resilience + libero.athleticism - 240) / 85, -0.2, 1.4);
}

function ensureDefaultLineups(currentState) {
  currentState.team.defaultLineups = currentState.team.defaultLineups || {
    varsity: [],
    jv: []
  };
  currentState.team.defaultLiberos = currentState.team.defaultLiberos || {
    varsityId: null,
    jvId: null
  };
  const varsity = getVarsityPlayers(currentState);
  const jv = getJvPlayers(currentState);
  currentState.team.defaultLineups.varsity = sanitizeLineupIds(
    varsity,
    currentState.team.defaultLineups.varsity || [],
    currentState.team.captains?.varsityId
  );
  currentState.team.defaultLineups.jv = sanitizeLineupIds(
    jv,
    currentState.team.defaultLineups.jv || [],
    currentState.team.captains?.jvId
  );
  currentState.team.defaultLiberos.varsityId = sanitizeLiberoId(
    varsity,
    currentState.team.defaultLiberos.varsityId,
    currentState.team.defaultLineups.varsity
  );
  currentState.team.defaultLiberos.jvId = sanitizeLiberoId(
    jv,
    currentState.team.defaultLiberos.jvId,
    currentState.team.defaultLineups.jv
  );
}

function getDefaultLineupIds(currentState, teamType = "varsity") {
  const players = teamType === "varsity" ? getVarsityPlayers(currentState) : getJvPlayers(currentState);
  const captainId = teamType === "varsity" ? currentState.team.captains?.varsityId : currentState.team.captains?.jvId;
  const saved = currentState.team.defaultLineups?.[teamType] || [];
  return sanitizeLineupIds(players, saved.length ? saved : bestLineupIds(players, captainId), captainId);
}

function getDefaultLiberoId(currentState, teamType = "varsity") {
  const players = teamType === "varsity" ? getVarsityPlayers(currentState) : getJvPlayers(currentState);
  const lineupIds = getDefaultLineupIds(currentState, teamType);
  return sanitizeLiberoId(players, currentState.team.defaultLiberos?.[`${teamType}Id`], lineupIds);
}

function updateLineupSlot(lineupIds, slotIndex, selectedPlayerId, players, captainId = null) {
  if (!players.length) return [];
  const safeIndex = clamp(Number(slotIndex) || 0, 0, 5);
  const validIds = new Set(players.map((player) => player.id));
  if (!validIds.has(selectedPlayerId)) {
    return sanitizeLineupIds(players, lineupIds, captainId);
  }
  const next = sanitizeLineupIds(players, lineupIds, captainId);
  while (next.length < 6 && next.length < players.length) {
    const fallback = players.find((player) => !next.includes(player.id));
    if (!fallback) break;
    next.push(fallback.id);
  }
  const existing = next.indexOf(selectedPlayerId);
  if (existing >= 0) {
    [next[safeIndex], next[existing]] = [next[existing], next[safeIndex]];
  } else {
    next[safeIndex] = selectedPlayerId;
  }
  return sanitizeLineupIds(players, next, captainId);
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

function ensureTryoutPositionDepth(draft, pool) {
  let added = 0;
  for (const rule of TRYOUT_POSITION_RULES) {
    const required = rule.varsity + rule.jv;
    const current = pool.filter((player) => player.position === rule.id).length;
    const deficit = Math.max(0, required - current);
    for (let i = 0; i < deficit; i += 1) {
      pool.push(
        createPlayer(draft, {
          grade: randomInt(9, 11),
          position: rule.id,
          baseSkill: randomInt(40, 58),
          potential: randomInt(55, 91),
          origin: "walk-on",
          lastTeam: null,
          lastTeamWasTransfer: false
        })
      );
      added += 1;
    }
  }
  return added;
}

function generateTryoutPool(draft, summary = null) {
  const returning = [];
  const noShows = [];
  const transferCount = clamp(Math.floor((summary?.transferInterest ?? 0) + randomInt(0, 2)), 0, 5);
  const incomingFreshmen = randomInt(8, 13);
  const returningFreeAgents = [];
  const returningRosterPool = [];
  const priorVarsityIds = new Set(draft.team.rosters?.varsityIds || []);
  const priorJvIds = new Set(draft.team.rosters?.jvIds || []);
  const incomingCommits = (draft.program.incomingCommits || []).map((player) => ({
    ...player,
    origin: "recruit",
    lastTeam: null,
    lastTeamWasTransfer: false
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
    const lastTeam =
      player.lastTeam ||
      (priorVarsityIds.has(player.id) ? "Varsity" : priorJvIds.has(player.id) ? "JV" : "JV");
    returning.push({
      ...player,
      grade: Math.max(player.grade, 10),
      lastTeam,
      lastTeamWasTransfer: false,
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
        lastTeam: freeAgent.lastTeam || null,
        lastTeamWasTransfer: false,
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
      origin: "transfer",
      lastTeam: randomChoice(["Varsity", "JV"]),
      lastTeamWasTransfer: true
    })
  );

  const freshmen = Array.from({ length: incomingFreshmen }).map(() =>
    createPlayer(draft, {
      grade: 9,
      baseSkill: randomInt(42, 62),
      potential: randomInt(58, 96),
      origin: "freshman",
      lastTeam: null,
      lastTeamWasTransfer: false
    })
  );

  const pool = [...returning, ...incomingCommits, ...returningFreeAgents, ...transfers, ...freshmen].map(
    (candidate) => ({
      ...candidate,
      seasonStats: {
        setsPlayed: 0,
        impact: 0
      }
    })
  );
  const forcedPositionAdds = ensureTryoutPositionDepth(draft, pool);

  const minimumPool = 26;
  let extraWalkOns = 0;
  while (pool.length < minimumPool) {
    pool.push(
      createPlayer(draft, {
        grade: randomInt(9, 11),
        baseSkill: randomInt(40, 58),
        potential: randomInt(55, 91),
        origin: "walk-on",
        lastTeam: null,
        lastTeamWasTransfer: false
      })
    );
    extraWalkOns += 1;
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
    positionLocks: makeTryoutPositionLocks(false),
    activePositionId: TRYOUT_POSITION_RULES[0].id,
    summary: {
      returning: returning.length,
      noShows: noShows.length,
      transfers: transfers.length,
      freshmen: freshmen.length,
      walkOns: returningFreeAgents.length + forcedPositionAdds + extraWalkOns,
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
  const assignments = {};
  for (const candidate of draft.tryouts.candidates) {
    assignments[candidate.id] = "cut";
  }

  const scoreFor = (player) => (mode === "potential" ? player.potential : playerOverall(player));
  for (const rule of TRYOUT_POSITION_RULES) {
    const ranked = [...draft.tryouts.candidates]
      .filter((player) => player.position === rule.id)
      .sort((a, b) => scoreFor(b) - scoreFor(a));
    ranked.slice(0, rule.varsity).forEach((candidate) => {
      assignments[candidate.id] = "varsity";
    });
    ranked.slice(rule.varsity, rule.varsity + rule.jv).forEach((candidate) => {
      assignments[candidate.id] = "jv";
    });
  }

  draft.tryouts.assignments = assignments;
  draft.tryouts.positionLocks = makeTryoutPositionLocks(true);
  draft.tryouts.activePositionId = TRYOUT_POSITION_RULES[TRYOUT_POSITION_RULES.length - 1].id;

  const rankedVarsity = draft.tryouts.candidates
    .filter((player) => assignments[player.id] === "varsity")
    .sort((a, b) => b.leadership - a.leadership || playerOverall(b) - playerOverall(a));
  const rankedJv = draft.tryouts.candidates
    .filter((player) => assignments[player.id] === "jv")
    .sort((a, b) => b.leadership - a.leadership || playerOverall(b) - playerOverall(a));
  draft.tryouts.captainSelections = {
    varsityId: rankedVarsity[0]?.id || null,
    jvId: rankedJv[0]?.id || null
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
  if (!allTryoutPositionsLocked(draft.tryouts)) {
    return { ok: false, message: "Lock each position group before finalizing tryouts." };
  }
  for (const rule of TRYOUT_POSITION_RULES) {
    const validation = validateTryoutPositionLocked(draft.tryouts, rule.id);
    if (!validation.ok) return validation;
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
    lastTeam: varsities.some((candidate) => candidate.id === player.id) ? "Varsity" : "JV",
    lastTeamWasTransfer: false,
    yearsInProgram: (player.yearsInProgram ?? 0) + 1
  }));

  draft.program.freeAgents = [...cuts, ...(draft.program.noShowPlayers || [])].map((player) => ({
    ...player,
    lastTeam: player.lastTeam || null,
    lastTeamWasTransfer: false,
    yearsInProgram: player.yearsInProgram ?? 0
  }));

  draft.team.rosters.varsityIds = varsities.map((player) => player.id);
  draft.team.rosters.jvIds = jvs.map((player) => player.id);
  draft.team.captains = {
    varsityId: varsityCaptainId,
    jvId: jvCaptainId
  };
  draft.team.defaultLineups = {
    varsity: sanitizeLineupIds(varsities, bestLineupIds(varsities, varsityCaptainId), varsityCaptainId),
    jv: sanitizeLineupIds(jvs, bestLineupIds(jvs, jvCaptainId), jvCaptainId)
  };
  draft.team.defaultLiberos = {
    varsityId: sanitizeLiberoId(varsities, null, draft.team.defaultLineups.varsity),
    jvId: sanitizeLiberoId(jvs, null, draft.team.defaultLineups.jv)
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

function computeVaristyPowerForMatch(currentState, week, opponent, lineupIds = null, liberoId = null) {
  const varsity = getVarsityPlayers(currentState);
  const rosterPower = computeRosterPower(varsity);
  const activeLineupIds = sanitizeLineupIds(
    varsity,
    lineupIds && lineupIds.length ? lineupIds : bestLineupIds(varsity, currentState.team.captains?.varsityId),
    currentState.team.captains?.varsityId
  );
  const activeLiberoId = sanitizeLiberoId(varsity, liberoId || getDefaultLiberoId(currentState, "varsity"), activeLineupIds);
  const captainIds = [...activeLineupIds, activeLiberoId].filter(Boolean);
  const captainEffect = calculateCaptainEffect(currentState, "varsity", varsity, captainIds);
  const lineupDelta = (lineupPower(varsity, activeLineupIds) - rosterPower) / 2.8;
  const liberoImpact = calculateLiberoImpact(varsity, activeLiberoId);
  const outOfPositionPenalty = calculateOutOfPositionPenalty(varsity, activeLineupIds, activeLiberoId);
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
    base:
      rosterPower +
      chemistryBoost +
      focusBonus +
      upgradeBonus +
      homeBonus +
      captainEffect +
      lineupDelta +
      liberoImpact -
      outOfPositionPenalty,
    weeklyEffects,
    varsity,
    captainEffect,
    lineupDelta,
    liberoImpact,
    outOfPositionPenalty,
    lineupIds: activeLineupIds,
    liberoId: activeLiberoId
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
      const orderedSkills = growthSkillOrderForPosition(player.position);
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
  const lineupIds = pregame?.lineupIds || getDefaultLineupIds(draft, "varsity");
  const liberoId = pregame?.liberoId || getDefaultLiberoId(draft, "varsity");
  const teamContext = computeVaristyPowerForMatch(draft, week, opponent, lineupIds, liberoId);
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
    lineupIds: teamContext.lineupIds,
    liberoId: teamContext.liberoId
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
    liberoId: context.liberoId || null,
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
    liberoId: pregame?.liberoId || context.liberoId || null,
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
  ensureDefaultLineups(draft);
  const defaultLineup = getDefaultLineupIds(draft, "varsity");
  const defaultLiberoId = getDefaultLiberoId(draft, "varsity");
  draft.team.defaultLineups.varsity = [...defaultLineup];
  draft.team.defaultLiberos.varsityId = defaultLiberoId;
  const lineupSet = new Set(defaultLineup);
  const bench = varsity
    .filter((player) => !lineupSet.has(player.id) && player.id !== defaultLiberoId)
    .map((player) => player.id);
  match.status = "pregame";
  match.pregame = {
    gameplan: "balanced",
    lineupIds: defaultLineup,
    liberoId: defaultLiberoId,
    benchIds: bench
  };
  return { ok: true, pregameOpened: true, message: `Match prep opened vs ${match.opponentName}.` };
}

function lockMatchPregame(draft, weekId, matchId) {
  const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
  if (!week || week.kind !== "league") return { ok: false, message: "Week not found." };
  ensureDefaultLineups(draft);
  const match = week.matches.find((candidate) => candidate.id === matchId);
  if (!match || match.status !== "pregame" || !match.pregame) {
    return { ok: false, message: "No pregame setup to lock." };
  }
  const varsity = getVarsityPlayers(draft);
  const lineupIds = sanitizeLineupIds(varsity, match.pregame.lineupIds || [], draft.team.captains?.varsityId);
  const liberoId = sanitizeLiberoId(varsity, match.pregame.liberoId, lineupIds);
  match.pregame.lineupIds = lineupIds;
  match.pregame.liberoId = liberoId;
  if (lineupIds.length !== 6) {
    return { ok: false, message: "Select exactly 6 starters before locking pregame." };
  }
  if (!liberoId) {
    return { ok: false, message: "Select a libero before locking pregame." };
  }
  draft.team.defaultLineups.varsity = [...lineupIds];
  draft.team.defaultLiberos.varsityId = liberoId;
  match.pregame.benchIds = varsity
    .filter((player) => !lineupIds.includes(player.id) && player.id !== liberoId)
    .map((player) => player.id);
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
    teamContext: computeVaristyPowerForMatch(draft, week, opponent, match.live.lineupIds, match.live.liberoId),
    teamPower: match.live.teamPower,
    opponentPower: match.live.opponentPower,
    gameplan: match.live.gameplan,
    lineupIds: match.live.lineupIds,
    liberoId: match.live.liberoId
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
    const growthOrder = growthSkillOrderForPosition(next.position);
    for (let i = 0; i < growthShots; i += 1) {
      const key = growthOrder[i % growthOrder.length] || randomChoice(SKILLS);
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
  draft.team.defaultLineups = {
    varsity: [],
    jv: []
  };
  draft.team.defaultLiberos = {
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
      },
      defaultLineups: {
        varsity: [],
        jv: []
      },
      defaultLiberos: {
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
      grade: randomInt(10, 11),
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
  migrated.avatarSeed = migrated.avatarSeed ?? `${migrated.id || migrated.name || "legacy"}-${hashSeed(migrated.name || migrated.id || Date.now())}`;
  migrated.lastTeam = migrated.lastTeam ?? null;
  migrated.lastTeamWasTransfer = Boolean(migrated.lastTeamWasTransfer);
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
  migrated.athleticism = clamp(migrated.athleticism ?? athleticismSeed, 30, 99);
  migrated.awareness = clamp(
    migrated.awareness ?? Math.round((defenseSeed + settingSeed) / 2 + randomInt(-4, 4)),
    30,
    99
  );
  migrated.resilience = clamp(
    migrated.resilience ?? Math.round((migrated.athleticism + defenseSeed) / 2 + randomInt(-4, 4)),
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
  normalized.team = normalized.team || {
    chemistry: 55,
    rosters: { varsityIds: [], jvIds: [] },
    defaultLineups: { varsity: [], jv: [] },
    defaultLiberos: { varsityId: null, jvId: null }
  };
  normalized.team.rosters = normalized.team.rosters || { varsityIds: [], jvIds: [] };
  normalized.team.captains = normalized.team.captains || { varsityId: null, jvId: null };
  normalized.team.defaultLineups = normalized.team.defaultLineups || { varsity: [], jv: [] };
  normalized.team.defaultLiberos = normalized.team.defaultLiberos || { varsityId: null, jvId: null };
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
  ensureDefaultLineups(normalized);
  if (normalized.tryouts?.candidates) {
    normalized.tryouts.candidates = normalized.tryouts.candidates.map(migrateLegacyPlayer);
    normalized.tryouts.positionLocks = normalized.tryouts.positionLocks || makeTryoutPositionLocks(false);
    for (const rule of TRYOUT_POSITION_RULES) {
      if (normalized.tryouts.positionLocks[rule.id] == null) normalized.tryouts.positionLocks[rule.id] = false;
    }
    normalized.tryouts.activePositionId = normalized.tryouts.activePositionId || firstTryoutPositionId(normalized.tryouts);
    if (!findTryoutPositionRule(normalized.tryouts.activePositionId)) {
      normalized.tryouts.activePositionId = firstTryoutPositionId(normalized.tryouts);
    }
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
    if (!["matchday", "standings", "players", "lineup"].includes(normalized.season.viewTab)) {
      normalized.season.viewTab = "matchday";
    }
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
        if (match.pregame) {
          const varsity = getVarsityPlayers(normalized);
          match.pregame.lineupIds = sanitizeLineupIds(
            varsity,
            match.pregame.lineupIds || [],
            normalized.team.captains?.varsityId
          );
          match.pregame.liberoId = sanitizeLiberoId(
            varsity,
            match.pregame.liberoId || normalized.team.defaultLiberos?.varsityId,
            match.pregame.lineupIds
          );
          match.pregame.benchIds = varsity
            .filter((player) => !match.pregame.lineupIds.includes(player.id) && player.id !== match.pregame.liberoId)
            .map((player) => player.id);
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
  draft.team.defaultLineups = { varsity: [], jv: [] };
  draft.team.defaultLiberos = { varsityId: null, jvId: null };
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
  ensureDefaultLineups(draft);
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

function resetProgressToNewCareer() {
  state = createInitialState();
  state.notices = [{ id: Date.now(), tone: "good", message: "Progress reset. New career ready." }];
  runtime.avatarCache.clear();
  runtime.optionsMenuOpen = false;
  runtime.resetConfirmOpen = false;
  persistState();
  render();
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  if (action === "toggle-options-menu") {
    runtime.optionsMenuOpen = !runtime.optionsMenuOpen;
    if (!runtime.optionsMenuOpen) runtime.resetConfirmOpen = false;
    render();
    return;
  }

  if (action === "close-options-menu") {
    runtime.optionsMenuOpen = false;
    runtime.resetConfirmOpen = false;
    render();
    return;
  }

  if (action === "open-reset-progress-confirm") {
    runtime.optionsMenuOpen = true;
    runtime.resetConfirmOpen = true;
    render();
    return;
  }

  if (action === "cancel-reset-progress") {
    runtime.resetConfirmOpen = false;
    render();
    return;
  }

  if (action === "confirm-reset-progress") {
    resetProgressToNewCareer();
    return;
  }

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
        draft.notices = [{ id: Date.now(), tone: "good", message: `Tryouts auto-filled by ${mode}.` }];
      },
      `tryout-autofill-${mode}`
    );
    return;
  }

  if (action === "tryout-position") {
    const positionId = target.dataset.positionId;
    mutate(
      (draft) => {
        if (!draft.tryouts) return;
        if (!findTryoutPositionRule(positionId)) return;
        draft.tryouts.activePositionId = positionId;
      },
      "tryout-position"
    );
    return;
  }

  if (action === "tryout-lock-position") {
    mutate(
      (draft) => {
        if (!draft.tryouts) return;
        draft.tryouts.positionLocks = draft.tryouts.positionLocks || makeTryoutPositionLocks(false);
        const activePosition = draft.tryouts.activePositionId || firstTryoutPositionId(draft.tryouts);
        const currentlyLocked = Boolean(draft.tryouts.positionLocks?.[activePosition]);
        if (currentlyLocked) {
          draft.tryouts.positionLocks[activePosition] = false;
          draft.notices = [{ id: Date.now(), tone: "neutral", message: `${positionLabel(activePosition)} unlocked for edits.` }];
          return;
        }
        const validation = validateTryoutPositionLocked(draft.tryouts, activePosition);
        if (!validation.ok) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: validation.message }];
          return;
        }
        draft.tryouts.positionLocks[activePosition] = true;
        const next = TRYOUT_POSITION_RULES.find((rule) => !draft.tryouts.positionLocks[rule.id]);
        if (next) draft.tryouts.activePositionId = next.id;
        draft.notices = [
          {
            id: Date.now(),
            tone: "good",
            message: next
              ? `${positionLabel(activePosition)} locked. Next up: ${next.label}.`
              : "All position groups locked. Select captains and finalize tryouts."
          }
        ];
      },
      "tryout-lock-position"
    );
    return;
  }

  if (action === "set-assignment") {
    const playerId = target.dataset.playerId;
    const value = target.dataset.value;
    mutate(
      (draft) => {
        if (!draft.tryouts?.assignments[playerId]) return;
        draft.tryouts.positionLocks = draft.tryouts.positionLocks || makeTryoutPositionLocks(false);
        const player = draft.tryouts.candidates.find((candidate) => candidate.id === playerId);
        if (!player) return;
        const activePosition = draft.tryouts.activePositionId || firstTryoutPositionId(draft.tryouts);
        if (player.position !== activePosition) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: `Finish ${positionLabel(activePosition)} assignments first.` }];
          return;
        }
        if (draft.tryouts.positionLocks?.[activePosition]) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: `${positionLabel(activePosition)} is locked.` }];
          return;
        }
        const rule = findTryoutPositionRule(activePosition);
        const currentAssignment = draft.tryouts.assignments[playerId] || "cut";
        const counts = getTryoutPositionCounts(draft.tryouts, activePosition);
        if (value === "varsity" && currentAssignment !== "varsity" && counts.varsity >= (rule?.varsity || 0)) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: `${rule?.label || activePosition} Varsity quota is full.` }];
          return;
        }
        if (value === "jv" && currentAssignment !== "jv" && counts.jv >= (rule?.jv || 0)) {
          draft.notices = [{ id: Date.now(), tone: "bad", message: `${rule?.label || activePosition} JV quota is full.` }];
          return;
        }
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
        if (!["matchday", "standings", "players", "lineup"].includes(tab)) return;
        draft.season.viewTab = tab;
      },
      "season-tab"
    );
    return;
  }

  if (action === "default-lineup-auto") {
    const teamType = target.dataset.team || "varsity";
    mutate(
      (draft) => {
        ensureDefaultLineups(draft);
        const players = teamType === "varsity" ? getVarsityPlayers(draft) : getJvPlayers(draft);
        const captainId = teamType === "varsity" ? draft.team.captains?.varsityId : draft.team.captains?.jvId;
        if (!players.length) return;
        draft.team.defaultLineups[teamType] = bestLineupIds(players, captainId);
        const liberoKey = teamType === "varsity" ? "varsityId" : "jvId";
        draft.team.defaultLiberos[liberoKey] = sanitizeLiberoId(players, null, draft.team.defaultLineups[teamType]);
        draft.notices = [
          {
            id: Date.now(),
            tone: "good",
            message: `Default ${teamType.toUpperCase()} lineup reset to best available six.`
          }
        ];
      },
      "default-lineup-auto"
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

  if (action === "default-lineup-slot") {
    const slot = Number(target.dataset.slot);
    const teamType = target.dataset.team || "varsity";
    const playerId = target.value;
    mutate(
      (draft) => {
        ensureDefaultLineups(draft);
        const players = teamType === "varsity" ? getVarsityPlayers(draft) : getJvPlayers(draft);
        if (!players.length) return;
        const captainId = teamType === "varsity" ? draft.team.captains?.varsityId : draft.team.captains?.jvId;
        const lineup = updateLineupSlot(draft.team.defaultLineups[teamType], slot, playerId, players, captainId);
        draft.team.defaultLineups[teamType] = lineup;
        const liberoKey = teamType === "varsity" ? "varsityId" : "jvId";
        draft.team.defaultLiberos[liberoKey] = sanitizeLiberoId(players, draft.team.defaultLiberos[liberoKey], lineup);
      },
      "default-lineup-slot"
    );
    return;
  }

  if (action === "default-libero") {
    const teamType = target.dataset.team || "varsity";
    const playerId = target.value || null;
    mutate(
      (draft) => {
        ensureDefaultLineups(draft);
        const players = teamType === "varsity" ? getVarsityPlayers(draft) : getJvPlayers(draft);
        const lineup = draft.team.defaultLineups[teamType] || [];
        const liberoKey = teamType === "varsity" ? "varsityId" : "jvId";
        draft.team.defaultLiberos[liberoKey] = sanitizeLiberoId(players, playerId, lineup);
      },
      "default-libero"
    );
    return;
  }

  if (action === "pregame-lineup-slot") {
    const weekId = target.dataset.weekId;
    const matchId = target.dataset.matchId;
    const slot = Number(target.dataset.slot);
    const playerId = target.value;
    mutate(
      (draft) => {
        const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
        if (!week || week.kind !== "league") return;
        const match = week.matches.find((candidate) => candidate.id === matchId);
        if (!match || match.status !== "pregame" || !match.pregame) return;
        const varsity = getVarsityPlayers(draft);
        const lineup = updateLineupSlot(
          match.pregame.lineupIds || [],
          slot,
          playerId,
          varsity,
          draft.team.captains?.varsityId
        );
        match.pregame.lineupIds = lineup;
        match.pregame.liberoId = sanitizeLiberoId(varsity, match.pregame.liberoId, lineup);
        match.pregame.benchIds = varsity
          .filter((player) => !lineup.includes(player.id) && player.id !== match.pregame.liberoId)
          .map((player) => player.id);
      },
      "pregame-lineup-slot"
    );
    return;
  }

  if (action === "pregame-libero") {
    const weekId = target.dataset.weekId;
    const matchId = target.dataset.matchId;
    const playerId = target.value || null;
    mutate(
      (draft) => {
        const week = draft.season.weeks.find((candidate) => candidate.id === weekId);
        if (!week || week.kind !== "league") return;
        const match = week.matches.find((candidate) => candidate.id === matchId);
        if (!match || match.status !== "pregame" || !match.pregame) return;
        const varsity = getVarsityPlayers(draft);
        match.pregame.liberoId = sanitizeLiberoId(varsity, playerId, match.pregame.lineupIds || []);
        match.pregame.benchIds = varsity
          .filter((player) => !(match.pregame.lineupIds || []).includes(player.id) && player.id !== match.pregame.liberoId)
          .map((player) => player.id);
      },
      "pregame-libero"
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
        const varsity = getVarsityPlayers(draft);
        const lineup = sanitizeLineupIds(varsity, array, draft.team.captains?.varsityId);
        match.pregame.lineupIds = lineup;
        match.pregame.liberoId = sanitizeLiberoId(varsity, match.pregame.liberoId, lineup);
        const lineupSet = new Set(lineup);
        match.pregame.benchIds = varsity
          .filter((player) => !lineupSet.has(player.id) && player.id !== match.pregame.liberoId)
          .map((player) => player.id);
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

function renderGlobalMenuButton() {
  return `
    <button class="global-menu-fab" data-action="toggle-options-menu" aria-label="Open options menu" aria-expanded="${runtime.optionsMenuOpen ? "true" : "false"}">☰</button>
  `;
}

function renderOptionsMenu() {
  if (!runtime.optionsMenuOpen) return "";

  const body = runtime.resetConfirmOpen
    ? `
      <h3>Reset Progress</h3>
      <p class="subtle">This will permanently erase your current autosave and restart from the very beginning.</p>
      <p class="footnote">This cannot be undone.</p>
      <div class="line" style="margin-top:0.8rem;">
        <button class="btn btn-secondary" data-action="cancel-reset-progress">Cancel</button>
        <button class="btn btn-danger" data-action="confirm-reset-progress">Yes, Reset</button>
      </div>
    `
    : `
      <h3>Options</h3>
      <p class="subtle">Manage game settings and save actions.</p>
      <div class="stack" style="margin-top:0.65rem;">
        <button class="btn btn-danger" data-action="open-reset-progress-confirm">Reset Progress</button>
        <button class="btn btn-secondary" data-action="close-options-menu">Close</button>
      </div>
    `;

  return `
    <div class="menu-overlay" data-action="close-options-menu"></div>
    <div class="options-menu card">
      ${body}
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
                      <td>${renderPlayerIdentity(player, true)}</td>
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
  const tryouts = state.tryouts;
  const candidates = tryouts.candidates || [];
  const counts = recalcRosterAssignmentsCounts(tryouts);
  const locks = tryouts.positionLocks || makeTryoutPositionLocks(false);
  const activePositionId =
    tryouts.activePositionId && findTryoutPositionRule(tryouts.activePositionId)
      ? tryouts.activePositionId
      : firstTryoutPositionId(tryouts);
  const activeRule = findTryoutPositionRule(activePositionId) || TRYOUT_POSITION_RULES[0];
  const activeLocked = Boolean(locks[activePositionId]);
  const allLocked = allTryoutPositionsLocked(tryouts);
  const activeCounts = getTryoutPositionCounts(tryouts, activePositionId);
  const activeFocusSkills = tryoutSkillPriorityForPosition(activePositionId).slice(0, 6);
  const focusDescriptions = {
    LIB: "Prioritize serve receive floor control and defensive consistency.",
    OH: "Prioritize terminal offense with stable passing in transition.",
    MB: "Prioritize blocking range, quick attacks, and first-step movement.",
    S: "Prioritize decision quality, distribution, and offense orchestration.",
    RS: "Prioritize right-side scoring, block pressure, and point-finishing."
  };
  const activePlayers = candidates
    .filter((player) => player.position === activePositionId)
    .sort((a, b) => positionFitScore(b, activePositionId) - positionFitScore(a, activePositionId) || playerOverall(b) - playerOverall(a));
  const varsityCandidates = candidates
    .filter((player) => tryouts.assignments[player.id] === "varsity")
    .sort((a, b) => b.leadership - a.leadership);
  const jvCandidates = candidates
    .filter((player) => tryouts.assignments[player.id] === "jv")
    .sort((a, b) => b.leadership - a.leadership);

  return `
    <div class="stack">
      <div class="card">
        <h2>Tryouts</h2>
        <p class="subtle">Assign one position group at a time, then lock it in before moving to the next. Quotas: LIB 2/2, OH 3/3, MB 3/3, S 2/2, RS 2/2.</p>
        <div class="grid-three" style="margin-top:0.7rem;">
          <div class="kpi"><strong>${tryouts.summary.returning}</strong><span>Returning Tryouts</span></div>
          <div class="kpi"><strong>${tryouts.summary.transfers}</strong><span>Transfers</span></div>
          <div class="kpi"><strong>${tryouts.summary.noShows}</strong><span>No-Shows</span></div>
          <div class="kpi"><strong>${tryouts.summary.recruits || 0}</strong><span>Signed Recruits</span></div>
        </div>
        <div class="line" style="margin-top:0.8rem; flex-wrap:wrap; align-items:flex-start;">
          <div>
            <span class="tag">Varsity ${counts.varsity}/12</span>
            <span class="tag">JV ${counts.jv}/12</span>
            <span class="tag">Cuts ${counts.cut}</span>
            <span class="tag">${allLocked ? "All Position Groups Locked" : "Position Groups In Progress"}</span>
          </div>
          <div>
            <button class="btn btn-secondary" data-action="tryout-autofill" data-mode="skill">Auto by Skill</button>
            <button class="btn btn-secondary" data-action="tryout-autofill" data-mode="potential">Auto by Potential</button>
          </div>
        </div>
        <div class="tryout-position-nav" style="margin-top:0.75rem;">
          ${TRYOUT_POSITION_RULES.map((rule) => {
            const ruleCounts = getTryoutPositionCounts(tryouts, rule.id);
            const done = Boolean(locks[rule.id]);
            const active = rule.id === activePositionId;
            return `
              <button class="btn ${active ? "btn-accent" : "btn-secondary"} tryout-position-pill ${done ? "done" : ""}" data-action="tryout-position" data-position-id="${rule.id}">
                ${rule.label} ${done ? "✓" : ""}
                <span class="footnote">${ruleCounts.varsity}/${rule.varsity} V · ${ruleCounts.jv}/${rule.jv} JV</span>
              </button>
            `;
          }).join("")}
        </div>
        <div class="line" style="margin-top:0.7rem; justify-content:flex-start; flex-wrap:wrap;">
          <span class="tag">Active: ${activeRule.label}</span>
          <span class="tag">Varsity ${activeCounts.varsity}/${activeRule.varsity}</span>
          <span class="tag">JV ${activeCounts.jv}/${activeRule.jv}</span>
          <button class="btn ${activeLocked ? "btn-secondary" : "btn-primary"}" data-action="tryout-lock-position">
            ${activeLocked ? `Unlock ${activeRule.label}` : `Lock ${activeRule.label}`}
          </button>
        </div>
        <p class="footnote" style="margin-top:0.55rem;">${focusDescriptions[activePositionId] || "Prioritize role fit for this position group."}</p>
        <div class="grid-two" style="margin-top:0.8rem;">
          <label>
            Varsity Captain
            <select class="select" data-action="tryout-captain-varsity">
              <option value="">Select Varsity captain</option>
              ${varsityCandidates
                .map(
                  (player) =>
                    `<option value="${player.id}" ${tryouts.captainSelections?.varsityId === player.id ? "selected" : ""}>${player.name} (OVR ${playerOverall(player)}, LDR ${player.leadership})</option>`
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
                    `<option value="${player.id}" ${tryouts.captainSelections?.jvId === player.id ? "selected" : ""}>${player.name} (OVR ${playerOverall(player)}, LDR ${player.leadership})</option>`
                )
                .join("")}
            </select>
          </label>
        </div>
      </div>

      <div class="card">
        <div class="line" style="margin-bottom:0.6rem; gap:0.45rem; align-items:flex-start;">
          <div>
            <h3 style="margin:0;">${activeRule.label} Candidates</h3>
            <p class="subtle" style="margin:0.2rem 0 0;">Set assignments for this role only. Sort order favors position fit.</p>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:0.28rem;">
            ${activeFocusSkills.map((skill) => `<span class="tag">${skillShortLabel(skill)}</span>`).join("")}
          </div>
        </div>
        <div class="tryout-player-list">
          ${activePlayers
            .map((player) => {
              const estimated = estimatePotential(player, state.career.upgrades.potentialVision);
              const assignment = tryouts.assignments[player.id] || "cut";
              const fitScore = positionFitScore(player, activePositionId);
              const varsityDisabled =
                activeLocked ||
                (assignment !== "varsity" && activeCounts.varsity >= activeRule.varsity);
              const jvDisabled =
                activeLocked ||
                (assignment !== "jv" && activeCounts.jv >= activeRule.jv);
              const assignmentLabel = assignment === "varsity" ? "Varsity" : assignment === "jv" ? "JV" : "Cut";
              const assignmentClass = assignment === "varsity" ? "good" : assignment === "jv" ? "" : "bad";
              return `
                <article class="tryout-player-card assignment-${assignment}">
                  <div class="line" style="align-items:flex-start; gap:0.45rem;">
                    <div>
                      ${renderPlayerIdentity(player, true)}
                      <div class="footnote" style="margin-top:0.2rem;">${gradeLabel(player.grade)} · ${positionLabel(player.position)}</div>
                    </div>
                    <span class="tag ${assignmentClass}">${assignmentLabel}</span>
                  </div>
                  <div class="tryout-player-metrics">
                    <span class="tag">OVR ${playerOverall(player)}</span>
                    <span class="tag">Pot ${estimated}</span>
                    <span class="tag">Fit ${fitScore}</span>
                    <span class="tag">Prev ${previousTeamLabel(player)}</span>
                  </div>
                  <div class="tryout-physical-grid">
                    <div><strong>Ht</strong><span>${formatHeight(player.heightInches)}</span></div>
                    <div><strong>Reach</strong><span>${formatHeight(player.standingReach)}</span></div>
                    <div><strong>BT</strong><span>${formatHeight(player.blockTouch)}</span></div>
                    <div><strong>AT</strong><span>${formatHeight(player.approachTouch)}</span></div>
                  </div>
                  <div class="tryout-skill-grid">
                    ${activeFocusSkills
                      .map((skill) => `<div><span>${skillShortLabel(skill)}</span><strong>${player[skill]}</strong></div>`)
                      .join("")}
                  </div>
                  <div class="tryout-assignment-row">
                    <button class="btn ${(assignment === "varsity") ? "btn-primary" : "btn-secondary"}" data-action="set-assignment" data-player-id="${player.id}" data-value="varsity" ${(assignment === "varsity" || varsityDisabled) ? "disabled" : ""}>Varsity</button>
                    <button class="btn ${(assignment === "jv") ? "btn-accent" : "btn-secondary"}" data-action="set-assignment" data-player-id="${player.id}" data-value="jv" ${(assignment === "jv" || jvDisabled) ? "disabled" : ""}>JV</button>
                    <button class="btn ${(assignment === "cut") ? "btn-danger" : "btn-secondary"}" data-action="set-assignment" data-player-id="${player.id}" data-value="cut" ${(assignment === "cut" || activeLocked) ? "disabled" : ""}>Cut</button>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </div>

      <div class="card">
        <button class="btn btn-primary" data-action="finalize-tryouts" ${allLocked ? "" : "disabled"}>Lock Rosters</button>
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

function renderLineupBoard(players, lineupIds, opts = {}) {
  const editable = Boolean(opts.editable);
  const teamType = opts.teamType || "varsity";
  const action = opts.action || "default-lineup-slot";
  const captainId = opts.captainId || null;
  const liberoAction = opts.liberoAction || null;
  const sortedPlayers = [...players].sort((a, b) => playerOverall(b) - playerOverall(a));
  const normalizedLineup = sanitizeLineupIds(sortedPlayers, lineupIds || [], captainId);
  const liberoId = sanitizeLiberoId(sortedPlayers, opts.liberoId || null, normalizedLineup);
  const lineupMap = new Map(sortedPlayers.map((player) => [player.id, player]));
  const lineupSet = new Set(normalizedLineup);
  const benchPlayers = sortedPlayers.filter((player) => !lineupSet.has(player.id) && player.id !== liberoId);
  const oopPenalty = calculateOutOfPositionPenalty(sortedPlayers, normalizedLineup, liberoId);
  const liberoPlayer = lineupMap.get(liberoId) || null;
  const liberoAttrs = [
    `data-action="${liberoAction || "default-libero"}"`,
    teamType ? `data-team="${teamType}"` : "",
    opts.weekId ? `data-week-id="${opts.weekId}"` : "",
    opts.matchId ? `data-match-id="${opts.matchId}"` : ""
  ]
    .filter(Boolean)
    .join(" ");

  const slotHtml = LINEUP_SLOT_ORDER.map((slot) => {
    const slotRule = LINEUP_ROLE_SLOTS.find((entry) => entry.index === slot);
    const expectedPos = slotRule?.expectedPosition || "";
    const playerId = normalizedLineup[slot] || "";
    const player = lineupMap.get(playerId) || null;
    const mismatch = Boolean(player && expectedPos && player.position !== expectedPos);
    const selectAttrs = [
      `data-action="${action}"`,
      `data-slot="${slot}"`,
      teamType ? `data-team="${teamType}"` : "",
      opts.weekId ? `data-week-id="${opts.weekId}"` : "",
      opts.matchId ? `data-match-id="${opts.matchId}"` : ""
    ]
      .filter(Boolean)
      .join(" ");
    return `
      <div class="lineup-slot slot-${slot + 1}">
        <div class="lineup-slot-index">#${slot + 1}</div>
        <div class="lineup-slot-role">${slotRule?.label || "Role"} (${expectedPos})</div>
        ${
          player
            ? `<img class="pixel-avatar lineup-avatar" src="${avatarDataUriForPlayer(player)}" alt="${player.name}" />`
            : `<div class="lineup-avatar lineup-avatar-empty"></div>`
        }
        <div class="lineup-slot-name">${player ? player.name : "Open Slot"}</div>
        <div class="footnote">${player ? `${player.position} | OVR ${playerOverall(player)} | LDR ${player.leadership}` : "Select a starter"}</div>
        ${mismatch ? `<div class="footnote negative">Out of position penalty</div>` : ""}
        ${
          editable
            ? `
            <select class="select lineup-select" ${selectAttrs}>
              ${sortedPlayers
                .map(
                  (candidate) =>
                    `<option value="${candidate.id}" ${candidate.id === playerId ? "selected" : ""}>${candidate.name} (${candidate.position}, OVR ${playerOverall(candidate)})</option>`
                )
                .join("")}
            </select>
          `
            : ""
        }
      </div>
    `;
  }).join("");

  const benchHtml = benchPlayers.length
    ? benchPlayers
        .map(
          (player) => `
            <span class="bench-chip">
              <img class="pixel-avatar bench-avatar" src="${avatarDataUriForPlayer(player)}" alt="${player.name}" />
              <span>${player.name} (${player.position}, ${playerOverall(player)})</span>
            </span>
          `
        )
        .join("")
    : `<span class="subtle">No bench players available.</span>`;

  return `
    <div class="lineup-board-wrap">
      <div class="lineup-board-header">
        <h4>${opts.title || "Lineup"}</h4>
        <p class="subtle">${opts.subtitle || "Set your on-court rotation and bench order."}</p>
        <p class="footnote">5-1 structure: 2 OH, 2 MB, 1 S, 1 Opposite, plus 1 Libero. Current out-of-position penalty: ${oopPenalty.toFixed(1)}.</p>
      </div>
      <div class="lineup-court">
        ${slotHtml}
      </div>
      <div class="lineup-libero">
        <strong>Libero</strong>
        <div class="lineup-libero-row">
          ${
            liberoPlayer
              ? `<span class="bench-chip"><img class="pixel-avatar bench-avatar" src="${avatarDataUriForPlayer(liberoPlayer)}" alt="${liberoPlayer.name}" /><span>${liberoPlayer.name} (${liberoPlayer.position}, ${playerOverall(liberoPlayer)})</span></span>`
              : `<span class="subtle">No libero selected.</span>`
          }
          ${
            editable
              ? `
                <select class="select lineup-libero-select" ${liberoAttrs}>
                  ${sortedPlayers
                    .map(
                      (candidate) =>
                        `<option value="${candidate.id}" ${candidate.id === liberoId ? "selected" : ""}>${candidate.name} (${candidate.position}, OVR ${playerOverall(candidate)})</option>`
                    )
                    .join("")}
                </select>
              `
              : ""
          }
        </div>
      </div>
      <div class="lineup-bench">
        <strong>Bench</strong>
        <div class="lineup-bench-list">${benchHtml}</div>
      </div>
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
    const pregameLineup = sanitizeLineupIds(varsity, match.pregame.lineupIds || [], state.team.captains?.varsityId);
    const pregameLibero = sanitizeLiberoId(varsity, match.pregame.liberoId, pregameLineup);
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
        <div style="margin-top:0.65rem;">
          ${renderLineupBoard(varsity, pregameLineup, {
            editable: true,
            action: "pregame-lineup-slot",
            liberoId: pregameLibero,
            liberoAction: "pregame-libero",
            teamType: "varsity",
            weekId: week.id,
            matchId: match.id,
            captainId: state.team.captains?.varsityId,
            title: "Match Lineup",
            subtitle: "This starts from your saved default lineup. Adjust if needed for this opponent."
          })}
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
    const libero = getVarsityPlayers(state).find((player) => player.id === live.liberoId);
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
        <p class="footnote">Libero: ${libero ? `${libero.name} (${libero.position})` : "Unset"}.</p>
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
              <th class="right">ATH</th>
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
                    <td>${renderPlayerIdentity(player, true)} ${captainTag}</td>
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
                    <td class="right">${player.athleticism}</td>
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

function renderSeasonLineupTab() {
  const varsity = getVarsityPlayers(state).slice().sort((a, b) => playerOverall(b) - playerOverall(a));
  if (!varsity.length) {
    return `
      <div class="card">
        <h3>Default Lineup</h3>
        <p class="subtle">No Varsity roster found.</p>
      </div>
    `;
  }
  const lineup = getDefaultLineupIds(state, "varsity");
  const liberoId = getDefaultLiberoId(state, "varsity");
  const libero = varsity.find((player) => player.id === liberoId);
  const captain = varsity.find((player) => player.id === state.team.captains?.varsityId);
  const lineupLeadership = lineup
    .map((id) => varsity.find((player) => player.id === id))
    .filter(Boolean)
    .reduce((sum, player) => sum + player.leadership, 0);
  const averageLeadership = Math.round(lineupLeadership / Math.max(lineup.length, 1));
  return `
    <div class="card">
      <h3>Default Varsity Lineup</h3>
      <p class="subtle">This lineup is auto-loaded every time you open pregame match prep.</p>
      <div class="line" style="justify-content:flex-start; gap:0.45rem; flex-wrap:wrap; margin-top:0.45rem;">
        <span class="tag">Captain: ${captain ? `${captain.name} (LDR ${captain.leadership})` : "Unset"}</span>
        <span class="tag">Libero: ${libero ? `${libero.name} (${libero.position})` : "Unset"}</span>
        <span class="tag">Lineup Avg LDR ${averageLeadership}</span>
      </div>
      <div style="margin-top:0.6rem;">
        ${renderLineupBoard(varsity, lineup, {
          editable: true,
          action: "default-lineup-slot",
          liberoId,
          liberoAction: "default-libero",
          teamType: "varsity",
          captainId: state.team.captains?.varsityId,
          title: "Court View",
          subtitle: "Use each slot dropdown to set your default 5-1 lineup plus libero."
        })}
      </div>
      <div class="line" style="justify-content:flex-start; margin-top:0.7rem;">
        <button class="btn btn-secondary" data-action="default-lineup-auto" data-team="varsity">Auto Best 6</button>
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
    { id: "players", label: "Player Stats" },
    { id: "lineup", label: "Lineup" }
  ];

  let tabContent = "";
  if (activeTab === "standings") {
    tabContent = renderSeasonStandingsTab();
  } else if (activeTab === "players") {
    tabContent = renderSeasonPlayerStatsTab();
  } else if (activeTab === "lineup") {
    tabContent = renderSeasonLineupTab();
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
    ${renderGlobalMenuButton()}
    ${renderBanner()}
    ${renderOptionsMenu()}
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
