// Site-wide links and the site's own version. One place to change where the call to action goes.
// The extension's source is closing (plan v0.7 §8), so nothing links to its repo: the CTA goes to the Marketplace listing
// (publisher muvusoft, name agent-farm in the extension's package.json). The changelog gets its own page with the /features pages.

export const site = {
  version: '0.5.0',                                        // this website, see CHANGELOG.md
  url: 'https://agentfarm.space',
  get: { label: 'Get Agent Farm', href: 'https://marketplace.visualstudio.com/items?itemName=muvusoft.agent-farm' },
  maker: { name: 'Muvusoft', href: 'https://muvusoft.uk/' },
};
