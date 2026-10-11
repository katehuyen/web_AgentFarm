// @ts-check
import { defineConfig } from 'astro/config';

// Static site for agentfarm.space. No server, no adapter: `astro build` writes plain files to dist/.
export default defineConfig({
  site: 'https://agentfarm.space',
  build: { inlineStylesheets: 'auto' },
});
