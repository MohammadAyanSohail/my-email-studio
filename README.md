# Email Studio

A workspace for planning and writing email campaigns for Ranger’s Edge Faisalabad, a sample brand that sells MagnaCut hunting and utility knives to campers and hikers.

Claude Code helps plan and draft the emails. You review them and send them yourself.

## What is in here

| Folder | What it holds |
| --- | --- |
| `brand/` | Brand voice guide: tone, words to use and avoid, claims we must never make |
| `leads/` | Practice lead list (`leads.csv`). All people are made up and use `@example.com` addresses |
| `campaigns/` | One folder per campaign, with a plan and email drafts |
| `notes/` | Research and decisions, such as which skills we chose and why, plus review notes |
| `review/` | Output and schema for the automated email review |
| `scripts/` | `review.mjs`, a script that reviews a campaign's emails with Claude Code |
| `.claude/` | Project settings, rules, the `personalize` skill and the send guard hook |

## Current campaigns

- `ranger-v7-launch`: the launch campaign, with a plan, email drafts and a version of each email per lead group (`knife-curious`, `gift-buyers`, `daily-hikers`).
- `test-bad`: a deliberately flawed email, used to test the review script.

## Ground rules

- Drafts only. Never send email to real people.
- The one exception is Resend, and only to `@resend.dev` test addresses or the owner’s own address. A hook in `.claude/hooks/send-guard.mjs` enforces this.
- Write in plain English, in the brand voice from `brand/voice.md`.
- Ask before deleting anything.

## Reviewing a campaign

```bash
node scripts/review.mjs campaigns/ranger-v7-launch
```

Findings are saved to `review/findings.json`. The script exits with code 1 if any finding is high severity, and 2 if the review itself failed.
