// Every figure the site states about Agent Farm, with where it was checked.
// Source repo: katehuyen/vsc_AgentFarm. Re-check these when the extension ships a release that changes them.

export const facts = {
  version: '3.930.0',          // package.json "version" (the screenshots show 3.931.0 running)
  releases: '1,053',           // CHANGELOG.md, one "## x.y.z" heading per release
  commands: 602,               // package.json contributes.commands
  settings: 243,               // package.json contributes.configuration; Settings page reads "243 settings"
  tests: '35,600+',            // info/ Technical DNA
  runtimeDependencies: 0,      // package.json has no "dependencies"
  bridgeOps: '~560',           // info/ Technical DNA: "~560 static op names in ~75 namespaces"
  namespaces: '~75',           // same line of the Technical DNA
  pages: 54,                   // info/ Technical DNA: "Pages (54 hosts)"
  engines: ['Claude Code', 'Codex', 'Gemini', 'Antigravity', 'OpenCode'], // Engines page (screenshot 073)
  realChainLegs: 92,           // Console session card and strip show "⑂ 92" (screenshots 004, 035)
  livePort: 8377,              // src/extension.ts, setting agentFarm.livePort default
};

// Relay defaults, from package.json contributes.configuration.
export const relay = {
  contextConvergePct: 35,
  contextHandoverPct: 40,
  quotaHandoverPct: 90,
  quotaWeeklyHandoverPct: 98,
  contextHandoverStayAccountPct: 70,
  batonMaxHops: 6,             // 0 = no ceiling; two legs in a row ending on the same commit also stop the chain
};
