// The order of the landing page, in one place (plan v0.7 §5). index.astro renders the sections in this order, the
// section number on each one (".sx") and the side index are computed from it, so moving a section is one line here.
// d: the chapter (an index into districts in data/features.js); sections with the same d follow one chapter opener.

export const page = [
  { id: 's-relay', label: 'Relay' },
  { id: 's-fleet', label: 'The fleet' },
  { id: 's-atlas', label: 'The whole farm' },
  { id: 's-days', label: 'Day and night', d: 0 },
  { id: 's-rules', label: 'The rules of the relay', d: 0 },
  { id: 's-backlog', label: 'Backlog', d: 1 },
  { id: 's-studio', label: 'Studio', d: 2 },
  { id: 's-auto', label: 'Recipes and triggers', d: 3 },
  { id: 's-console', label: 'The console', d: 4 },
  { id: 's-together', label: 'Together', d: 4 },
  { id: 's-memory', label: 'Memory', d: 5 },
  { id: 's-brains', label: 'Brains', d: 6 },
  { id: 's-bridge', label: 'Just ask', d: 7 },
  { id: 's-waits', label: 'Never waits', d: 7 },
  { id: 's-meter', label: 'Measured', d: 8 },
  { id: 's-local', label: 'Local', d: 9 },
  { id: 's-close', label: 'Start' },
];

/** the section's number on the page, "01" to "16" */
export const no = id => {
  const i = page.findIndex(p => p.id === id);
  if (i < 0) throw new Error(`page.js has no section ${id}`);
  return String(i + 1).padStart(2, '0');
};
