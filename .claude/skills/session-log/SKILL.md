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

## Summary

- <bullet: what was accomplished or decided — one line each>
- <...>

Sections in this log:
- Q1 Topic — one-line description
- Q2 Topic — one-line description

---

## <Q1 Topic (kebab-case as anchor, Title Case as heading)>

**Q:** <exact wording of the user's question>

**Plan:** *(include verbatim only if plan mode was used for this question; omit section otherwise)*

<Paste the full plan content exactly as it appeared — do not summarize or rewrite.>

**Answer:**

<Full answer content — include all explanations, comparisons, tables, and code blocks exactly as they appeared in the conversation. Do not summarize.>

---

(repeat for each significant Q&A exchange in the session)

---

## Changes Made

- `path/to/file` — what changed

## Key Decisions

- Decision — rationale

## Follow-up

- Pending items
```

**Rules:**
- Include every **significant** Q&A exchange in order; skip pure execution prompts (`/commit`, `/session-log`, one-word confirmations like "好" / "繼續")
- **Summary at top** must be written first — it is the reader's TL;DR and index
- **Plan sections**: if plan mode was used, paste the final plan verbatim; never summarize it
- **Answer sections**: reproduce in full — not as bullet-point summaries; include tables and code blocks verbatim
- Do not ask for confirmation — create the file immediately
