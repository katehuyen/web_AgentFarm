// The demo backlog every section shares: one project, the family the relay chain works through, and the queue behind it.
// Shaped like the real Projects → Backlog page (area codes, families, sizes S to XL, #byAI / #byREQ, ⛔ waits on),
// which keeps the work in a plain Backlog.md file. Every item here is invented; nothing comes from a real backlog.

export const project = { name: 'orbit-app', sessions: 412, open: 38, done: 214 };

/* Areas come from the file's own headings. Counts are the open items in each; they add up to project.open. */
export const AREAS = [['P', 1], ['K', 4], ['S', 2], ['M', 0], ['N', 0], ['B', 0], ['A', 0], ['U', 9], ['X', 22]];

/* The whole the chain in 05 Days works through, then its twelve parts in queue order.
   legs: how many relay legs each part took in the demo chain (they add up to 92; the last one is still open). */
export const family = { c: 'X-40', t: 'Timeline export, end to end', s: 'XL', k: 'feat' };
export const parts = [
  { c: 'X-41', t: 'index the transcripts', s: 'S', k: 'feat', legs: 5 },
  { c: 'X-42', t: 'stream rows into the exporter', s: 'M', k: 'feat', legs: 9 },
  { c: 'X-43', t: 'write the CSV schema test', s: 'S', k: 'test', legs: 4 },
  { c: 'X-44', t: 'handle a 1M-row transcript', s: 'L', k: 'bug', legs: 13 },
  { c: 'X-45', t: 'JSON lines on the same stream', s: 'M', k: 'feat', legs: 8 },
  { c: 'X-46', t: 'resume a broken export from the last row', s: 'L', k: 'feat', legs: 12 },
  { c: 'X-47', t: 'wire the export button', s: 'S', k: 'ux', legs: 4 },
  { c: 'X-48', t: 'add the progress notice', s: 'S', k: 'ux', legs: 5 },
  { c: 'X-49', t: 'Windows paths past 260 characters', s: 'M', k: 'bug', legs: 9 },
  { c: 'X-50', t: 'tests at 10k, 1M and 10M rows', s: 'L', k: 'test', legs: 14 },
  { c: 'X-51', t: 'document the export path', s: 'S', k: 'docs', legs: 4 },
  { c: 'X-52', t: 'clean up the old writer', s: 'M', k: 'refactor', legs: 5 },
];

/* What is queued after the family. by: who wrote the line (AI = an agent filed it itself, REQ = you asked an agent to);
   wait: an unfinished item it waits on, so it is held back. */
export const queue = [
  { c: 'U-12', t: 'export drops rows past 10k', s: 'M', k: 'bug' },
  { c: 'X-53', t: 'Excel opens the UTF-8 CSV as Latin-1', s: 'S', k: 'bug', by: 'AI' },
  { c: 'K-7', t: 'settings search finds nothing for "quota"', s: 'S', k: 'bug', by: 'REQ' },
  { c: 'S-9', t: 'session list slows down past 1,000 rows', s: 'M', k: 'perf' },
  { c: 'X-54', t: 'Parquet as a third export format', s: 'L', k: 'feat', wait: 'X-52' },
  { c: 'U-31', t: 'export dialog forgets the last folder', s: 'S', k: 'ux' },
  { c: 'K-8', t: 'quota bar rounds 89.6% up to 90%', s: 'S', k: 'bug', by: 'AI' },
  { c: 'U-33', t: 'keyboard shortcut for the export', s: 'S', k: 'ux', by: 'REQ' },
  { c: 'S-10', t: 'archive sessions older than a year', s: 'M', k: 'feat' },
  { c: 'P-3', t: 'release notes for 2.0', s: 'S', k: 'docs' },
  { c: 'X-55', t: 'export a single turn from the transcript', s: 'S', k: 'feat' },
  { c: 'K-9', t: 'warn before a leg starts on a full account', s: 'M', k: 'ux', by: 'AI' },
  { c: 'U-34', t: 'empty state for a project with no sessions', s: 'S', k: 'ux' },
];

/* Thoughts filed while the page runs: typed into the capture box by a person, or filed by an agent mid-job (#byAI).
   a: the area the item is filed under; it gets the next free number there (codes only count up). */
export const captures = [
  { who: 'you', t: 'the export should say which account each leg ran on', a: 'X', k: 'feat', s: 'S' },
  { who: 'agent', t: 'rows.ts swallows a write error on a full disk', a: 'X', k: 'bug', s: 'S' },
  { who: 'you', t: 'dark theme for the export dialog', a: 'U', k: 'ux', s: 'M' },
  { who: 'agent', t: 'test_export.js leaves temp files behind on Windows', a: 'X', k: 'test', s: 'S' },
  { who: 'you', t: 'a weekly digest of what the chains closed', a: 'S', k: 'feat', s: 'M' },
  { who: 'agent', t: 'quota bar flickers when two accounts tie', a: 'K', k: 'bug', s: 'S' },
];
export const nextCode = { P: 4, K: 10, S: 11, U: 35, X: 56 };

/* the live item: the last part of the family, on the relay hero's live leg */
export const live = parts[parts.length - 1];
