// Everything Agent Farm does, in one place: the Atlas tiles and the chapter openers come from here, and so will the /features pages and the
// /pricing rows (plan v0.7 §6), so a name changes once and changes everywhere. Each line was checked against the
// extension's source, its settings and the owner's screenshots (notes: AF-WEB_NOTES_features_v1.0, AF-WEB_NOTES_mserisi_v1.0).
//
// district: id, roman numeral, name, one-line pitch, accent colour (a token from base.css), the future page.
// feature:  id, district index, name, one sentence, sig = the small figure on the tile (demo data; atlas.js makes
//           some of them live), at = the section of this page that shows it today, src = where it was checked.

export const districts = [
  { id: 'relay', r: 'I', n: 'Never stops', k: 'Work keeps going through full contexts, full accounts and its own updates.', c: 'var(--yellow)' },
  { id: 'projects', r: 'II', n: 'Any project', k: 'One backlog per project, and the project can be anything.', c: 'var(--teal)' },
  { id: 'studio', r: 'III', n: 'Beyond code', k: 'Agents work as a production team and hand you finished media.', c: 'var(--claude)' },
  { id: 'automation', r: 'IV', n: 'Recipes and triggers', k: 'Work that starts on time, on an event, or from one sentence.', c: 'var(--violet)' },
  { id: 'team', r: 'V', n: 'Works as a team', k: 'Agents on different engines plan, split and check each other.', c: 'var(--cyan)' },
  { id: 'memory', r: 'VI', n: 'Never forgets', k: 'Every session is kept, and what matters becomes a wiki.', c: 'var(--agy)' },
  { id: 'engines', r: 'VII', n: 'Any brain', k: 'Five engines, and through routes, almost any model.', c: '#7fa0f8' },
  { id: 'bridge', r: 'VIII', n: 'Just ask', k: 'You never have to learn the farm. Tell an agent, it sets it up.', c: 'var(--ink)' },
  { id: 'privacy', r: 'IX', n: 'Yours alone', k: 'It runs on your machine and keeps its numbers honest.', c: 'var(--dim)' },
];

export const features = [
  // I · Never stops
  { id: 'relay', d: 0, n: 'Baton relay', s: 'At the context level you set (40% by default), a session commits, writes a handover note and a fresh session carries on. No context rot.', sig: '⑂ 92', at: 's-days', src: 'agentFarm.contextHandoverPct; Console ⑂ 92' },
  { id: 'quota', d: 0, n: 'Quota handover', s: 'Before the 5-hour window fills, the next leg opens on the account with the most room.', sig: 'acct-c 71%', at: 's-rules', src: 'agentFarm quota handover 90%; screenshot 075' },
  { id: 'policies', d: 0, n: 'Account policies', s: 'Four built-in rules (@emptiest, @pool, @standing, @round-robin) or your own. A rule that can pick no account refuses the launch and says why.', sig: '4 built in', src: 'Accounts → Account policies (M13, Mz3b)' },
  { id: 'park', d: 0, n: 'Park and wake', s: 'One account or ten, when all of them are full the chain waits for the first reset and carries on by itself.', sig: '2 parks', at: 's-days', src: 'baton park until reset' },
  { id: 'ouroboros', d: 0, n: 'Ouroboros', s: 'An agent builds a new Agent Farm, restarts it inside VS Code and carries on in the same session. Nobody has to restart anything.', sig: '3.931.0', at: 's-relay', src: 'farm.restartExtensionHost resume=true' },
  { id: 'sentry', d: 0, n: 'Sentry', s: 'An agent runs the chain instead of a fixed rule: it takes the next item, opens a clean session, reads the result and decides what comes next.', sig: 'on watch', src: 'src/core/sentryLeader.ts; settings → Sentry' },
  { id: 'brakes', d: 0, n: 'Brakes', s: 'A leg ceiling per chain, spend caps per workflow and one stop for a whole chain. Recorded, never deleted.', sig: 'baton.stop', at: 's-rules', src: 'batonMaxHops, workflowSpendCap, baton.stop' },

  // II · Any project
  { id: 'kinds', d: 1, n: 'Any kind of project', s: 'Software, a documentary series, a thesis, homework, an ad campaign. Same backlog, different work.', sig: 'any kind', src: 'Projects page; owner (11:46)' },
  { id: 'backlog', d: 1, n: 'Backlog', s: 'Write a thought down in one line. The fleet works the list off in the order you set.', sig: '38 open', at: 's-backlog', src: 'projects.backlog.*; Ctrl+Alt+B' },
  { id: 'track', d: 1, n: 'Track', s: 'How every closed item was closed: which session, which turn, what was tried first. The log can be rebuilt from the sessions.', sig: '214 closed', src: 'Projects → Track (M14); projects.track.rebuild' },
  { id: 'context', d: 1, n: 'Project context', s: 'Every session starts with the project\'s charter, plan, backlog and worklog, so no agent starts cold.', sig: '6 documents', src: 'project context injection (6 role documents)' },
  { id: 'letter', d: 1, n: 'Handover letter', s: 'Passing a project on? An automatic brief says what is still open and why.', sig: 'cold start', src: 'projects.handover' },
  { id: 'portfolio', d: 1, n: 'Portfolio', s: 'Every project\'s phase and backlog on one screen.', sig: '4 active', src: 'portfolio view' },
  { id: 'cost', d: 1, n: 'Cost and analysis', s: 'Weeks, rhythm, how long an item takes from open to closed, and where the money went.', sig: 'per item', src: 'Projects → Cost, Analysis tabs' },

  // III · Beyond code
  { id: 'studio', d: 2, n: 'Studio', s: 'Agents work as a production team: idea, research, script, shots, edit, judgement. You get assets, not chat.', sig: '6 scenes', at: 's-studio', src: 'Studio page (M1a, M1b); studio.*; production.json scenes' },
  { id: 'crecipes', d: 2, n: 'Content recipes', s: 'Long video to shorts, a weekly channel rhythm, a video edited in parts: install one and run it.', sig: '3 ready-made', at: 's-studio', src: 'workflows.recipes / workflows.addRecipe; contentRecipes.ts' },
  { id: 'judge', d: 2, n: 'Judge and triage', s: 'Give a step its criteria and a vision model checks every shot; a FAIL is made again with the critique. You keep or drop the rest in Triage.', sig: '2 to triage', at: 's-studio', src: 'tasks.ts vision QA gate; judgeEngines.ts; Studio → Triage (M1a)' },
  { id: 'premiere', d: 2, n: 'Straight to Premiere', s: 'The scenes become a sequence. Export it as XML and EDL, import it into Adobe Premiere and finish by hand.', sig: 'XML + EDL', at: 's-studio', src: 'src/core/premiere.ts (xmeml v4 + CMX3600); Studio → Assemble' },
  { id: 'inbox', d: 2, n: 'Media inbox', s: 'Drop files in a folder. Agents look at each one, file it by stage and fill in its card; anything unsure is asked, not guessed.', sig: 'all_in', at: 's-studio', src: 'allInIntake.ts' },
  { id: 'calendar', d: 2, n: 'Content calendar', s: 'What gets made lands on a calendar in your vault. Once you approve, the publish step hands it to your own upload flow.', sig: 'Mon 07:00', at: 's-studio', src: 'contentCalendar.ts; publishStep.ts (webhook, approval ask)' },
  { id: 'briefing', d: 2, n: 'Spoken briefing', s: 'The daily digest read aloud: by this computer for free, or by a voice model you choose.', sig: 'daily', at: 's-studio', src: 'briefing.ts; digestTtsModel' },

  // IV · Recipes and triggers
  { id: 'flows', d: 3, n: 'Workflows', s: 'A chain where each step gets the last one\'s output. A step can be an agent, an API call, a render, a browser, or a stop to ask you.', sig: '8 saved', src: 'Tasks → Edit workflow (M7-8-c)' },
  { id: 'schedules', d: 3, n: 'Schedules', s: 'Daily, weekly or once at a date and hour. A missed run can run late, be skipped, or ask you.', sig: '13 on', src: 'schedules.add (missed: skip | run | ask)' },
  { id: 'triggers', d: 3, n: 'Watch triggers', s: 'A file lands in a folder and an agent wakes up. Hooks and webhooks work the same way.', sig: '2 watching', src: 'triggers.add (watch | hook | webhook)' },
  { id: 'gatekeeper', d: 3, n: 'Gatekeeper', s: 'Before anyone wakes, Jev, a model that never chats and only decides, says whether there is real work. Off, watching in the shadow, or on.', sig: 'shadow', src: 'Settings → Gatekeeper (M15); src/core/kapici/providers/jev.ts; owner (12:18); agentFarm.kapici.*' },
  { id: 'words', d: 3, n: 'Say it in words', s: 'Type "run the filing batch on manager now". A cheap model turns it into a task, a schedule or a workflow and shows it to you before anything runs.', sig: 'Runs tab', src: 'Tasks → Runs (M7-8-d); commandbar.ts' },
  { id: 'queue', d: 3, n: 'Queue and limits', s: 'Runs wait their turn under concurrency ceilings, and the next one starts as one finishes.', sig: '1/5 running', src: 'agentFarm.maxConcurrentTasks; Automation strip' },
  { id: 'retries', d: 3, n: 'Retries and rounds', s: 'A run stopped by a session limit tries again by itself, every 40 minutes or on a growing pause. A big job runs in rounds inside one conversation.', sig: '6 × 40 min', src: 'retry.ts defaults; taskRounds.ts' },
  { id: 'forecast', d: 3, n: 'Forecast', s: 'How long the next run should take and how likely it is to pass, from the last 30 days.', sig: '30 days', src: 'schedules.forecast' },

  // V · Works as a team
  { id: 'missions', d: 4, n: 'Missions', s: 'A lead plans round by round and hands work to a team on different engines until the goal is met, or honestly isn\'t.', sig: 'lead + 3', at: 's-together', src: 'missions.start; screenshot 043' },
  { id: 'shared', d: 4, n: 'Shared sessions', s: 'Any agent can open any session by its id, whichever engine wrote it, see what was and wasn\'t done, and carry on.', sig: 'by id', src: 'sessions.find, sessions.read' },
  { id: 'notes', d: 4, n: 'Agent notes', s: 'Agents leave each other notes and hand tasks over, with a guard against loops.', sig: 'a2a', src: 'a2a notes and tasks' },
  { id: 'steer', d: 4, n: 'Steer and veto', s: 'Your steer, veto or new constraint changes a running team\'s course at once.', sig: 'mid-run', src: 'workflows.steer; mission supervisor' },
  { id: 'console', d: 4, n: 'Console', s: 'Every session in one column: who is working, whose turn it is, which leg of which chain.', sig: '2 waiting', at: 's-console', src: 'Console (screenshots 004, M11)' },
  { id: 'question', d: 4, n: 'Countdown questions', s: 'An agent\'s question picks the suggested answer when time runs out. A permission request always waits for you.', sig: '0:42', at: 's-console', src: 'question card auto-answer' },
  { id: 'timeline', d: 4, n: 'Live Timeline', s: 'Every running session on one axis. Jump to one tool call among thousands; a stall raises a flag.', sig: 'live', at: 's-fleet', src: 'Live Timeline (032, 035)' },
  { id: 'worktrees', d: 4, n: 'Worktrees', s: 'Parallel jobs work in separate git worktrees, so they never step on each other.', sig: 'git', src: 'worktree support' },

  // VI · Remembers everything
  { id: 'sessions', d: 5, n: 'Every session kept', s: 'Yours and the farm\'s own runs, from every engine, with cost, tokens, context and the chain leg.', sig: '1,499', src: 'Sessions page (M3)' },
  { id: 'turns', d: 5, n: 'Any turn, replayed', s: 'Open a session, filter its turns, replay it or export it as Markdown.', sig: 'replay', src: 'Session page (M4)' },
  { id: 'wiki', d: 5, n: 'Wiki from sessions', s: 'Mark a whole session or only the answers that matter. An agent compiles them into wiki pages, one concept per page.', sig: 'compile', src: 'wiki.candidates.*, wiki.compile; _REF/wiki.md' },
  { id: 'dropbox', d: 5, n: 'Drop box', s: 'Save a chat from any browser into the drop folder and it becomes wiki material by itself.', sig: '_RAW_', src: '_REF/wiki.md (drop box)' },
  { id: 'obsidian', d: 5, n: 'Obsidian, the second brain', s: 'Obsidian is the IDE, the model is the programmer, the wiki is the codebase. You curate, agents write.', sig: 'vault', src: 'vault rules (M5)' },
  { id: 'search', d: 5, n: 'Search everything', s: 'Search every transcript of every engine. A memory graph shows how each agent\'s notes link up, and which it actually recalled.', sig: 'all engines', src: 'search.transcripts; memgraph.ts' },
  { id: 'reports', d: 5, n: 'Reports and digests', s: 'Daily and weekly digests and fleet reports, written into your vault.', sig: 'weekly', src: 'settings → Reports' },

  // VII · Any brain
  { id: 'engines', d: 6, n: 'Five engines', s: 'Claude Code, Codex, Gemini, Antigravity and OpenCode. What is read off disk says so; only one real test call proves an engine works.', sig: '5', at: 's-brains', src: 'Engines page (073, 074); engineTest.ts' },
  { id: 'routes', d: 6, n: 'Plug-in brains', s: 'Claude Code and OpenCode can run other models through a route: free or paid, from a provider or an address on your own machine. Five engines, any number of brains.', sig: '3 routes', src: 'Engines → Providers (M9, M9b); routeEngines.ts; providerProfiles.ts (loopback)' },
  { id: 'radar', d: 6, n: 'Free-model radar', s: 'Set it up once as a schedule: every morning an agent checks which models are free today and adds new ones as routes, over the bridge.', sig: '04:30 daily', src: 'owner\'s schedule (M7-8-a); secretBinds.ts example; not shipped as a feature' },
  { id: 'health', d: 6, n: 'Route health', s: 'What each route offers is checked for free. A real, paid turn is only spent when you press for it.', sig: 'free check', src: 'Engines → Route health (M9)' },
  { id: 'vault', d: 6, n: 'Secret vault', s: 'Keys live in your OS keychain, open only to the agents you choose. A key\'s value never crosses the bridge.', sig: 'keychain', src: 'Secrets page (Mz2); _REF/bridge.md §C' },
  { id: 'accounts', d: 6, n: 'Many sign-ins', s: 'Several sign-ins of Claude Code or Codex side by side, without signing out. An account is a config folder, not a copied credential.', sig: '4 accounts', src: 'Engines → Accounts (Mz3a); engineAccounts.ts' },
  { id: 'switch', d: 6, n: 'Switch the model', s: 'Change the model, effort or account of a session from the Console, between turns.', sig: 'mid-session', at: 's-console', src: 'Console model and effort pickers (M11)' },

  // VIII · Just ask
  { id: 'bridge', d: 7, n: 'Just ask', s: 'Say "make me a weekly video recipe" in a chat. The agent sets it up through the bridge; you never open a form.', sig: 'in chat', at: 's-bridge', src: '_REF/bridge.md' },
  { id: 'ops', d: 7, n: '~560 operations', s: 'What you can do with a click, an agent can do with a call; only the secret vault stays off it, on purpose. It reads the list from farm.ops, so new abilities show up by themselves.', sig: 'farm.ops', at: 's-bridge', src: 'Technical DNA: ~560 ops in ~75 namespaces' },
  { id: 'mcp', d: 7, n: 'One command line', s: 'The bridge is a single shell command, so any agent that can run a command can use the farm. Gatekeeper also comes as an MCP server.', sig: 'af.js', src: 'src/service/af.ts; src/mcp/kapici' },
  { id: 'matrix', d: 7, n: 'Capability Matrix', s: 'Which agent has which skill, MCP server and memory file, and which of them were actually used in 30 days.', sig: '30 days', src: 'Toolbox → Capability Matrix (Mz1)' },
  { id: 'phone', d: 7, n: 'Phone and Telegram', s: 'Start a session, approve with a button and watch the fleet from your pocket. Android too.', sig: 'anywhere', at: 's-waits', src: 'Mobile page; Telegram bot; Android' },
  { id: 'sound', d: 7, n: 'Sound', s: 'A tone for every event, quiet hours, and which agent finished, said out loud.', sig: '10 tones', at: 's-waits', src: 'alertVoices, media/sounds' },
  { id: 'move', d: 7, n: 'Take it with you', s: 'Pack an agent as an .agentpack: its rules, tools, workflows and schedules, never its memory or secrets. Unpack it on another machine.', sig: '.agentpack', src: 'agentpack.ts; agents.pack.export / import' },

  // IX · Yours alone
  { id: 'local', d: 8, n: 'On your machine', s: 'No server of ours. The live hooks listen on 127.0.0.1 only.', sig: '127.0.0.1', at: 's-local', src: 'agentFarm.livePort 8377' },
  { id: 'telemetry', d: 8, n: 'No telemetry', s: 'Nothing about you or your work is sent to us.', sig: '0 bytes', at: 's-local', src: 'package.json: no telemetry' },
  { id: 'honest', d: 8, n: 'Honest numbers', s: 'Costs come from your own transcripts. A free model\'s zero is a real zero; a missing figure is shown as missing.', sig: 'real zeros', src: 'cost code comments (extension.ts)' },
  { id: 'superpowers', d: 8, n: 'Superpowers', s: 'Engineering disciplines on disk, such as tests first and systematic debugging, with quality gates.', sig: 'TDD', src: 'Superpowers toggle (Console)' },
  { id: 'evals', d: 8, n: 'Evals', s: 'Agents\' work measured on a scorecard, not on how sure they sound.', sig: 'scorecard', src: 'evals' },
];

/* Stories: one event travels through the farm, lighting tiles in several districts (plan v0.7 §4).
   t: the clock or label shown big on the desk; x: what happens at that step. All names and files are invented. */
export const stories = [
  {
    n: '03:12 · A long video lands', steps: [
      { f: 'triggers', t: '03:12', x: 'interview-take-4.mp4 lands in the watched folder. The trigger fires.' },
      { f: 'gatekeeper', t: '03:12', x: 'Gatekeeper asks Jev before anyone wakes: a real video, real work. Wake the studio.' },
      { f: 'crecipes', t: '03:13', x: 'The Long video to shorts recipe starts, with the file as its input.' },
      { f: 'studio', t: '03:20', x: 'Whisper writes the transcript; the editor agent picks the six strongest moments.' },
      { f: 'judge', t: '03:41', x: 'Six subtitled vertical shorts are cut on this machine, in one pass each. They wait in Triage for you to keep or drop.' },
      { f: 'sessions', t: '03:42', x: 'Every step\'s session is kept, so tomorrow anyone can see how each cut was chosen.' },
      { f: 'phone', t: '07:40', x: 'On your phone: five shorts ready, one needs a look.' },
    ],
  },
  {
    n: 'Fri 18:00 · You leave', steps: [
      { f: 'backlog', t: 'Fri 18:00', x: '38 items open. You leave the desk.' },
      { f: 'relay', t: 'Fri 18:04', x: 'A leg takes the next item, commits, and hands over at 40% context. Then the next leg, and the next.' },
      { f: 'quota', t: 'Sat 02:10', x: 'acct-c reaches 90% of its 5-hour window. The next leg opens on acct-d.' },
      { f: 'park', t: 'Sat 09:30', x: 'Every account is full. The chain parks and wakes itself at the first reset.' },
      { f: 'ouroboros', t: 'Sat 16:05', x: 'One leg ships a fix to Agent Farm itself, restarts it, and carries on in the same session.' },
      { f: 'track', t: 'Sun 22:50', x: 'Each closed item is tracked to the session and the turn that closed it.' },
      { f: 'phone', t: 'Mon 08:00', x: 'On your phone: 9 items closed, 2 waiting for you.' },
    ],
  },
  {
    n: 'A thesis chapter', steps: [
      { f: 'kinds', t: 'Ch. 3', x: 'A thesis is a project too. Chapter 3 is on its backlog.' },
      { f: 'missions', t: 'Round 1', x: 'A mission: the lead splits it into sources, a draft and a review.' },
      { f: 'engines', t: 'Round 1', x: 'A researcher on Gemini, a writer on Claude Code, a reviewer on Codex.' },
      { f: 'notes', t: 'Round 2', x: 'The reviewer leaves the writer a note: two claims have no source.' },
      { f: 'steer', t: 'Round 2', x: 'You add a constraint mid-run: peer-reviewed sources only.' },
      { f: 'wiki', t: 'Round 3', x: 'What the team found is compiled into wiki pages, one concept each.' },
      { f: 'obsidian', t: 'Done', x: 'They land in your Obsidian vault, linked to everything you already know.' },
    ],
  },
  {
    n: 'Continue from 7c41d2e9', steps: [
      { f: 'sessions', t: '23:10', x: 'Last night a Claude Code session, 7c41d2e9, stopped halfway through a refactor.' },
      { f: 'bridge', t: '09:02', x: 'You tell a Codex agent: carry on from 7c41d2e9.' },
      { f: 'shared', t: '09:02', x: 'It finds the session by its id and reads every turn, though another engine wrote them.' },
      { f: 'turns', t: '09:05', x: 'Step by step it checks the work: two files changed, the tests never ran.' },
      { f: 'backlog', t: '09:06', x: 'It files what was missing as #byAI and takes it on.' },
      { f: 'console', t: '09:07', x: 'And carries on in the Console, in plain sight.' },
    ],
  },
  {
    n: 'Just ask', steps: [
      { f: 'bridge', t: 'You', x: '"Every Monday, make a short video on a new topic."' },
      { f: 'ops', t: 'Agent', x: 'The agent asks farm.ops what the farm can do.' },
      { f: 'crecipes', t: 'Agent', x: 'It installs the Weekly channel rhythm recipe: idea, script, shots, your approval, a publishing package.' },
      { f: 'schedules', t: 'Agent', x: 'It adds a schedule for Monday 07:00 whose agent starts the recipe.' },
      { f: 'calendar', t: 'Mon 07:00', x: 'The week\'s idea comes from the content calendar.' },
      { f: 'phone', t: 'Mon 07:40', x: 'The finished video waits for your approval, and you can give it from your phone.' },
    ],
  },
];
