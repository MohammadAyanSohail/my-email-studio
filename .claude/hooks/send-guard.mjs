// PreToolUse hook: stops Resend tools from emailing the wrong people.
// Reads the tool call as JSON on stdin. Exit 0 = allow, exit 2 = block.

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);
const CHECK_RECIPIENTS = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  console.error(`Blocked by send-guard: ${reason}`);
  process.exit(2);
}

// Pull the bare address out of "Name <a@b.com>" or "a@b.com".
function bareAddress(value) {
  const text = String(value).trim();
  const match = text.match(/<([^<>]+)>\s*$/);
  return (match ? match[1] : text).trim().toLowerCase();
}

// Collect every to / cc / bcc address, even inside nested batch items.
function collectRecipients(node, found = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectRecipients(item, found);
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (["to", "cc", "bcc"].includes(key.toLowerCase())) {
        for (const addr of [].concat(value)) found.push(addr);
      } else {
        collectRecipients(value, found);
      }
    }
  }
  return found;
}

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  // Cannot read the call, so we cannot vouch for it. Fail closed.
  block("could not read the tool call, so it was stopped to be safe.");
}

const fullName = String(call.tool_name ?? "");
if (!fullName.startsWith("mcp__resend__")) process.exit(0);
const tool = fullName.slice("mcp__resend__".length);

if (ALWAYS_BLOCK.has(tool)) {
  block(`${tool} can reach whole lists of people. Send it yourself from the Resend dashboard.`);
}

if (CHECK_RECIPIENTS.has(tool)) {
  const myEmail = (process.env.MY_EMAIL ?? "").trim().toLowerCase();
  const recipients = collectRecipients(call.tool_input);

  if (recipients.length === 0) {
    block(`${tool} has no recipients I can check.`);
  }

  for (const entry of recipients) {
    const address = bareAddress(entry);
    const isTestAddress = /^[^@\s]+@resend\.dev$/.test(address);
    const isMine = myEmail !== "" && address === myEmail;
    if (!isTestAddress && !isMine) {
      block(`${address} is not allowed. Only @resend.dev addresses and MY_EMAIL are allowed.`);
    }
  }
}

process.exit(0);
