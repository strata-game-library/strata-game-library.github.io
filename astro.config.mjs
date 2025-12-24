// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://strata.game',
	integrations: [
		starlight({
			title: 'Strata',
			description: 'Procedural worlds, infinite possibilities',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/strata-game-library' }],
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'API Reference',
					autogenerate: { directory: 'api-reference' },
				},
				{
					label: 'Examples and Tutorials',
					autogenerate: { directory: 'examples-and-tutorials' },
				},
				{
					label: 'Package Docs',
					autogenerate: { directory: 'package-docs' },
				},
			],
		}),
	],
});
