import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createHighlighter } from 'shiki';

const shikiHighlighter = await createHighlighter({
	themes: ["material-theme-darker"],
	langs: ["javascript", "bash"],
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = escapeSvelte(shikiHighlighter.codeToHtml(code, { lang, theme: "material-theme-darker" }));
					return `{@html \`${html}\` }`;
				}
			}
		})
	],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};

export default config;
