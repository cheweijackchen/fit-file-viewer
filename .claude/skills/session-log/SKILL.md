---
name: session-log
description: Create a session log in .claude/sessions/ capturing full Q&A, decisions, and changes from this session
argument-hint: [optional-topic-slug]
---

Create a session log for the current conversation.

**Step 1 — Gather metadata**

Run these two commands:
- `date '+%Y-%m-%d %H:%M:%S'` → current date and time
- `git branch --show-current` → current branch name

**Step 2 — Determine topic slug**

- If `$ARGUMENTS` is non-empty, use it as-is as the topic slug
- Otherwise, infer a concise kebab-case topic from the main subject of this conversation (e.g. `maplibre-controls-terrain-toggle`)

**Step 3 — Determine filename**

`YYYY-MM-DD_<topic-slug>.md` inside `.claude/sessions/`

If a file with that name already exists, append or overwrite it (do not prompt).

**Step 4 — Write the log file**

Use this exact structure:

```
# <Title (human-readable, Title Case)>

**Date:** YYYY-MM-DD HH:MM:SS
**Branch:** <branch>

---

## Q: <exact wording of the user's question>

**A:**

<Full answer content — include all explanations, comparisons, tables, and code blocks exactly as they appeared in the conversation. Do not summarize.>

---

(repeat for each Q&A exchange in the session)

---

## Changes Made

- `path/to/file` — what changed

## Key Decisions

- Decision — rationale

## Follow-up

- Pending items
```

**Rules:**
- Include **every** Q&A exchange in the session, in order
- Reproduce answers **in full** — not as bullet-point summaries
- If a question was answered with a table or code example, include it verbatim
- Do not ask for confirmation — create the file immediately
