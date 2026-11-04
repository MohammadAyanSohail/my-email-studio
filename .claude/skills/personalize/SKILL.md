---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign by lead group

Write one version of every email in a campaign for each lead group. Drafts only. Never send anything.

The campaign folder is: $ARGUMENTS

## Step 1: Check the campaign folder

If `$ARGUMENTS` is empty, stop. Do not write any files. Use Glob on `campaigns/*/*` to find the campaign folders. Reply with this and nothing else:

- One line saying no campaign folder was given.
- A bullet list of the folders that exist under `campaigns/`.
- One line showing how to run it, such as `/personalize campaigns/<folder>`.

If a folder was given but it does not exist, or it has no `emails/` folder with `.md` files, stop the same way. Say what is missing and list the campaign folders that do exist.

## Step 2: Read what you need

1. Read `brand/voice.md`. Every version must follow it: the three-word voice, the words we use and avoid, the claims we never make, and the sign-off.
2. Read `.claude/rules/emails.md`. Every version must still follow the email file rules.
3. Read `leads/CLAUDE.md` and `leads/leads.csv`. Use the CSV only to confirm the groups. The groups are `knife-curious`, `gift-buyers` and `daily-hikers`. If a group in the CSV is not one of these three, skip it and say so in the summary.
4. Use Glob to find the source emails: `<campaign folder>/emails/*.md`. Read each one. Also read `<campaign folder>/plan.md` if it exists, for context.

Only the files directly in `<campaign folder>/emails/` are source emails. Never treat anything under `<campaign folder>/groups/` as a source.

## Step 3: Write the versions

For each source email, for each of the three groups, write one new file.

**What stays exactly the same as the source:**

- The structure: same paragraphs in the same order, same length, roughly.
- The `Subject:` line and the `Preview:` line.
- The `{{first_name}}` greeting.
- The one main link, with the same button text and the same web address.
- The sign-off and the two-line footer, word for word.
- All placeholders such as `{{first_name}}`, `{{company_address}}` and `{{unsubscribe_url}}`. Never swap in real names or addresses from the CSV.

**What changes, and only this:**

1. **The opening line.** This is the first sentence of the body, right after the greeting. Rewrite it so it fits the group.
2. **One example.** Pick one example in the body (for instance a list of tasks or a use case) and swap it for one that fits the group. Change only that one example. If the email has no example, add one short example in place of a sentence that does the same job. Do not make the email longer.

Everything else is copied unchanged.

**How each group should sound:**

- `knife-curious`: new to good knives or still deciding. Plain and welcoming. Do not talk down to them. Examples: what a utility knife is for, a first knife for camp.
- `gift-buyers`: buying for someone else. Respect their time. Examples: a gift for a camper or hiker they know. Remind them, in the example or opening, only if the source email already does, that the recipient's local rules matter.
- `daily-hikers`: out on the trail most days. Practical and dependable. Examples: trail-side food, cord, gear repairs, light camp chores.

## Rules the versions must follow

- Follow `brand/voice.md` in full. Plain English, short sentences, calm and slightly rugged, professional and not casual.
- Never write anything about self-defense, protection, fighting, combat or tactical use. Never let a knife read like a weapon.
- Never say the blade never dulls, is rust-proof or corrosion-proof, or can't break. Keep the "resistant", "holds an edge", "regular care" and "built for cutting, not abuse" wording.
- Never promise shipping is simple or legal everywhere. If the source email has a local-regulations line, keep it.
- Do not invent facts, numbers, prices, dates, reviews or customer stories. Examples must be things any camper or hiker would plausibly do with a utility knife.
- Use "brother" at most once in an email, and only if it feels natural. Never "bro". No hype, no slang, no all caps, at most one exclamation mark across the whole email.
- Never include real people. Do not use any name or email from the CSV in the files.

## Step 4: Save the files

Save each version to:

`<campaign folder>/groups/<group>/emails/<same file name as the source>`

For example, `campaigns/chaku-v7-launch/groups/daily-hikers/emails/01-v7-is-here.md`.

- Use the exact same file name as the source email.
- The Write tool creates folders as needed.
- If a version already exists, overwrite it. Never touch or delete the source emails or any other file.
- That is 3 files per source email.

## Step 5: Check before you finish

Re-read what you wrote, using Grep where it helps. For every file, confirm:

- The `Subject:` and `Preview:` lines match the source.
- The link line matches the source exactly.
- The sign-off and the two-line footer match the source exactly.
- No banned words or claims from `brand/voice.md` appear.

Fix any file that fails, then re-check it.

## Step 6: Reply with a short summary only

Reply with this and nothing else:

- One line: how many files you wrote (and for how many source emails).
- One line per group, with one example opening line, written like this:
  - `knife-curious`: "<opening line>"
  - `gift-buyers`: "<opening line>"
  - `daily-hikers`: "<opening line>"
- Only if something was skipped or failed, one more line saying what.

Do not paste whole emails. Do not list every file. Do not explain your choices.
