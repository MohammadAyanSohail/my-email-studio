# Skills I chose

Checked on 30 October 2026. Nothing has been installed yet. Star and install counts change, so check them again before installing.

## Use these

**For writing campaigns: `anthropics/knowledge-work-plugins`** (about 34,000 stars)

- It comes from Anthropic, the company that makes Claude, and it was updated today.
- Use two skills from it: `campaign-plan` to plan a campaign and `email-sequence` to write a series of emails with timing and follow-ups.
- These skills only help with planning and writing. They don't need an email account or API key.

**For sending email: `resend/resend-skills`** (208 stars)

- It comes from Resend, the email service itself, and it was updated two days ago.
- Use the `resend` skill. It covers sending email, managing contacts, sending broadcasts and tracking delivery.
- The star count is low, but that's less of a worry here because the publisher is the company that runs the service. Resend's main `react-email` repository has about 19,900 stars.
- This skill needs a Resend API key and can send real email, so keep the key out of your files and test on your own address first.

## Avoid these

**`claude-office-skills/skills`, including its `email-marketing` skill** (550 stars)

- The name sounds official, but it's run by an unverified organization called "AGI Lab", not by Anthropic. Its README still uses the label "Official Anthropic skills" for one section.
- It was last updated on 31 January 2026, two days after it was created, so it looks abandoned.
- Its setup instructions tell you to paste a command that downloads a script and runs it straight away.
- I didn't find anything harmful. It just gives me too little reason to trust it.

**`mbfinotti/sales-skills`, including `cold-email-deliverability` and `sales-outbound-sequence`** (3 stars)

- Each skill shows about 29,000 installs, but the repository has 3 stars, no forks, and an owner with 1 follower. It's also only eight weeks old.
- The install counts are suspiciously close together, from 29.1K to 29.4K. This doesn't prove they're fake, but it does mean the numbers can't be relied on.
- It's written for sales teams sending cold outreach, not for marketing to people who signed up.
- Its README asks you to install the whole collection rather than one skill, which means trusting far more than you need.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it?** Open the GitHub page and confirm the owner is the real company or a person with a track record. A name that sounds official proves nothing.
2. **Do the numbers agree, and is it maintained?** Installs, stars and forks should roughly match, and the last update should be recent. Thousands of installs with almost no stars is a warning sign.
3. **What does it actually do?** Read `SKILL.md` and any scripts before installing. Look for what it can run, what keys it asks for, and where it sends your data. Be especially careful with anything that can send email for you.
