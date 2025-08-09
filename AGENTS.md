# 🤖 AGENTS.md — Epoch 8800 Operational Structure

This file defines the core principles, system architecture, and Codex interaction protocol for the Epoch 8800 browser game project. All agents, AI tools, and human contributors must follow these specifications.

---

## 📜 CORE PRINCIPLES

- No pay-to-win mechanics – monetization is cosmetic-only (skins).
- All code must be:
  - Modular, testable, scalable
  - Energy-efficient and lazy-loaded where possible
  - Lightweight (client + server)
- Game logic uses a 15-second online tick system. Offline ticks accumulate and are applied on login.
- Max building level: 30.
- Resource system: `stronix`, `crysalis`, `pyronis`, `voltaris` + `plasma` (assignable energy).
- Visuals: Low-poly isometric sprites (16:9) from DALL·E, consistent styleguide.
- Building names are in German; all UI is English.
- Tech tree governs all unlocks and system dependencies.
- Game must be fully hostable on free infrastructure (Netlify, Render, GitHub).
- Multi-agent logic permitted: Claude/Gemini may be consulted via simulated or manual workflows.

---

## 🧩 CLUSTER DEFINITION (for Codex Task Routing)

Each code subsystem belongs to a defined cluster. Codex must always reference the correct cluster path in every task.

| Cluster Name          | Directory Path         | Purpose                                 |
|-----------------------|------------------------|------------------------------------------|
| Frontend Cluster      | `/frontend/src/`       | UI, HUD, GridMap, panels, interactivity |
| Backend Cluster       | `/engine/tick/`        | Tick system, energy calc, research       |
| Game Logic Cluster    | `/engine/pve/`         | PvE, unit types, tech tree, legendary    |
| Multiplayer Cluster   | `/engine/pvp/`         | Alliances, async PvP, chat, seasons      |
| Telemetry Cluster     | `/engine/logs/`        | Analytics, balance, dashboards           |
| Infrastructure Cluster| `/config/`             | Auth, mobile support, CI/CD config       |

Each file must state its cluster at the top in a comment, e.g.:
// Cluster: Game Logic

---

## 📋 TASK SYSTEM – CODEx AGENT PROTOCOL

All Codex Tasks must follow the structure below. This ensures clean boundaries, no interference, and human confirmation before uploads.

### ✅ TASK CREATION RULE

> A task must only be created if it is **clearly isolated** from other tasks.  
> If a task affects overlapping logic with another, it must be **merged into one larger task** instead of being split.

### ✅ UPLOAD RULE

> After every completed task (or auto-code step), Codex must **explicitly ask**:
> "Do you want to upload these changes to GitHub now?"

If yes, run:

git add . git commit -m "Task XYZ completed" git push

---

## 🔧 TASK TEMPLATE FOR CODEX

# TASK ID: (e.g. pve_unit_004)

## 🎯 GOAL:
(Summarize what this task should achieve)

## 📁 CLUSTER:
- Name: Game Logic
- Path: /engine/pve/

## 🛠️ STEPS:
1. (Detailed steps)
2. (Expected file paths and functions)

## 🔁 AFTER COMPLETION:
- Ask user: "Upload to GitHub now?"
- If yes: execute upload commands.
- If no: wait for next task.

---

## 🤝 MULTI-AGENT INTERFACE (OPTIONAL)

Simulate Claude or Gemini with stub functions unless instructed otherwise. Example:

```ts
function ask_claude(prompt: string): string {
  return "Claude suggests X";
}
function ask_gemini(prompt: string): string {
  return "Gemini recommends Y";
}
function mergeSuggestions(claude: string, gemini: string): string {
  return "Final merged result: Z";
}
```

---

📌 DEVELOPMENT ETIQUETTE

Each file must declare its cluster.

Run linter/tests before every commit if possible.

No overlapping task execution unless explicitly merged.

All push actions must be user-approved.

Assets must follow DALL·E image constraints (HD, isometric, consistent tones).

---
