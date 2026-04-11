# Story: Hiking Trail Organizer

> Feature planning document for the Trail Planner tool within TrailKit.
> Based on design discussion and Pencil prototype (April 2026).

---

## Overview

The **Trail Planner** is a browser-based, privacy-first tool that helps hikers plan multi-day alpine itineraries. Users select one or more connected routes, explore the trail network, and build a day-by-day route by selecting nodes step by step.

### Terminology

| Term | Definition |
|---|---|
| **Trail Network** | The complete map of all nodes and edges for the selected routes. Displayed as an overview for reference throughout the planning session. |
| **Day Route** | The specific sequence of nodes a user builds for a single day. A sub-path within the Trail Network. |
| **Node** | A single point on the trail (peak, hut, camp, fork, water source, etc.) |
| **Edge** | A directed connection between two nodes with an associated travel time in minutes |
| **Trip** | The full multi-day itinerary composed of one or more Day Routes |

---

## User Personas

### 1. The Experienced Planner
- Familiar with the trail network
- Wants to quickly build a multi-day itinerary without friction
- Needs to verify node connections and time estimates before committing

### 2. The First-Time Researcher
- Learning the route for the first time
- Relies on the Trail Network to understand the topology
- Needs clear visual feedback to understand where they are in the route

### 3. The Multi-Route Connector
- Planning a trip that spans multiple trails (e.g. 南二段 + 北二段)
- Needs to see how different routes connect into a single unified graph
- May adjust the selected routes mid-planning

---

## User Stories

### Landing & Trip Management

**US-01** — As a first-time user, I want to see a clear description of what the tool does so that I can decide if it suits my needs.

**US-02** — As a returning user, I want to see a list of my previously saved trips so that I can quickly resume planning without starting over.

**US-03** — As a user, I want to start a new trip from the landing page so that I can begin planning a fresh itinerary.

**US-04** — As a returning user, I want to click "Edit" on a saved trip so that I can continue where I left off.

---

### Trail Selection

**US-05** — As a user, I want to search and filter available routes by name so that I can quickly find the trails I need.

**US-06** — As a user, I want to select multiple routes in a single session so that I can plan a trip that spans connected trails without switching screens.

**US-07** — As a user, I want to see a live preview of the combined Trail Network as I check routes so that I can verify the trail topology before starting to plan.

**US-08** — As a user, I want to be able to add or remove routes while I am already planning (mid-session) so that I can adjust my trip scope without losing my work.

---

### Trail Network

**US-09** — As a user, I want to see the full Trail Network displayed by default so that I can reference node positions and connections while building my Day Routes.

**US-10** — As a user, I want to collapse the Trail Network to a compact bar so that I can free up screen space for the Day Builder when I no longer need to reference the map.

**US-11** — As a user, I want the Trail Network to highlight the nodes and path of my current Day Route so that I can visually track progress within the map.

**US-12** *(Future)* — As a user, I want to click a node on the Trail Network to add it directly to my current Day Route so that I can plan faster without using the step-by-step builder.

---

### Day Builder

**US-13** — As a user, I want to select a starting point from a dropdown of all available nodes so that I can define where each day begins.

**US-14** — As a user, I want to see only the adjacent, not-yet-visited nodes as "continue" options so that I can make a valid forward step without confusion.

**US-15** — As a user, I want to see the previous node as a "go back" option (muted style) so that I can allow for backtracking when needed.

**US-16** — As a user, I want each node option to display the node type and estimated travel time so that I can make informed decisions about my pace.

**US-17** — As a user, I want to undo the last step so that I can correct a wrong selection without starting the day over.

**US-18** — As a user, I want to confirm a day's route with a "Complete Route" action so that I can mark it as finalized and move on to the next day.

---

### Multi-Day Management

**US-19** — As a user, I want to add new days to my trip so that I can plan itineraries of any length.

**US-20** — As a user, I want to see all my days listed in a sidebar with completion status so that I can navigate between days and track overall progress.

**US-21** — As a user, I want to see a trip summary showing each day's route, total time, and weighted time (×0.9) so that I can evaluate the overall feasibility of my trip.

---

## Feature Requirements

### Pages & Screens

| Screen | Trigger | Description |
|---|---|---|
| Landing — Empty | First visit | Hero, tagline, "Start New Trip" CTA, 3 feature highlights |
| Landing — Has Trips | Returning user | Trip list (name, routes, days, last edited) + selected trip preview |
| Trail Selection | "Start New Trip" | Searchable route multi-select + live combined Trail Network preview |
| Main — Network Expanded | "Start Planning" | Left sidebar + Trail Network panel (top) + Day Builder (bottom) |
| Main — Network Collapsed | User collapses network | Network shrinks to 44px bar; Day Builder fills remaining height |

---

### Trail Network

- Nodes are color-coded by type:
  - `peak` → yellow `#E6B020`
  - `hut` → dark green `#2D5E3A`
  - `camp` → teal `#7BA7BC`
  - `fork` → gray `#9B9B9B`
  - `water-source` → teal-green `#5BA08A`
  - `other` → light green `#D4E4C8`
- Displayed as rows of connected node chips with `→` arrows
- Side peaks listed in a separate section below the main trail rows
- Current Day Route path is highlighted with a distinct stroke or fill
- Collapsible; default state is expanded
- Future: nodes are interactive (click to add to Day Route)

---

### Route Selection Rules

- Minimum 1 route required to start planning
- Routes are merged automatically into a single unified graph; no manual connection step needed
- Additional routes can be added or removed during an active planning session
- Route management lives in the left sidebar (not inside the Day Builder form)

---

### Day Builder Rules

- Each day starts with a user-selected starting point
- **Continue** options: adjacent nodes not yet visited in this day's path (primary style)
- **Go back** option: the immediately previous node (always shown, muted style; allows backtracking)
- Node options display: name, node type badge, estimated travel time in minutes
- Undo removes only the last step
- "Complete Route" finalizes the day and enables starting the next day
- Days are not time-bound; a trip can span any number of days

---

### Trip Summary

- Per-day row: day number, Day Route as arrow-separated nodes, total time, weighted time
- Overall totals: total days, total time, weighted time
- Accessible when Trail Network is collapsed (replaces network content area) or as a dedicated panel

---

### Layout (Desktop)

```
┌──────────────┬─────────────────────────────────────────┐
│  Left sidebar│  Main area                               │
│  240px       │                                          │
│  (collapsible│  ┌──── Trail Network ────────────────┐  │
│   via toggle)│  │  node rows, legend, day highlight  │  │
│              │  │                    [Collapse ▲]    │  │
│  Trip name   │  └───────────────────────────────────┘  │
│  Route chips │                                          │
│  + Add Route │  ┌──── Day Builder ───────────────────┐  │
│  ─────────── │  │  Starting Point dropdown            │  │
│  PACE × 0.9  │  │  TODAY'S ROUTE strip (E-01)         │  │
│  ─────────── │  │  Current Node card                  │  │
│  Day 1  ✓   │  │  往回走 (muted) / 繼續走 (primary)  │  │
│  Day 2  ✓   │  │  Undo · 完成路線                    │  │
│  Day 3  ⬤   │  │  (internal scroll)                  ↕  │
│  Day 4      │  └────────────────────────────────────┘  │
│  + Add Day  │                                           │
└─────────────┴──────────────────────────────────────────┘
```

When sidebar is collapsed: main area expands to full width.
When Trail Network is collapsed: network bar is 44px; Day Builder takes full remaining height.

---

### Layout (Mobile) — Future

- Bottom tab bar: DAYS / BUILD / SUMMARY
- BUILD tab: current node card, 往回走 / 繼續走, Undo, 完成路線
- Inline Day Route summary card in BUILD tab (compact node path + total time)
- SUMMARY tab: per-day breakdown

---

## Planned Enhancements

**E-01 — Real-time Day Route summary** *(designed)*
A compact strip inside the Day Builder, placed between the Starting Point dropdown and the Current Node card. Displays the day's accumulated node path (arrow-separated chips) and running total time. Already-visited nodes use a light green chip; the current node uses a dark filled chip for emphasis. Raw time and weighted time (E-02) are stacked on the right. The raw time number is color-coded by duration to signal effort level: Easy (< 5h) in dark green, Normal (5–7h) in dark yellow, Long (7–9h) in orange, Exhausting (> 9h) in red.

**E-02 — Adjustable pace weight** *(designed)*
A PACE stepper control in the left sidebar, placed between the route chips and the DAYS section. Uses +/- buttons to adjust the coefficient in increments (default 0.9×). As a trip-level setting it applies globally to all days. In the E-01 strip the right-side time column stacks raw time (bold) and weighted time (muted, `× 0.9 = Xh XXm`) vertically. The same dual-time format applies to the Trip Summary panel.

**E-03 — Richer route preview**
The Trail Selection page currently shows only a node list in the preview panel. Expand this to include: the full route path, total time, and weighted time estimate, giving users enough information to confirm their selection before starting to plan.

**E-04 — Cross-day start/end linking**
Automatically link a day's endpoint to the next day's starting point. When a user modifies a completed day's endpoint, display a confirmation dialog asking whether to propagate the change to the following day's starting point and itinerary.

**E-05 — Route selection from Trail Network**
Allow users to select nodes directly from the Trail Network map as starting points or destinations, replacing or supplementing the current dropdown. This makes the experience more visual and reduces dependency on knowing node names in advance.

**E-06 — Auto-path generation**
Provide a mechanism for users to skip step-by-step node selection. The user selects a target node (via a dropdown or by clicking the Trail Network), and the system automatically calculates the shortest path from the current node to the target using the adjacency list, inserting all intermediate nodes into the Day Route.

**E-07 — Mid-route editing**
Allow users to modify a Day Route at any intermediate node rather than only appending to or undoing from the end. Use cases include: removing a detour segment (e.g. a side-peak out-and-back that was added but is no longer desired) and inserting a new branch from a fork node that was previously passed through without detouring. The editing interface should let users select any node in the existing Day Route as an edit point, then add or remove nodes from that position onward while keeping the rest of the route intact where possible.

---

## Open Questions

| Topic | Status |
|---|---|
| Persistence / save mechanism (localStorage vs backend) | Not defined |
| Shareable / exportable trip format | Not defined |
| Session restore — how saved trips are stored and identified | Not defined |
| Route difficulty / elevation data per node | Not defined |
| Time estimates: direction-aware (uphill vs downhill) | Partially supported — directed edges have separate `minutes` values |
| Pace weight: per-user global setting vs per-trip override | Decided: per-trip setting in sidebar |
| Auto-path algorithm: shortest path vs fewest nodes vs user-preferred | Not defined |
