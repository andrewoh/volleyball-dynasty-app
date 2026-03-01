import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const STORAGE_KEY = "vd_native_playtest_v1";
const POSITION_RULES = [
  { id: "LIB", label: "Libero", varsity: 2, jv: 2, cuts: 3 },
  { id: "OH", label: "Outside Hitter", varsity: 3, jv: 3, cuts: 3 },
  { id: "MB", label: "Middle Blocker", varsity: 3, jv: 3, cuts: 3 },
  { id: "S", label: "Setter", varsity: 2, jv: 2, cuts: 3 },
  { id: "RS", label: "Opposite", varsity: 2, jv: 2, cuts: 3 }
];
const SKILLS = ["serving", "passing", "setting", "hitting", "blocking", "athleticism", "awareness", "resilience", "leadership"];
const SKILL_LABELS = {
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
const POSITION_PRIORITY = {
  LIB: ["passing", "awareness", "resilience", "athleticism"],
  OH: ["hitting", "athleticism", "passing", "serving"],
  MB: ["blocking", "hitting", "athleticism", "awareness"],
  S: ["setting", "awareness", "athleticism", "leadership"],
  RS: ["hitting", "blocking", "athleticism", "serving"]
};
const SLOT_DEFS = [
  { index: 0, label: "Outside 1", expectedPosition: "OH" },
  { index: 1, label: "Outside 2", expectedPosition: "OH" },
  { index: 2, label: "Middle 1", expectedPosition: "MB" },
  { index: 3, label: "Middle 2", expectedPosition: "MB" },
  { index: 4, label: "Setter", expectedPosition: "S" },
  { index: 5, label: "Opposite", expectedPosition: "RS" }
];
const FIRST_NAMES = [
  "Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Alexander",
  "Mason", "Michael", "Ethan", "Daniel", "Jacob", "Logan", "Jackson", "Levi", "Sebastian", "Mateo"
];
const LAST_NAMES = [
  "Ramirez", "Kim", "Lopez", "Nguyen", "Patel", "Jones", "Davis", "Miller", "Clark", "Adams",
  "Bennett", "Diaz", "Park", "Sullivan", "Tran", "Foster", "Reed", "Cook", "Bailey", "Cruz"
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(list) {
  return list[randomInt(0, list.length - 1)];
}

function formatClock(value) {
  const d = new Date(value);
  return d.toLocaleTimeString();
}

function playerOverall(player) {
  const avg = SKILLS.reduce((sum, key) => sum + (player[key] || 50), 0) / SKILLS.length;
  return Math.round(avg);
}

function gradeLabel(grade) {
  if (grade <= 9) return "Fr";
  if (grade === 10) return "So";
  if (grade === 11) return "Jr";
  return "Sr";
}

function gradeSkillCurve(grade) {
  if (grade <= 9) return -9;
  if (grade === 10) return -3;
  if (grade === 11) return 4;
  return 11;
}

function archetypeForPosition(position) {
  if (position === "LIB") {
    return {
      serving: 0, passing: 14, setting: 2, hitting: -16, blocking: -19, athleticism: 8, awareness: 12, resilience: 10, leadership: 6
    };
  }
  if (position === "OH") {
    return {
      serving: 4, passing: 4, setting: -4, hitting: 10, blocking: 2, athleticism: 9, awareness: 4, resilience: 4, leadership: 2
    };
  }
  if (position === "MB") {
    return {
      serving: -3, passing: -11, setting: -12, hitting: 9, blocking: 14, athleticism: 8, awareness: 3, resilience: 3, leadership: 1
    };
  }
  if (position === "S") {
    return {
      serving: 2, passing: 3, setting: 16, hitting: -9, blocking: -11, athleticism: 5, awareness: 11, resilience: 5, leadership: 8
    };
  }
  return {
    serving: 3, passing: -4, setting: -9, hitting: 12, blocking: 7, athleticism: 8, awareness: 4, resilience: 5, leadership: 2
  };
}

function createPlayer(id, position, grade) {
  const archetype = archetypeForPosition(position);
  const baseSkill = clamp(randomInt(44, 66) + gradeSkillCurve(grade) + randomInt(-2, 2), 35, 95);
  const skill = (key) => clamp(baseSkill + (archetype[key] || 0) + randomInt(-6, 6), 30, 99);
  const heightBase = position === "MB" ? 75 : position === "OH" || position === "RS" ? 73 : position === "S" ? 71 : 69;
  const heightInches = clamp(heightBase + randomInt(-3, 3), 64, 82);
  const standingReach = clamp(heightInches + randomInt(20, 28), 86, 112);
  const blockTouch = clamp(standingReach + randomInt(14, 26), 96, 132);
  const approachTouch = clamp(blockTouch + randomInt(2, 8), 99, 138);
  const potential = clamp(Math.round(baseSkill + randomInt(8, 24)), 45, 99);
  return {
    id,
    name: `${randomChoice(FIRST_NAMES)} ${randomChoice(LAST_NAMES)}`,
    grade,
    position,
    heightInches,
    standingReach,
    blockTouch,
    approachTouch,
    serving: skill("serving"),
    passing: skill("passing"),
    setting: skill("setting"),
    hitting: skill("hitting"),
    blocking: skill("blocking"),
    athleticism: skill("athleticism"),
    awareness: skill("awareness"),
    resilience: skill("resilience"),
    leadership: skill("leadership"),
    potential,
    xp: 0
  };
}

function ensureAllGradesPresent(players) {
  const grades = [9, 10, 11, 12];
  const existing = new Set(players.map((player) => player.grade));
  for (const grade of grades) {
    if (existing.has(grade)) continue;
    const replacement = players.sort((a, b) => Math.abs(a.grade - grade) - Math.abs(b.grade - grade))[0];
    if (!replacement) continue;
    replacement.grade = grade;
    const delta = gradeSkillCurve(grade);
    for (const key of SKILLS) {
      replacement[key] = clamp(replacement[key] + Math.round(delta * 0.2), 30, 99);
    }
  }
}

function generateTryoutState() {
  const candidates = [];
  let nextId = 1;
  for (const rule of POSITION_RULES) {
    const count = rule.varsity + rule.jv + rule.cuts + randomInt(1, 3);
    for (let i = 0; i < count; i += 1) {
      const grade = randomChoice([9, 9, 10, 10, 11, 11, 12]);
      candidates.push(createPlayer(`P${nextId++}`, rule.id, grade));
    }
  }
  ensureAllGradesPresent(candidates);
  const assignments = {};
  for (const player of candidates) assignments[player.id] = "cut";
  return {
    activePositionId: POSITION_RULES[0].id,
    positionLocks: Object.fromEntries(POSITION_RULES.map((rule) => [rule.id, false])),
    assignments,
    candidates
  };
}

function createInitialGame() {
  return {
    version: 1,
    createdAt: Date.now(),
    phase: "tryouts",
    tryouts: generateTryoutState(),
    team: {
      rosterPlayers: [],
      rosters: {
        varsityIds: [],
        jvIds: []
      },
      captains: {
        varsityId: null,
        jvId: null
      },
      lineups: {
        varsity: { slots: [null, null, null, null, null, null], liberoId: null },
        jv: { slots: [null, null, null, null, null, null], liberoId: null }
      }
    },
    season: {
      callupsUsed: 0
    }
  };
}

function getCountsForPosition(tryouts, positionId) {
  const players = tryouts.candidates.filter((player) => player.position === positionId);
  const counts = { varsity: 0, jv: 0, cut: 0 };
  for (const player of players) {
    const value = tryouts.assignments[player.id] || "cut";
    if (value === "varsity") counts.varsity += 1;
    else if (value === "jv") counts.jv += 1;
    else counts.cut += 1;
  }
  return counts;
}

function allPositionsLocked(tryouts) {
  return POSITION_RULES.every((rule) => Boolean(tryouts.positionLocks[rule.id]));
}

function bestLineupSlots(players) {
  const sorted = [...players].sort((a, b) => playerOverall(b) - playerOverall(a));
  const used = new Set();
  const slots = SLOT_DEFS.map((slot) => {
    let pick = sorted.find((player) => player.position === slot.expectedPosition && !used.has(player.id));
    if (!pick) pick = sorted.find((player) => !used.has(player.id));
    if (!pick) return null;
    used.add(pick.id);
    return pick.id;
  });
  return slots;
}

function bestLiberoId(players, slots) {
  const used = new Set(slots.filter(Boolean));
  const dedicated = players
    .filter((player) => player.position === "LIB" && !used.has(player.id))
    .sort((a, b) => playerOverall(b) - playerOverall(a))[0];
  if (dedicated) return dedicated.id;
  const backcourt = players
    .filter((player) => !used.has(player.id))
    .sort((a, b) => b.passing + b.awareness + b.resilience - (a.passing + a.awareness + a.resilience))[0];
  return backcourt?.id || null;
}

function sanitizeLineupForTeam(players, lineup) {
  const valid = new Set(players.map((player) => player.id));
  const next = { slots: [...(lineup?.slots || [null, null, null, null, null, null])], liberoId: lineup?.liberoId || null };
  next.slots = next.slots.map((id) => (id && valid.has(id) ? id : null));
  const seen = new Set();
  next.slots = next.slots.map((id) => {
    if (!id || seen.has(id)) return null;
    seen.add(id);
    return id;
  });
  if (next.liberoId && (!valid.has(next.liberoId) || next.slots.includes(next.liberoId))) next.liberoId = null;
  return next;
}

function DraggableToken({ player, source, active, onDragStart, onDragMove, onDragEnd }) {
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          onDragStart(player.id, source, event.nativeEvent.pageX, event.nativeEvent.pageY);
        },
        onPanResponderMove: (event) => {
          onDragMove(event.nativeEvent.pageX, event.nativeEvent.pageY);
        },
        onPanResponderRelease: (event) => {
          onDragEnd(event.nativeEvent.pageX, event.nativeEvent.pageY);
        },
        onPanResponderTerminate: (event) => {
          onDragEnd(event.nativeEvent.pageX, event.nativeEvent.pageY);
        }
      }),
    [onDragEnd, onDragMove, onDragStart, player.id, source]
  );

  return (
    <View {...panResponder.panHandlers} style={[styles.playerChip, active ? styles.playerChipDragging : null]}>
      <Text style={styles.playerChipName}>{player.name}</Text>
      <Text style={styles.playerChipMeta}>
        {player.position} | {gradeLabel(player.grade)} | OVR {playerOverall(player)}
      </Text>
    </View>
  );
}

export default function App() {
  const [game, setGame] = useState(null);
  const [saveStatus, setSaveStatus] = useState("Loading...");
  const [seasonTab, setSeasonTab] = useState("lineup");
  const [lineupTeam, setLineupTeam] = useState("varsity");
  const [drag, setDrag] = useState(null);
  const dragRef = useRef(null);
  const targetRefs = useRef({});
  const [targetRects, setTargetRects] = useState({});

  const measureTargets = useCallback(() => {
    const entries = Object.entries(targetRefs.current);
    if (!entries.length) return;
    const next = {};
    let pending = entries.length;
    for (const [key, node] of entries) {
      if (node && typeof node.measureInWindow === "function") {
        node.measureInWindow((x, y, width, height) => {
          next[key] = { x, y, width, height };
          pending -= 1;
          if (pending === 0) setTargetRects(next);
        });
      } else {
        pending -= 1;
        if (pending === 0) setTargetRects(next);
      }
    }
  }, []);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!active) return;
        if (stored) {
          setGame(JSON.parse(stored));
          setSaveStatus("Loaded");
          return;
        }
        setGame(createInitialGame());
        setSaveStatus("New save");
      })
      .catch(() => {
        if (!active) return;
        setGame(createInitialGame());
        setSaveStatus("New save");
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!game) return;
    const timeout = setTimeout(() => {
      setSaveStatus("Saving...");
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(game))
        .then(() => {
          setSaveStatus(`Saved ${formatClock(Date.now())}`);
        })
        .catch(() => {
          setSaveStatus("Save failed");
        });
    }, 120);
    return () => clearTimeout(timeout);
  }, [game]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      measureTargets();
    }, 80);
    return () => clearTimeout(timeout);
  }, [game, lineupTeam, seasonTab, measureTargets]);

  const updateGame = useCallback((updater) => {
    setGame((prev) => {
      if (!prev) return prev;
      return updater(prev);
    });
  }, []);

  const resetSave = useCallback(() => {
    Alert.alert("Reset progress?", "This will wipe local playtest progress.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => {
          const next = createInitialGame();
          setGame(next);
        }
      }
    ]);
  }, []);

  const applyTryoutAssignment = useCallback(
    (playerId, value) => {
      updateGame((prev) => {
        if (prev.phase !== "tryouts") return prev;
        const next = structuredClone(prev);
        const activePositionId = next.tryouts.activePositionId;
        const player = next.tryouts.candidates.find((candidate) => candidate.id === playerId);
        if (!player || player.position !== activePositionId) return prev;
        if (next.tryouts.positionLocks[activePositionId]) return prev;
        next.tryouts.assignments[playerId] = value;
        return next;
      });
    },
    [updateGame]
  );

  const lockAndAdvanceTryouts = useCallback(() => {
    updateGame((prev) => {
      if (prev.phase !== "tryouts") return prev;
      const next = structuredClone(prev);
      const activePositionId = next.tryouts.activePositionId;
      const activeRule = POSITION_RULES.find((rule) => rule.id === activePositionId);
      if (!activeRule) return prev;
      if (next.tryouts.positionLocks[activePositionId]) {
        next.tryouts.positionLocks[activePositionId] = false;
        return next;
      }
      const counts = getCountsForPosition(next.tryouts, activePositionId);
      const valid = counts.varsity === activeRule.varsity && counts.jv === activeRule.jv && counts.cut >= activeRule.cuts;
      if (!valid) return prev;
      next.tryouts.positionLocks[activePositionId] = true;
      const nextRule = POSITION_RULES.find((rule) => !next.tryouts.positionLocks[rule.id]);
      if (nextRule) next.tryouts.activePositionId = nextRule.id;
      return next;
    });
  }, [updateGame]);

  const finalizeTryouts = useCallback(() => {
    updateGame((prev) => {
      if (prev.phase !== "tryouts") return prev;
      const next = structuredClone(prev);
      if (!allPositionsLocked(next.tryouts)) return prev;
      const vars = [];
      const jvs = [];
      for (const player of next.tryouts.candidates) {
        const assignment = next.tryouts.assignments[player.id] || "cut";
        if (assignment === "varsity") vars.push(player);
        if (assignment === "jv") jvs.push(player);
      }
      const requiredVarsity = POSITION_RULES.reduce((sum, rule) => sum + rule.varsity, 0);
      const requiredJv = POSITION_RULES.reduce((sum, rule) => sum + rule.jv, 0);
      if (vars.length !== requiredVarsity || jvs.length !== requiredJv) return prev;

      const varsityIds = vars.map((player) => player.id);
      const jvIds = jvs.map((player) => player.id);
      const varsityCaptain = [...vars].sort((a, b) => b.leadership - a.leadership || playerOverall(b) - playerOverall(a))[0];
      const jvCaptain = [...jvs].sort((a, b) => b.leadership - a.leadership || playerOverall(b) - playerOverall(a))[0];
      const varsitySlots = bestLineupSlots(vars);
      const jvSlots = bestLineupSlots(jvs);
      const varsityLib = bestLiberoId(vars, varsitySlots);
      const jvLib = bestLiberoId(jvs, jvSlots);

      next.phase = "season";
      next.team.rosterPlayers = [...vars, ...jvs];
      next.team.rosters.varsityIds = varsityIds;
      next.team.rosters.jvIds = jvIds;
      next.team.captains.varsityId = varsityCaptain?.id || null;
      next.team.captains.jvId = jvCaptain?.id || null;
      next.team.lineups.varsity = { slots: varsitySlots, liberoId: varsityLib };
      next.team.lineups.jv = { slots: jvSlots, liberoId: jvLib };
      next.season.callupsUsed = 0;
      return next;
    });
  }, [updateGame]);

  const callUpPlayer = useCallback(
    (playerId) => {
      updateGame((prev) => {
        if (prev.phase !== "season") return prev;
        if (prev.season.callupsUsed >= 3) return prev;
        if (prev.team.rosters.varsityIds.length >= 15) return prev;
        if (!prev.team.rosters.jvIds.includes(playerId)) return prev;
        const next = structuredClone(prev);
        next.team.rosters.jvIds = next.team.rosters.jvIds.filter((id) => id !== playerId);
        next.team.rosters.varsityIds.push(playerId);
        next.season.callupsUsed += 1;
        const varsPlayers = next.team.rosterPlayers.filter((player) => next.team.rosters.varsityIds.includes(player.id));
        const jvPlayers = next.team.rosterPlayers.filter((player) => next.team.rosters.jvIds.includes(player.id));
        next.team.lineups.varsity = sanitizeLineupForTeam(varsPlayers, next.team.lineups.varsity);
        next.team.lineups.jv = sanitizeLineupForTeam(jvPlayers, next.team.lineups.jv);
        if (next.team.captains.jvId === playerId) {
          const replacement = [...jvPlayers].sort((a, b) => b.leadership - a.leadership || playerOverall(b) - playerOverall(a))[0];
          next.team.captains.jvId = replacement?.id || null;
        }
        return next;
      });
    },
    [updateGame]
  );

  const findDropTarget = useCallback(
    (x, y) => {
      for (const [key, rect] of Object.entries(targetRects)) {
        if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
          return key;
        }
      }
      return null;
    },
    [targetRects]
  );

  const onDragStart = useCallback(
    (playerId, source, x, y) => {
      const next = { playerId, source, x, y };
      dragRef.current = next;
      setDrag(next);
      measureTargets();
    },
    [measureTargets]
  );

  const onDragMove = useCallback((x, y) => {
    setDrag((prev) => {
      if (!prev) return prev;
      const next = { ...prev, x, y };
      dragRef.current = next;
      return next;
    });
  }, []);

  const onDragEnd = useCallback(
    (x, y) => {
      const currentDrag = dragRef.current;
      dragRef.current = null;
      setDrag(null);
      if (!currentDrag) return;
      const target = findDropTarget(x, y);
      if (!target) return;

      updateGame((prev) => {
        if (prev.phase !== "season") return prev;
        const next = structuredClone(prev);
        const teamPlayers = next.team.rosterPlayers.filter((player) =>
          lineupTeam === "varsity" ? next.team.rosters.varsityIds.includes(player.id) : next.team.rosters.jvIds.includes(player.id)
        );
        const lineup = sanitizeLineupForTeam(teamPlayers, next.team.lineups[lineupTeam]);
        const playerId = currentDrag.playerId;

        const removePlayerFromLineup = () => {
          lineup.slots = lineup.slots.map((id) => (id === playerId ? null : id));
          if (lineup.liberoId === playerId) lineup.liberoId = null;
        };

        if (target.startsWith("slot-")) {
          const slotIndex = Number(target.replace("slot-", ""));
          const displaced = lineup.slots[slotIndex] || null;
          removePlayerFromLineup();
          if (currentDrag.source.kind === "slot" && currentDrag.source.slotIndex !== slotIndex) {
            lineup.slots[currentDrag.source.slotIndex] = displaced;
          }
          lineup.slots[slotIndex] = playerId;
          if (lineup.liberoId === playerId) lineup.liberoId = null;
        } else if (target === "libero") {
          const previousLib = lineup.liberoId || null;
          removePlayerFromLineup();
          if (currentDrag.source.kind === "slot" && previousLib && previousLib !== playerId) {
            lineup.slots[currentDrag.source.slotIndex] = previousLib;
          }
          lineup.liberoId = playerId;
        }

        next.team.lineups[lineupTeam] = sanitizeLineupForTeam(teamPlayers, lineup);
        return next;
      });
    },
    [findDropTarget, lineupTeam, updateGame]
  );

  const tryoutView = useMemo(() => {
    if (!game || game.phase !== "tryouts") return null;
    const { tryouts } = game;
    const activeRule = POSITION_RULES.find((rule) => rule.id === tryouts.activePositionId) || POSITION_RULES[0];
    const counts = getCountsForPosition(tryouts, activeRule.id);
    const prioritySkills = POSITION_PRIORITY[activeRule.id] || [];
    const players = tryouts.candidates
      .filter((player) => player.position === activeRule.id)
      .sort((a, b) => playerOverall(b) - playerOverall(a));
    const isVarsityValid = counts.varsity === activeRule.varsity;
    const isJvValid = counts.jv === activeRule.jv;
    const isCutValid = counts.cut >= activeRule.cuts;
    const canAdvance = isVarsityValid && isJvValid && isCutValid;
    const step = Math.max(1, POSITION_RULES.findIndex((rule) => rule.id === activeRule.id) + 1);

    return (
      <ScrollView contentContainerStyle={styles.scrollContent} stickyHeaderIndices={[1]}>
        <View style={styles.card}>
          <Text style={styles.h2}>{activeRule.label} Tryouts</Text>
          <Text style={styles.subtle}>
            {activeRule.label} Tryouts: Select {activeRule.varsity} for Varsity, {activeRule.jv} for JV, and at least {activeRule.cuts} to cut.
          </Text>
          <Text style={styles.noteLine}>
            {Object.entries(SKILL_LABELS)
              .map(([key, value]) => `${value}=${key[0].toUpperCase()}${key.slice(1)}`)
              .join("  ·  ")}
          </Text>
          <Text style={styles.noteLine}>Priority skills: {prioritySkills.map((key) => SKILL_LABELS[key]).join(", ")}</Text>
        </View>

        <View style={[styles.card, styles.stickyStatusCard, canAdvance ? styles.statusValid : styles.statusInvalid]}>
          <View style={styles.inlineWrap}>
            <Text style={[styles.tag, isVarsityValid ? styles.tagGood : styles.tagBad]}>Varsity {counts.varsity}/{activeRule.varsity}</Text>
            <Text style={[styles.tag, isJvValid ? styles.tagGood : styles.tagBad]}>JV {counts.jv}/{activeRule.jv}</Text>
            <Text style={[styles.tag, isCutValid ? styles.tagGood : styles.tagBad]}>Cuts {counts.cut}/{activeRule.cuts}+</Text>
            <Text style={styles.tag}>Step {step}/{POSITION_RULES.length}</Text>
          </View>
        </View>

        <View style={styles.stack}>
          {players.map((player) => {
            const assignment = tryouts.assignments[player.id] || "cut";
            return (
              <View key={player.id} style={styles.playerCard}>
                <View style={styles.playerRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <Text style={styles.playerMeta}>
                      {player.position} · {gradeLabel(player.grade)} · OVR {playerOverall(player)} · POT {player.potential}
                    </Text>
                  </View>
                  <Text style={[styles.tag, assignment === "varsity" ? styles.tagGood : assignment === "cut" ? styles.tagBad : null]}>
                    {assignment.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.skillGrid}>
                  {SKILLS.map((key) => (
                    <View key={`${player.id}-${key}`} style={[styles.skillCell, prioritySkills.includes(key) ? styles.skillPriority : null]}>
                      <Text style={styles.skillKey}>{SKILL_LABELS[key]}</Text>
                      <Text style={styles.skillValue}>{player[key]}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.assignmentRow}>
                  <TouchableOpacity
                    style={[styles.btn, assignment === "varsity" ? styles.btnPrimary : styles.btnSecondary]}
                    onPress={() => applyTryoutAssignment(player.id, "varsity")}
                    disabled={tryouts.positionLocks[activeRule.id]}
                  >
                    <Text style={styles.btnText}>Varsity</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, assignment === "jv" ? styles.btnAccent : styles.btnSecondary]}
                    onPress={() => applyTryoutAssignment(player.id, "jv")}
                    disabled={tryouts.positionLocks[activeRule.id]}
                  >
                    <Text style={styles.btnText}>JV</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, assignment === "cut" ? styles.btnDanger : styles.btnSecondary]}
                    onPress={() => applyTryoutAssignment(player.id, "cut")}
                    disabled={tryouts.positionLocks[activeRule.id]}
                  >
                    <Text style={styles.btnText}>Cut</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.card}>
          <View style={styles.inlineBetween}>
            {!tryouts.positionLocks[activeRule.id] ? (
              canAdvance ? (
                <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={lockAndAdvanceTryouts}>
                  <Text style={styles.btnText}>Lock {activeRule.label} and Advance</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.subtle}>Complete required counts to advance.</Text>
              )
            ) : (
              <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={lockAndAdvanceTryouts}>
                <Text style={styles.btnText}>Unlock {activeRule.label}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.btn, allPositionsLocked(tryouts) ? styles.btnGood : styles.btnSecondary]}
              disabled={!allPositionsLocked(tryouts)}
              onPress={finalizeTryouts}
            >
              <Text style={styles.btnText}>Finalize Tryouts</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }, [applyTryoutAssignment, finalizeTryouts, game, lockAndAdvanceTryouts]);

  const seasonPlayers = useMemo(() => {
    if (!game || game.phase !== "season") return { teamPlayers: [], bench: [], lineup: null, varsityCount: 0 };
    const ids = lineupTeam === "varsity" ? game.team.rosters.varsityIds : game.team.rosters.jvIds;
    const teamPlayers = game.team.rosterPlayers.filter((player) => ids.includes(player.id));
    const lineup = sanitizeLineupForTeam(teamPlayers, game.team.lineups[lineupTeam]);
    const used = new Set([...(lineup.slots || []).filter(Boolean), lineup.liberoId].filter(Boolean));
    const bench = teamPlayers.filter((player) => !used.has(player.id));
    return { teamPlayers, bench, lineup, varsityCount: game.team.rosters.varsityIds.length };
  }, [game, lineupTeam]);

  const seasonView = useMemo(() => {
    if (!game || game.phase !== "season") return null;
    if (seasonTab === "roster") {
      const players = [...game.team.rosterPlayers].sort((a, b) => playerOverall(b) - playerOverall(a));
      const callupsRemaining = Math.max(0, 3 - game.season.callupsUsed);
      return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.h2}>Season Roster</Text>
            <Text style={styles.subtle}>Call-ups: {game.season.callupsUsed}/3 used. Varsity size: {game.team.rosters.varsityIds.length}/15.</Text>
          </View>
          {players.map((player) => {
            const isVarsity = game.team.rosters.varsityIds.includes(player.id);
            const isJv = game.team.rosters.jvIds.includes(player.id);
            const canCallup = isJv && !isVarsity && callupsRemaining > 0 && game.team.rosters.varsityIds.length < 15;
            return (
              <View key={player.id} style={styles.playerCard}>
                <View style={styles.inlineBetween}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <Text style={styles.playerMeta}>
                      {player.position} · {gradeLabel(player.grade)} · OVR {playerOverall(player)} · POT {player.potential}
                    </Text>
                  </View>
                  <Text style={[styles.tag, isVarsity ? styles.tagGood : null]}>{isVarsity ? "VARSITY" : "JV"}</Text>
                </View>
                <View style={styles.inlineBetween}>
                  <Text style={styles.subtle}>LDR {player.leadership} · AWR {player.awareness} · ATH {player.athleticism}</Text>
                  {canCallup ? (
                    <TouchableOpacity style={[styles.btn, styles.btnAccent]} onPress={() => callUpPlayer(player.id)}>
                      <Text style={styles.btnText}>Call Up</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.subtle}>No action</Text>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      );
    }

    const { teamPlayers, bench, lineup } = seasonPlayers;
    if (!lineup) return null;

    const renderSlot = (slot) => {
      const playerId = lineup.slots[slot.index];
      const player = teamPlayers.find((candidate) => candidate.id === playerId) || null;
      return (
        <View
          key={`slot-${slot.index}`}
          ref={(node) => {
            targetRefs.current[`slot-${slot.index}`] = node;
          }}
          onLayout={measureTargets}
          style={styles.slot}
        >
          <Text style={styles.slotLabel}>{slot.label}</Text>
          {player ? (
            <DraggableToken
              player={player}
              source={{ kind: "slot", slotIndex: slot.index }}
              active={drag?.playerId === player.id}
              onDragStart={onDragStart}
              onDragMove={onDragMove}
              onDragEnd={onDragEnd}
            />
          ) : (
            <Text style={styles.slotEmpty}>Drop player</Text>
          )}
        </View>
      );
    };

    const libero = teamPlayers.find((player) => player.id === lineup.liberoId) || null;

    return (
      <View style={styles.flexFill}>
        <View style={styles.card}>
          <Text style={styles.h2}>Lineup Editor ({lineupTeam.toUpperCase()})</Text>
          <Text style={styles.subtle}>Drag a player card and drop it on a slot. Drag between slots to swap.</Text>
          <View style={styles.inlineWrap}>
            <TouchableOpacity
              style={[styles.btn, lineupTeam === "varsity" ? styles.btnPrimary : styles.btnSecondary]}
              onPress={() => setLineupTeam("varsity")}
            >
              <Text style={styles.btnText}>Varsity</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, lineupTeam === "jv" ? styles.btnPrimary : styles.btnSecondary]}
              onPress={() => setLineupTeam("jv")}
            >
              <Text style={styles.btnText}>JV</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.courtGrid}>
          {SLOT_DEFS.map((slot) => renderSlot(slot))}
        </View>

        <View
          style={styles.card}
          ref={(node) => {
            targetRefs.current.libero = node;
          }}
          onLayout={measureTargets}
        >
          <Text style={styles.slotLabel}>Libero</Text>
          {libero ? (
            <DraggableToken
              player={libero}
              source={{ kind: "libero" }}
              active={drag?.playerId === libero.id}
              onDragStart={onDragStart}
              onDragMove={onDragMove}
              onDragEnd={onDragEnd}
            />
          ) : (
            <Text style={styles.slotEmpty}>Drop libero here</Text>
          )}
        </View>

        <ScrollView horizontal style={styles.benchScroll} contentContainerStyle={styles.benchRow} showsHorizontalScrollIndicator={false}>
          {bench.map((player) => (
            <DraggableToken
              key={`bench-${player.id}`}
              player={player}
              source={{ kind: "bench" }}
              active={drag?.playerId === player.id}
              onDragStart={onDragStart}
              onDragMove={onDragMove}
              onDragEnd={onDragEnd}
            />
          ))}
        </ScrollView>

        {drag ? (
          <View pointerEvents="none" style={[styles.dragGhost, { left: drag.x - 120, top: drag.y - 28 }]}>
            <Text style={styles.dragGhostText}>
              {teamPlayers.find((player) => player.id === drag.playerId)?.name || "Player"}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }, [callUpPlayer, drag, game, lineupTeam, measureTargets, onDragEnd, onDragMove, onDragStart, seasonPlayers, seasonTab]);

  if (!game) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator />
          <Text style={styles.subtle}>Loading playtest save...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Volleyball Dynasty Playtest</Text>
          <Text style={styles.subtle}>{saveStatus}</Text>
        </View>
        <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={resetSave}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {game.phase === "tryouts" ? (
        tryoutView
      ) : (
        <View style={styles.flexFill}>
          <View style={styles.card}>
            <View style={styles.inlineWrap}>
              <TouchableOpacity
                style={[styles.btn, seasonTab === "lineup" ? styles.btnPrimary : styles.btnSecondary]}
                onPress={() => setSeasonTab("lineup")}
              >
                <Text style={styles.btnText}>Lineup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, seasonTab === "roster" ? styles.btnPrimary : styles.btnSecondary]}
                onPress={() => setSeasonTab("roster")}
              >
                <Text style={styles.btnText}>Roster / Call-ups</Text>
              </TouchableOpacity>
            </View>
          </View>
          {seasonView}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3ecdf"
  },
  flexFill: {
    flex: 1
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  header: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#d5c9b0",
    backgroundColor: "#fff6e8"
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#27231f"
  },
  h2: {
    fontSize: 19,
    fontWeight: "700",
    color: "#27231f"
  },
  subtle: {
    color: "#5f584d",
    marginTop: 2
  },
  noteLine: {
    color: "#5f584d",
    marginTop: 6,
    fontSize: 12
  },
  scrollContent: {
    padding: 12,
    gap: 10,
    paddingBottom: 24
  },
  stack: {
    gap: 10
  },
  card: {
    backgroundColor: "#fff8ec",
    borderWidth: 1,
    borderColor: "#dccfb8",
    borderRadius: 12,
    padding: 12
  },
  stickyStatusCard: {
    borderWidth: 1.5
  },
  statusValid: {
    backgroundColor: "#e5f5ec",
    borderColor: "#70b98f"
  },
  statusInvalid: {
    backgroundColor: "#f8e6e6",
    borderColor: "#ca7c7c"
  },
  inlineWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  inlineBetween: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between"
  },
  tag: {
    backgroundColor: "#e8dcc5",
    color: "#3f3628",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "700"
  },
  tagGood: {
    backgroundColor: "#d7efde",
    color: "#255a3a"
  },
  tagBad: {
    backgroundColor: "#f2d9d9",
    color: "#7b2e2e"
  },
  playerCard: {
    backgroundColor: "#fff8ec",
    borderWidth: 1,
    borderColor: "#dccfb8",
    borderRadius: 12,
    padding: 10
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8
  },
  playerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#24201b"
  },
  playerMeta: {
    color: "#5f584d",
    marginTop: 2
  },
  skillGrid: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6
  },
  skillCell: {
    width: "31%",
    minWidth: 94,
    borderWidth: 1,
    borderColor: "#e0d2b8",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fffdf8"
  },
  skillPriority: {
    borderColor: "#87add2",
    backgroundColor: "#e7f1fb"
  },
  skillKey: {
    fontSize: 11,
    color: "#544d42",
    fontWeight: "700"
  },
  skillValue: {
    fontSize: 14,
    color: "#2a241d",
    fontWeight: "700"
  },
  assignmentRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8
  },
  btn: {
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 9
  },
  btnPrimary: {
    backgroundColor: "#d94816"
  },
  btnSecondary: {
    backgroundColor: "#ddd2be"
  },
  btnAccent: {
    backgroundColor: "#0d5a89"
  },
  btnDanger: {
    backgroundColor: "#a32020"
  },
  btnGood: {
    backgroundColor: "#157a44"
  },
  btnText: {
    color: "#fff",
    fontWeight: "700"
  },
  courtGrid: {
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  slot: {
    width: "48%",
    minHeight: 92,
    backgroundColor: "#fff8ec",
    borderWidth: 1,
    borderColor: "#d8c8aa",
    borderRadius: 10,
    padding: 8
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4c4438",
    marginBottom: 5
  },
  slotEmpty: {
    color: "#7b7264"
  },
  benchScroll: {
    marginHorizontal: 12,
    marginTop: 6,
    maxHeight: 112
  },
  benchRow: {
    gap: 8,
    paddingRight: 12
  },
  playerChip: {
    backgroundColor: "#f6ecd8",
    borderWidth: 1,
    borderColor: "#cdbd9d",
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 6,
    minWidth: 210
  },
  playerChipDragging: {
    opacity: 0.3
  },
  playerChipName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2c261f"
  },
  playerChipMeta: {
    fontSize: 11,
    color: "#685f52",
    marginTop: 1
  },
  dragGhost: {
    position: "absolute",
    zIndex: 999,
    width: 240,
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 9
  },
  dragGhostText: {
    color: "#fff",
    fontWeight: "700"
  }
});
