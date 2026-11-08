---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

These rules apply to every email file in any campaign. Each email file must follow them.

## Top of the file

- Start with one line: `Subject: ...`. Keep the subject to 50 characters or fewer.
- The next line is `Preview: ...`. Keep the preview to 90 characters or fewer.

## Greeting

- Greet the reader with `{{first_name}}`.

## Link

- Use exactly one main link. Write it like this: `[Button text](https://rangersedgefsd.example.com/ranger-v7)`
- Change the button text to fit the email. Keep the web address the same.

## Ending

- End the email body with the sign-off from `brand/voice.md`: the Ranger’s Edge crew
- After the sign-off, add this two-line footer. Write it as plain text. Do not put it inside a code block.

You're getting this because you joined the Ranger’s Edge Faisalabad waitlist.
Ranger’s Edge Faisalabad, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
